import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: '주일설교 - 물댄동산교회' };

const PLAYLIST_ID = 'PLuyd60PWgGd2rEYGrUkFLffSaQZDjOd1H';

export default function SundaySermonPage() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 space-y-5">
        {/* Hero */}
        <section className="relative h-[320px] overflow-hidden rounded-xl border border-[#c2c6d4]">
          <Image
            src="/hero-01.jpg"
            alt="주일설교"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-[#0b1c30]/35 to-[#0b1c30]/10 flex flex-col justify-end p-8 md:p-10">
            <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#a8c8ff] uppercase mb-2 block">
              Sunday Sermon
            </span>
            <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-[40px] leading-[1.1] font-bold text-[#f8f9ff] mb-2 tracking-tight">
              주일설교
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#d3e4fe] max-w-2xl">
              담임목사의 주일예배 말씀을 영상으로 만나보세요.
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
                title="주일설교 재생목록"
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
                주일예배 설교 재생목록
              </h2>
              <p className="text-sm text-[#424752] leading-relaxed">
                매주 주일에 선포된 담임목사님의 말씀이 순서대로 재생됩니다.
                플레이어 우측 상단의 목록 아이콘으로 회차를 선택할 수 있습니다.
              </p>
            </div>
          </div>

          {/* 담임목사 카드 (4 col) */}
          <div className="col-span-4 md:col-span-4 bg-white border border-[#c2c6d4] p-6 md:p-8 rounded-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">person</span>
              <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider uppercase">Pastor</span>
            </div>
            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src="/pastor01.png"
                alt="정종한 담임목사"
                width={120}
                height={120}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#e5eeff] mb-4"
              />
              <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#0b1c30]">정종한 담임목사</h3>
              <p className="text-xs text-[#424752] mt-1">물댄동산교회</p>
            </div>
            <div className="space-y-3 border-t border-[#c2c6d4] pt-4 mb-6">
              <div className="flex justify-between items-end border-b border-[#c2c6d4] pb-2">
                <span className="text-sm font-semibold">주일 1부</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00488d]">오전 9시</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold">주일 2부</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00488d]">오전 11시</span>
              </div>
            </div>
            <Link
              href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full mt-auto py-2 border-2 border-[#00488d] text-[#00488d] font-semibold rounded text-sm hover:bg-[#00488d] hover:text-white transition-colors"
            >
              YouTube 채널 이동
            </Link>
          </div>

          {/* 안내 카드 (4 col, primary blue) */}
          <div className="col-span-4 md:col-span-4 bg-[#00488d] text-white p-6 md:p-8 rounded-xl">
            <span className="material-symbols-outlined text-4xl mb-4">menu_book</span>
            <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold mb-2">말씀으로 한 주를</h3>
            <p className="text-xs leading-relaxed opacity-90">
              놓치신 주일 말씀을 다시 듣고 싶으시거나, 함께하지 못한 분과 나누고 싶으시다면
              재생목록에서 원하는 회차를 자유롭게 선택해 들으실 수 있습니다.
            </p>
          </div>

          {/* 관련 바로가기 (8 col, internal 2-grid) */}
          <div className="col-span-4 md:col-span-8">
            <div className="grid grid-cols-2 gap-3 md:gap-5 h-full">
              {[
                { icon: 'description', label: '주보보기', desc: '이번주 주보 확인', href: '/bulletin' },
                { icon: 'campaign', label: '교회소식', desc: '이달의 소식과 행사', href: '/church-news-events' },
                { icon: 'church', label: '예배안내', desc: '예배 시간 안내', href: '/worship-guide' },
                { icon: 'music_note', label: '샤론찬양대', desc: '찬양 영상 모음', href: '/sharon-choir' },
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
