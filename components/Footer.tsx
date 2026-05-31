'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#0b1c30] text-white font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* 브랜드 */}
        <div className="flex flex-col gap-3">
          <div className="font-['Hanken_Grotesk'] text-lg font-bold text-[#f8f9ff]">
            물댄동산교회
          </div>
          <p className="text-xs text-[#d3e4fe] max-w-xs mx-auto md:mx-0 leading-relaxed">
            하나님의 사랑 안에서 함께하는 물댄동산교회입니다. 모두를 환영합니다.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-[#d3e4fe]">
            <li>경기도 남양주시 덕송2로 63</li>
            <li>TEL 031-553-0191</li>
            <li>info@mdds.or.kr</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#a8c8ff] uppercase mb-1">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <Link href="/directions" className="text-[#d3e4fe] hover:text-white transition">
              오시는길
            </Link>
            <Link href="/worship-guide" className="text-[#d3e4fe] hover:text-white transition">
              예배안내
            </Link>
            <Link href="/discipleship#new-family" className="text-[#a8c8ff] font-semibold hover:text-white transition">
              새가족 안내
            </Link>
            <Link href="/bulletin" className="text-[#d3e4fe] hover:text-white transition">
              주보보기
            </Link>
            <Link href="/church-news-events" className="text-[#d3e4fe] hover:text-white transition">
              교회소식
            </Link>
            <Link href="/sunday-sermon" className="text-[#d3e4fe] hover:text-white transition">
              주일설교
            </Link>
          </div>
        </div>

        {/* SNS + 카피라이트 */}
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex gap-4">
            <a
              href="https://www.youtube.com/@mdds"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="material-symbols-outlined text-[#a8c8ff] hover:text-white transition"
            >
              play_circle
            </a>
            <a
              href="/event-album-family"
              aria-label="교회행사앨범"
              className="material-symbols-outlined text-[#a8c8ff] hover:text-white transition"
            >
              camera
            </a>
            <a
              href="/board"
              aria-label="문의게시판"
              className="material-symbols-outlined text-[#a8c8ff] hover:text-white transition"
            >
              forum
            </a>
          </div>
          <p className="text-xs text-[#d3e4fe] md:text-right mt-auto">
            © {new Date().getFullYear()} 물댄동산교회. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
