'use client';

import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';

const DEFAULT_SERVICES = [
  { icon: '☀', title: '주일예배', time: '오전 9시, 11시', description: '주일예배는 하나님께 영광을 돌리는 가장 중요한 예배입니다. 말씀과 찬양, 기도로 구성되어 있습니다.' },
  { icon: '✦', title: '수요예배', time: '오후 7시 30분', description: '중보기도와 말씀으로 구성된 수요예배입니다. 교회와 성도들을 위한 기도가 중심입니다.' },
  { icon: '◉', title: '금요기도회', time: '오후 8시', description: '깊은 기도와 찬양으로 구성된 금요기도회입니다.' },
];

const ICONS = ['☀', '✦', '◉'];

const guides = [
  { icon: '♥', title: '환영', content: '처음 오신 분들을 환영합니다. 안내데스크에서 도움을 받으실 수 있습니다.' },
  { icon: '⏱', title: '시간 준수', content: '예배 시작 10분 전에 도착하여 마음을 준비해주시기 바랍니다.' },
  { icon: '◈', title: '복장', content: '하나님께 예배드리는 마음으로 단정한 복장을 권합니다.' },
  { icon: '◐', title: '자모실', content: '어린 자녀가 있는 경우 본당 출입문 옆 자모실을 이용하세요.' },
  { icon: '☰', title: '성경과 찬송가', content: '성경과 찬송가는 자리 앞에 준비되어 있습니다.' },
  { icon: '✿', title: '헌금', content: '헌금은 하나님께 감사하는 마음으로 자유롭게 드릴 수 있습니다.' },
];

export default function WorshipPage() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    fetch('/api/contents/worship').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data?.services) {
        setServices(d.data.services.map((s: any, i: number) => ({ ...s, icon: ICONS[i] || '◉' })));
      }
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader title="예배안내" subtitle="하나님께 드리는 경건한 예배를 위해 준비하세요" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">예배시간</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-lg transition">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-5 text-2xl">
                  {s.icon}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">{s.title}</div>
                <div className="text-base text-gray-700 font-semibold mb-4">{s.time}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">예배 안내사항</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {guides.map((g) => (
              <div key={g.title} className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 text-lg">
                  {g.icon}
                </div>
                <div className="text-base font-bold text-gray-900 mb-2">{g.title}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{g.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-3xl mb-4">◰</div>
          <h2 className="text-xl font-bold mb-3">주차 안내</h2>
          <p className="text-gray-400 mb-6 text-sm">교회 내 주차장을 이용하실 수 있습니다.</p>
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            <div>
              <div className="text-xs text-gray-500 mb-1">주차 가능 대수</div>
              <div className="text-base font-semibold">총 50대 (지하 1층)</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">주차 요금</div>
              <div className="text-base font-semibold">무료 (예배 참석자)</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
