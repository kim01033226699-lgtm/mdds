/**
 * Google Drive 게시판 프록시
 *  - 환경변수에 GOOGLE_DRIVE_API_KEY + FOLDER_<BOARD> ID를 설정해두면
 *    해당 폴더의 파일 목록을 JSON으로 반환합니다.
 *  - Drive 폴더는 "링크가 있는 모든 사용자에게 보기" 권한이어야 합니다.
 *
 *  Required env vars (Cloudflare Pages → Settings → Environment variables):
 *    GOOGLE_DRIVE_API_KEY     - Google Cloud의 Drive API 키
 *    DRIVE_FOLDER_NEWS        - 교회소식 폴더 ID
 *    DRIVE_FOLDER_BULLETIN    - 주보 폴더 ID
 *    DRIVE_FOLDER_EVENTS      - 이달의 행사 폴더 ID
 *    DRIVE_FOLDER_ALBUM       - 교회행사앨범 폴더 ID
 *    DRIVE_FOLDER_NEWFAMILY   - 새가족소개 폴더 ID
 *    DRIVE_FOLDER_MISSIONARY  - 해외선교 소식지 폴더 ID
 */

export async function onRequestGet(context) {
  const { params, env } = context;
  const boardId = String(params.boardId || '');

  const folderMap = {
    news: env.DRIVE_FOLDER_NEWS,
    bulletin: env.DRIVE_FOLDER_BULLETIN,
    events: env.DRIVE_FOLDER_EVENTS,
    album: env.DRIVE_FOLDER_ALBUM,
    newfamily: env.DRIVE_FOLDER_NEWFAMILY,
    missionary: env.DRIVE_FOLDER_MISSIONARY,
  };

  const folderId = folderMap[boardId];
  const apiKey = env.GOOGLE_DRIVE_API_KEY;

  if (!folderId || !apiKey) {
    return Response.json(
      {
        files: [],
        configured: false,
        message: 'Drive 폴더 또는 API 키가 설정되지 않았습니다.',
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const fields = encodeURIComponent(
    'files(id,name,mimeType,createdTime,modifiedTime,thumbnailLink,webViewLink,iconLink,size)'
  );
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&orderBy=modifiedTime+desc&pageSize=100&key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      return Response.json(
        { files: [], configured: true, error: `Drive API ${res.status}: ${text}` },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    const data = await res.json();
    const files = (data.files || []).map((f) => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      modifiedTime: f.modifiedTime,
      thumbnailLink: f.thumbnailLink,
      webViewLink: f.webViewLink,
      iconLink: f.iconLink,
      size: f.size,
    }));
    return Response.json(
      { files, configured: true },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
      }
    );
  } catch (err) {
    return Response.json(
      { files: [], configured: true, error: String(err) },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
