'use client';

import PageHeader from '@/components/PageHeader';
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
  { icon: '♥', title: '하나님의 사랑을 전하는 교회', desc: '예수 그리스도의 사랑을 실천하며, 모든 사람에게 하나님의 은혜를 전하는 교회' },
  { icon: '✦', title: '함께 성장하는 교회', desc: '모든 성도가 하나님의 말씀을 통해 영적으로 성장하며, 서로를 격려하는 교회' },
  { icon: '◉', title: '섬김의 교회', desc: '지역사회와 세계에 하나님의 사랑을 실천하며 섬기는 교회' },
];

export default function GreetingPage() {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/contents/greeting').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data) setData({ ...DEFAULT, ...d.data });
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader title="담임목사 인사말" subtitle="하나님의 사랑 안에서 함께하는 교회로 초대합니다" />

      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/hero-01.jpg"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4 py-20 md:py-28">
          <div className="bg-sky-500/25 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl p-6 md:p-12">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
              <div className="w-44 md:w-56 aspect-square rounded-2xl overflow-hidden relative shadow-xl shrink-0 mx-auto md:mx-0">
                <Image src="/pastor01.png" alt={data.pastorName} fill style={{ objectFit: 'cover' }} />
              </div>

              <div className="text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-6 leading-snug drop-shadow">
                  {data.paragraphs[0]}
                </h2>
                <div className="space-y-4 text-white/95 text-[15px] md:text-base leading-loose">
                  {data.paragraphs.slice(1).map((p, i) => <p key={i}>{p}</p>)}
                  <p className="text-right pt-4">
                    <strong>{data.signature}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">우리 교회의 비전</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VISIONS.map((v) => (
              <div key={v.title} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className="bg-black text-white text-center py-6">
                  <div className="text-3xl mb-2">{v.icon}</div>
                  <div className="text-base font-bold">{v.title}</div>
                </div>
                <div className="p-6 text-sm text-gray-600 leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
