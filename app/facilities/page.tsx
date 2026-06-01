import Image from 'next/image';

export const metadata = { title: '교회시설안내 - 물댄동산교회' };

type Facility = {
  img: string;
  title: string;
  desc: string;
  tags?: string[];
  wide?: boolean;
};

const FACILITIES: Facility[] = [
  {
    img: '/facilities/image_4181.jpg',
    title: '대예배당',
    desc: '주일예배와 주요 집회가 열리는 본당입니다. 넓고 경건한 공간에서 함께 예배드립니다.',
    tags: ['본당', '주일예배'],
    wide: true,
  },
  {
    img: '/facilities/image_4139.jpg',
    title: '소예배실',
    desc: '소그룹 예배와 작은 모임을 위한 경건한 공간입니다.',
    tags: ['소그룹', '예배'],
  },
  {
    img: '/facilities/image_4157.jpg',
    title: '로비 · 안내 공간',
    desc: '교회를 방문하시는 모든 분들을 환영하는 밝고 쾌적한 안내 공간입니다.',
    tags: ['안내데스크', '서적코너'],
  },
  {
    img: '/facilities/image_4126.jpg',
    title: '카페 · 친교실',
    desc: '예배 전후로 차와 다과를 나누며 성도들과 교제하는 공간입니다.',
    tags: ['친교', '다과'],
  },
  {
    img: '/facilities/image_4174.jpg',
    title: '북카페',
    desc: '햇살이 드는 창가에서 책과 함께 쉼을 누리는 공간입니다.',
    tags: ['독서', '쉼'],
  },
  {
    img: '/facilities/image_4149.jpg',
    title: '식당',
    desc: '주일 점심과 행사 식사를 함께하는 대형 식당입니다.',
    tags: ['수용 100명+'],
  },
  {
    img: '/facilities/image_4136.jpg',
    title: '개인기도실 · 중보기도실',
    desc: '깊은 기도와 묵상을 위한 조용한 기도 공간입니다.',
    tags: ['개인기도', '중보기도'],
  },
  {
    img: '/facilities/image_4148.jpg',
    title: '소그룹 회의실',
    desc: '소그룹 모임과 임원 회의를 위한 아늑한 공간입니다.',
    tags: ['회의', '소그룹'],
  },
  {
    img: '/facilities/image_4117.jpg',
    title: '유치부실',
    desc: '유치부 어린이들을 위한 따뜻하고 안전한 예배·교육 공간입니다.',
    tags: ['유치부'],
  },
  {
    img: '/facilities/image_4184.jpg',
    title: '아동부실',
    desc: 'B1에 위치한 아동부 전용 예배·활동 공간입니다.',
    tags: ['아동부', 'B1'],
  },
  {
    img: '/facilities/image_4127.jpg',
    title: '청소년 · 청년부실',
    desc: '청소년과 청년들이 함께 예배하고 교제하는 공간입니다.',
    tags: ['청소년부', '청년부', 'B1'],
  },
  {
    img: '/facilities/image_4131.jpg',
    title: '교육실',
    desc: '성경아카데미와 양육 프로그램이 진행되는 교육 공간입니다.',
    tags: ['양육', '훈련'],
  },
  {
    img: '/facilities/image_4169.jpg',
    title: '다목적 활동실',
    desc: '다양한 모임과 활동을 위한 넓은 다목적 공간입니다.',
    tags: ['다목적'],
  },
  {
    img: '/facilities/image_4161.jpg',
    title: '어린이 놀이실',
    desc: '아이들이 안전하게 뛰놀 수 있는 컬러풀한 키즈존입니다.',
    tags: ['키즈존', '놀이'],
  },
  {
    img: '/facilities/image_4173.jpg',
    title: '탁구장',
    desc: '성도들의 여가와 친교를 위한 탁구 공간입니다.',
    tags: ['여가', '체육'],
  },
  {
    img: '/facilities/image_4177.jpg',
    title: '당구장',
    desc: '여가와 교제를 위한 당구 공간입니다.',
    tags: ['여가', '체육'],
  },
];

const FLOORS = [
  { level: '5층', rooms: '기도실, 도서관' },
  { level: '4층', rooms: '교육실, 회의실' },
  { level: '3층', rooms: '청년부, 청소년부' },
  { level: '2층', rooms: '유치부, 아동부' },
  { level: '1층', rooms: '대예배당, 찬양실' },
  { level: '지하1층', rooms: '주차장, 식당' },
];

export default function FacilitiesPage() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/facilities/image_4181.jpg"
            alt="교회시설안내"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(rgba(11, 28, 48, 0.6), rgba(11, 28, 48, 0.8))',
            }}
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-[56px] leading-[1.05] font-bold text-[#f8f9ff] mb-4 tracking-tight">
            교회시설안내
          </h1>
          <p className="text-base md:text-lg text-[#d6e3ff] max-w-2xl mx-auto">
            아름답고 편안한 시설로 여러분을 환영합니다
          </p>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto">
        {/* 주요 시설 */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-[#eff4ff]">
          <div className="mb-10">
            <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold text-[#0b1c30] mb-2 flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-[#00488d]">photo_library</span>
              주요 시설
            </h2>
            <p className="text-sm text-[#424752]">
              물댄동산교회의 다양한 공간을 사진으로 만나보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {FACILITIES.map((f) => (
              <div
                key={f.title}
                className={`${
                  f.wide ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                } bg-white border border-[#c2c6d4] rounded-xl overflow-hidden flex flex-col hover:border-[#00488d] hover:shadow-[0_8px_24px_rgba(0,72,141,0.08)] transition-all`}
              >
                <div
                  className={`relative w-full ${
                    f.wide ? 'aspect-[16/10]' : 'aspect-[16/10]'
                  } bg-[#dce9ff] overflow-hidden`}
                >
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#0b1c30] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#424752] leading-relaxed mb-4 flex-1">
                    {f.desc}
                  </p>
                  {f.tags && f.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {f.tags.map((t) => (
                        <span
                          key={t}
                          className="font-['JetBrains_Mono'] text-[10px] tracking-wider bg-[#eff4ff] text-[#00488d] px-2 py-1 rounded font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 층별 안내 */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="bg-[#0b1c30] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-stretch gap-8 overflow-hidden relative text-[#f8f9ff]">
            <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '300px' }}>
                stairs
              </span>
            </div>
            <div className="relative z-10 md:w-1/2">
              <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-2 tracking-tight">
                <span className="material-symbols-outlined text-[#89f5e7]">stairs</span>
                층별 안내
              </h2>
              <p className="text-base text-[#d3e4fe] mb-8 leading-relaxed">
                각 층마다 목적에 맞는 공간이 마련되어 있습니다. 처음 방문하실 때 안내데스크에서
                도움을 받으실 수 있습니다.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[#89f5e7]">location_on</span>
                  <span className="text-sm">경기도 남양주시 덕송2로 63 (별내동) 프라자빌딩 3·4층</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[#89f5e7]">call</span>
                  <span className="text-sm">031-553-0191</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 md:w-1/2 bg-white/5 backdrop-blur-md rounded-lg border border-white/15 overflow-hidden">
              <ul>
                {FLOORS.map((f, i) => (
                  <li
                    key={f.level}
                    className={`flex justify-between items-center px-6 py-4 ${
                      i !== FLOORS.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                  >
                    <span className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#89f5e7]">
                      {f.level}
                    </span>
                    <span className="text-sm text-[#d3e4fe]">{f.rooms}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
