/**
 * 부모 폴더의 하위 폴더 목록 = "앨범" 목록 반환
 *   각 앨범마다 첫 사진을 표지로 함께 가져옵니다.
 *
 * Required env:
 *   GOOGLE_DRIVE_API_KEY
 *   DRIVE_FOLDER_<BOARDID>  (예: DRIVE_FOLDER_ALBUM = 부모 폴더 ID)
 */

export async function onRequestGet({ params, env }) {
  const boardId = String(params.boardId || '');
  const folderMap = {
    news: env.DRIVE_FOLDER_NEWS,
    bulletin: env.DRIVE_FOLDER_BULLETIN,
    events: env.DRIVE_FOLDER_EVENTS,
    album: env.DRIVE_FOLDER_ALBUM,
    newfamily: env.DRIVE_FOLDER_NEWFAMILY,
    missionary: env.DRIVE_FOLDER_MISSIONARY,
  };

  const parentId = folderMap[boardId];
  const apiKey = env.GOOGLE_DRIVE_API_KEY;

  if (!parentId || !apiKey) {
    return Response.json(
      { albums: [], configured: false, message: '폴더 또는 API 키가 설정되지 않았습니다.' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    // 1) 하위 폴더 목록
    const folderMime = 'application/vnd.google-apps.folder';
    const q = encodeURIComponent(
      `'${parentId}' in parents and mimeType = '${folderMime}' and trashed = false`
    );
    const fields = encodeURIComponent('files(id,name,modifiedTime)');
    const listUrl = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&orderBy=name&pageSize=100&key=${apiKey}`;
    const res = await fetch(listUrl);
    if (!res.ok) {
      return Response.json(
        { albums: [], configured: true, error: `Drive ${res.status}` },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    const data = await res.json();
    const folders = data.files || [];

    // 2) 각 폴더의 첫 이미지(표지) + 사진 수 병렬 fetch
    const albums = await Promise.all(
      folders.map(async (f) => {
        let coverId = null;
        let photoCount = 0;
        try {
          const pq = encodeURIComponent(
            `'${f.id}' in parents and mimeType contains 'image/' and trashed = false`
          );
          const purl = `https://www.googleapis.com/drive/v3/files?q=${pq}&fields=files(id)&orderBy=name&pageSize=100&key=${apiKey}`;
          const pr = await fetch(purl);
          if (pr.ok) {
            const pd = await pr.json();
            const ps = pd.files || [];
            photoCount = ps.length;
            if (photoCount > 0) coverId = ps[0].id;
          }
        } catch {
          // ignore individual folder errors
        }
        return {
          id: f.id,
          name: f.name,
          modifiedTime: f.modifiedTime,
          coverUrl: coverId
            ? `https://lh3.googleusercontent.com/d/${coverId}=w800`
            : null,
          photoCount,
        };
      })
    );

    // 사진이 0장인 빈 폴더는 제외
    const visible = albums.filter((a) => a.photoCount > 0);

    return Response.json(
      { albums: visible, configured: true },
      {
        headers: {
          'Cache-Control': 'public, max-age=900, s-maxage=900',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return Response.json(
      { albums: [], configured: true, error: String(err) },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
