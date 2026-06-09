import Image from 'next/image';
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';
import LatestSermonCards from '@/components/LatestSermonCards';
import FeaturedSermon from '@/components/FeaturedSermon';

const NEWS = [
  { tag: '공지', tone: 'primary', title: '주일예배 안내', date: '2026.04.16' },
  { tag: '행사', tone: 'secondary', title: '부활절 감사예배', date: '2026.04.13' },
  { tag: '공지', tone: 'primary', title: '수요기도회 안내', date: '2026.04.09' },
  { tag: '소식', tone: 'tertiary', title: '교회학교 봄소풍', date: '2026.04.06' },
];

const TAG_TONES: Record<string, string> = {
  primary: 'bg-[#0045bc]/10 text-[#0045bc]',
  secondary: 'bg-[#006b5d]/10 text-[#006b5d]',
  tertiary: 'bg-[#8f2f00]/10 text-[#8f2f00]',
};

export default function Home() {
  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-['Manrope']">
      {/* Mobile-only top: 제목 + 말씀 + 바로가기 버튼 (md 이상에선 숨김) */}
      <section className="md:hidden relative overflow-hidden bg-white pt-6 pb-6 px-5 border-b border-[#e1e3e4]">
        {/* 배경: 동산 위 교회(우상단) + 교회를 끼고 흐르는 시냇물(좌하단) — 연필 스케치풍 라인 드로잉 */}
        <svg
          aria-hidden="true"
          viewBox="0 0 390 240"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 w-full h-full text-[#0045bc] opacity-[0.16]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 동산(언덕) */}
          <path d="M192 156 C232 106 268 82 314 84 C350 86 374 102 390 120" />
          {/* 교회 — 본당 */}
          <path d="M313 86 L313 70 L343 70 L343 86" />
          <path d="M309 70 L328 56 L347 70" />
          {/* 교회 — 종탑 */}
          <path d="M299 86 L299 60 L313 60" />
          <path d="M296 60 L306 47 L316 60" />
          {/* 십자가 */}
          <path d="M306 47 L306 39" />
          <path d="M302 43 L310 43" />
          {/* 문/창문/바닥선 */}
          <path d="M324 86 L324 77 Q328 72 332 77 L332 86" />
          <circle cx="338" cy="78" r="2.4" />
          <circle cx="306" cy="69" r="1.8" />
          <path d="M295 87 L349 87" />
          {/* 잔디 */}
          <path d="M318 88 l-1 4 M321 88 l0 4 M324 89 l1 4" />
          {/* 동산의 나무 */}
          <path d="M362 100 L362 92" />
          <path d="M362 92 q-7 -3 -5 -10 q2 -7 9 -6 q8 1 7 9 q-1 7 -11 7 z" />
          <path d="M285 100 L285 93" />
          <path d="M285 93 q-6 -2 -4 -9 q3 -6 9 -5 q7 2 5 9 q-2 6 -10 5 z" />
          {/* 시냇물 (두 줄기 강둑) */}
          <path d="M250 150 C208 165 190 192 146 202 C104 212 66 218 18 236" />
          <path d="M259 159 C221 173 201 200 157 210 C119 219 80 225 32 238" />
          {/* 물결 무늬 */}
          <path d="M206 172 q6 4 12 0" />
          <path d="M166 190 q6 4 12 0" />
          <path d="M120 204 q6 4 12 0" />
          <path d="M74 219 q6 4 12 0" />
        </svg>

        <div className="relative z-10 text-center mb-6">
          <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0045bc] leading-[1.25] mb-3 tracking-tight">
            복음으로 다시
            <br />
            세워지는 교회
          </h1>
          <p className="text-xs text-[#434655] italic leading-relaxed px-2">
            &ldquo;그러므로 너희가 그리스도 예수를 주로 받았으니 그 안에서 행하되 그 안에 뿌리를
            박으며 세움을 받아 교훈을 받은 대로 믿음에 굳게 서서 감사함을 넘치게 하라&rdquo;
          </p>
          <p className="font-['Manrope'] text-[11px] font-bold text-[#0045bc]/80 mt-2 tracking-wider">
            — 골로새서 2:6-7
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-4 gap-2">
          {[
            { href: '/sunday-sermon', label: '이번주설교' },
            { href: '/discipleship#new-family', label: '새신자' },
            { href: '/bulletin', label: '주보보기' },
            { href: '/church-news-events', label: '교회소식' },
          ].map((b) => (
            <Link
              key={b.href}
              href={b.href}
              className="bg-[#eff4ff] border border-[#dbe1ff] text-[#0045bc] text-xs font-bold rounded-full py-2.5 px-1 text-center active:scale-[0.98] active:bg-[#dbe1ff] transition-all whitespace-nowrap"
            >
              {b.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Hero (데스크탑 전용, md 이상에서만 표시) */}
      <section className="hidden md:flex relative overflow-hidden min-h-[600px] items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-01.jpg" alt="물댄동산교회" fill priority className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 max-w-[960px] mx-auto px-5 md:px-6 w-full py-8 md:py-16">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#0045bc]/15">
              <span className="text-[#0045bc] text-[13px] font-semibold tracking-[0.08em]">
                COLOSSIANS 2:6-7
              </span>
            </div>
            <h1
              className="text-[40px] md:text-[56px] leading-[1.15] font-extrabold text-[#0045bc] tracking-tight"
              style={{ textShadow: '0 0 20px rgba(0, 69, 188, 0.08)' }}
            >
              복음으로 다시 세워지는 교회
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#434655] max-w-xl">
              &ldquo;그러므로 너희가 그리스도 예수를 주로 받았으니 그 안에서 행하되 그 안에 뿌리를 박으며
              세움을 받아 교훈을 받은 대로 믿음에 굳게 서서 감사함을 넘치게 하라&rdquo;
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { href: '/sunday-sermon', label: '이번주설교' },
                { href: '/discipleship#new-family', label: '새신자' },
                { href: '/bulletin', label: '주보보기' },
                { href: '/church-news-events', label: '교회소식' },
              ].map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="bg-white/80 backdrop-blur-sm text-[#0045bc] border border-[#0045bc]/20 px-6 py-3 rounded-full font-semibold hover:bg-[#0045bc] hover:text-white transition-colors"
                >
                  {b.label}
                </Link>
              ))}
              <Link
                href="/greeting"
                className="bg-[#0045bc] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1b5ce6] transition-colors"
              >
                교회 소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 이번 주 말씀 — YouTube에서 최근 설교 4개 자동 fetch (본문 성경구절만 표시) */}
      <LatestSermonCards />

      {/* Quick Links Bento */}
      <section className="py-6 md:py-12 max-w-[960px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {/* 우리의 예배 (mint) */}
          <Link
            href="/worship-guide"
            className="group relative overflow-hidden bg-[#E0F5F0] p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-10">
              <div className="space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#006b5d]">church</span>
                <h3 className="text-base md:text-2xl font-bold text-[#191c1d]">우리의 예배</h3>
                <p className="text-[#434655] text-sm leading-relaxed">
                  예배는 우리의 삶의 목적입니다. 영과 진리로 드리는 거룩한 산 제사로 나아갑니다.
                </p>
              </div>
              <span className="text-[#006b5d] text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                예배안내 자세히 <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          </Link>

          {/* 말씀과 찬양 (primary) */}
          <Link
            href="/sunday-sermon"
            className="bg-[#0045bc] p-5 md:p-8 rounded-2xl md:rounded-3xl text-white transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col h-full justify-between gap-10">
              <div className="space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#61fadf]">music_note</span>
                <h3 className="text-base md:text-2xl font-bold">말씀과 찬양</h3>
                <p className="text-white/80 text-sm leading-relaxed">감동이 있는 예배</p>
              </div>
              <span className="text-[#61fadf] text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                설교 보기 <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          </Link>

          {/* 양육과 훈련 (cream) */}
          <Link
            href="/discipleship"
            className="bg-[#FFF9E1] p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col h-full justify-between gap-10 text-[#191c1d]">
              <div className="space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#8f2f00]">menu_book</span>
                <h3 className="text-base md:text-2xl font-bold">양육과 훈련</h3>
                <p className="text-[#434655] text-sm leading-relaxed">그리스도의 제자로</p>
              </div>
              <span className="text-[#8f2f00] text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                양육 안내 <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          </Link>

          {/* 예배안내 (pink) — 시간표 */}
          <Link
            href="/worship-guide"
            className="bg-[#ffdad6] p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col h-full justify-between gap-6 text-[#191c1d]">
              <div className="space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#ba1a1a]">schedule</span>
                <h3 className="text-base md:text-2xl font-bold">예배안내</h3>
              </div>
              <ul className="space-y-2 text-xs md:text-sm">
                <li className="flex flex-col md:flex-row md:justify-between md:items-center pb-2 border-b border-white/50">
                  <span className="text-[#93000a]">주일예배</span>
                  <span className="font-bold text-[#191c1d]">오전 9시 &amp; 11시</span>
                </li>
                <li className="flex flex-col md:flex-row md:justify-between md:items-center pb-2 border-b border-white/50">
                  <span className="text-[#93000a]">수요예배</span>
                  <span className="font-bold text-[#191c1d]">오후 7시 30분</span>
                </li>
                <li className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <span className="text-[#93000a]">금요기도회</span>
                  <span className="font-bold text-[#191c1d]">오후 8시</span>
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </section>

      {/* New Family — 가로로 넓은 단일 카드 (예배안내 바로 아래) */}
      <section className="py-6 md:py-12 bg-white">
        <div className="max-w-[960px] mx-auto px-5 md:px-6">
          <div className="relative overflow-hidden rounded-3xl md:rounded-[40px] bg-gradient-to-br from-[#dbe1ff] via-[#eef2ff] to-[#E0F5F0] border border-[#e1e3e4] shadow-[0_24px_60px_-16px_rgba(0,69,188,0.12)] p-7 md:p-12 lg:p-14">
            <div className="absolute -bottom-12 -right-12 opacity-15 pointer-events-none">
              <span
                className="material-symbols-outlined text-[#0045bc]"
                style={{ fontSize: '260px', fontVariationSettings: "'FILL' 1" }}
              >
                diversity_1
              </span>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
              <div className="md:max-w-2xl">
                <h2 className="text-2xl md:text-[36px] font-bold text-[#0045bc] leading-tight mb-3">
                  처음 오셨나요?
                </h2>
                <p className="text-[#434655] text-sm md:text-lg leading-relaxed">
                  물댄동산교회는 하나님의 사랑 안에서 여러분을 환영합니다. 함께 성장하는 기쁨을 누려보세요.
                </p>
              </div>
              <Link
                href="/discipleship#new-family"
                className="inline-flex items-center justify-center gap-2 bg-[#0045bc] text-white px-7 py-4 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#0045bc]/20 hover:bg-[#1b5ce6] hover:shadow-xl hover:shadow-[#0045bc]/30 transition-all shrink-0 whitespace-nowrap"
              >
                새가족 안내 자세히 보기
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 이번주 설교 영상 (인플레이스 재생, 지난 설교 4개 표시) */}
      <FeaturedSermon />

      {/* Church News + Location */}
      <section className="py-6 md:py-12 bg-[#f8f9fa]">
        <div className="max-w-[960px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* News */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl md:text-[32px] font-bold">교회 소식</h2>
                <Link href="/church-news-events" className="text-[#0045bc] text-sm font-semibold">
                  더보기 →
                </Link>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden border border-[#e1e3e4]">
                {NEWS.map((n, i) => (
                  <Link
                    key={i}
                    href="/church-news-events"
                    className={`flex justify-between items-center p-5 md:p-6 hover:bg-[#f3f4f5] transition-colors ${
                      i !== NEWS.length - 1 ? 'border-b border-[#e1e3e4]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`px-3 py-1 text-xs font-bold rounded shrink-0 ${TAG_TONES[n.tone]}`}>
                        {n.tag}
                      </span>
                      <span className="text-[#191c1d] truncate">{n.title}</span>
                    </div>
                    <span className="text-[#434655] text-sm shrink-0 ml-3">{n.date}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-[32px] font-bold">오시는 길</h2>
              <div className="bg-white rounded-3xl overflow-hidden border border-[#e1e3e4] shadow-sm">
                {/* Map - Google Maps interactive embed */}
                <div className="relative aspect-[16/10] bg-[#dbe1ff]">
                  <iframe
                    title="물댄동산교회 지도"
                    src="https://www.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%82%A8%EC%96%91%EC%A3%BC%EC%8B%9C%20%EB%8D%95%EC%86%A12%EB%A1%9C%2063&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  {/* 외부지도 바로가기 핀 (우상단) */}
                  <a
                    href="https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%82%A8%EC%96%91%EC%A3%BC%EC%8B%9C%20%EB%8D%95%EC%86%A12%EB%A1%9C%2063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#0045bc] text-xs font-semibold px-3 py-2 rounded-full shadow-md hover:bg-white hover:shadow-lg transition"
                    aria-label="카카오맵에서 보기"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    카카오맵
                  </a>
                </div>
                {/* Info */}
                <div className="p-7 md:p-8 space-y-5">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-[#0045bc]">location_on</span>
                    <div>
                      <p className="font-bold text-[#191c1d]">경기도 남양주시 덕송2로 63(별내동)</p>
                      <p className="text-[#434655] text-sm mt-1">별가람역 인근 · 우 12097</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-[#0045bc]">call</span>
                    <p className="font-bold text-[#191c1d]">031-553-0191</p>
                  </div>
                  <div className="pt-4 border-t border-[#e1e3e4] flex gap-4">
                    <span className="material-symbols-outlined text-[#006b5d]">directions_car</span>
                    <p className="text-[#434655] text-sm">
                      교회 내 주차장 및 주일예배시 덕송초등학교 주차장 이용이 가능합니다.
                    </p>
                  </div>
                  <Link
                    href="/directions"
                    className="inline-flex items-center gap-2 text-[#0045bc] text-sm font-semibold hover:underline decoration-2 underline-offset-4"
                  >
                    오시는 길 자세히 보기
                    <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
