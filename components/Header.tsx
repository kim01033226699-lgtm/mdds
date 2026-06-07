'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const menus = [
  { label: 'HOME', href: '/' },
  {
    label: '교회소개',
    items: [
      { label: '인사말', href: '/greeting' },
      { label: '교회발자취', href: '/history' },
      { label: '섬기는사람들', href: '/serving' },
      { label: '예배안내', href: '/worship-guide' },
      { label: '교회시설안내', href: '/facilities' },
      { label: '차량 운행안내', href: '/vehicle' },
      { label: '찾아오시는 길', href: '/directions' },
    ],
  },
  {
    label: '말씀과 찬양',
    items: [
      { label: '주일설교', href: '/sunday-sermon' },
      { label: '샤론찬양대', href: '/sharon-choir' },
      { label: '시온찬양대', href: '/zion-choir' },
    ],
  },
  { label: '양육/훈련', href: '/discipleship' },
  {
    label: '선교후원',
    items: [
      { label: '선교후원 및 기관', href: '/mission-support' },
      { label: '해외선교 소식', href: '/missionary-news' },
    ],
  },
  {
    label: '다음세대',
    items: [
      { label: '유치부', href: '/kindergarten' },
      { label: '아동부', href: '/children' },
      { label: '청소년부', href: '/youth' },
      { label: '청년부', href: '/young-adult' },
    ],
  },
  {
    label: '성도의 교제',
    items: [
      { label: '교회소식', href: '/church-news-events' },
      { label: '주보보기', href: '/bulletin' },
      { label: '이달의 행사', href: '/monthly-events' },
      { label: '교회행사앨범', href: '/event-album-family' },
      { label: '새가족소개', href: '/new-family-intro' },
      { label: '문의게시판', href: '/board' },
    ],
  },
];

const QUICK_MENU = [
  { href: '/sunday-sermon', icon: 'mic', label: '이번주설교' },
  { href: '/bulletin', icon: 'menu_book', label: '주보' },
  { href: '/church-news-events', icon: 'campaign', label: '공지사항' },
];

const CATEGORY_ICONS: Record<string, string> = {
  '교회소개': 'church',
  '말씀과 찬양': 'music_note',
  '양육/훈련': 'school',
  '선교후원': 'volunteer_activism',
  '다음세대': 'groups',
  '성도의 교제': 'forum',
};

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [live, setLive] = useState<{ live: boolean; url: string } | null>(null);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // 유튜브 라이브 상태 폴링 (60초마다)
  useEffect(() => {
    let alive = true;
    const check = () => {
      fetch('/api/youtube/live')
        .then((r) => r.json())
        .then((d: { live?: boolean; url?: string }) => {
          if (alive) setLive({ live: !!d.live, url: d.url || 'https://www.youtube.com/@mdds/live' });
        })
        .catch(() => {});
    };
    check();
    const t = setInterval(check, 60000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  // 모바일 메뉴 열림 시 body 스크롤 잠금
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  if (pathname?.startsWith('/admin')) return null;

  const isActive = (menu: typeof menus[number]) => {
    if ('href' in menu && menu.href) return pathname === menu.href;
    if ('items' in menu && menu.items) return menu.items.some((item) => pathname === item.href);
    return false;
  };

  return (
    <header className="bg-white border-b border-[#c2c6d4] sticky top-0 z-50 font-['Inter']">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 h-16 flex justify-between items-center gap-4">
        <Link
          href="/"
          className="font-['Hanken_Grotesk'] text-lg font-bold text-[#00488d] tracking-tight whitespace-nowrap shrink-0"
        >
          물댄동산교회
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {menus.map((menu, i) => {
            const active = isActive(menu);
            return (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(i)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {(() => {
                  const directHref =
                    'href' in menu
                      ? menu.href!
                      : menu.items && menu.items.length === 1
                      ? menu.items[0].href
                      : null;

                  if (directHref) {
                    return (
                      <Link
                        href={directHref}
                        className={`block pb-1 text-sm font-medium transition-colors ${
                          active
                            ? 'text-[#00488d] border-b-2 border-[#00488d]'
                            : 'text-[#424752] hover:text-[#00488d] border-b-2 border-transparent'
                        }`}
                      >
                        {menu.label}
                      </Link>
                    );
                  }

                  return (
                    <>
                      <button
                        className={`block pb-1 text-sm font-medium transition-colors ${
                          active
                            ? 'text-[#00488d] border-b-2 border-[#00488d]'
                            : 'text-[#424752] hover:text-[#00488d] border-b-2 border-transparent'
                        }`}
                      >
                        {menu.label}
                      </button>
                      {openMenu === i && menu.items && (
                        <div className="absolute top-full left-0 pt-2 min-w-[200px] z-50">
                          <ul className="bg-white border border-[#c2c6d4] rounded-xl py-2 shadow-[0_8px_24px_rgba(11,28,48,0.08)]">
                            {menu.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    pathname === item.href
                                      ? 'bg-[#e5eeff] text-[#00488d] font-semibold'
                                      : 'text-[#424752] hover:bg-[#eff4ff] hover:text-[#00488d]'
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {live?.live ? (
            <a
              href={live.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#e53935] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-[#c62828] transition-colors"
              aria-label="유튜브 라이브 시청"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              라이브 ON
            </a>
          ) : (
            <Link
              href="/sunday-sermon"
              className="hidden lg:block text-sm font-semibold text-[#00488d] hover:underline"
            >
              라이브
            </Link>
          )}
          <Link
            href="/discipleship#new-family"
            className="hidden md:inline-block bg-[#00488d] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#005fb8] transition-colors"
          >
            새가족 안내
          </Link>
          <button
            className="md:hidden text-[#00488d] text-2xl leading-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            ☰
          </button>
        </div>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      <aside
        className={`md:hidden fixed inset-0 bg-[#eef2f8] z-[70] transition-opacity duration-300 ease-out flex flex-col ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 h-14 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="메뉴 닫기"
            className="w-10 h-10 inline-flex items-center justify-center text-[#0b1c30]"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            aria-label="홈"
            className="w-10 h-10 inline-flex items-center justify-center text-[#0b1c30]"
          >
            <span className="material-symbols-outlined">home</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-6">
          {/* CTA */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <h2 className="font-['Manrope'] text-[18px] font-extrabold text-[#0b1c30] leading-tight">
              처음 오셨나요?
              <br />
              물댄동산교회에 오신 것을 환영합니다!
            </h2>
            <Link
              href="/discipleship#new-family"
              onClick={() => setMobileOpen(false)}
              className="shrink-0 inline-flex items-center gap-1 bg-[#0045bc] text-white px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap hover:bg-[#1b5ce6] transition-colors"
            >
              새가족안내
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* 3-카드 빠른 메뉴 */}
          <div className="grid grid-cols-3 gap-3">
            {QUICK_MENU.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                onClick={() => setMobileOpen(false)}
                className="bg-white rounded-2xl p-4 flex flex-col gap-6 shadow-[0_2px_8px_rgba(11,28,48,0.04)] active:scale-[0.98] transition-transform"
              >
                <span
                  className="material-symbols-outlined text-3xl text-[#0045bc]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {q.icon}
                </span>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-bold text-[#0b1c30] truncate">{q.label}</span>
                  <span className="material-symbols-outlined text-base text-[#0045bc] shrink-0">
                    chevron_right
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 카테고리 리스트 (카드형) */}
          <nav>
            <ul className="space-y-2">
              {menus
                .filter((m) => m.label !== 'HOME')
                .map((menu) => {
                  const icon = CATEGORY_ICONS[menu.label] || 'folder';
                  const directHref =
                    'href' in menu
                      ? menu.href!
                      : menu.items && menu.items.length === 1
                      ? menu.items[0].href
                      : null;

                  if (directHref) {
                    return (
                      <li key={menu.label}>
                        <Link
                          href={directHref}
                          onClick={() => setMobileOpen(false)}
                          className="bg-white rounded-2xl flex items-center gap-3 px-4 py-3.5 shadow-[0_2px_8px_rgba(11,28,48,0.04)]"
                        >
                          <span className="w-10 h-10 rounded-full bg-[#dbe6f7] inline-flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[#0045bc] text-xl">
                              {icon}
                            </span>
                          </span>
                          <span className="flex-1 text-sm font-bold text-[#0b1c30]">
                            {menu.label}
                          </span>
                          <span className="material-symbols-outlined text-[#0045bc]">
                            chevron_right
                          </span>
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={menu.label}>
                      <details className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(11,28,48,0.04)] [&[open]_.chev]:rotate-90">
                        <summary className="list-none cursor-pointer flex items-center gap-3 px-4 py-3.5">
                          <span className="w-10 h-10 rounded-full bg-[#dbe6f7] inline-flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[#0045bc] text-xl">
                              {icon}
                            </span>
                          </span>
                          <span className="flex-1 text-sm font-bold text-[#0b1c30]">
                            {menu.label}
                          </span>
                          <span className="chev material-symbols-outlined text-[#0045bc] transition-transform">
                            chevron_right
                          </span>
                        </summary>
                        <ul className="bg-[#f6f9fc] border-t border-[#e1e8f0]">
                          {menu.items?.map((item) => (
                            <li key={item.href} className="border-t border-white first:border-t-0">
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block pl-[68px] pr-4 py-3 text-sm text-[#424752] active:bg-[#dbe1ff]"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </aside>
    </header>
  );
}
