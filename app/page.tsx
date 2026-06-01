import Image from 'next/image';
import Link from 'next/link';
import KakaoMap from '@/components/KakaoMap';

const SERMON_PLAYLIST_ID = 'PLuyd60PWgGd2rEYGrUkFLffSaQZDjOd1H';

const LATEST_SERMONS = [
  {
    id: '32XoOSfxhpg',
    title: '말씀의 사람, 소명의 사람',
    verse: '히브리서 1:1-3 · 온 세대 통합예배',
    pastor: '신기원 목사',
    date: '2026.05.31',
  },
  {
    id: 'uct4XofUC44',
    title: '내 영을 만민에게 (욜 2:28-32)',
    verse: '요엘 2:28-32',
    pastor: '정종한 목사',
    date: '2026.05.24',
  },
  {
    id: 'qaDk6yLjjYQ',
    title: '참된 스승은 (딤후 2:1-2)',
    verse: '디모데후서 2:1-2',
    pastor: '정종한 목사',
    date: '2026.05.17',
  },
];

export default function Home() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 space-y-5">
        {/* Hero */}
        <section className="relative h-[500px] overflow-hidden rounded-xl border border-[#c2c6d4]">
          <Image
            src="/hero-01.jpg"
            alt="물댄동산교회 전경"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-[#0b1c30]/25 to-transparent flex flex-col justify-end p-8 md:p-10">
            <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-[40px] leading-[1.1] font-bold text-[#f8f9ff] mb-2 tracking-tight">
              새 일을 이루는 교회
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#d3e4fe] max-w-2xl">
              &ldquo;너희 안에서 착한 일을 시작하신 이가 그리스도 예수의 날까지 이루실 줄을 우리는 확신하노라&rdquo;
            </p>
            <span className="font-['JetBrains_Mono'] text-xs text-[#a8c8ff] mt-2">— 빌립보서 1:6</span>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-5">
          {/* 최신 설교 영상 (8 col) */}
          <div className="col-span-4 md:col-span-8 bg-white border border-[#c2c6d4] p-6 md:p-8 rounded-xl flex flex-col md:flex-row gap-6">
            {(() => {
              const featured = LATEST_SERMONS[0];
              return (
                <>
                  <a
                    href={`https://www.youtube.com/watch?v=${featured.id}&list=${SERMON_PLAYLIST_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:w-1/2 shrink-0 relative group block rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full aspect-video bg-[#0b1c30]">
                      <Image
                        src={`https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`}
                        alt={featured.title}
                        fill
                        sizes="(min-width: 768px) 480px, 100vw"
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-white text-6xl md:text-7xl drop-shadow-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_circle
                        </span>
                      </div>
                    </div>
                  </a>

                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#00488d] uppercase mb-1 block">
                      최신 설교 영상
                    </span>
                    <h2 className="font-['Hanken_Grotesk'] text-xl md:text-2xl font-semibold text-[#0b1c30] mb-3 tracking-tight">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-[#424752] mb-2">
                      <span className="font-['JetBrains_Mono'] text-xs text-[#00488d] tabular-nums mr-2">
                        {featured.date}
                      </span>
                      {featured.pastor}
                    </p>
                    <p className="text-xs text-[#424752] leading-relaxed mb-5">{featured.verse}</p>

                    <div className="border-t border-[#c2c6d4] pt-3 mb-3">
                      <span className="font-['JetBrains_Mono'] text-[10px] font-medium tracking-wider text-[#00488d] uppercase block mb-2">
                        지난 설교
                      </span>
                      <ul className="space-y-2">
                        {LATEST_SERMONS.slice(1).map((s) => (
                          <li key={s.id}>
                            <a
                              href={`https://www.youtube.com/watch?v=${s.id}&list=${SERMON_PLAYLIST_ID}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-baseline gap-2 text-xs text-[#0b1c30] hover:text-[#00488d] transition-colors group"
                            >
                              <span className="font-['JetBrains_Mono'] text-[10px] text-[#424752] tabular-nums shrink-0">
                                {s.date}
                              </span>
                              <span className="flex-1 truncate group-hover:underline">{s.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/sunday-sermon"
                      className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#00488d] hover:underline"
                    >
                      전체 설교 보기
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </>
              );
            })()}
          </div>

          {/* 예배안내 (4 col) */}
          <div className="col-span-4 md:col-span-4 bg-white border border-[#c2c6d4] p-6 md:p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">schedule</span>
              <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider uppercase">예배안내</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-[#c2c6d4] pb-2">
                <span className="text-base font-semibold">주일예배</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00488d]">오전 9시 &amp; 11시</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#c2c6d4] pb-2">
                <span className="text-base font-semibold">수요예배</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00488d]">오후 7시 30분</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-base font-semibold">금요기도회</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00488d]">오후 8시</span>
              </div>
            </div>
            <Link
              href="/worship-guide"
              className="block text-center w-full mt-8 py-2 border-2 border-[#00488d] text-[#00488d] font-semibold rounded text-sm hover:bg-[#00488d] hover:text-white transition-colors"
            >
              예배안내 자세히
            </Link>
          </div>

          {/* 비전 카드 (4 col, primary blue) */}
          <div className="col-span-4 md:col-span-4 bg-[#00488d] text-white p-6 md:p-8 rounded-xl">
            <span className="material-symbols-outlined text-4xl mb-4">diversity_3</span>
            <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold mb-2">공동체 안에서 자라는 교회</h3>
            <p className="text-xs leading-relaxed opacity-90">
              우리는 줄이 아닌 둘러앉은 자리에서 성장한다고 믿습니다.
              소그룹과 지역 섬김을 통해 깊고 지속적인 관계를 세워갑니다.
            </p>
          </div>

          {/* 오시는길 + 지도 (8 col) */}
          <div className="col-span-4 md:col-span-8 bg-white border border-[#c2c6d4] rounded-xl overflow-hidden flex flex-col md:flex-row">
            <div className="p-6 md:p-8 md:w-1/2">
              <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#00488d] uppercase mb-1 block">
                오시는 길
              </span>
              <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold mb-4 tracking-tight">교회로 오시는 길</h2>
              <p className="text-sm text-[#424752] mb-6 leading-relaxed">
                별가람역 인근에 위치한 물댄동산교회는 쉼과 영적 회복의 공간입니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#00488d] mt-1">location_on</span>
                  <div>
                    <p className="text-sm font-semibold">경기도 남양주시 덕송2로 63</p>
                    <p className="text-xs text-[#424752]">(별내동) 프라자빌딩 3, 4층 · 우 12097</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#00488d] mt-1">call</span>
                  <p className="text-sm text-[#424752]">031-553-0191 · FAX 031-572-9901</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#00488d] mt-1">directions_car</span>
                  <p className="text-xs text-[#424752]">교회 인근에 방문자 주차 공간이 마련되어 있습니다.</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 min-h-[360px] bg-[#dce9ff] flex items-center justify-center p-4 overflow-hidden">
              <KakaoMap />
            </div>
          </div>

          {/* 교회소식 (12 col) */}
          <div className="col-span-4 md:col-span-12 bg-white border border-[#c2c6d4] p-6 md:p-8 rounded-xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold tracking-tight">교회소식</h2>
              </div>
              <Link href="/church-news-events" className="font-['JetBrains_Mono'] text-xs text-[#00488d] font-semibold hover:underline">
                더보기 →
              </Link>
            </div>
            <ul>
              {[
                { tag: '공지', title: '주일예배 안내', date: '2026.04.16' },
                { tag: '행사', title: '부활절 감사예배', date: '2026.04.13' },
                { tag: '공지', title: '수요기도회 안내', date: '2026.04.09' },
                { tag: '소식', title: '교회학교 봄소풍', date: '2026.04.06' },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-[#c2c6d4] last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider px-2 py-0.5 bg-[#e5eeff] text-[#00488d] font-semibold rounded uppercase">
                      {item.tag}
                    </span>
                    <span className="text-sm text-[#0b1c30]">{item.title}</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#424752]">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 교회소개 4 카드 (12 col with internal grid) */}
          <div className="col-span-4 md:col-span-12">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold tracking-tight">물댄동산 교회는</h2>
              </div>
              <p className="hidden md:block text-sm text-[#424752]">하나님의 사랑 안에서 함께하는 교회입니다</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {[
                { icon: 'church', title: '우리의 예배', desc: '예배는 우리의 삶의 목적입니다.', href: '/worship-guide' },
                { icon: 'music_note', title: '말씀과 찬양', desc: '말씀과 찬양으로 함께 예배합니다.', href: '/sunday-sermon' },
                { icon: 'menu_book', title: '양육과 훈련', desc: '함께 성장하는 공동체입니다.', href: '/discipleship' },
                { icon: 'child_care', title: '다음세대', desc: '다음 세대를 양육합니다.', href: '/kindergarten' },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="block bg-white border border-[#c2c6d4] rounded-xl p-6 hover:border-[#00488d] hover:shadow-[0_4px_12px_rgba(0,72,141,0.08)] transition"
                >
                  <span className="material-symbols-outlined text-3xl text-[#00488d] mb-4 block">{card.icon}</span>
                  <h3 className="font-['Hanken_Grotesk'] text-base font-semibold text-[#0b1c30] mb-2">{card.title}</h3>
                  <p className="text-xs text-[#424752] leading-relaxed">{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* 새가족 안내 (12 col, dark accent) */}
          <div className="col-span-4 md:col-span-12 bg-[#0b1c30] text-white p-8 md:p-10 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold mb-2 tracking-tight">처음 오셨나요?</h2>
              <p className="text-sm text-[#c2c6d4]">물댄동산교회는 여러분을 환영합니다</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { num: '1', title: '등록카드 작성', desc: '안내데스크에서 등록' },
                { num: '2', title: '예배 참석', desc: '주일예배에 함께' },
                { num: '3', title: '담임목사 면담', desc: '예배 후 만남의 시간' },
                { num: '4', title: '새가족 교육', desc: '4주 새가족반 교육' },
                { num: '5', title: '새가족 심방', desc: '가정 방문 및 교제' },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-[#00488d] flex items-center justify-center mx-auto mb-3 font-['Hanken_Grotesk'] text-xl font-bold">
                    {step.num}
                  </div>
                  <h5 className="text-sm font-semibold mb-1">{step.title}</h5>
                  <p className="text-xs text-[#a8c8ff]">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/discipleship#new-family"
                className="inline-block px-8 py-3 bg-white text-[#00488d] rounded text-sm font-semibold hover:bg-[#d6e3ff] transition"
              >
                새가족 안내 보기
              </Link>
            </div>
          </div>

          {/* 바로가기 (12 col with internal grid) */}
          <div className="col-span-4 md:col-span-12">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold tracking-tight">바로가기</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {[
                { icon: 'play_circle', label: '주일설교', href: '/sunday-sermon' },
                { icon: 'description', label: '주보보기', href: '/bulletin' },
                { icon: 'campaign', label: '교회소식', href: '/church-news-events' },
                { icon: 'place', label: '오시는길', href: '/directions' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white border border-[#c2c6d4] rounded-xl p-6 text-center hover:border-[#00488d] hover:shadow-[0_4px_12px_rgba(0,72,141,0.08)] transition flex flex-col items-center gap-2"
                >
                  <span className="material-symbols-outlined text-3xl text-[#00488d]">{item.icon}</span>
                  <span className="text-sm font-semibold text-[#0b1c30]">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
