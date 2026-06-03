'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';

type ScheduleItem = { name: string; time: string; place: string };
type ScheduleGroup = { title: string; subtitle?: string; icon: string; items: ScheduleItem[] };

const DEFAULT_GROUPS: ScheduleGroup[] = [
  {
    title: '예배',
    icon: 'sunny',
    items: [
      { name: '주일 1부 예배', time: '오전 9:30', place: '본당' },
      { name: '주일 2부 예배', time: '오전 11:30', place: '본당' },
      { name: '주일 오후 찬양예배', time: '오후 2:30', place: '본당' },
      { name: '수요기도회', time: '오후 7:30', place: '본당' },
      { name: '금요기도회', time: '오후 9:00', place: '본당' },
      { name: '새벽기도회 (월~금)', time: '오전 5:30', place: '본당' },
    ],
  },
  {
    title: '예배 및 모임',
    icon: 'groups',
    items: [
      { name: '유치부', time: '오전 11:30', place: '유치부실' },
      { name: '아동부', time: '오전 11:30', place: 'B1 아동부실' },
      { name: '청소년부', time: '오전 11:00', place: 'B1 청소년부' },
      { name: '청년부', time: '오후 2:00', place: 'B1 청년부실' },
    ],
  },
  {
    title: '기타모임',
    icon: 'child_care',
    items: [
      { name: '새가족교육', time: '주일 1, 2부 예배 후', place: '새가족실' },
      { name: '화요전도팀', time: '매주 화 오후 2:00', place: '새가족실' },
      { name: '수요중보기도', time: '매주 수 오전 10:00', place: '청년부실' },
      { name: '젊은부부모임', time: '매 주일 오후 2:00', place: '아동부실' },
    ],
  },
];

const GUIDES = [
  {
    icon: 'favorite',
    iconFill: true,
    title: '환영',
    content:
      '처음 오신 분들을 진심으로 환영합니다. 로비 안내데스크에서 등록 및 교회 안내를 받으실 수 있습니다.',
    wide: true,
  },
  {
    icon: 'schedule',
    title: '시간 준수',
    content: '예배 시작 10분 전에 도착하여 기도로 준비해주세요.',
  },
  {
    icon: 'checkroom',
    title: '복장',
    content: '하나님께 드리는 정성을 담아 단정한 복장을 권장합니다.',
  },
  {
    icon: 'baby_changing_station',
    title: '자모실',
    content: '어린 자녀가 있는 경우 본당 옆 자모실을 이용하세요.',
  },
  {
    icon: 'menu_book',
    title: '성경과 찬송가',
    content:
      '성경과 찬송가는 각 좌석 앞에 비치되어 있습니다. 개인 성경을 지참하시면 더욱 깊은 묵상에 도움이 됩니다.',
    wide: true,
  },
  {
    icon: 'volunteer_activism',
    title: '헌금',
    content: '감사하는 마음으로 자유롭게 드릴 수 있습니다.',
  },
];

export default function WorshipPage() {
  const [groups, setGroups] = useState<ScheduleGroup[]>(DEFAULT_GROUPS);

  useEffect(() => {
    fetch('/api/contents/worship')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.data?.groups?.length) setGroups(d.data.groups);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <PageHeader
        pill="교회소개"
        title="예배 안내"
        subtitle="하나님께 드리는 경건한 예배를 위해 준비하세요"
      />

      <main className="max-w-[1200px] mx-auto">
        {/* 예배시간 */}
        <section className="py-12 md:py-16 px-5 md:px-6">
          <div className="mb-10">
            <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold text-[#0b1c30] mb-2 flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-[#00488d]">schedule</span>
              예배시간
            </h2>
            <div className="h-1 w-16 bg-[#00488d] rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {groups.map((g) => (
              <div
                key={g.title}
                className="bg-white border border-[#c2c6d4] rounded-xl p-6 md:p-7 flex flex-col hover:border-[#00488d] hover:shadow-[0_8px_24px_rgba(0,72,141,0.08)] transition-all"
              >
                <div className="flex items-center gap-2 mb-1 text-[#00488d]">
                  <span className="material-symbols-outlined">{g.icon}</span>
                  {g.subtitle && (
                    <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider uppercase">
                      {g.subtitle}
                    </span>
                  )}
                </div>
                <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold mb-4 tracking-tight">
                  {g.title}
                </h3>

                {/* table */}
                <div className="flex-1">
                  <div className="grid grid-cols-[1.4fr_1fr_0.8fr] gap-3 pb-2 border-b border-[#c2c6d4]">
                    <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#00488d] uppercase">
                      구분
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#00488d] uppercase">
                      시간
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#00488d] uppercase">
                      장소
                    </span>
                  </div>
                  <ul>
                    {g.items.map((it, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[1.4fr_1fr_0.8fr] gap-3 py-3 border-b border-[#eff4ff] last:border-b-0 items-center"
                      >
                        <span className="text-sm font-semibold text-[#0b1c30]">{it.name}</span>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#00488d] tabular-nums">
                          {it.time}
                        </span>
                        <span className="text-xs text-[#424752]">{it.place}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 예배 안내사항 - Bento */}
        <section className="py-12 md:py-16 px-5 md:px-6 bg-[#eff4ff]">
          <div className="mb-10">
            <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold text-[#0b1c30] mb-2 flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-[#00488d]">info</span>
              예배 안내사항
            </h2>
            <p className="text-sm text-[#424752]">
              모두가 은혜로운 예배를 드릴 수 있도록 협조 부탁드립니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {GUIDES.map((g) =>
              g.wide ? (
                <div
                  key={g.title}
                  className="md:col-span-2 bg-white p-6 border border-[#c2c6d4] rounded-xl flex gap-4 items-start"
                >
                  <div className="p-2 bg-[#d6e3ff] rounded-lg shrink-0">
                    <span
                      className="material-symbols-outlined text-[#00488d]"
                      style={g.iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {g.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-['Hanken_Grotesk'] text-lg font-semibold mb-1">
                      {g.title}
                    </h4>
                    <p className="text-sm text-[#424752] leading-relaxed">{g.content}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={g.title}
                  className="bg-white p-6 border border-[#c2c6d4] rounded-xl flex flex-col items-center text-center"
                >
                  <span className="material-symbols-outlined text-[#00488d] text-3xl mb-2">
                    {g.icon}
                  </span>
                  <h4 className="font-['Hanken_Grotesk'] text-lg font-semibold mb-1">
                    {g.title}
                  </h4>
                  <p className="text-xs text-[#424752] leading-relaxed">{g.content}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* 주차 안내 */}
        <section className="py-12 md:py-16 px-5 md:px-6">
          <div className="bg-[#0b1c30] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-[#f8f9ff] gap-8 overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '300px' }}>
                local_parking
              </span>
            </div>
            <div className="relative z-10 md:w-1/2">
              <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-2 tracking-tight">
                <span className="material-symbols-outlined text-[#89f5e7]">local_parking</span>
                주차 안내
              </h2>
              <p className="text-base text-[#d3e4fe] mb-8 leading-relaxed">
                교회를 방문하시는 성도님들과 방문객들을 위해 쾌적한 주차 공간이 마련되어 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#d3e4fe] uppercase mb-1">
                    주차 가능 대수
                  </p>
                  <p className="font-['Hanken_Grotesk'] text-lg font-semibold">
                    총 50대 (지하 1층)
                  </p>
                </div>
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#d3e4fe] uppercase mb-1">
                    주차 요금
                  </p>
                  <p className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#89f5e7]">
                    무료 (예배 참석자)
                  </p>
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#89f5e7] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#00201d]">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#d3e4fe]">오시는 길</p>
                    <p className="text-sm">경기도 남양주시 덕송2로 63(별내동)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#f8f9ff]">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#d3e4fe]">문의 전화</p>
                    <p className="text-sm">031-553-0191</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
