import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '인사말 2 - 물댄동산교회',
  description: '물댄동산교회와 담임목사를 소개합니다.',
  robots: { index: false, follow: false },
};

const VALUES = [
  {
    number: '01',
    title: '살아 있는 예배',
    description: '말씀과 찬양과 기도가 어우러진 예배 안에서 하나님을 깊이 만납니다.',
  },
  {
    number: '02',
    title: '함께하는 공동체',
    description: '예수 그리스도의 사랑으로 서로를 환대하고 함께 행복한 교회를 세워갑니다.',
  },
  {
    number: '03',
    title: '이웃을 향한 사랑',
    description: '지역의 동네 교회로서 이웃에게 작은 쉼과 따뜻한 사랑을 전합니다.',
  },
];

export default function Greeting2Page() {
  return (
    <div className="bg-[#f3efe6] text-[#17231b]">
      <main>
        <section className="px-5 md:px-8 pt-14 md:pt-24 pb-10 md:pb-16">
          <div className="w-full xl:w-[85%] mx-auto">
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.24em] text-[#4f6b57]">
              About MDDS Church
            </p>
            <div className="mt-5 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <h1 className="lg:col-span-8 text-[54px] sm:text-7xl lg:text-[104px] leading-[0.9] font-black tracking-[-0.065em]">
                교회를 넘어,
                <br />
                삶으로 이어지는 믿음
              </h1>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-lg md:text-xl leading-relaxed text-[#455248]">
                  복음으로 다시 세워지고, 하나님의 사랑을 이웃과 나누는 물댄동산교회입니다.
                </p>
                <Link
                  href="/sunday-sermon"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#173f2d] px-6 py-3.5 text-sm font-extrabold text-white hover:bg-[#245b42] transition-colors"
                >
                  설교모음
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 md:px-8 py-16 md:py-24">
          <div className="w-full xl:w-[92%] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-video overflow-hidden rounded-[28px] md:rounded-[42px] bg-[#173f2d] shadow-[0_24px_64px_rgba(23,63,45,0.16)]">
                <Image
                  src="/pastor-greeting-video-still.png"
                  alt="카메라를 향해 인사말을 전하는 정종한 담임목사"
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />
                <div className="absolute left-5 top-5 md:left-7 md:top-7 rounded-full bg-black/75 px-4 py-2 text-xs md:text-sm font-bold text-white backdrop-blur-sm">
                  물댄동산교회 담임목사 인사말
                </div>
                <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7 flex items-center gap-3 text-white">
                  <Link
                    href="/sunday-sermon"
                    aria-label="설교모음 보기"
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#17231b] hover:scale-105 transition-transform"
                  >
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_arrow
                    </span>
                  </Link>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/35">
                    <div className="h-full w-[18%] rounded-full bg-white" />
                  </div>
                  <span className="text-xs font-bold tabular-nums">01:12</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#4f9b92]">Pastor&apos;s Greeting</p>
              <h2 className="mt-5 text-4xl md:text-6xl font-black leading-[1.08] tracking-[-0.045em] text-[#17231b]">
                샬롬!
                <br />
                여러분을 환영하고 축복합니다.
              </h2>
              <div className="mt-8 space-y-5 text-base md:text-lg leading-[1.8] text-[#4f5c52]">
                <p>
                  물댄동산교회는 대한예수교장로회(통합)에 소속된 교회로, 오랜 시간 지역과 함께해 온 동네 교회입니다.
                  순수한 사랑을 앞세우는 예수 그리스도의 몸 된 교회로서 성도 모두가 함께 행복한 공동체를 만들어 가고 있습니다.
                </p>
                <p>
                  예배의 감동을 꿈꾸며 좋은 교회를 소망하는 모든 분에게 작은 쉼이 되기를 바랍니다.
                  말씀과 찬양과 기도가 살아 있는 이곳에서 여러분과 함께 예배할 날을 기다리겠습니다.
                </p>
              </div>
              <p className="mt-7 font-extrabold text-[#17231b]">정종한 담임목사</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sunday-sermon"
                  className="inline-flex items-center gap-2 rounded-full border border-[#17231b] px-7 py-4 font-extrabold text-[#17231b] hover:bg-[#17231b] hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  설교모음
                </Link>
                <Link
                  href="/directions"
                  className="inline-flex items-center gap-2 rounded-full bg-[#173f2d] px-7 py-4 font-bold text-white hover:bg-[#245b42] transition-colors"
                >
                  오시는 길
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 py-20 md:py-28">
          <div className="w-full xl:w-[85%] mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#4f6b57]">Our Community</p>
              <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.045em]">우리가 함께 세워가는 교회</h2>
            </div>
            <div className="mt-12 grid md:grid-cols-3 border-t border-[#aeb8ad]">
              {VALUES.map((value) => (
                <article key={value.number} className="py-8 md:px-7 md:first:pl-0 border-b md:border-b-0 md:border-r border-[#aeb8ad] last:border-r-0">
                  <span className="text-sm font-black text-[#4f6b57]">{value.number}</span>
                  <h3 className="mt-8 text-2xl font-black">{value.title}</h3>
                  <p className="mt-4 leading-relaxed text-[#566158]">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
