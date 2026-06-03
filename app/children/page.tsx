import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: '아동부 - 물댄동산교회' };

const PHOTOS = [{ src: '/children/photo1.jpg', alt: '아동부 예배 모습' }];

const ACTIVITIES = [
  {
    icon: 'church',
    label: '예배 / 절기',
    color: 'bg-[#dbe1ff]',
    fg: 'text-[#0045bc]',
    subFg: 'text-[#003da9]',
    items: ['부활주일', '맥추주일', '추수감사주일 (창립주일)', '성탄주일'],
  },
  {
    icon: 'menu_book',
    label: '영성 / 교육',
    color: 'bg-[#E0F5F0]',
    fg: 'text-[#006b5d]',
    subFg: 'text-[#005045]',
    items: [
      '공과공부',
      '가정예배',
      '바이블 올림픽',
      '성경암송대회',
      '성경퀴즈대회',
      '달란트 농장꾸미기',
    ],
  },
  {
    icon: 'celebration',
    label: '행사',
    color: 'bg-[#FFF9E1]',
    fg: 'text-[#8f2f00]',
    subFg: 'text-[#802a00]',
    items: [
      '달란트 파티',
      '파자마 파티',
      '학부모 초청예배',
      '베프 초청예배',
      '조이플롯앙상블',
      '조이워십댄스',
    ],
  },
  {
    icon: 'favorite',
    label: '친교 / 환영',
    color: 'bg-[#ffdad6]',
    fg: 'text-[#ba1a1a]',
    subFg: 'text-[#93000a]',
    items: [
      '반별모임',
      '야외학습',
      '생일축하',
      '신입생 · 새친구 환영식',
      '반별데이트',
    ],
  },
];

const STAFF = [
  { role: '교장', name: '정종한 목사' },
  { role: '지도교역자', name: '김숙정 전도사' },
  { role: '부장', name: '이용화 권사' },
  { role: '부감', name: '정복례 권사' },
];

const TEACHERS = ['김선일', '강지혜', '정연화', '손주희', '최미정', '이도영', '전주환', '정신우', '박세열'];

export default function ChildrenPage() {
  return (
    <>
      <PageHeader
        pill="다음세대"
        title="아동부"
        subtitle="여호와 라파! 우리를 고쳐주세요!"
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 space-y-8">
          {/* 사진 갤러리 */}
          <div className="grid grid-cols-1 gap-4">
            {PHOTOS.map((p) => (
              <div
                key={p.src}
                className="relative aspect-[16/7] rounded-2xl overflow-hidden border border-[#e1e3e4] bg-[#edeeef] group"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1200px) 1200px, 100vw"
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
                healing
              </span>
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[#006b5d] text-white rounded-full text-xs font-bold mb-4 font-['Manrope']">
                교육표어
              </span>
              <h2 className="font-['Manrope'] text-3xl md:text-[40px] font-extrabold text-[#006b5d] leading-tight mb-3 tracking-tight">
                &ldquo;여호와 라파! 우리를 고쳐주세요!&rdquo;
              </h2>
              <p className="text-sm md:text-base text-[#005045] font-semibold italic">
                &ldquo;주여, 치유하게 하소서&rdquo;
              </p>
            </div>
          </div>

          {/* 아동부 소개 */}
          <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#0045bc]">info</span>
              <h3 className="font-['Manrope'] text-xl md:text-2xl font-bold text-[#191c1d]">
                아동부 소개
              </h3>
            </div>
            <p className="text-[#434655] text-base leading-relaxed">
              물댄동산교회 아동부는 초등학생 전학년(1~6학년)을 위한 예배 · 영성 · 교육을 통해 모든
              어린이들이 예수님을 만나 소금과 빛으로서의 정체성을 확립해 나가도록 가르치며, 소금과
              빛으로 살아간 성경인물들을 배우고 소금과 빛으로서의 삶을 실천하게 될 것입니다.
            </p>
          </div>

          {/* 교육목표 */}
          <div className="bg-[#dbe1ff] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="material-symbols-outlined text-[#0045bc]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                flag
              </span>
              <span className="font-['Manrope'] text-xs font-bold text-[#0045bc] uppercase tracking-wider">
                교육목표
              </span>
            </div>
            <p className="font-['Manrope'] text-xl md:text-2xl font-bold text-[#003da9] leading-snug">
              복음을 전하며 하나님의 고치시는 사역에 참여하는 제자로 살아가는 어린이
            </p>
          </div>

          {/* 주요 활동 */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="material-symbols-outlined text-[#0045bc]">stars</span>
              <h3 className="font-['Manrope'] text-xl md:text-2xl font-bold text-[#191c1d]">
                주요 활동
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {ACTIVITIES.map((a) => (
                <div key={a.label} className={`${a.color} rounded-2xl p-6 md:p-7`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`material-symbols-outlined ${a.fg}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {a.icon}
                    </span>
                    <span
                      className={`font-['Manrope'] text-sm font-bold ${a.fg} uppercase tracking-wider`}
                    >
                      {a.label}
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {a.items.map((item) => (
                      <li
                        key={item}
                        className={`bg-white/70 ${a.subFg} px-3 py-1 rounded-full text-xs font-semibold`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 주제말씀 */}
          <div className="bg-[#FFF9E1] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#8f2f00]">menu_book</span>
              <span className="font-['Manrope'] text-xs font-bold text-[#8f2f00] uppercase tracking-wider">
                주제말씀
              </span>
            </div>
            <p className="text-sm md:text-base text-[#191c1d] leading-relaxed italic mb-3">
              &ldquo;이르시되 너희가 너희 하나님 나 여호와의 말을 들어 순종하고 내가 보기에 의를 행하며
              내 계명에 귀를 기울이며 내 모든 규례를 지키면 내가 애굽 사람에게 내린 질병 중 하나도
              너희에게 내리지 아니하리니 나는 너희를 치료하는 여호와임이라&rdquo;
            </p>
            <p className="text-xs font-bold text-[#8f2f00] font-['Manrope']">— 출애굽기 15:26</p>
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
              <p className="font-['Manrope'] text-xl md:text-2xl font-extrabold text-[#191c1d] tracking-tight">
                주일 오전 11:20~12:40
              </p>
              <p className="text-sm text-[#93000a] font-semibold mt-2">B1 아동부실</p>
            </div>

            {/* 섬기는 분들 */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#e1e3e4] p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="material-symbols-outlined text-[#006b5d]">groups</span>
                <h3 className="font-['Manrope'] text-xl font-bold text-[#191c1d]">섬기는 분들</h3>
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
