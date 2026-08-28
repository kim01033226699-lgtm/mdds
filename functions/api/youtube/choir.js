const PLAYLIST_ID = 'PLuyd60PWgGd0ELm4cbBubqZHCeHRkvN-Y';
const ALLOWED_CHOIRS = new Set(['샤론찬양대', '시온찬양대']);

export async function onRequestGet({ request }) {
  try {
    const choir = new URL(request.url).searchParams.get('choir') || '';
    if (!ALLOWED_CHOIRS.has(choir)) {
      return Response.json(
        { videos: [], configured: false, error: '지원하지 않는 찬양대입니다.' },
        { status: 400, headers: corsHeaders('no-store') }
      );
    }

    const videos = (await fetchPlaylist())
      .filter((video) => video.choir === choir)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 12);

    if (videos.length === 0) throw new Error(`${choir} 영상을 찾지 못했습니다.`);

    return Response.json(
      { videos, configured: true, playlistId: PLAYLIST_ID },
      { headers: corsHeaders('public, max-age=900, s-maxage=900') }
    );
  } catch (err) {
    return Response.json(
      { videos: [], configured: false, error: String(err) },
      { status: 200, headers: corsHeaders('no-store') }
    );
  }
}

function corsHeaders(cacheControl) {
  return {
    'Cache-Control': cacheControl,
    'Access-Control-Allow-Origin': '*',
  };
}

async function fetchPlaylist() {
  const res = await fetch(`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`YouTube HTTP ${res.status}`);

  const data = parseInitialData(await res.text());
  const rawVideos = [];
  walk(data, rawVideos);

  return rawVideos.map(parseChoirTitle).filter(Boolean);
}

function parseInitialData(html) {
  const marker = 'ytInitialData = ';
  const start = html.indexOf(marker);
  if (start < 0) throw new Error('ytInitialData not found');

  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;
  for (let i = start + marker.length; i < html.length; i++) {
    const char = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === '{') depth++;
    else if (char === '}' && --depth === 0) {
      end = i + 1;
      break;
    }
  }
  if (end < 0) throw new Error('ytInitialData JSON end not found');
  return JSON.parse(html.slice(start + marker.length, end));
}

function walk(obj, out) {
  if (!obj || typeof obj !== 'object') return;

  const legacy = obj.playlistVideoRenderer;
  if (legacy) {
    const title = legacy.title?.runs?.[0]?.text || legacy.title?.simpleText || '';
    addUnique(out, legacy.videoId, title);
  }

  const lockup = obj.lockupViewModel;
  if (lockup) {
    addUnique(
      out,
      lockup.contentId,
      lockup.metadata?.lockupMetadataViewModel?.title?.content || ''
    );
  }

  for (const value of Object.values(obj)) walk(value, out);
}

function addUnique(out, id, title) {
  if (id && title && !out.some((video) => video.id === id)) out.push({ id, title });
}

function parseChoirTitle(video) {
  const parts = video.title.split(/[│ㅣ|]/).map((part) => part.trim()).filter(Boolean);
  const choir = parts.find((part) => ALLOWED_CHOIRS.has(part));
  const datePart = parts.find((part) => /^\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2}$/.test(part));
  if (!choir || !datePart) return null;

  const match = datePart.match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/);
  const date = `${match[1]}.${match[2].padStart(2, '0')}.${match[3].padStart(2, '0')}`;
  return { id: video.id, title: parts[0], choir, date };
}
