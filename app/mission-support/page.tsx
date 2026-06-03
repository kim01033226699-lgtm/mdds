import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: '선교후원 및 기관 - 물댄동산교회' };

type Mission = {
  country: string;
  name: string;
  /** Approximate x position (%) on the equirectangular world map */
  x: number;
  /** Approximate y position (%) on the world map */
  y: number;
};

const OVERSEAS: Mission[] = [
  { country: '인도', name: '이영미 선교사', x: 65, y: 46 },
  { country: '우크라이나', name: '김요한 선교사', x: 56, y: 28 },
  { country: '캄보디아', name: '이훈 선교사', x: 74, y: 49 },
  { country: '파키스탄', name: '허덕영 선교사', x: 63, y: 40 },
];

const DOMESTIC = [
  '덕송초등학교',
  '화현주사랑교회',
  '사랑의 편지',
  '예사랑제일교회',
  '좌포은총교회',
  '햇살보금자리',
];

export default function MissionSupportPage() {
  return (
    <>
      <PageHeader
        pill="선교후원"
        title="선교후원 및 기관"
        subtitle="물댄동산교회 선교후원 및 후원선교 기관을 안내합니다."
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 space-y-8">
          {/* 세계지도 카드 */}
          <div className="bg-gradient-to-br from-[#5d7e92] to-[#3d5e72] rounded-3xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
            {/* 패턴 데코 */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '14px 14px',
              }}
            />

            {/* 헤더 */}
            <div className="relative z-10 text-center mb-6 md:mb-8">
              <h2 className="font-['Manrope'] text-3xl md:text-[40px] font-extrabold text-white tracking-tight mb-2">
                선교안내
              </h2>
              <p className="text-sm md:text-base text-white/85">
                물댄동산교회 선교후원 및 후원선교 기관을 안내합니다.
              </p>
            </div>

            {/* 지도 + 핀 */}
            <div className="relative z-10 aspect-[16/10] max-w-[900px] mx-auto">
              <Image
                src="/missions/world-map.png"
                alt="세계지도"
                fill
                className="object-contain"
                style={{ filter: 'invert(1)', opacity: 0.35 }}
                priority
              />
              {/* 핀 */}
              {OVERSEAS.map((m) => (
                <div
                  key={m.country}
                  className="absolute group"
                  style={{ left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Ripple */}
                  <span className="absolute inset-0 -m-2 rounded-full bg-[#e53935]/50 animate-ping" />
                  {/* Pin dot */}
                  <span className="relative block w-4 h-4 rounded-full bg-[#e53935] border-2 border-white shadow-md" />
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white text-[#0b1c30] rounded-lg shadow-lg px-3 py-2 text-xs font-bold">
                      <div className="text-[#e53935]">{m.country}</div>
                      <div>{m.name}</div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
                  </div>
                </div>
              ))}
            </div>

            {/* 말씀 */}
            <div className="relative z-10 text-center mt-8 md:mt-10 text-white">
              <p className="text-sm md:text-base leading-relaxed italic">
                &ldquo;너희는 가서 모든 족속으로 제자를 삼아…
                <br />
                내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라&rdquo;
              </p>
              <p className="text-xs text-white/80 mt-2 font-bold font-['Manrope']">
                — 마태복음 28:19-20
              </p>
            </div>
          </div>

          {/* 국내선교 + 해외선교 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 국내선교 */}
            <div className="bg-[#E0F5F0] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="material-symbols-outlined text-[#006b5d]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  home_work
                </span>
                <h3 className="font-['Manrope'] text-xl font-bold text-[#005045]">
                  국내선교
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {DOMESTIC.map((org) => (
                  <li
                    key={org}
                    className="inline-block bg-white text-[#005045] px-3 py-1.5 rounded-full text-sm font-semibold"
                  >
                    {org}
                  </li>
                ))}
              </ul>
            </div>

            {/* 해외선교 */}
            <div className="bg-[#dbe1ff] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="material-symbols-outlined text-[#0045bc]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  public
                </span>
                <h3 className="font-['Manrope'] text-xl font-bold text-[#003da9]">
                  해외선교
                </h3>
              </div>
              <ul className="space-y-3">
                {OVERSEAS.map((m) => (
                  <li
                    key={m.country}
                    className="flex items-baseline gap-3 pb-3 border-b border-white/40 last:border-b-0"
                  >
                    <span className="inline-flex items-center gap-2 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#e53935]" />
                      <span className="font-['Manrope'] text-sm font-bold text-[#003da9] uppercase tracking-wide w-24">
                        {m.country}
                      </span>
                    </span>
                    <span className="text-sm md:text-base text-[#191c1d] font-semibold">
                      {m.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
