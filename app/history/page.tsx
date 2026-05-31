'use client';

import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';

const DEFAULT_STATS = [
  { num: '1961', label: '설립년도' },
  { num: '500+', label: '등록교인' },
  { num: '15', label: '섬기는 분들' },
  { num: '10+', label: '선교지' },
];

const DEFAULT_TIMELINE = [
  { year: '2023년 9월', title: '정종한 목사 담임 목사로 부임', events: ['17일 - 정종한 목사 담임 목사로 부임'] },
  { year: '2023년 5월', title: '박혜진 청소년부 교육 목사 부임', events: ['7일 - 박혜진 청소년부 교육 목사 부임'] },
  { year: '2023년 4월', title: '고난 주간 특별 새벽 기도회', events: ['3일~7일 - 고난 주간 특별 새벽 기도회', '2일 - 한명복 부목사 부임 (청년부, 찬양 담당)'] },
  { year: '2023년 1월', title: '신년 특별 새벽 기도회', events: ['2일~6일 - 신년 특별 새벽 기도회'] },
];

export default function HistoryPage() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [timeline, setTimeline] = useState(DEFAULT_TIMELINE);

  useEffect(() => {
    fetch('/api/contents/history').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data?.stats) setStats(d.data.stats.map((s: any) => ({ num: s.number, label: s.label })));
      if (d?.data?.timeline?.length) setTimeline(d.data.timeline);
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader title="교회발자취" subtitle="하나님의 은혜로 걸어온 우리 교회의 역사" />

      <section className="bg-black text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{s.num}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative pl-8 border-l-2 border-gray-300">
            {timeline.map((t) => (
              <div key={t.year + t.title} className="mb-10 relative">
                <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-black border-4 border-gray-50" />
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-xs font-bold text-gray-500 mb-2">{t.year}</div>
                  <div className="text-lg font-bold text-gray-900 mb-3">{t.title}</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {t.events.map((e) => <li key={e}>· {e}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
