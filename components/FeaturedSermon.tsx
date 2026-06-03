'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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

export default function FeaturedSermon() {
  const [sermons, setSermons] = useState<Sermon[]>(FALLBACK);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

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

  const featured = sermons[featuredIdx];
  const past = sermons.filter((_, i) => i !== featuredIdx).slice(0, 4);

  if (!featured) return null;

  const selectSermon = (idx: number) => {
    setFeaturedIdx(idx);
    setPlaying(true);
  };

  return (
    <section id="sermon" className="py-6 md:py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
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

          {/* Sidebar: 지난 설교 (최대 4개) */}
          <aside className="lg:col-span-4 space-y-4">
            <h4 className="text-base md:text-lg font-bold border-b border-[#c3c6d7] pb-3">
              지난 설교
            </h4>
            <div className="space-y-2">
              {past.map((s) => {
                const trueIdx = sermons.findIndex((x) => x.id === s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSermon(trueIdx)}
                    className="w-full flex gap-3 md:gap-4 p-3 md:p-4 rounded-2xl hover:bg-[#f3f4f5] transition-colors group text-left"
                  >
                    <div className="w-20 h-14 md:w-24 md:h-16 bg-[#edeeef] rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={`https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
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
          </aside>
        </div>
      </div>
    </section>
  );
}
