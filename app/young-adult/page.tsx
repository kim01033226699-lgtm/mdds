import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: '청년부 - 물댄동산교회' };

const PHOTOS = [{ src: '/young-adult/photo1.jpg', alt: '청년부 행복한 성탄절' }];

const ACTIVITIES = [
  '셀모임',
  '일대일 제자양육',
  '폴리네이터 양육훈련',
  '수련회 및 사경회',
  '교리 및 성경 교육',
];

const STAFF = [
  { role: '교장', name: '정종한 목사' },
  { role: '지도교역자', name: '박철수 전도사' },
  { role: '부장', name: '김성대 집사' },
];

const OFFICERS = [
  { role: '회장', name: '김유미' },
  { role: '총무', name: '임예찬' },
  { role: '회계', name: '이종협' },
  { role: '서기', name: '안성은' },
];

export default function YoungAdultPage() {
  return (
    <>
      <PageHeader
        pill="다음세대"
        title="청년부"
        subtitle="새 일을 이루는 청년부"
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
                rocket_launch
              </span>
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[#006b5d] text-white rounded-full text-xs font-bold mb-4 font-['Manrope']">
                표어
              </span>
              <h2 className="font-['Manrope'] text-3xl md:text-[40px] font-extrabold text-[#006b5d] leading-tight mb-3 tracking-tight">
                &ldquo;새 일을 이루는 청년부&rdquo;
              </h2>
            </div>
          </div>

          {/* 청년부 소개 */}
          <div className="bg-white rounded-2xl border border-[#e1e3e4] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#0045bc]">info</span>
              <h3 className="font-['Manrope'] text-xl md:text-2xl font-bold text-[#191c1d]">
                청년부 소개
              </h3>
            </div>
            <p className="text-[#434655] text-base leading-relaxed whitespace-pre-line">
              {`물댄동산교회 청년부에 오신 것을 환영합니다.
하나님을 향한 열정과 섬김으로 세상에서 빛과 소금의 역할을 감당합니다.
물댄 청년들은 교회를 사랑하고 섬기며, 어르신들을 공경하고 이웃 사랑을 실천하고 있습니다.
또한, 이 땅에 하나님의 나라를 이루기 위해 뜨거운 열정으로 기도하고 있습니다.
물댄동산교회 청년부에 함께 하기를 소원하며 여러분을 초대합니다.`}
            </p>
          </div>

          {/* 말씀 */}
          <div className="bg-[#FFF9E1] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#8f2f00]">menu_book</span>
              <span className="font-['Manrope'] text-xs font-bold text-[#8f2f00] uppercase tracking-wider">
                말씀
              </span>
            </div>
            <p className="text-sm md:text-base text-[#191c1d] leading-relaxed italic mb-3">
              &ldquo;그러므로 우리는 긍휼하심을 받고 때를 따라 돕는 은혜를 얻기 위하여 은혜의 보좌
              앞에 담대히 나아갈 것이니라&rdquo;
            </p>
            <p className="text-xs font-bold text-[#8f2f00] font-['Manrope']">— 히브리서 4:16</p>
          </div>

          {/* 활동 */}
          <div className="bg-[#dbe1ff] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <span
                className="material-symbols-outlined text-[#0045bc]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <h3 className="font-['Manrope'] text-xl font-bold text-[#0045bc]">활동</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {ACTIVITIES.map((a) => (
                <li
                  key={a}
                  className="inline-block bg-white text-[#0045bc] px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* 예배시간 + 섬기는 분들 + 임원 */}
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
                주일 오후 2:00
              </p>
              <p className="text-sm text-[#93000a] font-semibold mt-2">지하 1층 청년부실</p>
            </div>

            {/* 섬기는 분들 + 임원 */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#e1e3e4] p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="material-symbols-outlined text-[#006b5d]">groups</span>
                <h3 className="font-['Manrope'] text-xl font-bold text-[#191c1d]">섬기는 분들</h3>
              </div>
              <div className="space-y-3 mb-5">
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
              </div>
              <div className="pt-2 border-t border-[#e1e3e4]">
                <div className="text-xs font-bold text-[#006b5d] uppercase tracking-wider mb-3">
                  임원
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {OFFICERS.map((o) => (
                    <div
                      key={o.role}
                      className="bg-[#E0F5F0] rounded-lg p-3 text-center"
                    >
                      <div className="font-['Manrope'] text-xs font-bold text-[#006b5d] uppercase tracking-wider mb-1">
                        {o.role}
                      </div>
                      <div className="text-sm font-bold text-[#005045]">{o.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
