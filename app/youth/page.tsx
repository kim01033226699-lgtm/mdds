import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: '청소년부 - 물댄동산교회' };

const PHOTOS = [{ src: '/youth/photo1.jpg', alt: '청소년부 TEAM JESUS 단체 사진' }];

const GOAL_CATEGORIES = [
  {
    no: '1',
    label: '신앙',
    icon: 'menu_book',
    bg: 'bg-[#dbe1ff]',
    fg: 'text-[#0045bc]',
    subFg: 'text-[#003da9]',
    items: [
      { mark: '가', text: '복음 안에서의 자기 정체성 확립 및 구원의 의미 알기' },
      { mark: '나', text: '하나님과의 관계를 회복하는 과정 — 개인경건, 예배, 교회공동체에 대한 이해' },
      { mark: '다', text: '하나님의 관점으로 세상을 바라보기 — 기독교적 세계관 형성' },
      { mark: '라', text: '우리를 향한 하나님의 계획 알기 — 비전과 사명' },
    ],
  },
  {
    no: '2',
    label: '삶',
    icon: 'self_improvement',
    bg: 'bg-[#E0F5F0]',
    fg: 'text-[#006b5d]',
    subFg: 'text-[#005045]',
    items: [
      { mark: '가', text: '구원을 받은 사람은 삶의 변화로 나타나야 한다' },
      { mark: '나', text: '구체적인 삶의 변화 1 — 습관 (자신에 대한 변화)' },
      { mark: '다', text: '구체적인 삶의 변화 2 — 태도 (타인에 대한 변화)' },
    ],
  },
  {
    no: '3',
    label: '현장',
    icon: 'public',
    bg: 'bg-[#FFF9E1]',
    fg: 'text-[#8f2f00]',
    subFg: 'text-[#802a00]',
    items: [
      { mark: '가', text: '하나님이 현장을 주시는 이유' },
      { mark: '나', text: '내게 주신 현장 파악하기' },
      { mark: '다', text: '현장 속으로' },
    ],
  },
];

const STAFF = [
  { role: '교장', name: '정종한 목사' },
  { role: '지도교역자', name: '진두만 전도사' },
  { role: '부장 / 부감', name: '박지현 집사' },
];

const TEACHERS = ['김경수', '박지연', '윤준희', '이도경', '장경옥', '조준희', '한예은'];

export default function YouthPage() {
  return (
    <>
      <PageHeader
        pill="다음세대"
        title="청소년부"
        subtitle="그리스도를 본받아 서가는"
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

          {/* 표어 */}
          <div className="bg-[#E0F5F0] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -bottom-12 -right-12 opacity-10 pointer-events-none">
              <span
                className="material-symbols-outlined text-[#006b5d]"
                style={{ fontSize: '240px', fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[#006b5d] text-white rounded-full text-xs font-bold mb-4 font-['Manrope']">
                표어
              </span>
              <h2 className="font-['Manrope'] text-3xl md:text-[40px] font-extrabold text-[#006b5d] leading-tight mb-3 tracking-tight">
                그리스도를 본받아 서가는 청소년부
              </h2>
              <p className="text-sm md:text-base text-[#005045] font-semibold">— 에베소서 4장 15절</p>
            </div>
          </div>

          {/* 소개 */}
          <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#0045bc]">info</span>
              <h3 className="font-['Manrope'] text-xl md:text-2xl font-bold text-[#191c1d]">
                청소년부 소개
              </h3>
            </div>
            <p className="text-[#434655] text-base leading-relaxed">
              물댄동산교회 청소년부는 중고등학생들이 함께 예배하며 하나로 연합하는 공동체로,
              청소년 시기에서부터 하나님을 만나고 하나님의 은혜를 아는 진짜 그리스도인으로 성장할
              수 있도록 돕습니다. 그리스도인으로서 기독교 세계관을 가지고 인격과 가치관이 올바르게
              형성될 수 있도록 양육하며, 사춘기라는 중요한 시기 속에서 그리스도 공동체 안에서 한
              지체로 교회에 정착하고 몸된 교회를 위해 헌신할 수 있도록 돕고 있습니다.
            </p>
          </div>

          {/* 교육목표 */}
          <div>
            <div className="bg-[#dbe1ff] rounded-2xl p-6 md:p-8 mb-5">
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
              <p className="text-base md:text-lg text-[#003da9] leading-relaxed font-semibold">
                그리스도를 본받아 서가기 위한 요소를 <strong>신앙 · 삶 · 현장</strong> 의 3가지로
                구분하여, 어느 한쪽으로 치우쳐지지 않는 균형있는 청소년으로 세워간다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {GOAL_CATEGORIES.map((cat) => (
                <div key={cat.no} className={`${cat.bg} rounded-2xl p-6 md:p-7`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`w-9 h-9 rounded-full bg-white ${cat.fg} font-extrabold font-['Manrope'] flex items-center justify-center text-sm`}
                    >
                      {cat.no}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined ${cat.fg}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {cat.icon}
                      </span>
                      <h4 className={`font-['Manrope'] text-lg font-bold ${cat.fg}`}>
                        {cat.label}
                      </h4>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item.mark} className="flex items-start gap-3">
                        <span
                          className={`shrink-0 ${cat.subFg} font-['Manrope'] text-xs font-bold mt-0.5`}
                        >
                          {item.mark}.
                        </span>
                        <span className={`text-sm leading-relaxed ${cat.subFg}`}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 예배시간 + 섬기는 분들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                주일 오전 11:00~12:45
              </p>
              <p className="text-sm text-[#93000a] font-semibold mt-2">청소년부 예배실</p>
            </div>

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
