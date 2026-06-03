import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: '유치부 - 물댄동산교회' };

const PHOTOS = [
  { src: '/kindergarten/photo1.jpg', alt: '유치부 단체 사진' },
  { src: '/kindergarten/photo2.jpg', alt: '유치부 예배 모습' },
];

const GOALS = [
  '하나님께서 우리와 이 세상을 치료하시는 "여호와 라파" 하나님임을 믿어요.',
  '하나님께서 우리를 통해 이 세상을 치료하기를 원하세요.',
  '우리는 하나님 나라의 청지기로 이 세상을 치료하는 삶을 살아요.',
];

const TEACHERS = [
  '강은혜',
  '신은경',
  '전가희',
  '신정하',
  '신보식',
  '김단희',
  '정다운',
  '이숙희',
  '구혜경',
  '인선영',
  '조혜민',
  '송윤서',
];

const STAFF = [
  { role: '교장', name: '정종한 목사' },
  { role: '지도교역자', name: '김은순 전도사' },
  { role: '부장 / 부감', name: '정말심 권사 / 신유순 권사' },
];

export default function KindergartenPage() {
  return (
    <>
      <PageHeader
        pill="다음세대"
        title="유치부"
        subtitle="여호와 라파! 고쳐주세요!"
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 space-y-8">
          {/* 사진 갤러리 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {PHOTOS.map((p) => (
              <div
                key={p.src}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#e1e3e4] bg-[#edeeef] group"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>

          {/* 교육표어 */}
          <div className="bg-[#E0F5F0] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -bottom-12 -right-12 opacity-10 pointer-events-none">
              <span
                className="material-symbols-outlined text-[#006b5d]"
                style={{ fontSize: '240px', fontVariationSettings: "'FILL' 1" }}
              >
                child_care
              </span>
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[#006b5d] text-white rounded-full text-xs font-bold mb-4 font-['Manrope']">
                교육표어
              </span>
              <h2 className="font-['Manrope'] text-3xl md:text-[40px] font-extrabold text-[#006b5d] leading-tight mb-3 tracking-tight">
                &ldquo;여호와 라파! 고쳐주세요!&rdquo;
              </h2>
              <p className="text-sm md:text-base text-[#005045] font-semibold">
                출 15:26 · 사 53:4-5 · 살전 5:23
              </p>
            </div>
          </div>

          {/* 교육목표 */}
          <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="material-symbols-outlined text-[#0045bc]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                flag
              </span>
              <h3 className="font-['Manrope'] text-xl md:text-2xl font-bold text-[#191c1d]">
                교육목표
              </h3>
            </div>
            <ol className="space-y-3">
              {GOALS.map((g, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#dbe1ff] text-[#0045bc] font-extrabold font-['Manrope'] flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[#434655] text-base leading-relaxed">{g}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 주제말씀 + 교육목적 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 주제말씀 */}
            <div className="bg-[#FFF9E1] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#8f2f00]">menu_book</span>
                <span className="font-['Manrope'] text-xs font-bold text-[#8f2f00] uppercase tracking-wider">
                  주제말씀
                </span>
              </div>
              <p className="text-sm md:text-base text-[#191c1d] leading-relaxed italic mb-3">
                &ldquo;이르시되 너희가 너희 하나님 나 여호와의 말을 들어 순종하고 내가 보기에
                의를 행하며 내 계명에 귀를 기울이며 내 모든 규례를 지키면 내가 애굽 사람에게 내린
                모든 질병 중 하나도 너희에게 내리지 아니하리니 나는 너희를 치료하는
                여호와임이라&rdquo;
              </p>
              <p className="text-xs font-bold text-[#8f2f00] font-['Manrope']">— 출애굽기 15:26</p>
            </div>

            {/* 교육목적 */}
            <div className="bg-[#dbe1ff] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#0045bc]">target</span>
                <span className="font-['Manrope'] text-xs font-bold text-[#0045bc] uppercase tracking-wider">
                  교육목적
                </span>
              </div>
              <p className="text-sm font-semibold text-[#003da9] mb-2 font-['Manrope']">
                (하나님의 부르심)
              </p>
              <p className="text-sm md:text-base text-[#191c1d] leading-relaxed italic mb-3">
                &ldquo;평강의 하나님이 친히 너희를 온전히 거룩하게 하시고 또 너희의 온 영과 혼과
                몸이 우리 주 예수 그리스도께서 강림하실 때에 흠 없게 보전되기를 원하노라&rdquo;
              </p>
              <p className="text-xs font-bold text-[#0045bc] font-['Manrope']">
                — 데살로니가전서 5:23
              </p>
            </div>
          </div>

          {/* 예배시간 + 섬기는 분들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 예배시간 */}
            <div className="bg-[#ffdad6] rounded-2xl p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="material-symbols-outlined text-[#ba1a1a]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  schedule
                </span>
                <span className="font-['Manrope'] text-xs font-bold text-[#ba1a1a] uppercase tracking-wider">
                  예배시간
                </span>
              </div>
              <p className="font-['Manrope'] text-2xl md:text-3xl font-extrabold text-[#191c1d] tracking-tight">
                주일 오전 11:30
              </p>
              <p className="text-sm text-[#93000a] font-semibold mt-2">유치부실</p>
            </div>

            {/* 섬기는 분들 */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#e1e3e4] p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="material-symbols-outlined text-[#006b5d]">groups</span>
                <h3 className="font-['Manrope'] text-xl font-bold text-[#191c1d]">
                  섬기는 분들
                </h3>
              </div>
              <div className="space-y-3">
                {STAFF.map((s) => (
                  <div
                    key={s.role}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-3 border-b border-[#e1e3e4] last:border-b-0"
                  >
                    <span className="sm:w-32 text-xs font-bold text-[#006b5d] uppercase tracking-wider shrink-0">
                      {s.role}
                    </span>
                    <span className="text-sm md:text-base text-[#191c1d] font-semibold">
                      {s.name}
                    </span>
                  </div>
                ))}
                <div className="pt-1">
                  <div className="text-xs font-bold text-[#006b5d] uppercase tracking-wider mb-3">
                    교사
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TEACHERS.map((t) => (
                      <span
                        key={t}
                        className="inline-block bg-[#E0F5F0] text-[#005045] px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
