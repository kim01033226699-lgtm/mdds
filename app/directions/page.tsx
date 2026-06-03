'use client';

import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';

const DEFAULT = {
  address: '(12097) 경기도 남양주시 덕송2로 63(별내동)',
  phone: '031-553-0191',
  phoneHours: '평일 9시-18시\n주말 8시-17시',
  email: 'info@mdds.or.kr\npastor@mdds.or.kr',
  visitHours: '평일 9시-22시\n주말 8시-21시\n(기도실 24시간)',
  parkingSpaces: '총 50대 (지하 1층)',
  parkingFee: '무료 (예배 참석자)',
};

export default function DirectionsPage() {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/contents/directions').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data) setData({ ...DEFAULT, ...d.data });
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader pill="교회소개" title="찾아오시는 길" subtitle="물댄동산교회로 오시는 방법을 안내합니다" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mb-4 text-xl">◈</div>
            <div className="text-lg font-bold text-gray-900 mb-3">주소</div>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{data.address}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mb-4 text-xl">◰</div>
            <div className="text-lg font-bold text-gray-900 mb-3">주차 안내</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-500 mb-1">주차 가능 대수</div>
                <div className="text-gray-900 font-semibold">{data.parkingSpaces}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">주차 요금</div>
                <div className="text-gray-900 font-semibold">{data.parkingFee}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="aspect-[16/9] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              지도 영역 (Google Maps 또는 Daum Maps 연동 예정)
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 grid md:grid-cols-3 gap-6">
          {[
            { icon: '☎', title: '전화', info: `${data.phone}\n${data.phoneHours}` },
            { icon: '✉', title: '이메일', info: data.email },
            { icon: '⏱', title: '방문시간', info: data.visitHours },
          ].map((c) => (
            <div key={c.title} className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto mb-4 text-xl">
                {c.icon}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-3">{c.title}</div>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{c.info}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
