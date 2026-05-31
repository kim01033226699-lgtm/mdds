'use client';

import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';

type Member = { name: string; position: string; desc?: string };
type Category = { title: string; members: Member[] };

const DEFAULT: Category[] = [
  { title: '담임목사', members: [{ name: '정종한', position: '담임목사', desc: '약력' }] },
  {
    title: '교역자',
    members: [
      { name: '송봉길', position: '부목사' },
      { name: '김호년', position: '부목사' },
      { name: '박혜진', position: '교육목사' },
      { name: '김은숙', position: '전도사' },
      { name: '김숙정', position: '전도사' },
    ],
  },
  {
    title: '시무장로',
    members: [
      { name: '강영철', position: '시무장로' },
      { name: '김형곤', position: '시무장로' },
      { name: '김종인', position: '시무장로' },
      { name: '김상수', position: '시무장로' },
    ],
  },
  {
    title: '원로장로',
    members: [
      { name: '김유철', position: '원로장로' },
      { name: '김광율', position: '원로장로' },
    ],
  },
];

export default function ServingPage() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT);

  useEffect(() => {
    fetch('/api/contents/serving').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data?.categories?.length) setCategories(d.data.categories);
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader title="섬기는 사람들" subtitle="물댄동산교회를 섬기는 분들을 소개합니다" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 space-y-16">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">{cat.title}</h2>
              <div className="w-12 h-0.5 bg-black mx-auto mb-10" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cat.members.map((m) => (
                  <div
                    key={m.name}
                    className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                      ◉
                    </div>
                    <div className="text-base font-bold text-gray-900 mb-1">{m.name}</div>
                    <div className="text-xs text-gray-600 font-semibold">{m.position}</div>
                    {m.desc && <div className="text-xs text-gray-500 mt-2">{m.desc}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[
            { icon: '☎', title: '전화', info: '031-553-0191\n평일 오전 9시 - 오후 6시' },
            { icon: '✉', title: '이메일', info: 'info@mdds.or.kr' },
            { icon: '◈', title: '주소', info: '경기도 남양주시 덕송2로 63 (별내동) 프라자빌딩 3,4층' },
          ].map((c) => (
            <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl">
                {c.icon}
              </div>
              <div className="text-base font-bold text-gray-900 mb-3">{c.title}</div>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{c.info}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
