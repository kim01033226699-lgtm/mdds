import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import FeaturedSermon from '@/components/FeaturedSermon';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: '홈 2 - 물댄동산교회',
  description: '예배와 방문 안내를 중심으로 새롭게 구성한 물댄동산교회 홈페이지 시안입니다.',
  robots: { index: false, follow: false },
};

const FAMILY_LINKS = [
  {
    title: '다음세대',
    description: '유치부부터 청년부까지, 믿음 안에서 함께 자라는 공동체입니다.',
    href: '/kindergarten',
    image: '/samples/온세대통합예배2-2026-05-31.jpg',
    links: [
      { label: '유치부', href: '/kindergarten' },
      { label: '아동부', href: '/children' },
      { label: '청소년부', href: '/youth' },
      { label: '청년부', href: '/young-adult' },
    ],
  },
  {
    title: '양육과 훈련',
    description: '말씀과 기도, 교제 안에서 그리스도의 제자로 함께 성장합니다.',
    href: '/discipleship',
    image: '/samples/온세대통합예배3-2026-05-31.jpg',
    links: [
      { label: '새가족반', href: '/discipleship#new-family' },
      { label: '성경 아카데미', href: '/discipleship' },
      { label: '기도와 전도', href: '/discipleship' },
    ],
  },
  {
    title: '선교와 나눔',
    description: '지역과 세계를 품고 복음과 사랑을 나누는 사역에 동참합니다.',
    href: '/mission-support',
    image: '/samples/우크라이나-김요한 선교사(2025.12.14)1.jpg',
    links: [
      { label: '선교후원', href: '/mission-support' },
      { label: '선교사 소식', href: '/missionary-news' },
      { label: '교회 소식', href: '/church-news-events' },
    ],
  },
];

const COMMUNITY_LINKS = [
  { label: '교회소식', href: '/church-news-events', icon: 'campaign' },
  { label: '주보보기', href: '/bulletin', icon: 'menu_book' },
  { label: '이달의 행사', href: '/monthly-events', icon: 'calendar_month' },
  { label: '행사앨범', href: '/event-album-family', icon: 'photo_library' },
  { label: '새가족소개', href: '/new-family-intro', icon: 'waving_hand' },
  { label: '문의게시판', href: '/board', icon: 'forum' },
];

const NEWS = [
  { category: '예배', title: '주일예배 안내', date: '매주 주일' },
  { category: '새가족', title: '처음 오신 여러분을 환영합니다', date: '예배 후' },
  { category: '공동체', title: '이번 주 교회소식과 주보를 확인하세요', date: '매주 갱신' },
];

export default function Home2Page() {
  return (
    <div className="bg-[#f7f5f0] text-[#17231b]">
      <section className="bg-[#173f2d] text-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-2.5 flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-1 text-xs md:text-sm">
          <p className="font-semibold tracking-wide">주일예배 · 오전 9시 &amp; 11시</p>
          <div className="flex items-center gap-4 text-white/80">
            <span>경기도 남양주시 덕송2로 63</span>
            <Link href="/directions" className="text-white font-bold underline underline-offset-4">
              길찾기
            </Link>
          </div>
        </div>
      </section>

      <main>
        <section className="relative min-h-[680px] md:min-h-[760px] overflow-hidden bg-[#d8d2c4]">
          <Image
            src="/hero-01.jpg"
            alt="물댄동산교회 예배 공간"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2318]/90 via-[#0c2318]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c2318]/50 via-transparent to-transparent" />

          <div className="relative z-10 max-w-[1200px] mx-auto min-h-[680px] md:min-h-[760px] px-5 md:px-6 pt-20 pb-32 md:pt-28 md:pb-44 flex items-end md:items-center">
            <div className="max-w-3xl text-white">
              <p className="mb-6 text-sm md:text-base font-bold tracking-[0.22em] uppercase text-[#d9e9d5]">
                Welcome to MDDS Church
              </p>
              <h1 className="text-[42px] sm:text-6xl md:text-7xl lg:text-[84px] font-black leading-[1.02] tracking-[-0.045em] text-balance">
                복음으로 다시
                <br />
                세워지는 교회
              </h1>
              <p className="mt-7 max-w-xl text-base md:text-xl leading-relaxed text-white/85">
                별내에서 하나님을 예배하고, 이웃을 사랑하며,
                다음세대를 함께 세워가는 물댄동산교회입니다.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/discipleship#new-family"
                  className="inline-flex items-center justify-center gap-2 bg-[#f2d06b] text-[#17231b] px-7 py-4 rounded-full font-extrabold hover:bg-[#ffe08a] transition-colors"
                >
                  처음 방문 안내
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
                <Link
                  href="/sunday-sermon"
                  className="inline-flex items-center justify-center gap-2 border border-white/55 bg-white/10 backdrop-blur-sm text-white px-7 py-4 rounded-full font-bold hover:bg-white hover:text-[#17231b] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">play_circle</span>
                  이번 주 설교
                </Link>
              </div>
            </div>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="absolute z-20 -bottom-px left-0 h-[105px] md:h-[170px] w-full"
          >
            <path
              d="M0 76C315 124 650 154 936 126C1120 108 1288 65 1440 20V180H0V76Z"
              fill="#f7f5f0"
            />
          </svg>
        </section>

        <section className="relative z-30 -mt-7 md:-mt-12 px-5 md:px-6">
          <div className="max-w-[1080px] mx-auto bg-white rounded-2xl md:rounded-3xl shadow-[0_18px_60px_rgba(23,35,27,0.13)] grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e5e2d8] overflow-hidden">
            {[
              {
                icon: 'schedule',
                title: '예배시간',
                text: '주일 오전 9시 · 11시',
                href: '/worship-guide',
              },
              {
                icon: 'directions_car',
                title: '주차안내',
                text: '교회 및 덕송초 주차장',
                href: '/directions',
              },
              {
                icon: 'child_care',
                title: '자녀와 함께',
                text: '연령별 다음세대 예배',
                href: '/kindergarten',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center gap-4 p-6 md:p-8 hover:bg-[#fbfaf6] transition-colors"
              >
                <span className="material-symbols-outlined text-3xl text-[#2d6a4f]">{item.icon}</span>
                <span className="min-w-0">
                  <strong className="block text-lg text-[#17231b]">{item.title}</strong>
                  <span className="block mt-1 text-sm text-[#667268]">{item.text}</span>
                </span>
                <span className="material-symbols-outlined ml-auto text-[#9ba39c] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="max-w-[960px] mx-auto px-5 md:px-6 text-center">
            <p className="text-sm font-bold tracking-[0.18em] uppercase text-[#2d6a4f]">Join us this Sunday</p>
            <h2 className="mt-5 text-4xl md:text-6xl font-black tracking-[-0.04em] text-[#17231b]">
              만나 뵙기를 기다립니다
            </h2>
            <p className="max-w-2xl mx-auto mt-6 text-base md:text-xl leading-relaxed text-[#667268]">
              교회가 처음이어도 괜찮습니다. 편안한 복장으로 오셔서 예배에 함께해 주세요.
              안내팀이 주차부터 자녀 예배까지 친절하게 도와드립니다.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/discipleship#new-family"
                className="bg-[#173f2d] text-white px-7 py-3.5 rounded-full font-bold hover:bg-[#245a40] transition-colors"
              >
                방문 준비하기
              </Link>
              <Link
                href="/greeting"
                className="border border-[#b9b8ae] text-[#17231b] px-7 py-3.5 rounded-full font-bold hover:bg-white transition-colors"
              >
                교회 소개
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-5 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-14">
              <div>
                <p className="text-sm font-bold tracking-[0.18em] uppercase text-[#2d6a4f]">For your family</p>
                <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">함께 성장하는 공동체</h2>
              </div>
              <p className="max-w-md text-[#667268] leading-relaxed">
                나이와 신앙의 단계에 맞는 공동체를 찾아 물댄동산교회 안에서 다음 걸음을 시작하세요.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {FAMILY_LINKS.map((item) => (
                <article key={item.title} className="group bg-[#f7f5f0] rounded-3xl overflow-hidden">
                  <Link href={item.href} className="block relative aspect-[4/3] overflow-hidden bg-[#d8d2c4]">
                    <Image
                      src={item.image}
                      alt={`${item.title} 공동체 모습`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <h3 className="absolute left-6 bottom-5 text-3xl font-black text-white">{item.title}</h3>
                  </Link>
                  <div className="p-6 md:p-7">
                    <p className="text-[#667268] leading-relaxed min-h-12">{item.description}</p>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-sm font-bold text-[#2d6a4f] hover:underline underline-offset-4"
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FeaturedSermon />

        <section className="py-20 md:py-28 bg-[#ece8de]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-6">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16">
              <div>
                <div className="flex items-end justify-between gap-4 mb-7">
                  <div>
                    <p className="text-sm font-bold tracking-[0.18em] uppercase text-[#2d6a4f]">Church news</p>
                    <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">이번 주 소식</h2>
                  </div>
                  <Link href="/church-news-events" className="font-bold text-[#2d6a4f] hover:underline">
                    모두 보기
                  </Link>
                </div>
                <div className="border-t-2 border-[#17231b]">
                  {NEWS.map((item) => (
                    <Link
                      key={item.title}
                      href="/church-news-events"
                      className="grid grid-cols-[72px_1fr] md:grid-cols-[90px_1fr_100px] gap-4 items-center py-5 border-b border-[#cfcabf] group"
                    >
                      <span className="text-sm font-bold text-[#2d6a4f]">{item.category}</span>
                      <span className="text-base md:text-lg font-bold group-hover:text-[#2d6a4f] transition-colors">
                        {item.title}
                      </span>
                      <span className="hidden md:block text-right text-sm text-[#7c817b]">{item.date}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold tracking-[0.18em] uppercase text-[#2d6a4f]">Quick links</p>
                <h2 className="mt-3 mb-7 text-3xl md:text-4xl font-black tracking-[-0.04em]">성도의 교제</h2>
                <div className="grid grid-cols-2 gap-3">
                  {COMMUNITY_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="bg-white/80 rounded-2xl p-5 min-h-32 flex flex-col justify-between hover:bg-white hover:-translate-y-1 transition-all"
                    >
                      <span className="material-symbols-outlined text-3xl text-[#2d6a4f]">{item.icon}</span>
                      <span className="font-extrabold">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-[560px] flex items-center overflow-hidden">
          <Image
            src="/facilities/image_4117.jpg"
            alt="물댄동산교회 시설"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0c2318]/78" />
          <div className="relative max-w-[1200px] mx-auto px-5 md:px-6 py-24 w-full text-white">
            <p className="text-sm font-bold tracking-[0.18em] uppercase text-[#d9e9d5]">Visit us</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.04em]">이번 주일에 만나요</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl text-white/85">
              <div>
                <p className="text-xs font-bold tracking-widest text-[#f2d06b] uppercase">Worship</p>
                <p className="mt-2 text-xl font-bold text-white">오전 9시 · 11시</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-[#f2d06b] uppercase">Address</p>
                <p className="mt-2 text-xl font-bold text-white">남양주시 덕송2로 63</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-[#f2d06b] uppercase">Contact</p>
                <p className="mt-2 text-xl font-bold text-white">031-553-0191</p>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/directions"
                className="inline-flex items-center gap-2 bg-[#f2d06b] text-[#17231b] px-7 py-4 rounded-full font-extrabold"
              >
                오시는 길
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/vehicle"
                className="inline-flex items-center gap-2 border border-white/50 px-7 py-4 rounded-full font-bold hover:bg-white hover:text-[#17231b] transition-colors"
              >
                차량 운행 안내
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}
