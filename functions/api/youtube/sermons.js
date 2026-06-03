/**
 * YouTube 재생목록 + Bolls.life Korean Bible API 통합
 *  - 영상 제목 패턴 "제목(본문구절)│교회│강사│YYYY.MM.DD" 파싱
 *  - 추출한 본문구절을 KRV(한글개역) 번역으로 자동 fetch
 *  - 15분 캐싱
 */

const PLAYLIST_ID = 'PLuyd60PWgGd2rEYGrUkFLffSaQZDjOd1H';

// 성경 책 이름 → Bolls book ID (1-66)
const BOOK_ID = {
  창세기: 1, 창: 1,
  출애굽기: 2, 출: 2,
  레위기: 3, 레: 3,
  민수기: 4, 민: 4,
  신명기: 5, 신: 5,
  여호수아: 6, 수: 6,
  사사기: 7, 삿: 7,
  룻기: 8, 룻: 8,
  사무엘상: 9, 삼상: 9,
  사무엘하: 10, 삼하: 10,
  열왕기상: 11, 왕상: 11,
  열왕기하: 12, 왕하: 12,
  역대상: 13, 대상: 13,
  역대하: 14, 대하: 14,
  에스라: 15, 스: 15,
  느헤미야: 16, 느: 16,
  에스더: 17, 에: 17,
  욥기: 18, 욥: 18,
  시편: 19, 시: 19,
  잠언: 20, 잠: 20,
  전도서: 21, 전: 21,
  아가: 22, 아: 22,
  이사야: 23, 사: 23,
  예레미야: 24, 렘: 24,
  예레미야애가: 25, 애: 25,
  에스겔: 26, 겔: 26,
  다니엘: 27, 단: 27,
  호세아: 28, 호: 28,
  요엘: 29, 욜: 29,
  아모스: 30, 암: 30,
  오바댜: 31, 옵: 31,
  요나: 32, 욘: 32,
  미가: 33, 미: 33,
  나훔: 34, 나: 34,
  하박국: 35, 합: 35,
  스바냐: 36, 습: 36,
  학개: 37, 학: 37,
  스가랴: 38, 슥: 38,
  말라기: 39, 말: 39,
  마태복음: 40, 마: 40,
  마가복음: 41, 막: 41,
  누가복음: 42, 눅: 42,
  요한복음: 43, 요: 43,
  사도행전: 44, 행: 44,
  로마서: 45, 롬: 45,
  고린도전서: 46, 고전: 46,
  고린도후서: 47, 고후: 47,
  갈라디아서: 48, 갈: 48,
  에베소서: 49, 엡: 49,
  빌립보서: 50, 빌: 50,
  골로새서: 51, 골: 51,
  데살로니가전서: 52, 살전: 52,
  데살로니가후서: 53, 살후: 53,
  디모데전서: 54, 딤전: 54,
  디모데후서: 55, 딤후: 55,
  디도서: 56, 딛: 56,
  빌레몬서: 57, 몬: 57,
  히브리서: 58, 히: 58,
  야고보서: 59, 약: 59,
  베드로전서: 60, 벧전: 60,
  베드로후서: 61, 벧후: 61,
  요한1서: 62, 요일: 62, 요한일서: 62,
  요한2서: 63, 요이: 63, 요한이서: 63,
  요한3서: 64, 요삼: 64, 요한삼서: 64,
  유다서: 65, 유: 65,
  요한계시록: 66, 계: 66,
};

const ID_TO_FULL_NAME = {
  1: '창세기', 2: '출애굽기', 3: '레위기', 4: '민수기', 5: '신명기',
  6: '여호수아', 7: '사사기', 8: '룻기', 9: '사무엘상', 10: '사무엘하',
  11: '열왕기상', 12: '열왕기하', 13: '역대상', 14: '역대하', 15: '에스라',
  16: '느헤미야', 17: '에스더', 18: '욥기', 19: '시편', 20: '잠언',
  21: '전도서', 22: '아가', 23: '이사야', 24: '예레미야', 25: '예레미야애가',
  26: '에스겔', 27: '다니엘', 28: '호세아', 29: '요엘', 30: '아모스',
  31: '오바댜', 32: '요나', 33: '미가', 34: '나훔', 35: '하박국',
  36: '스바냐', 37: '학개', 38: '스가랴', 39: '말라기',
  40: '마태복음', 41: '마가복음', 42: '누가복음', 43: '요한복음', 44: '사도행전',
  45: '로마서', 46: '고린도전서', 47: '고린도후서', 48: '갈라디아서', 49: '에베소서',
  50: '빌립보서', 51: '골로새서', 52: '데살로니가전서', 53: '데살로니가후서',
  54: '디모데전서', 55: '디모데후서', 56: '디도서', 57: '빌레몬서', 58: '히브리서',
  59: '야고보서', 60: '베드로전서', 61: '베드로후서', 62: '요한1서',
  63: '요한2서', 64: '요한3서', 65: '유다서', 66: '요한계시록',
};

export async function onRequestGet() {
  try {
    const sermons = await fetchPlaylist();
    const top4 = sermons.slice(0, 4);
    const enriched = await Promise.all(top4.map(enrich));

    return Response.json(
      { sermons: enriched, configured: true },
      {
        headers: {
          'Cache-Control': 'public, max-age=900, s-maxage=900',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return Response.json(
      { sermons: [], configured: false, error: String(err) },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
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
  const html = await res.text();

  const marker = 'ytInitialData = ';
  const start = html.indexOf(marker);
  if (start < 0) throw new Error('ytInitialData not found');

  let i = start + marker.length;
  let depth = 0, inStr = false, esc = false, end = -1;
  for (; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === '{') { depth++; continue; }
    if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  if (end < 0) throw new Error('JSON end not found');

  const data = JSON.parse(html.substring(start + marker.length, end));
  const videos = [];
  walk(data, videos);

  const sermons = videos
    .map((v) => ({ id: v.id, rawTitle: v.title, ...parseSermonTitle(v.title) }))
    .filter((s) => s.verse && s.date);

  sermons.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return sermons;
}

function walk(obj, out) {
  if (!obj || typeof obj !== 'object') return;
  if (obj.playlistVideoRenderer) {
    const v = obj.playlistVideoRenderer;
    const title = (v.title && (v.title.runs?.[0]?.text || v.title.simpleText)) || '';
    const id = v.videoId || '';
    if (id && title) out.push({ id, title });
  }
  for (const k of Object.keys(obj)) walk(obj[k], out);
}

function parseSermonTitle(title) {
  const parts = title.split(/[│ㅣ|]/).map((s) => s.trim()).filter(Boolean);
  let titleText = parts[0] || '';
  let verse = '';
  const verseMatch = titleText.match(/[(\[]([^)\]]+)[)\]]\s*$/);
  if (verseMatch) {
    verse = verseMatch[1].trim();
    titleText = titleText.substring(0, verseMatch.index).trim();
  }
  let pastor = '', date = '', series = '';
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    if (p.includes('목사') || p.includes('전도사')) {
      pastor = p;
    } else {
      const dm = p.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
      if (dm) {
        date = `${dm[1]}.${String(dm[2]).padStart(2, '0')}.${String(dm[3]).padStart(2, '0')}`;
        const rest = p.substring((dm.index || 0) + dm[0].length).replace(/^[.\s]+/, '').trim();
        if (rest) series = rest;
      }
    }
  }
  return { title: titleText, verse, pastor, date, series };
}

function parseVerseRef(ref) {
  if (!ref) return null;
  // "히 1:1-3", "마태복음 3:1-3", "히브리서 1:1"
  const m = ref.match(/^([가-힣\d]+)\s*(\d+):(\d+)(?:\s*[-~]\s*(\d+))?/);
  if (!m) return null;
  const book = BOOK_ID[m[1]];
  if (!book) return null;
  const chapter = parseInt(m[2], 10);
  const from = parseInt(m[3], 10);
  const to = m[4] ? parseInt(m[4], 10) : from;
  return { book, chapter, from, to };
}

async function fetchVerseText(verse) {
  const parsed = parseVerseRef(verse);
  if (!parsed) return { verses: [], display: verse };
  const display = `${ID_TO_FULL_NAME[parsed.book]} ${parsed.chapter}:${parsed.from}${parsed.to !== parsed.from ? `-${parsed.to}` : ''}`;
  try {
    const res = await fetch(
      `https://bolls.life/get-text/KRV/${parsed.book}/${parsed.chapter}/`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (!res.ok) return { verses: [], display };
    const all = await res.json();
    const target = all
      .filter((v) => v.verse >= parsed.from && v.verse <= parsed.to)
      .map((v) => ({
        verse: v.verse,
        text: String(v.text || '').replace(/<[^>]+>/g, '').trim(),
      }));
    return { verses: target, display };
  } catch {
    return { verses: [], display };
  }
}

async function enrich(sermon) {
  const { verses, display } = await fetchVerseText(sermon.verse);
  return {
    ...sermon,
    verses,
    verseDisplay: display,
    // 호환용: 합쳐진 텍스트
    verseText: verses.map((v) => v.text).join(' '),
  };
}
