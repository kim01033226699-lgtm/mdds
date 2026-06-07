/**
 * 유튜브 채널 실시간 라이브 여부 판별 (API 키 불필요)
 *  - https://www.youtube.com/{handle}/live 페이지를 스크레이핑
 *  - 라이브 중이면 페이지에 "isLiveNow":true 와 watch?v= canonical 이 노출됨
 *  - 라이브가 아니면 /live 가 채널 페이지로 리다이렉트됨 (canonical=/channel/...)
 *  - 60초 캐싱 (라이브 시작/종료 반영 지연 최소화)
 *
 * 채널 핸들은 환경변수 YT_LIVE_HANDLE 로 덮어쓸 수 있음 (기본 @mdds)
 */

const DEFAULT_HANDLE = '@mdds';

export async function onRequestGet({ env }) {
  const handle = (env && env.YT_LIVE_HANDLE) || DEFAULT_HANDLE;
  try {
    const res = await fetch(`https://www.youtube.com/${handle}/live`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9',
      },
    });
    if (!res.ok) throw new Error(`YouTube HTTP ${res.status}`);
    const html = await res.text();

    const live = html.includes('"isLiveNow":true');

    // 라이브 중일 때만 watch?v= 영상ID 추출
    let videoId = null;
    if (live) {
      const canon = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{6,})"/);
      if (canon) {
        videoId = canon[1];
      } else {
        const vm = html.match(/"videoId":"([\w-]{6,})"/);
        if (vm) videoId = vm[1];
      }
    }

    const url = videoId
      ? `https://www.youtube.com/watch?v=${videoId}`
      : `https://www.youtube.com/${handle}/live`;

    return Response.json(
      { live, videoId, url, handle },
      {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=60',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return Response.json(
      { live: false, videoId: null, url: `https://www.youtube.com/${handle}/live`, error: String(err) },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
