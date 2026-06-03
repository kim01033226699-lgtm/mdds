/**
 * Drive 미설정 환경에서 표시할 샘플 데이터
 * mdds/public/samples 의 실제 자료(주보·행사·선교 등)를 활용
 */

export type SampleFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  /** 로컬 public 경로 (예: /samples/2026-05-31-1.jpg) */
  localSrc?: string;
  /** 클릭 시 열 링크 (없으면 localSrc) */
  webViewLink?: string;
};

export type SampleAlbum = {
  id: string;
  name: string;
  modifiedTime: string;
  coverSrc: string;
  photoCount: number;
  /** 앨범 클릭 시 보여줄 사진 목록 (로컬) */
  photos: SampleFile[];
};

const S = '/samples';

// --- 게시판별 파일 샘플 ---
export const FILE_SAMPLES: Record<string, SampleFile[]> = {
  news: [
    {
      id: 'sample-news-1',
      name: '물댄동산교회 항존직 선거 공고',
      mimeType: 'image/jpeg',
      modifiedTime: '2026-05-15T10:00:00Z',
      localSrc: `${S}/물댄동산교회 항존직 선거 공고-1.jpg`,
    },
  ],

  bulletin: [
    {
      id: 'sample-bulletin-2026-05-31',
      name: '2026년 5월 31일 주보',
      mimeType: 'image/jpeg',
      modifiedTime: '2026-05-31T08:00:00Z',
      localSrc: `${S}/2026-05-31-1.jpg`,
    },
    {
      id: 'sample-bulletin-2026-05-24',
      name: '2026년 5월 24일 주보',
      mimeType: 'image/jpeg',
      modifiedTime: '2026-05-24T08:00:00Z',
      localSrc: `${S}/2026-05-24-1.jpg`,
    },
  ],

  events: [
    {
      id: 'sample-event-onsedae',
      name: '온세대통합예배 (2026.05.31)',
      mimeType: 'image/jpeg',
      modifiedTime: '2026-05-31T10:00:00Z',
      localSrc: `${S}/온세대통합예배1-2026-05-31.jpg`,
    },
  ],

  newfamily: [
    {
      id: 'sample-newfamily-2026-05-31',
      name: '2026년 5월 31일 새가족 환영',
      mimeType: 'image/jpeg',
      modifiedTime: '2026-05-31T10:00:00Z',
      localSrc: `${S}/새가족-2026-05-31-1.jpg`,
    },
  ],

  missionary: [
    {
      id: 'sample-mission-ukraine-kim-1',
      name: '우크라이나 김요한 선교사 소식지 (2025.12.14) - 1',
      mimeType: 'image/jpeg',
      modifiedTime: '2025-12-14T10:00:00Z',
      localSrc: `${S}/우크라이나-김요한 선교사(2025.12.14)1.jpg`,
    },
    {
      id: 'sample-mission-ukraine-kim-2',
      name: '우크라이나 김요한 선교사 소식지 (2025.12.14) - 2',
      mimeType: 'image/jpeg',
      modifiedTime: '2025-12-14T10:00:00Z',
      localSrc: `${S}/우크라이나-김요한 선교사(2025.12.14)2.jpg`,
    },
    {
      id: 'sample-mission-ukraine-kim-3',
      name: '우크라이나 김요한 선교사 소식지 (2025.12.14) - 3',
      mimeType: 'image/jpeg',
      modifiedTime: '2025-12-14T10:00:00Z',
      localSrc: `${S}/우크라이나-김요한 선교사(2025.12.14)3.jpg`,
    },
    {
      id: 'sample-mission-pakistan-heo-1',
      name: '파키스탄 허덕영 선교사 소식지 (2026.1.20) - 1',
      mimeType: 'image/png',
      modifiedTime: '2026-01-20T10:00:00Z',
      localSrc: `${S}/파키스탄-허덕영 선교사(2026.1.20)1.png`,
    },
    {
      id: 'sample-mission-pakistan-heo-2',
      name: '파키스탄 허덕영 선교사 소식지 (2026.1.20) - 2',
      mimeType: 'image/png',
      modifiedTime: '2026-01-20T10:00:00Z',
      localSrc: `${S}/파키스탄-허덕영 선교사(2026.1.20)2.png`,
    },
    {
      id: 'sample-mission-pakistan-heo-3',
      name: '파키스탄 허덕영 선교사 소식지 (2026.1.20) - 3',
      mimeType: 'image/png',
      modifiedTime: '2026-01-20T10:00:00Z',
      localSrc: `${S}/파키스탄-허덕영 선교사(2026.1.20)3.png`,
    },
  ],
};

// --- 앨범 게시판 샘플 ---
const ONSEDAE_PHOTOS: SampleFile[] = [1, 2, 3, 4].map((n) => ({
  id: `sample-onsedae-${n}`,
  name: `온세대통합예배 ${n}`,
  mimeType: 'image/jpeg',
  modifiedTime: '2026-05-31T10:00:00Z',
  localSrc: `${S}/온세대통합예배${n}-2026-05-31.jpg`,
}));

export const ALBUM_SAMPLES: Record<string, SampleAlbum[]> = {
  album: [
    {
      id: 'sample-album-onsedae-2026-05-31',
      name: '온세대통합예배 (2026.05.31)',
      modifiedTime: '2026-05-31T10:00:00Z',
      coverSrc: `${S}/온세대통합예배1-2026-05-31.jpg`,
      photoCount: ONSEDAE_PHOTOS.length,
      photos: ONSEDAE_PHOTOS,
    },
  ],
};
