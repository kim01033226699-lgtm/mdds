import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ChoirVideos from '@/components/ChoirVideos';

export const metadata = { title: '샤론찬양대 - 물댄동산교회' };

const PLAYLIST_ID = 'PLuyd60PWgGd0ELm4cbBubqZHCeHRkvN-Y';

export default function SharonChoirPage() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <PageHeader
        pill="말씀과 찬양"
        title="샤론찬양대"
        subtitle="찬양으로 하나님께 영광을 돌립니다."
      />
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-8 space-y-5">
        {/* Bento Grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-5">
          {/* 영상 플레이어 (8 col) */}
          <div className="col-span-4 md:col-span-8 bg-white border border-[#c2c6d4] rounded-xl overflow-hidden">
            <ChoirVideos choir="샤론찬양대" mode="player" />
            <div className="p-6 md:p-8 border-t border-[#c2c6d4]">
              <div className="flex items-center gap-2 mb-3 text-[#00488d]">
                <span className="material-symbols-outlined">play_circle</span>
              </div>
              <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#0b1c30] mb-2 tracking-tight">
                샤론찬양대 찬양 영상
              </h2>
              <p className="text-sm text-[#424752] leading-relaxed">
                주일예배에서 드린 샤론찬양대의 최신 찬양을 재생합니다.
                다른 찬양은 최근 영상 목록에서 확인할 수 있습니다.
              </p>
            </div>
          </div>

          {/* 찬양대 소개 (4 col) */}
          <div className="col-span-4 md:col-span-4 bg-white border border-[#c2c6d4] p-6 md:p-8 rounded-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#0b1c30] mb-3">
              샤론찬양대 소개
            </h3>
            <p className="text-sm text-[#424752] leading-relaxed mb-5">
              샤론찬양대는 주일예배에서 찬양으로 하나님께 영광을 돌리는 사역을 감당하고 있습니다.
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
                최근 영상
              </span>
              <ChoirVideos choir="샤론찬양대" mode="list" />
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
                { icon: 'music_note', label: '시온찬양대', desc: '시온찬양대 소개', href: '/zion-choir' },
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
