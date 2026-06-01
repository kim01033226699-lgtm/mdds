'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const DEFAULT = {
  pastorName: '정종한',
  pastorTitle: '담임목사',
  paragraphs: [
    '샬롬! 물댄동산교회 홈페이지에 오신 모든 분들을 환영하며 축복합니다.',
    '물댄동산교회는 대한예수교 장로회(통합)에 소속된 교회로 영락, 새문안, 연동, 남대문, 무학교회 등과 형제교회로 올해 63주년(2024년)의 역사를 가지고 있으며 지역의 동네 교회로 자리 잡고 있는 교회입니다.',
    '물댄동산교회는 순수한 사랑을 앞세우는 예수 그리스도의 몸 된 교회로 성도들 모두가 함께 행복한 교회를 만들어 가고 있습니다. 또한, 하나님께서 기뻐하시는 교회 되기 위해 말씀과 찬양과 기도가 어우러진 살아있는 예배를 드리고 있습니다.',
    '예배의 감동을 꿈꾸며 좋은 교회를 소망하는 모든 이들에게 작은 쉼을 주기를 바라며 주님의 이름으로 여러분을 사랑하며 축복합니다.',
    '감사합니다.',
  ],
  signature: '물댄동산교회 담임목사 정종한 목사',
};

const VISIONS = [
  {
    icon: 'favorite',
    title: '하나님의 사랑을 전하는 교회',
    desc: '예수 그리스도의 사랑을 실천하며, 모든 사람에게 하나님의 은혜를 전하는 교회',
    bg: 'bg-[#cadcff]',
    fg: 'text-[#00488d]',
  },
  {
    icon: 'trending_up',
    title: '함께 성장하는 교회',
    desc: '모든 성도가 하나님의 말씀을 통해 영적으로 성장하며, 서로를 격려하는 교회',
    bg: 'bg-[#86f2e4]',
    fg: 'text-[#006f66]',
  },
  {
    icon: 'groups',
    title: '섬김의 교회',
    desc: '지역사회와 세계에 하나님의 사랑을 실천하며 낮은 자세로 섬기는 교회',
    bg: 'bg-[#d8d7ff]',
    fg: 'text-[#2f2ebe]',
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

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 -z-10 bg-[#0b1c30]">
          <Image
            src="/hero-01.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-[40px] font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.4)] tracking-tight">
            담임목사 인사말
          </h1>
          <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-white/90 [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
            하나님의 사랑 안에서 함께하는 교회로 초대합니다.
          </p>
          <div className="w-16 h-1 bg-white mx-auto rounded-full mt-6" />
        </div>
      </section>

      {/* Greeting Content (glass panel overlapping hero) */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 -mt-12 md:-mt-16 relative z-10 pb-12 md:pb-16">
        <div className="bg-white/95 backdrop-blur-xl border border-[#c2c6d4] rounded-xl shadow-[0_20px_60px_rgba(11,28,48,0.12)] p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Pastor image */}
          <div className="w-full lg:w-1/3 shrink-0 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#00488d] to-[#86f2e4] opacity-30 blur-lg rounded-xl group-hover:opacity-50 transition-opacity" />
              <div className="relative w-56 md:w-72 lg:w-80 aspect-square rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/pastor01.png"
                  alt={data.pastorName}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Welcome text */}
          <div className="flex-1 space-y-6 text-[#0b1c30]">
            <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold text-[#00488d] leading-snug tracking-tight">
              {data.paragraphs[0]}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-[#424752]">
              {data.paragraphs.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="pt-6 border-t border-[#c2c6d4] text-right">
              <p className="font-['Hanken_Grotesk'] text-base md:text-lg font-semibold text-[#0b1c30]">
                물댄동산교회 {data.pastorTitle}
                <span className="text-[#00488d] text-2xl md:text-3xl font-bold ml-3">
                  {data.pastorName} 목사
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-[#eff4ff] py-16 md:py-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-['Hanken_Grotesk'] text-3xl md:text-[40px] font-bold text-[#0b1c30] tracking-tight">
              우리 교회의 비전
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VISIONS.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-[#c2c6d4] p-8 rounded-xl flex flex-col items-center text-center transition-all hover:border-[#00488d] hover:shadow-[0_8px_24px_rgba(0,72,141,0.1)] group"
              >
                <div
                  className={`w-16 h-16 ${v.bg} rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <span className={`material-symbols-outlined text-4xl ${v.fg}`}>
                    {v.icon}
                  </span>
                </div>
                <h3 className="font-['Hanken_Grotesk'] text-lg md:text-xl font-semibold text-[#0b1c30] mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-[#424752] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
