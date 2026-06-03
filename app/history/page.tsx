'use client';

import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';

type Stat = { num: string; label: string };
type DetailSection = { heading?: string; items: string[] };
type Event = { date: string; title: string; sections?: DetailSection[] };
type YearGroup = { year: string; events: Event[] };

const DEFAULT_STATS: Stat[] = [
  { num: '1961', label: '설립년도' },
  { num: '500+', label: '등록교인' },
  { num: '15', label: '섬기는 분들' },
  { num: '10+', label: '선교지' },
];

const STAT_STYLES = [
  { bg: 'bg-[#dbe1ff]', fg: 'text-[#0045bc]', subFg: 'text-[#003da9]', icon: 'foundation' },
  { bg: 'bg-[#E0F5F0]', fg: 'text-[#006b5d]', subFg: 'text-[#005045]', icon: 'groups' },
  { bg: 'bg-[#FFF9E1]', fg: 'text-[#8f2f00]', subFg: 'text-[#802a00]', icon: 'volunteer_activism' },
  { bg: 'bg-[#ffdad6]', fg: 'text-[#ba1a1a]', subFg: 'text-[#93000a]', icon: 'public' },
];

const COLOR_THEMES = [
  { pill: 'bg-[#dbe1ff] text-[#0045bc]', year: 'text-[#0045bc]', bar: 'bg-[#0045bc]' },
  { pill: 'bg-[#E0F5F0] text-[#006b5d]', year: 'text-[#006b5d]', bar: 'bg-[#006b5d]' },
  { pill: 'bg-[#FFF9E1] text-[#8f2f00]', year: 'text-[#8f2f00]', bar: 'bg-[#8f2f00]' },
  { pill: 'bg-[#ffdad6] text-[#ba1a1a]', year: 'text-[#ba1a1a]', bar: 'bg-[#ba1a1a]' },
];

const colorForYear = (year: string) => COLOR_THEMES[Number(year) % COLOR_THEMES.length];

const DEFAULT_TIMELINE: YearGroup[] = [
  {
    year: '2025',
    events: [
      { date: '11월 1일~21일', title: '다니엘 기도회 참여(영상)' },
      { date: '9월 20일', title: '조이풀룻 연주회' },
      { date: '5월 25일~28일', title: '새 생명 초청잔치 및 부흥성회 (강사: 김화경 선교사)' },
      { date: '4월 1일', title: '벚꽃 음악회' },
      { date: '1월 6일~10일', title: '신년 특별 새벽기도회' },
      { date: '1월 5일', title: '송봉길 부목사 부임 (행정, 교구 담당)' },
    ],
  },
  {
    year: '2024',
    events: [
      { date: '12월 29일', title: '김호년 부목사 부임 (청년부, 교육부 담당)' },
      {
        date: '12월 1일',
        title: '은퇴 및 임직 감사예배',
        sections: [
          {
            heading: '은퇴',
            items: [
              '이지상 · 이성기 · 유전희 안수집사',
              '한명자 · 조경순 · 탁순자 · 강영란 · 신임순 · 원해숙 권사',
            ],
          },
          {
            heading: '임직',
            items: [
              '장로 · 김상수',
              '안수집사 · 손재화, 김병옥, 함규태',
              '권사 · 이성, 최성자, 김영숙a, 주은옥, 김순영, 이순분, 강미정, 김성아',
              '권사취임 · 김영미b',
            ],
          },
        ],
      },
      { date: '11월 1일~26일', title: '다니엘 기도회 참여(영상)' },
      { date: '5월 26일~29일', title: '새 생명 초청잔치 및 부흥성회 (강사: 김화경 선교사)' },
      { date: '3월 11일', title: '상상누리터 개소' },
      { date: '2월 4일', title: '구동표 청년부 교육 전도사 부임 (11.24. 사임)' },
      { date: '1월 8일~12일', title: '신년 특별 새벽기도회' },
      { date: '1월 8일', title: '전교인 공동체 성경읽기 시작' },
    ],
  },
  {
    year: '2023',
    events: [
      { date: '9월 17일', title: '정종한 목사 담임 목사로 부임' },
      { date: '5월 7일', title: '박혜진 청소년부 교육 목사 부임' },
      {
        date: '4월 3일~7일',
        title: '고난 주간 특별 새벽 기도회 (빛과 소금 교회 최삼경 원로목사 인도)',
      },
      { date: '4월 2일', title: '한명복 부목사 부임 (청년부, 찬양 담당)' },
      { date: '1월 2일~6일', title: '신년 특별 새벽 기도회' },
    ],
  },
  {
    year: '2022',
    events: [
      { date: '12월 24일', title: '교육부 성탄 축하 발표회 (유치부 주관)' },
      { date: '12월 4일', title: '김은순 유치부 교육전도사 부임' },
      { date: '5월 29일', title: '2453 전 가족 출석 주일' },
      { date: '5월 23일~25일', title: '부모와 자녀가 함께 하는 신앙 부흥회 (강사: 임우현 목사)' },
      { date: '4월 11일~15일', title: '고난주간 특별 새벽기도회' },
      { date: '1월 3일~7일', title: '신년특별새벽기도회' },
      { date: '1월 2일', title: '조지현 유치부 교육 전도사 부임 (11.27. 사임)' },
    ],
  },
  {
    year: '2021',
    events: [
      { date: '12월 31일', title: '박용규 청년부 준 전임전도사(찬양) 부임 (22.12.25. 사임)' },
      {
        date: '11월 14일',
        title: '은퇴 및 임직 감사 예배',
        sections: [
          {
            heading: '은퇴',
            items: ['윤종용 안수집사', '전영주 · 조정숙 권사'],
          },
          {
            heading: '임직',
            items: [
              '장로 · 김종인',
              '안수집사 · 안종림, 유전희, 최병규',
              '권사 · 이지영, 김순옥, 김미라, 원해숙, 김충숙, 이인경, 정복례',
            ],
          },
        ],
      },
      { date: '10월 17일', title: '창립 60주년 기념사진 전시' },
      { date: '7월 11일', title: '장규형 부목사 부임' },
      {
        date: '7월 4일~9월 19일',
        title: '항존직 피택자 교육',
        sections: [
          {
            items: [
              '장로 · 김종인',
              '안수집사 · 안종림, 유전희, 최병규',
              '권사 · 이지영, 김순옥, 김미라, 원해숙, 김충숙, 이인경, 정복례',
            ],
          },
        ],
      },
      {
        date: '6월 20일',
        title: '항존직 피택자',
        sections: [
          {
            items: [
              '장로 · 김종인',
              '안수집사 · 김학범, 조공동, 안종림, 유전희, 최병규, 김승준',
              '권사 · 이지영, 김순옥, 김미라, 원해숙, 김충숙, 박윤경, 이인경, 장정신, 정복례',
            ],
          },
        ],
      },
      { date: '5월 30일', title: '세대 통합 예배' },
      { date: '5월 23일~25일', title: '부모와 자녀가 함께하는 영상신앙부흥회' },
      { date: '5월 16일', title: '교사교육 영상세미나' },
      { date: '4월 28일', title: 'CTS 부흥어게인 랜선 찬양 기도회 참가' },
      { date: '3월 29일~4월 2일', title: '고난주간 특별새벽기도회' },
      { date: '3월 28일', title: '전세대 통합예배 시작' },
      { date: '2월 17일', title: '재의 수요일 예배' },
      { date: '2월 1일', title: '월삭새벽기도회 시작' },
      { date: '1월 31일', title: '구역장 영상세미나' },
      { date: '1월 4일~8일', title: '신년특별새벽기도회' },
    ],
  },
  {
    year: '2020',
    events: [
      {
        date: '12월 27일',
        title: '강희성 청소년부 교육 전도사 부임 (21.4.10 목사<백석교단> 안수, 23.1.1. 사임)',
      },
      {
        date: '12월 20일',
        title: '고성주 청년부 준 전임전도사(찬양) 부임 (21.4.10 목사<백석교단> 안수, 21.12.20. 사임)',
      },
      { date: '5월 31일', title: '2453 전교인 출석주일 시작' },
      { date: '3월 15일', title: '교회 홈페이지 개설 (www.mdds.or.kr)' },
    ],
  },
  {
    year: '2019',
    events: [
      { date: '12월 1일', title: '제 9대 담임목사 공인배 목사 부임 (23.2.26. 사임)' },
      { date: '6월 9일', title: '김유단 부목사 부임 (20.11.29. 사임)' },
      { date: '2월 17일', title: '정종한 부목사 부임 (21.6.27. 사임)' },
    ],
  },
  {
    year: '2018',
    events: [
      {
        date: '11월 25일',
        title: '추대 / 은퇴 / 임직 감사 예배',
        sections: [
          { heading: '추대', items: ['김광율 장로 (원로)'] },
          {
            heading: '은퇴',
            items: ['전 풍 안수집사', '김재심 · 양재화 · 이옥자 · 이경자 · 박정숙 권사'],
          },
          {
            heading: '임직',
            items: [
              '장로 · 김형곤',
              '안수집사 · 이성기, 이왕재, 윤종용',
              '권사 · 우재윤, 김현숙, 강영란, 임경자, 김향숙, 정은하, 신연순, 이명옥, 이서례, 조정숙, 유영자, 한정숙, 유효순',
            ],
          },
          {
            heading: '취임',
            items: ['안수집사 · 김상수', '권사 · 신임순'],
          },
        ],
      },
      { date: '4월 29일', title: '새 예배당 입당 감사예배' },
      { date: '1월 16일', title: '새 예배당 준공허가' },
    ],
  },
  {
    year: '2017',
    events: [
      {
        date: '12월',
        title:
          '별내면 청학리 414 주공프라자 제7층 701, 702호 1114.49㎡ 매매 / 청학리 353-1번지 청학주공아파트 711동 1104호 사택 매매',
      },
      { date: '5월 14일', title: '남양주 덕송2로 63 새 예배당 건축기공예배 (별내동)' },
      { date: '1월', title: '청학리 353-1번지 청학주공아파트 711동 1104호 사택 매입' },
    ],
  },
  {
    year: '2016',
    events: [
      { date: '12월 25일', title: '이호덕 부목사 부임 (18.12.30. 사임)' },
      { date: '8월', title: '별내동 812번지 종교부지 1,214.5㎡ 매입' },
    ],
  },
  {
    year: '2015',
    events: [{ date: '9월 7일', title: '광전리 237-15, 240, 241-1번지 전 3,922㎡ 매매' }],
  },
  {
    year: '2014',
    events: [{ date: '1월 24일', title: '광전리 창고 150평 건축' }],
  },
  {
    year: '2012',
    events: [{ date: '7월 6일', title: '별내면 청학리 414번지 주공프라자 701호 매입' }],
  },
  {
    year: '2011',
    events: [
      {
        date: '10월 23일',
        title: '임직',
        sections: [
          {
            items: [
              '안수집사 · 김신득, 안병욱, 김준, 이지상, 조영준, 홍성길, 안종하',
              '권사 · 탁순자, 변명숙, 김혜경, 이용화, 유숙자, 이경자, 정학례, 이순임, 김현경, 신유순',
            ],
          },
        ],
      },
      { date: '8월 26일', title: '별내면 264-0 종교부지 2,645㎡ 매입' },
      { date: '3월 3일', title: '김진호 목사 부임 (16.6.26. 사임)' },
    ],
  },
  {
    year: '2010',
    events: [
      { date: '12월 20일', title: '식당 확장 공사 / 찬양대실 공사' },
      { date: '11월 29일', title: '제 1차 필리핀 비전트립' },
    ],
  },
  {
    year: '2008',
    events: [
      { date: '11월 12일', title: '별내면 청학리 414 주공프라자 제7층 702호 1114.49㎡ 매입' },
      { date: '2월 14일', title: '조태훈 목사 부임 (11.2.6. 사임)' },
    ],
  },
  {
    year: '2006',
    events: [
      { date: '12월 10일', title: '청학리 예배당 이전 감사예배' },
      {
        date: '11월 12일',
        title: '취임',
        sections: [{ items: ['장로 · 이윤배'] }],
      },
      { date: '11월 6일', title: '청학리 성전 인테리어 공사' },
      { date: '10월 23일', title: '광전리 237-15, 240, 241-1번지 전 3,922㎡ 매입' },
      { date: '10월 10일', title: '청학리 교회 이전 계약' },
      {
        date: '5월 21일',
        title: '임직 · 취임',
        sections: [
          { heading: '임직', items: ['장로 · 이종학', '안수집사 · 전 풍'] },
          { heading: '취임', items: ['권사 · 조경순'] },
        ],
      },
    ],
  },
  {
    year: '2004',
    events: [
      {
        date: '11월 14일',
        title: '입당예배 · 정종락 목사 위임 (19.7.21. 사임) · 김유철 장로 원로 추대',
      },
      { date: '4월 11일', title: '전교인 기념식수' },
      { date: '2월 1일', title: '양동원 전도사 부임 (06.5.30 목사 안수, 08.2.7. 사임)' },
    ],
  },
  {
    year: '2003',
    events: [
      { date: '12월 17일', title: '새 예배당 입당' },
      { date: '4월 27일', title: '예배당 건축 기공예배' },
    ],
  },
  {
    year: '2002',
    events: [{ date: '8월 22일', title: '제 8대 정종락 목사 부임' }],
  },
  {
    year: '2001',
    events: [{ date: '10월 15일', title: '물댄동산교회로 교회명 변경' }],
  },
  {
    year: '2000',
    events: [{ date: '6월 2일', title: '제 7대 김성한 목사 부임' }],
  },
  {
    year: '1985',
    events: [{ date: '8월 5일', title: '제 6대 송창식 목사 부임' }],
  },
  {
    year: '1982',
    events: [{ date: '12월 12일', title: '제 5대 김정체 목사 부임' }],
  },
  {
    year: '1981',
    events: [{ date: '5월 22일', title: '예배당 준공식' }],
  },
  {
    year: '1976',
    events: [{ date: '7월 30일', title: '제 4대 김종호 목사 부임' }],
  },
  {
    year: '1975',
    events: [{ date: '9월', title: '제 3대 황종옥 전도사 부임' }],
  },
  {
    year: '1972',
    events: [
      { date: '7월 10일', title: '덕송교회로 교회명 변경' },
      { date: '7월 5일', title: '덕송교회 매입' },
    ],
  },
  {
    year: '1968',
    events: [{ date: '연중', title: '제 2대 이중기 전도사 부임' }],
  },
  {
    year: '1966',
    events: [{ date: '연중', title: '식송교회 창립' }],
  },
  {
    year: '1961',
    events: [
      { date: '10월 15일', title: '식송에서 박봉규 전도사 및 청년 3명과 가정예배로 시작' },
    ],
  },
];

type StatApi = { number?: string; num?: string; label?: string };

export default function HistoryPage() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [timeline, setTimeline] = useState<YearGroup[]>(DEFAULT_TIMELINE);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch('/api/contents/history');
        if (!r.ok) return;
        const d = await r.json();
        if (!alive) return;

        if (Array.isArray(d?.data?.stats) && d.data.stats.length > 0) {
          const next = (d.data.stats as StatApi[]).map((s) => ({
            num: String(s.number ?? s.num ?? ''),
            label: String(s.label ?? ''),
          }));
          if (next.length > 0) setStats(next);
        }

        if (Array.isArray(d?.data?.timeline)) {
          const valid = (d.data.timeline as YearGroup[]).filter(
            (g) =>
              g &&
              typeof g.year === 'string' &&
              Array.isArray(g.events) &&
              g.events.every(
                (e) =>
                  e &&
                  typeof e.date === 'string' &&
                  typeof e.title === 'string' &&
                  (e.sections === undefined ||
                    (Array.isArray(e.sections) &&
                      e.sections.every((s) => s && Array.isArray(s.items))))
              )
          );
          if (valid.length > 0) setTimeline(valid);
        }
      } catch {
        // 검증 실패/네트워크 오류 → default 데이터 유지
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <PageHeader
        pill="교회소개"
        title="교회발자취"
        subtitle="하나님의 은혜로 걸어온 우리 교회의 역사"
      />

      {/* Stats Pastel Cards */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => {
              const style = STAT_STYLES[i % STAT_STYLES.length];
              return (
                <div
                  key={s.label}
                  className={`${style.bg} rounded-3xl p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${style.fg} mb-3 block`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {style.icon}
                  </span>
                  <div
                    className={`font-['Manrope'] text-4xl md:text-5xl font-extrabold ${style.fg} mb-1 tracking-tight`}
                  >
                    {s.num}
                  </div>
                  <div className={`text-sm font-semibold ${style.subFg}`}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16 bg-[#f3f4f5]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="mb-8 md:mb-12">
            <h2 className="font-['Manrope'] text-2xl md:text-3xl font-extrabold text-[#191c1d] tracking-tight">
              연혁
            </h2>
            <div className="w-12 h-1 bg-[#0045bc] mt-3 rounded-full" />
          </div>

          <div className="space-y-10 md:space-y-12">
            {timeline.map((group) => {
              const theme = colorForYear(group.year);
              return (
                <div
                  key={group.year}
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8"
                >
                  {/* Year column */}
                  <div className="md:sticky md:top-24 md:self-start">
                    <div
                      className={`font-['Manrope'] text-3xl md:text-4xl font-extrabold ${theme.year} tracking-tight`}
                    >
                      {group.year}
                    </div>
                    <div className={`w-12 h-1 ${theme.bar} mt-2 rounded-full`} />
                  </div>

                  {/* Events column */}
                  <div className="space-y-3 md:space-y-4">
                    {group.events.map((e, idx) => (
                      <div
                        key={`${group.year}-${idx}-${e.date}`}
                        className="bg-white rounded-2xl border border-[#e1e3e4] p-5 md:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-wrap items-baseline gap-3 mb-2">
                          <span
                            className={`inline-block ${theme.pill} px-3 py-1 rounded-full text-xs font-bold shrink-0`}
                          >
                            {e.date}
                          </span>
                          <h3 className="font-['Manrope'] text-base md:text-lg font-bold text-[#191c1d] leading-snug">
                            {e.title}
                          </h3>
                        </div>

                        {e.sections && e.sections.length > 0 && (
                          <div className="mt-3 pl-4 border-l-2 border-[#e1e3e4] space-y-3">
                            {e.sections.map((s, si) => (
                              <div key={si}>
                                {s.heading && (
                                  <div className="text-xs font-bold text-[#0045bc] mb-1">
                                    {s.heading}
                                  </div>
                                )}
                                <ul className="text-sm text-[#434655] space-y-1">
                                  {s.items.map((item, ii) => (
                                    <li key={ii}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
