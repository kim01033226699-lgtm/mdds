import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: '시온찬양대 - 물댄동산교회' };

const PLAYLIST_ID = 'PLuyd60PWgGd0ELm4cbBubqZHCeHRkvN-Y';

const RECENT_VIDEOS = [
  { id: 'Hj7mRAfG8YU', title: '오 고귀하고 찬란한', date: '2025.12.14' },
  { id: '1VWjG3t5vxQ', title: '주가 오신 이유', date: '2025.12.07' },
  { id: 'fZ5Seqg43vI', title: '곧 오소서 임마누엘', date: '2025.11.30' },
  { id: 'TvCFW9mfSh8', title: '인도하심', date: '2025.11.23' },
  { id: 'FYX5XDfLFJg', title: '감사찬송', date: '2025.11.16' },
];

export default function ZionChoirPage() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 space-y-5">
        {/* Hero */}
        <section className="relative h-[320px] overflow-hidden rounded-xl border border-[#c2c6d4]">
          <Image
            src="/zion.png"
            alt="시온찬양대"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-[#0b1c30]/35 to-[#0b1c30]/10 flex flex-col justify-end p-8 md:p-10">
            <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#a8c8ff] uppercase mb-2 block">
              Zion Choir
            </span>
            <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-[40px] leading-[1.1] font-bold text-[#f8f9ff] mb-2 tracking-tight">
              시온찬양대
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#d3e4fe] max-w-2xl">
              찬양으로 하나님께 영광을 돌립니다.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-5">
          {/* 영상 플레이어 (8 col) */}
          <div className="col-span-4 md:col-span-8 bg-white border border-[#c2c6d4] rounded-xl overflow-hidden">
            <div className="aspect-video bg-[#0b1c30]">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`}
                title="시온찬양대 재생목록"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 md:p-8 border-t border-[#c2c6d4]">
              <div className="flex items-center gap-2 mb-3 text-[#00488d]">
                <span className="material-symbols-outlined">play_circle</span>
                <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider uppercase">
                  Now Playing
                </span>
              </div>
              <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#0b1c30] mb-2 tracking-tight">
                시온찬양대 찬양 영상
              </h2>
              <p className="text-sm text-[#424752] leading-relaxed">
                주일예배에서 드린 시온찬양대의 찬양이 순서대로 재생됩니다.
                플레이어 우측 상단의 목록 아이콘으로 회차를 선택할 수 있습니다.
              </p>
            </div>
          </div>

          {/* 찬양대 소개 (4 col) */}
          <div className="col-span-4 md:col-span-4 bg-white border border-[#c2c6d4] p-6 md:p-8 rounded-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">groups</span>
              <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider uppercase">Choir</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#0b1c30] mb-3">
              시온찬양대 소개
            </h3>
            <p className="text-sm text-[#424752] leading-relaxed mb-5">
              시온찬양대는 매주 주일예배에서 하나님께 영광을 돌리는 찬양으로 섬기고 있습니다.
              하나님을 사랑하는 마음으로 노래하며 성도들과 함께 예배합니다.
            </p>
            <div className="border-t border-[#c2c6d4] pt-4 mb-5">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold">섬기는 예배</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00488d]">주일예배</span>
              </div>
            </div>

            <div className="border-t border-[#c2c6d4] pt-4 mb-5">
              <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#00488d] uppercase block mb-3">
                Recent Videos
              </span>
              <ul className="space-y-2">
                {RECENT_VIDEOS.map((v, idx) => (
                  <li key={v.id}>
                    <Link
                      href={`https://www.youtube.com/watch?v=${v.id}&list=${PLAYLIST_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline gap-2 text-sm text-[#0b1c30] hover:text-[#00488d] transition-colors group"
                    >
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#424752] tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 truncate group-hover:underline">{v.title}</span>
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#424752] shrink-0">{v.date}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full mt-auto py-2 border-2 border-[#00488d] text-[#00488d] font-semibold rounded text-sm hover:bg-[#00488d] hover:text-white transition-colors"
            >
              YouTube 전체 영상 보기
            </Link>
          </div>

          {/* 안내 카드 (4 col, primary blue) */}
          <div className="col-span-4 md:col-span-4 bg-[#00488d] text-white p-6 md:p-8 rounded-xl">
            <span className="material-symbols-outlined text-4xl mb-4">music_note</span>
            <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold mb-2">함께 찬양해요</h3>
            <p className="text-xs leading-relaxed opacity-90">
              하나님을 향한 마음으로 찬양하기 원하시는 모든 분들을 환영합니다.
              찬양대 사역에 동참하고 싶으시다면 언제든 문의해 주세요.
            </p>
          </div>

          {/* 관련 바로가기 (8 col, internal 2-grid) */}
          <div className="col-span-4 md:col-span-8">
            <div className="grid grid-cols-2 gap-3 md:gap-5 h-full">
              {[
                { icon: 'play_circle', label: '주일설교', desc: '담임목사 주일예배 영상', href: '/sunday-sermon' },
                { icon: 'music_note', label: '샤론찬양대', desc: '샤론찬양대 찬양 영상', href: '/sharon-choir' },
                { icon: 'church', label: '예배안내', desc: '예배 시간 안내', href: '/worship-guide' },
                { icon: 'description', label: '주보보기', desc: '이번주 주보 확인', href: '/bulletin' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white border border-[#c2c6d4] rounded-xl p-5 md:p-6 hover:border-[#00488d] hover:shadow-[0_4px_12px_rgba(0,72,141,0.08)] transition flex items-start gap-4"
                >
                  <span className="material-symbols-outlined text-2xl text-[#00488d] shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-['Hanken_Grotesk'] text-base font-semibold text-[#0b1c30] mb-1">{item.label}</h4>
                    <p className="text-xs text-[#424752] leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
