/**
 * 특정 폴더(앨범)의 이미지 파일 목록 반환
 *   - 폴더는 공개(Anyone with link: Viewer) 권한이어야 함
 */

export async function onRequestGet({ params, env }) {
  const folderId = String(params.folderId || '');
  const apiKey = env.GOOGLE_DRIVE_API_KEY;

  if (!folderId || !apiKey) {
    return Response.json(
      { photos: [], folderName: '', configured: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    // 1) 폴더 메타 (이름)
    let folderName = '';
    try {
      const metaUrl = `https://www.googleapis.com/drive/v3/files/${folderId}?fields=name&key=${apiKey}`;
      const metaRes = await fetch(metaUrl);
      if (metaRes.ok) {
        const meta = await metaRes.json();
        folderName = meta.name || '';
      }
    } catch {
      // ignore
    }

    // 2) 이미지 목록
    const q = encodeURIComponent(
      `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`
    );
    const fields = encodeURIComponent(
      'files(id,name,mimeType,modifiedTime,webViewLink)'
    );
    const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&orderBy=name&pageSize=200&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      return Response.json(
        { photos: [], folderName, configured: true, error: `Drive ${res.status}` },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    const data = await res.json();

    const photos = (data.files || []).map((f) => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      modifiedTime: f.modifiedTime,
      thumbnailUrl: `https://lh3.googleusercontent.com/d/${f.id}=w800`,
      fullUrl: `https://lh3.googleusercontent.com/d/${f.id}=w1600`,
      webViewLink: f.webViewLink,
    }));

    return Response.json(
      { photos, folderName, configured: true },
      {
        headers: {
          'Cache-Control': 'public, max-age=900, s-maxage=900',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return Response.json(
      { photos: [], folderName: '', configured: true, error: String(err) },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
