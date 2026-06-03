import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: '양육/훈련 - 물댄동산교회' };

const STEPS = [
  { num: '01', title: '등록 및 안내', desc: '안내데스크(2층 로비)' },
  {
    num: '02',
    title: '사진 촬영 및 다과',
    desc: '예배 후 담임목사와 사진 촬영한 후 새가족실 2층에서 모입니다.',
  },
  { num: '03', title: '교육시간', desc: '주일 오전 10:40~11:10 · 교회 카페(1층)' },
  {
    num: '04',
    title: '교육내용',
    desc: '1주 물댄동산교회 소개 · 2주 하나님과 나 · 3주 예수님, 믿음 그리고 구원 · 4주 교회생활',
  },
];

const AFTER_CARE = [
  '새 가족 교육 수료 후 구역과 선교회에 편성됩니다.',
  '새 가족 교육 수료 후 은사에 따라 교회의 사역에 동참하시게 됩니다.',
  '새 가족 교육과정을 마치면 물댄동산교회 양육과정 성장반에 참여하시게 됩니다.',
];

const BIBLE_COURSES = [
  {
    title: '역사와 지리로 보는 모세오경',
    desc: '모세오경에 나타난 역사적 사건과 지리적 배경을 바탕으로 성경을 입체적으로 볼 수 있는 성경공부 모임입니다.',
    when: '매주 토요일 오전 10:00',
    where: '청년부실 (지하 1층)',
  },
  {
    title: '성경파노라마개론',
    desc: '성경을 한 눈에 꿰뚫어 볼 수 있는 성경총정리입니다.',
    when: '매주 목요일 저녁 8:00 · 매주 금요일 오전 10:30',
    where: '청년부실 (지하 1층)',
  },
];

export default function DiscipleshipPage() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      <PageHeader
        pill="양육/훈련"
        title="양육과 훈련"
        subtitle="말씀과 기도, 교제 안에서 함께 성장하는 신앙 공동체입니다. (골로새서 2:6-7)"
      />
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-8 space-y-5">
        {/* 빠른 이동 */}
        <nav className="bg-white border border-[#c2c6d4] rounded-xl p-4 md:p-5 flex flex-wrap items-center gap-2 md:gap-3">
          <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#00488d] uppercase pr-2">
            프로그램
          </span>
          {[
            { id: 'new-family', label: '새가족반' },
            { id: 'bible-academy', label: '성경아카데미' },
            { id: 'wednesday-prayer', label: '수요중보기도' },
            { id: 'tuesday-evangelism', label: '화요전도팀' },
            { id: 'young-couples', label: '젊은부부모임' },
            { id: 'newlywed-couples', label: '신혼부부모임' },
          ].map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="px-3 py-1.5 rounded-full bg-[#eff4ff] text-xs font-semibold text-[#0b1c30] hover:bg-[#00488d] hover:text-white transition-colors"
            >
              {p.label}
            </a>
          ))}
        </nav>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-5">
          {/* 새가족반 (12 col) */}
          <section
            id="new-family"
            className="col-span-4 md:col-span-12 bg-white border border-[#c2c6d4] rounded-xl p-6 md:p-8 scroll-mt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* 좌측 1/3 */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4 text-[#00488d]">
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
                <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#0b1c30] mb-2 tracking-tight">
                  새가족반
                </h2>
                <p className="text-sm font-semibold text-[#00488d] mb-4">
                  물댄동산교회 한 가족이 되신 것을 진심으로 환영합니다.
                </p>
                <p className="text-sm text-[#424752] leading-relaxed">
                  등록을 마치신 후 새 가족 모임을 통하여 우리 교회 생활을 안내받을 수 있습니다.
                  4주 새 가족 교육을 받으신 분들은 구역으로 편성됩니다.
                </p>
              </div>

              {/* 우측 2/3: 4-step grid */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {STEPS.map((s) => (
                    <div key={s.num} className="bg-[#eff4ff] rounded-xl p-5">
                      <span className="font-['JetBrains_Mono'] text-xs font-medium tracking-wider text-[#00488d] block mb-2">
                        {s.num}
                      </span>
                      <h3 className="font-['Hanken_Grotesk'] text-base font-semibold text-[#0b1c30] mb-2">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#424752] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 수료 후 안내 */}
            <div className="border-t border-[#c2c6d4] mt-6 pt-5">
              <span className="font-['JetBrains_Mono'] text-[10px] font-medium tracking-wider text-[#00488d] uppercase block mb-3">
                수료 후 안내
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {AFTER_CARE.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#424752] leading-relaxed">
                    <span className="material-symbols-outlined text-base text-[#00488d] shrink-0 leading-tight">
                      check_circle
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 성경아카데미 (8 col) */}
          <section
            id="bible-academy"
            className="col-span-4 md:col-span-8 bg-white border border-[#c2c6d4] rounded-xl p-6 md:p-8 scroll-mt-24"
          >
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#0b1c30] mb-1 tracking-tight">
              성경아카데미
            </h2>
            <p className="text-sm font-semibold text-[#00488d] mb-4">성장하는 그리스도인</p>
            <p className="text-sm text-[#424752] leading-relaxed mb-6">
              하나님의 뜻에 합당한 존재이유를 깨닫고, 자녀에게 신앙을 물려주기 위해 기독교의 핵심진리를
              배웁니다. 평신도 지도자를 양성하여 하나님 나라를 확장하고 그리스도의 몸된 교회를 섬기는 것을
              목표로 주제별 성경공부가 이루어집니다.
            </p>

            <div className="border-t border-[#c2c6d4] pt-5">
              <span className="font-['JetBrains_Mono'] text-[10px] font-medium tracking-wider text-[#00488d] uppercase block mb-3">
                개설 강좌
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {BIBLE_COURSES.map((c) => (
                  <div key={c.title} className="bg-[#eff4ff] rounded-xl p-5">
                    <h3 className="font-['Hanken_Grotesk'] text-base font-semibold text-[#0b1c30] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#424752] leading-relaxed mb-4">{c.desc}</p>
                    <div className="space-y-1.5 border-t border-[#c2c6d4] pt-3">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="material-symbols-outlined text-sm text-[#00488d] shrink-0">
                          schedule
                        </span>
                        <span className="text-[#0b1c30]">{c.when}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="material-symbols-outlined text-sm text-[#00488d] shrink-0">
                          location_on
                        </span>
                        <span className="text-[#0b1c30]">{c.where}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 수요중보기도 (4 col, primary blue) */}
          <section
            id="wednesday-prayer"
            className="col-span-4 md:col-span-4 bg-[#00488d] text-white rounded-xl p-6 md:p-8 flex flex-col scroll-mt-24"
          >
            <div className="flex items-center gap-2 mb-4 text-white">
              <span className="material-symbols-outlined">self_improvement</span>
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold mb-3 tracking-tight">
              수요중보기도
            </h2>
            <p className="text-sm leading-relaxed text-white/90 mb-5">
              우리의 중보자 되신 예수 그리스도를 힘입어 교회와 성도, 나라와 민족을 위하여 중보적 기도를
              드리는 모임입니다.
            </p>
            <div className="mt-auto border-t border-white/20 pt-4 space-y-2">
              <div className="flex justify-between items-end gap-3">
                <span className="text-xs font-semibold shrink-0">모임</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#a8c8ff] text-right">
                  매주 수요일 오전 10시
                </span>
              </div>
              <div className="flex justify-between items-end gap-3">
                <span className="text-xs font-semibold shrink-0">대상</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#a8c8ff] text-right">
                  중보 기도를 원하는 모든 성도
                </span>
              </div>
            </div>
          </section>

          {/* 화요전도팀 (4 col) */}
          <section
            id="tuesday-evangelism"
            className="col-span-4 md:col-span-4 bg-white border border-[#c2c6d4] rounded-xl p-6 md:p-8 flex flex-col scroll-mt-24"
          >
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">campaign</span>
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#0b1c30] mb-1 tracking-tight">
              화요전도팀
            </h2>
            <p className="text-sm font-semibold text-[#00488d] mb-3">
              &ldquo;우리가 복음의 전달자입니다.&rdquo;
            </p>
            <p className="text-sm text-[#424752] leading-relaxed mb-5">
              매주 화요일 노방전도로 지역사회에 복음을 전합니다.
            </p>
            <div className="mt-auto border-t border-[#c2c6d4] pt-4 space-y-2">
              <div className="flex justify-between items-end gap-3">
                <span className="text-xs font-semibold text-[#0b1c30] shrink-0">시간</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#00488d] text-right">
                  매주 화요일 오후 2시
                </span>
              </div>
              <div className="flex justify-between items-end gap-3">
                <span className="text-xs font-semibold text-[#0b1c30] shrink-0">대상</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#00488d] text-right">
                  전도자의 마음을 품은 성도
                </span>
              </div>
            </div>
          </section>

          {/* 젊은부부모임 (4 col) */}
          <section
            id="young-couples"
            className="col-span-4 md:col-span-4 bg-white border border-[#c2c6d4] rounded-xl p-6 md:p-8 flex flex-col scroll-mt-24"
          >
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">family_restroom</span>
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#0b1c30] mb-3 tracking-tight">
              젊은부부모임
            </h2>
            <p className="text-sm text-[#424752] leading-relaxed mb-5">
              꿈과 희망에 젊음을 담아 더욱 새롭고 풍성한 공동체로 세워지길 원합니다. 나이가 젊어서가 아니라
              그 마음이 젊고 생각이 젊고 주님을 향한 열정이 뜨거운 젊은 부부들의 모임입니다.
            </p>
            <div className="mt-auto border-t border-[#c2c6d4] pt-4 space-y-2">
              <div className="flex justify-between items-end gap-3">
                <span className="text-xs font-semibold text-[#0b1c30] shrink-0">모임</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#00488d] text-right">
                  매주 주일 예배 후 오후 2시
                </span>
              </div>
              <div className="flex justify-between items-end gap-3">
                <span className="text-xs font-semibold text-[#0b1c30] shrink-0">장소</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#00488d] text-right">
                  B1 아동부실
                </span>
              </div>
            </div>
          </section>

          {/* 신혼부부모임 (4 col) */}
          <section
            id="newlywed-couples"
            className="col-span-4 md:col-span-4 bg-white border border-[#c2c6d4] rounded-xl p-6 md:p-8 flex flex-col scroll-mt-24"
          >
            <div className="flex items-center gap-2 mb-4 text-[#00488d]">
              <span className="material-symbols-outlined">favorite_border</span>
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#0b1c30] mb-3 tracking-tight">
              신혼부부모임
            </h2>
            <p className="text-sm text-[#424752] leading-relaxed mb-5">
              결혼한 신혼부부들이 가정을 신앙 위에 세워가는 모임입니다. 자세한 안내는 교회로 문의해 주세요.
            </p>
            <div className="mt-auto border-t border-[#c2c6d4] pt-4">
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#424752] uppercase">
                안내 준비중
              </span>
            </div>
          </section>

          {/* CTA: 함께 동참하세요 */}
          <section className="col-span-4 md:col-span-12 bg-[#0b1c30] text-white rounded-xl p-8 md:p-10">
            <div className="md:flex md:items-center md:justify-between gap-8">
              <div className="mb-6 md:mb-0">
                <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold mb-2 tracking-tight">
                  함께 양육과 훈련에 동참하세요
                </h2>
                <p className="text-sm text-[#d3e4fe] leading-relaxed max-w-2xl">
                  말씀과 기도로 자라는 신앙 여정에 여러분을 초대합니다. 어떤 프로그램이든 마음에 닿는 모임이
                  있다면 부담 없이 문의해 주세요.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="tel:031-553-0191"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#00488d] rounded text-sm font-semibold hover:bg-[#d6e3ff] transition"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  031-553-0191
                </a>
                <Link
                  href="/board"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-white text-white rounded text-sm font-semibold hover:bg-white hover:text-[#0b1c30] transition"
                >
                  <span className="material-symbols-outlined text-base">forum</span>
                  문의게시판
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
