'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type Sermon = {
  id: string;
  title?: string;
  verse?: string;
  verseDisplay?: string;
  pastor?: string;
  series?: string;
  date?: string;
  desc?: string;
};

const FALLBACK: Sermon[] = [
  {
    id: '32XoOSfxhpg',
    title: '말씀의 사람, 소명의 사람',
    verse: '히 1:1-3',
    verseDisplay: '히브리서 1:1-3',
    pastor: '신기원 목사',
    series: '온 세대 통합예배',
    date: '2026.05.31',
    desc: '우리는 말씀의 통로가 되어 하나님의 소명을 따라가는 사람들입니다.',
  },
  {
    id: 'uct4XofUC44',
    title: '내 영을 만민에게',
    verse: '욜 2:28-32',
    verseDisplay: '요엘 2:28-32',
    pastor: '정종한 목사',
    series: '주일 2부예배',
    date: '2026.05.24',
  },
  {
    id: 'qaDk6yLjjYQ',
    title: '참된 스승은',
    verse: '딤후 2:1-2',
    verseDisplay: '디모데후서 2:1-2',
    pastor: '정종한 목사',
    series: '주일 2부예배',
    date: '2026.05.17',
  },
  {
    id: 'R3jHauwTVLk',
    title: '때가 차매',
    verse: '갈 4:4-7',
    verseDisplay: '갈라디아서 4:4-7',
    pastor: '정종한 목사',
    date: '2025.12.14',
  },
  {
    id: 'pdf-DB3ibZs',
    title: '나의 입술 찬양',
    verse: '시 51:15',
    verseDisplay: '시편 51:15',
    pastor: '정종한 목사',
    date: '2025.11.30',
  },
];

// "2026.05.31" → { key: "2026.05", label: "2026년 5월" }
function monthOf(date?: string): { key: string; label: string } {
  if (!date) return { key: '기타', label: '기타' };
  const m = date.match(/(\d{4})[.\-/](\d{1,2})/);
  if (!m) return { key: '기타', label: '기타' };
  return { key: `${m[1]}.${m[2].padStart(2, '0')}`, label: `${m[1]}년 ${Number(m[2])}월` };
}

type MonthGroup = { key: string; label: string; items: Sermon[] };

export default function FeaturedSermon() {
  const [sermons, setSermons] = useState<Sermon[]>(FALLBACK);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [monthPage, setMonthPage] = useState(0);

  useEffect(() => {
    let alive = true;
    fetch('/api/youtube/sermons')
      .then((r) => r.json())
      .then((d: { sermons?: Sermon[] }) => {
        if (alive && d.sermons && d.sermons.length > 0) {
          setSermons(d.sermons);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // 설교를 월별로 묶음 (최신 월이 먼저)
  const months: MonthGroup[] = useMemo(() => {
    const map = new Map<string, MonthGroup>();
    for (const s of sermons) {
      const { key, label } = monthOf(s.date);
      if (!map.has(key)) map.set(key, { key, label, items: [] });
      map.get(key)!.items.push(s);
    }
    return Array.from(map.values()).sort((a, b) => b.key.localeCompare(a.key));
  }, [sermons]);

  const featured = sermons[featuredIdx];
  if (!featured) return null;

  const safePage = Math.min(monthPage, Math.max(0, months.length - 1));
  const currentMonth = months[safePage];

  const selectSermon = (idx: number) => {
    setFeaturedIdx(idx);
    setPlaying(true);
  };

  return (
    <section id="sermon" className="py-6 md:py-12 bg-white">
      <div className="max-w-[960px] mx-auto px-5 md:px-6">
        <div className="mb-8 md:mb-12">
          <span className="font-['Manrope'] text-xs md:text-sm font-bold text-[#0045bc] uppercase tracking-widest">
            주일 메시지
          </span>
          <h2 className="font-['Manrope'] text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            이번주 설교 영상
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Featured player */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-[#0b1c30]">
              {playing ? (
                <iframe
                  key={featured.id}
                  src={`https://www.youtube.com/embed/${featured.id}?autoplay=1&rel=0`}
                  title={featured.title || '설교 영상'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 w-full h-full"
                  aria-label="영상 재생"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`}
                    alt={featured.title || '설교 썸네일'}
                    fill
                    sizes="(min-width: 1024px) 800px, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                  <span className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center text-[#0045bc] shadow-xl group-hover:scale-110 transition-transform">
                      <span
                        className="material-symbols-outlined text-4xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </span>
                  </span>
                  <span className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#0045bc] text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wider">
                    NEW
                  </span>
                </button>
              )}
            </div>

            <div className="mt-6 md:mt-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[#434655] text-xs md:text-sm">
                {featured.date && (
                  <span className="bg-[#edeeef] px-3 py-1 rounded-md font-medium">
                    {featured.date}
                  </span>
                )}
                {(featured.verseDisplay || featured.verse) && (
                  <span>{featured.verseDisplay || featured.verse}</span>
                )}
                {featured.pastor && (
                  <>
                    <span className="w-1 h-1 bg-[#737686] rounded-full" />
                    <span>{featured.pastor}</span>
                  </>
                )}
              </div>
              {featured.title && (
                <h3 className="text-xl md:text-[28px] font-bold text-[#0045bc] leading-tight">
                  {featured.title}
                </h3>
              )}
              {featured.desc && (
                <p className="text-sm md:text-base text-[#434655] max-w-2xl leading-relaxed">
                  {featured.desc}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar: 최근 설교 말씀 (월별 목록 + 화살표 이동) */}
          <aside className="lg:col-span-4">
            <div className="bg-[#f8f9ff] rounded-3xl p-5 md:p-6 border border-[#e1e6ff]">
              {/* 헤더: 아이콘 + 제목 + 화살표 */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-10 h-10 rounded-xl bg-[#dbe1ff] inline-flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-[#0045bc] text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_stories
                    </span>
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base md:text-lg font-extrabold text-[#0b1c30] leading-tight truncate">
                      최근 설교 말씀
                    </h4>
                    {currentMonth && (
                      <p className="text-xs text-[#0045bc] font-semibold mt-0.5">{currentMonth.label}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setMonthPage((p) => Math.max(0, p - 1))}
                    disabled={safePage === 0}
                    aria-label="이전 달 설교"
                    className="w-9 h-9 rounded-full bg-white border border-[#c2c6d4] inline-flex items-center justify-center text-[#0045bc] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#eff4ff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMonthPage((p) => Math.min(months.length - 1, p + 1))}
                    disabled={safePage >= months.length - 1}
                    aria-label="다음 달 설교"
                    className="w-9 h-9 rounded-full bg-white border border-[#c2c6d4] inline-flex items-center justify-center text-[#0045bc] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#eff4ff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* 해당 월 설교 목록 */}
              <div className="space-y-2">
                {currentMonth?.items.map((s) => {
                  const trueIdx = sermons.findIndex((x) => x.id === s.id);
                  const isActive = trueIdx === featuredIdx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => selectSermon(trueIdx)}
                      className={`w-full flex gap-3 md:gap-4 p-3 rounded-2xl transition-colors group text-left ${
                        isActive ? 'bg-[#dbe1ff]' : 'bg-white hover:bg-[#eff4ff]'
                      }`}
                    >
                      <div className="w-24 h-16 bg-[#edeeef] rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={`https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[#0045bc] text-xs font-semibold mb-1">{s.date}</p>
                        <p className="text-xs md:text-sm font-semibold text-[#191c1d] line-clamp-2">
                          {s.title || '설교 영상'}
                          {(s.verseDisplay || s.verse) && (
                            <span className="text-[#737686] font-normal">
                              {' '}
                              ({s.verseDisplay || s.verse})
                            </span>
                          )}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 페이지네이션 점 (월) */}
              {months.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5">
                  {months.map((m, i) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setMonthPage(i)}
                      aria-label={`${m.label} 설교 보기`}
                      aria-current={i === safePage}
                      className={`h-2.5 rounded-full transition-all ${
                        i === safePage ? 'w-6 bg-[#0045bc]' : 'w-2.5 bg-[#c2c6d4] hover:bg-[#a8c8ff]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
