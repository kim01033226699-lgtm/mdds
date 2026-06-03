'use client';

import { useEffect, useState } from 'react';

type VerseLine = { verse: number; text: string };
type Sermon = {
  id: string;
  verse: string;
  verseDisplay?: string;
  verses?: VerseLine[];
  verseText?: string;
  date?: string;
};

const FALLBACK: Sermon[] = [
  {
    id: '32XoOSfxhpg',
    verse: '히 1:1-3',
    verseDisplay: '히브리서 1:1-3',
    verses: [
      {
        verse: 1,
        text: '옛적에 선지자들로 여러 부분과 여러 모양으로 우리 조상들에게 말씀하신 하나님이',
      },
      {
        verse: 2,
        text: '이 모든 날 마지막에 아들로 우리에게 말씀하셨으니 이 아들을 만유의 후사로 세우시고 또 저로 말미암아 모든 세계를 지으셨느니라',
      },
      {
        verse: 3,
        text: '이는 하나님의 영광의 광채시요 그 본체의 형상이시라 그의 능력의 말씀으로 만물을 붙드시며 죄를 정결케 하는 일을 하시고 높은 곳에 계신 위엄의 우편에 앉으셨느니라',
      },
    ],
    date: '2026.05.31',
  },
  {
    id: 'uct4XofUC44',
    verse: '욜 2:28-32',
    verseDisplay: '요엘 2:28-32',
    verses: [
      {
        verse: 28,
        text: '그 후에 내가 내 신을 만민에게 부어 주리니 너희 자녀들이 장래 일을 말할 것이며 너희 늙은이는 꿈을 꾸며 너희 젊은이는 이상을 볼 것이며',
      },
      { verse: 29, text: '그 때에 내가 또 내 신으로 남종과 여종에게 부어 줄 것이며' },
      { verse: 30, text: '내가 이적을 하늘과 땅에 베풀리니 곧 피와 불과 연기 기둥이라' },
      {
        verse: 31,
        text: '여호와의 크고 두려운 날이 이르기 전에 해가 어두워지고 달이 핏빛 같이 변하려니와',
      },
      {
        verse: 32,
        text: '누구든지 여호와의 이름을 부르는 자는 구원을 얻으리니 이는 나 여호와의 말대로 시온산과 예루살렘에서 피할 자가 있을 것임이요 남은 자 중에 나 여호와의 부름을 받을 자가 있을 것임이니라',
      },
    ],
    date: '2026.05.24',
  },
  {
    id: 'qaDk6yLjjYQ',
    verse: '딤후 2:1-2',
    verseDisplay: '디모데후서 2:1-2',
    verses: [
      { verse: 1, text: '내 아들아 그러므로 네가 그리스도 예수 안에 있는 은혜 속에서 강하고' },
      {
        verse: 2,
        text: '또 네가 많은 증인 앞에서 내게 들은 바를 충성된 사람들에게 부탁하라 저희가 또 다른 사람들을 가르칠수 있으리라',
      },
    ],
    date: '2026.05.17',
  },
  {
    id: 'R3jHauwTVLk',
    verse: '갈 4:4-7',
    verseDisplay: '갈라디아서 4:4-7',
    verses: [
      {
        verse: 4,
        text: '때가 차매 하나님이 그 아들을 보내사 여자에게서 나게 하시고 율법 아래 나게 하신 것은',
      },
      {
        verse: 5,
        text: '율법 아래 있는 자들을 속량하시고 우리로 아들의 명분을 얻게 하려 하심이라',
      },
      {
        verse: 6,
        text: '너희가 아들인고로 하나님이 그 아들의 영을 우리 마음 가운데 보내사 아바 아버지라 부르게 하셨느니라',
      },
      {
        verse: 7,
        text: '그러므로 네가 이 후로는 종이 아니요 아들이니 아들이면 하나님으로 말미암아 유업을 이을 자니라',
      },
    ],
    date: '2025.12.14',
  },
];

const THEMES = [
  { bg: 'bg-[#dbe1ff]', label: 'text-[#0045bc]', body: 'text-[#003da9]', accent: '#0045bc' },
  { bg: 'bg-[#E0F5F0]', label: 'text-[#006b5d]', body: 'text-[#005045]', accent: '#006b5d' },
  { bg: 'bg-[#FFF9E1]', label: 'text-[#8f2f00]', body: 'text-[#802a00]', accent: '#8f2f00' },
  { bg: 'bg-[#ffdad6]', label: 'text-[#ba1a1a]', body: 'text-[#93000a]', accent: '#ba1a1a' },
];

const AUTO_SLIDE_MS = 6000;

export default function LatestSermonCards() {
  const [sermons, setSermons] = useState<Sermon[]>(FALLBACK);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/youtube/sermons')
      .then((r) => r.json())
      .then((d: { sermons?: Sermon[] }) => {
        if (alive && d.sermons && d.sermons.length > 0) {
          setSermons(d.sermons.slice(0, 4));
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (paused || sermons.length <= 1) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % sermons.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, sermons.length]);

  return (
    <section className="pt-8 md:pt-20 max-w-[1200px] mx-auto px-5 md:px-6">
      {/* Carousel */}
      <div
        className="relative overflow-hidden rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {sermons.map((s, i) => {
            const t = THEMES[i % THEMES.length];
            return (
              <div key={s.id || i} className="w-full shrink-0">
                <div className={`${t.bg} rounded-3xl p-8 md:p-14 lg:p-16 relative overflow-hidden min-h-[300px] md:min-h-[360px]`}>
                  <div className="absolute -bottom-12 -right-12 opacity-[0.08] pointer-events-none">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '320px', color: t.accent, fontVariationSettings: "'FILL' 1" }}
                    >
                      menu_book
                    </span>
                  </div>
                  <div className="relative z-10 max-w-3xl mx-auto text-center md:text-left">
                    <span
                      className={`font-['Manrope'] inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-sm font-bold mb-6 ${t.label}`}
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        menu_book
                      </span>
                      {s.verseDisplay || s.verse}
                    </span>
                    {s.verses && s.verses.length > 0 ? (
                      <ol className={`space-y-3 ${t.body}`}>
                        {s.verses.map((v) => (
                          <li
                            key={v.verse}
                            className="flex gap-3 items-baseline font-['Manrope'] text-base md:text-lg lg:text-xl leading-relaxed font-medium"
                          >
                            <span
                              className={`shrink-0 font-extrabold tabular-nums ${t.label}`}
                              style={{ minWidth: '1.5em' }}
                            >
                              {v.verse}.
                            </span>
                            <span>{v.text}</span>
                          </li>
                        ))}
                      </ol>
                    ) : s.verseText ? (
                      <blockquote
                        className={`font-['Manrope'] text-lg md:text-2xl lg:text-[26px] leading-relaxed font-medium ${t.body}`}
                      >
                        &ldquo;{s.verseText}&rdquo;
                      </blockquote>
                    ) : (
                      <p className={`${t.body} text-base`}>본문 구절을 불러오는 중입니다…</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        {sermons.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {sermons.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}번째 슬라이드`}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? 'w-8 bg-[#0045bc]' : 'w-2 bg-[#0045bc]/30 hover:bg-[#0045bc]/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
