'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DEFAULT = {
  pastorName: '정종한',
  pastorTitle: '담임목사',
  paragraphs: [
    '샬롬! 물댄동산교회 홈페이지에\n오신 모든 분들을 환영하며 축복합니다.',
    '물댄동산교회는 대한예수교 장로회(통합)에 소속된 교회로\n영락, 새문안, 연동, 남대문, 무학교회 등과 형제교회로\n올해 63주년(2024년)의 역사를 가지고 있으며\n지역의 동네 교회로 자리 잡고 있는 교회입니다.',
    '물댄동산교회는 순수한 사랑을 앞세우는\n예수 그리스도의 몸 된 교회로\n성도들 모두가 함께 행복한 교회를 만들어 가고 있습니다.\n또한, 하나님께서 기뻐하시는 교회 되기 위해\n말씀과 찬양과 기도가 어우러진 살아있는 예배를 드리고 있습니다.',
    '예배의 감동을 꿈꾸며 좋은 교회를 소망하는 모든 이들에게\n작은 쉼을 주기를 바라며 주님의 이름으로\n여러분을 사랑하며 축복합니다.',
    '감사합니다',
  ],
  signature: '물댄동산교회 담임목사 정종한 목사',
};

const VISIONS = [
  {
    icon: 'favorite',
    iconFill: true,
    title: '하나님의 사랑을 전하는 교회',
    desc: '예수 그리스도의 사랑을 실천하며, 모든 사람에게 하나님의 은혜를 전하는 교회',
    bg: 'bg-[#ffdad6]',
    fg: 'text-[#ba1a1a]',
  },
  {
    icon: 'trending_up',
    iconFill: false,
    title: '함께 성장하는 교회',
    desc: '모든 성도가 하나님의 말씀을 통해 영적으로 성장하며, 서로를 격려하는 교회',
    bg: 'bg-[#5df7dc]',
    fg: 'text-[#006f61]',
  },
  {
    icon: 'groups',
    iconFill: false,
    title: '섬김의 교회',
    desc: '지역사회와 세계에 하나님의 사랑을 실천하며 낮은 자세로 섬기는 교회',
    bg: 'bg-[#1b5ce6]',
    fg: 'text-[#e1e6ff]',
  },
];

export default function GreetingPage() {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/contents/greeting')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.data) setData({ ...DEFAULT, ...d.data });
      })
      .catch(() => {});
  }, []);

  // paragraphs roles: [0]=welcome heading, [1..n-3]=body, [n-2]=italic quote, [n-1]=closing
  const welcome = data.paragraphs[0];
  const body = data.paragraphs.slice(1, -2);
  const italicQuote = data.paragraphs[data.paragraphs.length - 2];
  const closing = data.paragraphs[data.paragraphs.length - 1];

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-['Manrope']">
      {/* Section Header (pseudo-hero) */}
      <section className="bg-[#f3f4f5] pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-left">
          <span className="inline-block px-4 py-1 bg-[#006b5d] text-white rounded-full text-sm font-semibold mb-4">
            인사말
          </span>
          <h1 className="text-4xl md:text-[48px] leading-[1.15] font-extrabold text-[#191c1d] tracking-tight">
            담임목사 인사말
          </h1>
          <div className="w-16 h-1 bg-[#0045bc] mt-6 rounded-full" />
        </div>
      </section>

      {/* Welcome Message + Profile Sidebar */}
      <main className="relative z-20 pb-16 md:pb-20 -mt-2">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Welcome Message */}
            <div className="lg:col-span-8 bg-white rounded-xl shadow-sm p-8 md:p-10 space-y-8">
              <div className="border-l-4 border-[#0045bc] pl-6">
                <h2 className="text-2xl md:text-[32px] font-bold text-[#191c1d] leading-tight whitespace-pre-line">
                  {welcome}
                </h2>
              </div>

              <div className="space-y-6 text-[#434655] text-base md:text-lg leading-relaxed">
                {body.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}

                <div className="bg-[#E0F5F0]/40 p-7 md:p-8 rounded-lg italic whitespace-pre-line">
                  &ldquo;{italicQuote}&rdquo;
                </div>

                <p className="pt-4 whitespace-pre-line">{closing}</p>
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-[#e1e3e4] text-right">
                <p className="font-bold text-[#191c1d]">
                  물댄동산교회 {data.pastorTitle}{' '}
                  <span className="text-[#0045bc] text-2xl ml-2">{data.pastorName} 목사</span>
                </p>
              </div>
            </div>

            {/* Right: Profile Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="rounded-xl overflow-hidden bg-[#E0F5F0]">
                {/* Decorative top */}
                <div className="h-40 md:h-48 bg-[#61fadf]/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span
                      className="material-symbols-outlined text-[120px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      church
                    </span>
                  </div>
                </div>
                {/* Pastor card */}
                <div className="p-8 -mt-16 text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-[#E0F5F0] mx-auto overflow-hidden mb-4 bg-white shadow-md">
                    <Image
                      src="/pastor01.png"
                      alt={`${data.pastorName} ${data.pastorTitle}`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-[#191c1d]">
                    {data.pastorName} 목사
                  </h4>
                  <p className="text-[#006b5d] text-sm font-semibold uppercase tracking-wider mt-1">
                    {data.pastorTitle}
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/board"
                      className="w-full py-3 bg-[#0045bc] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#1b5ce6] transition-colors"
                    >
                      <span className="material-symbols-outlined">mail</span>
                      문의하기
                    </Link>
                    <Link
                      href="/sunday-sermon"
                      className="w-full py-3 border border-[#c3c6d7] text-[#191c1d] rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#edeeef] transition-colors"
                    >
                      <span className="material-symbols-outlined">menu_book</span>
                      설교 모음
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Vision Section */}
      <section className="bg-[#f3f4f5] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[40px] font-extrabold text-[#191c1d] mb-4 tracking-tight">
            우리 교회의 비전
          </h2>
          <div className="w-20 h-1 bg-[#0045bc] mx-auto rounded-full" />
        </div>

        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {VISIONS.map((v) => (
              <div
                key={v.title}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 text-center group"
              >
                <div
                  className={`w-16 h-16 ${v.bg} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl ${v.fg}`}
                    style={v.iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {v.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#191c1d] mb-4">{v.title}</h3>
                <p className="text-[#434655] text-base leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
