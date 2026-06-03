'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DriveBoard from '@/components/DriveBoard';

const MISSIONARIES = [
  { country: '인도', name: '이영미' },
  { country: '우크라이나', name: '김요한' },
  { country: '캄보디아', name: '이훈' },
  { country: '파키스탄', name: '허덕영' },
];

function FilterBar({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#00488d] uppercase pr-2">
        선교사
      </span>
      <Link
        href="/missionary-news"
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
          !active ? 'bg-[#00488d] text-white' : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dbe1ff]'
        }`}
      >
        전체
      </Link>
      {MISSIONARIES.map((m) => (
        <Link
          key={m.name}
          href={`/missionary-news?m=${encodeURIComponent(m.name)}`}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
            active === m.name
              ? 'bg-[#00488d] text-white'
              : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dbe1ff]'
          }`}
        >
          {m.country} · {m.name}
        </Link>
      ))}
    </div>
  );
}

function Content() {
  const params = useSearchParams();
  const missionary = params.get('m') || undefined;
  return (
    <>
      <FilterBar active={missionary} />
      <DriveBoard
        boardId="missionary"
        mode="list"
        filter={missionary}
        emptyMessage={
          missionary
            ? `${missionary} 선교사의 소식지가 아직 등록되지 않았습니다.`
            : '아직 등록된 소식지가 없습니다.'
        }
      />
    </>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader
        pill="선교후원"
        title="해외선교 소식"
        subtitle="해외에서 사역 중인 선교사님들의 소식과 기도제목을 나눕니다."
      />
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <Suspense
            fallback={
              <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center text-[#434655]">
                불러오는 중...
              </div>
            }
          >
            <Content />
          </Suspense>
        </div>
      </section>
    </>
  );
}
