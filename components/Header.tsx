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
    label: '다음세대',
    items: [
      { label: '유치부', href: '/kindergarten' },
      { label: '아동부', href: '/children' },
      { label: '청소년부', href: '/youth' },
      { label: '청년부', href: '/young-adult' },
    ],
  },
  {
    label: '선교후원',
    items: [{ label: '선교후원 및 기관', href: '/mission-support' }],
  },
  {
    label: '성도의 교제',
    items: [
      { label: '교회소식 & 이달의 행사', href: '/church-news-events' },
      { label: '주보보기', href: '/bulletin' },
      { label: '교회행사앨범 & 새가족소개', href: '/event-album-family' },
      { label: '문의게시판', href: '/board' },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const isActive = (menu: typeof menus[number]) => {
    if ('href' in menu && menu.href) return pathname === menu.href;
    if ('items' in menu && menu.items) return menu.items.some((item) => pathname === item.href);
    return false;
  };

  return (
    <header className="bg-white border-b border-[#c2c6d4] sticky top-0 z-50 font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 flex justify-between items-center gap-4">
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
                {'href' in menu ? (
                  <Link
                    href={menu.href!}
                    className={`block pb-1 text-sm font-medium transition-colors ${
                      active
                        ? 'text-[#00488d] border-b-2 border-[#00488d]'
                        : 'text-[#424752] hover:text-[#00488d] border-b-2 border-transparent'
                    }`}
                  >
                    {menu.label}
                  </Link>
                ) : (
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
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/sunday-sermon"
            className="hidden lg:block text-sm font-semibold text-[#00488d] hover:underline"
          >
            라이브
          </Link>
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

      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-[#c2c6d4]">
          <ul>
            {menus.map((menu) => (
              <li key={menu.label} className="border-b border-[#c2c6d4]">
                {'href' in menu ? (
                  <Link
                    href={menu.href!}
                    className="block px-5 py-3 text-sm font-semibold text-[#0b1c30] hover:bg-[#eff4ff]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {menu.label}
                  </Link>
                ) : (
                  <details>
                    <summary className="px-5 py-3 text-sm font-semibold text-[#0b1c30] cursor-pointer hover:bg-[#eff4ff]">
                      {menu.label}
                    </summary>
                    <ul className="bg-[#eff4ff]">
                      {menu.items?.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block px-8 py-2 text-sm text-[#424752] hover:text-[#00488d]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
