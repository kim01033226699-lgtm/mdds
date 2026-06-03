import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: '주일설교 - 물댄동산교회' };

const PLAYLIST_ID = 'PLuyd60PWgGd2rEYGrUkFLffSaQZDjOd1H';

export default function SundaySermonPage() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <PageHeader
        pill="말씀과 찬양"
        title="주일설교"
        subtitle="담임목사의 주일예배 말씀을 영상으로 만나보세요."
      />
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-8 space-y-5">
        {/* Bento Grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-5">
          {/* 영상 플레이어 (12 col, 전체 폭) */}
          <div className="col-span-4 md:col-span-12 bg-white border border-[#c2c6d4] rounded-xl overflow-hidden">
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
          </div>

          {/* YouTube 채널 이동 버튼 — 영상 바로 아래 */}
          <div className="col-span-4 md:col-span-12 flex justify-center">
            <Link
              href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#00488d] text-[#00488d] font-semibold rounded-full text-sm hover:bg-[#00488d] hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
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
