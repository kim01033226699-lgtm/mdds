'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';

type Member = { name: string; position: string; desc?: string };
type Category = { title: string; members: Member[] };

const DEFAULT: Category[] = [
  { title: '담임목사', members: [{ name: '정종한', position: '담임목사' }] },
  {
    title: '부목사',
    members: [
      { name: '송봉길', position: '부목사' },
      { name: '김호년', position: '부목사' },
    ],
  },
  {
    title: '전도사',
    members: [
      { name: '김은순', position: '전도사' },
      { name: '김숙정', position: '전도사' },
    ],
  },
  {
    title: '교육전도사',
    members: [
      { name: '박철수', position: '교육전도사' },
      { name: '진두만', position: '교육전도사' },
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

const STAFF_GROUPS = ['부목사', '전도사', '교육전도사'];

export default function ServingPage() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT);

  useEffect(() => {
    fetch('/api/contents/serving')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.data?.categories?.length) setCategories(d.data.categories);
      })
      .catch(() => {});
  }, []);

  const seniorPastor = categories.find((c) => c.title === '담임목사')?.members?.[0];
  const staffByGroup = STAFF_GROUPS.map((g) => ({
    title: g,
    members: categories.find((c) => c.title === g)?.members ?? [],
  })).filter((g) => g.members.length > 0);
  const activeElders = categories.find((c) => c.title === '시무장로')?.members ?? [];
  const retiredElders = categories.find((c) => c.title === '원로장로')?.members ?? [];

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <PageHeader
        pill="교회소개"
        title="섬기는 사람들"
        subtitle="물댄동산교회를 섬기는 분들을 소개합니다."
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-12 md:py-16">
        {/* 담임목사 */}
        {seniorPastor && (
          <section className="mb-20 md:mb-28">
            <div className="flex flex-col items-center">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="font-['Hanken_Grotesk'] text-3xl md:text-[40px] font-bold tracking-tight">
                  담임목사
                </h2>
              </div>
              <div className="w-full max-w-4xl bg-white border border-[#c2c6d4] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-8">
                  <div className="w-44 h-44 md:w-56 md:h-56 shrink-0 bg-[#cadcff] rounded-full overflow-hidden flex items-center justify-center border-4 border-[#dce9ff]">
                    <span
                      className="material-symbols-outlined text-[#00488d] text-7xl md:text-8xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      person
                    </span>
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <h3 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold text-[#0b1c30] mb-1">
                      {seniorPastor.name} {seniorPastor.position}
                    </h3>
                    {seniorPastor.desc && seniorPastor.desc !== '약력' && (
                      <p className="text-sm text-[#424752] mb-5 leading-relaxed">
                        {seniorPastor.desc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 교역자 (부목사 + 전도사 + 교육전도사) */}
        {staffByGroup.length > 0 && (
          <section className="mb-20 md:mb-28">
            <div className="mb-8 md:mb-10 border-l-4 border-[#00488d] pl-4">
              <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight">
                교역자
              </h2>
            </div>

            <div className="space-y-10">
              {staffByGroup.map((g) => (
                <div key={g.title}>
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="font-['Hanken_Grotesk'] text-lg md:text-xl font-semibold text-[#0b1c30]">
                      {g.title}
                    </h3>
                    <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#424752]">
                      {g.members.length}명
                    </span>
                    <span className="flex-1 h-px bg-[#c2c6d4]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {g.members.map((m) => (
                      <div
                        key={`${g.title}-${m.name}`}
                        className="bg-white border border-[#c2c6d4] p-6 rounded-xl flex flex-col items-center text-center group hover:border-[#00488d] hover:shadow-[0_4px_12px_rgba(0,72,141,0.06)] transition-all"
                      >
                        <div className="w-24 h-24 bg-[#dce9ff] rounded-full mb-4 flex items-center justify-center group-hover:bg-[#cadcff] transition-colors">
                          <span className="material-symbols-outlined text-[#424752] text-4xl group-hover:text-[#00488d] transition-colors">
                            person
                          </span>
                        </div>
                        <h4 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#0b1c30] mb-1">
                          {m.name}
                        </h4>
                        <p className="text-xs text-[#00488d] font-bold">{m.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bento: 시무장로 (2/3) + 원로장로 (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 시무장로 */}
          {activeElders.length > 0 && (
            <section className="lg:col-span-2">
              <div className="mb-8 md:mb-10 border-l-4 border-[#006a61] pl-4">
                <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight">
                  시무장로
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-5">
                {activeElders.map((m) => (
                  <div
                    key={m.name}
                    className="bg-[#e5eeff] border border-[#c2c6d4] p-5 rounded-xl flex items-center gap-4"
                  >
                    <div className="w-16 h-16 bg-white rounded-full shrink-0 flex items-center justify-center border border-[#c2c6d4]">
                      <span className="material-symbols-outlined text-[#006a61] text-2xl">
                        verified_user
                      </span>
                    </div>
                    <div>
                      <h4 className="font-['Hanken_Grotesk'] text-lg font-semibold">{m.name}</h4>
                      <p className="text-xs text-[#424752]">시무장로</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 원로장로 */}
          {retiredElders.length > 0 && (
            <section>
              <div className="mb-8 md:mb-10 border-l-4 border-[#727783] pl-4">
                <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight">
                  원로장로
                </h2>
              </div>
              <div className="flex flex-col gap-5">
                {retiredElders.map((m) => (
                  <div
                    key={m.name}
                    className="bg-[#eff4ff] border border-[#c2c6d4] p-5 rounded-xl flex items-center gap-4 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
                  >
                    <div className="w-16 h-16 bg-white rounded-full shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#727783] text-2xl">
                        history_edu
                      </span>
                    </div>
                    <div>
                      <h4 className="font-['Hanken_Grotesk'] text-lg font-semibold">{m.name}</h4>
                      <p className="text-xs text-[#424752]">원로장로</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Visual Break */}
        <div className="mt-20 md:mt-28 rounded-xl overflow-hidden relative h-[300px] md:h-[400px]">
          <Image
            src="/hero-01.jpg"
            alt="물댄동산교회 공동체"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6 md:p-10">
            <div className="text-white">
              <p className="font-['Hanken_Grotesk'] text-2xl md:text-[32px] font-bold mb-2 tracking-tight">
                하나님의 사랑으로 세워진 공동체
              </p>
              <p className="text-sm md:text-base opacity-90">
                함께 예배하며 성장하는 물댄동산교회가 되겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
