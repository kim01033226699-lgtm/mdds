import Image from 'next/image';

export const metadata = { title: '차량 운행안내 - 물댄동산교회' };

const VEHICLES = [
  {
    no: '1호차',
    type: '35인승 버스',
    route: '청학리 방향',
    icon: 'directions_bus',
    note: '새벽예배 / 주일 1·2·3부 운행',
  },
  {
    no: '2호차',
    type: '스타렉스 9893',
    route: '상계동 · 별내 방향',
    icon: 'airport_shuttle',
    note: '주일 3부 · 오후찬양 예배만 운행',
  },
  {
    no: '3호차',
    type: '스타렉스 0838',
    route: '별내동 방향',
    icon: 'airport_shuttle',
    note: '주일 3부 · 오후찬양 예배만 운행',
  },
];

const SCHEDULE_STOPS = [
  '교회 출발',
  '청학유치원',
  '주공 5단지 앞',
  '주공 2단지 관리실',
  'GS25',
  '주공 1단지 앞',
  '거성동부',
  '교회 도착',
];

const SCHEDULE_TIMES: Record<string, string[]> = {
  새벽예배: ['04:50', '05:00', '05:02', '05:04', '05:06', '05:08', '05:10', '05:20'],
  주일1부: ['06:35', '06:50', '06:52', '06:54', '06:56', '06:58', '07:00', '07:10'],
  주일2부: ['08:35', '08:50', '08:52', '08:54', '08:56', '08:58', '09:00', '09:10'],
  주일3부: ['10:35', '10:50', '10:52', '10:54', '10:56', '10:58', '11:00', '11:10'],
};

const NOTES = [
  {
    icon: 'schedule',
    title: '주일 3부 예배 후',
    content: '교회 출발 시각: 13:20',
    wide: false,
  },
  {
    icon: 'music_note',
    title: '오후찬양 예배 후',
    content: '교회 출발 시각: 16:10',
    wide: false,
  },
  {
    icon: 'airport_shuttle',
    title: '2호차 · 3호차',
    content: '주일 3부 예배 및 오후찬양 예배 시에만 운행합니다.',
    wide: true,
  },
  {
    icon: 'info',
    title: '이용 안내',
    content:
      '새벽예배 · 수요예배 · 금요기도회 등 평일 예배에는 차량 운행이 없습니다. 1호차만 새벽예배 시간에 청학리 노선을 운행합니다.',
    wide: true,
  },
];

export default function VehiclePage() {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Inter']">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-01.jpg"
            alt="차량 운행 안내"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(rgba(11, 28, 48, 0.6), rgba(11, 28, 48, 0.8))',
            }}
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-[56px] leading-[1.05] font-bold text-[#f8f9ff] mb-4 tracking-tight">
            차량 운행 안내
          </h1>
          <p className="text-base md:text-lg text-[#d6e3ff] max-w-2xl mx-auto">
            주일예배에 편안하게 오실 수 있도록 차량을 운행합니다.
          </p>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto">
        {/* 운행 차량 */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="mb-10">
            <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold text-[#0b1c30] mb-2 flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-[#00488d]">commute</span>
              운행 차량
            </h2>
            <div className="h-1 w-16 bg-[#00488d] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {VEHICLES.map((v) => (
              <div
                key={v.no}
                className="bg-white border border-[#c2c6d4] rounded-xl p-6 md:p-7 flex flex-col hover:border-[#00488d] hover:shadow-[0_8px_24px_rgba(0,72,141,0.08)] transition-all"
              >
                <div className="flex items-center gap-2 mb-1 text-[#00488d]">
                  <span className="material-symbols-outlined text-3xl">{v.icon}</span>
                </div>
                <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold mb-1 tracking-tight">
                  {v.no}
                </h3>
                <p className="font-['JetBrains_Mono'] text-xs tracking-wider text-[#00488d] mb-4">
                  {v.type}
                </p>
                <div className="border-t border-[#c2c6d4] pt-4 space-y-2 mt-auto">
                  <div className="flex justify-between items-end gap-3">
                    <span className="text-xs font-semibold text-[#0b1c30] shrink-0">노선</span>
                    <span className="text-xs text-[#424752] text-right">{v.route}</span>
                  </div>
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-xs font-semibold text-[#0b1c30] shrink-0">운행</span>
                    <span className="text-xs text-[#424752] text-right">{v.note}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1호차 운행시간표 */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-[#eff4ff]">
          <div className="mb-10">
            <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold text-[#0b1c30] mb-2 flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-[#00488d]">schedule</span>
              1호차 운행시간표
            </h2>
            <p className="text-sm text-[#424752]">
              청학리 방향 노선 · 새벽예배 / 주일 1·2·3부 운행
            </p>
          </div>

          <div className="bg-white border border-[#c2c6d4] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#c2c6d4] bg-[#eff4ff]">
                    <th className="text-left px-4 py-3 font-['JetBrains_Mono'] text-[11px] tracking-wider text-[#00488d] uppercase">
                      정류장
                    </th>
                    {Object.keys(SCHEDULE_TIMES).map((s) => (
                      <th
                        key={s}
                        className="text-center px-4 py-3 font-['JetBrains_Mono'] text-[11px] tracking-wider text-[#00488d] uppercase"
                      >
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE_STOPS.map((stop, i) => {
                    const isDeparture = i === 0 || i === SCHEDULE_STOPS.length - 1;
                    return (
                      <tr
                        key={stop}
                        className={`border-b border-[#eff4ff] last:border-b-0 ${
                          isDeparture ? 'bg-[#f8f9ff]' : ''
                        }`}
                      >
                        <td
                          className={`px-4 py-3 ${
                            isDeparture
                              ? "font-['Hanken_Grotesk'] font-semibold text-[#00488d]"
                              : 'font-semibold text-[#0b1c30]'
                          }`}
                        >
                          {stop}
                        </td>
                        {Object.values(SCHEDULE_TIMES).map((times, ti) => (
                          <td
                            key={ti}
                            className="text-center px-4 py-3 font-['JetBrains_Mono'] text-[#00488d] tabular-nums"
                          >
                            {times[i]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 추가 안내 - Bento */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="mb-10">
            <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold text-[#0b1c30] mb-2 flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-[#00488d]">info</span>
              운행 안내사항
            </h2>
            <p className="text-sm text-[#424752]">
              아래 안내를 참고하시어 예배에 편안하게 참석해 주세요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {NOTES.map((n) =>
              n.wide ? (
                <div
                  key={n.title}
                  className="md:col-span-2 bg-white p-6 border border-[#c2c6d4] rounded-xl flex gap-4 items-start"
                >
                  <div className="p-2 bg-[#d6e3ff] rounded-lg shrink-0">
                    <span className="material-symbols-outlined text-[#00488d]">{n.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-['Hanken_Grotesk'] text-lg font-semibold mb-1">
                      {n.title}
                    </h4>
                    <p className="text-sm text-[#424752] leading-relaxed">{n.content}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={n.title}
                  className="bg-white p-6 border border-[#c2c6d4] rounded-xl flex flex-col items-center text-center"
                >
                  <span className="material-symbols-outlined text-[#00488d] text-3xl mb-2">
                    {n.icon}
                  </span>
                  <h4 className="font-['Hanken_Grotesk'] text-lg font-semibold mb-1">{n.title}</h4>
                  <p className="text-xs text-[#424752] leading-relaxed">{n.content}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* 차량 문의 - dark card */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="bg-[#0b1c30] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-[#f8f9ff] gap-8 overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '300px' }}>
                directions_bus
              </span>
            </div>
            <div className="relative z-10 md:w-1/2">
              <h2 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-2 tracking-tight">
                <span className="material-symbols-outlined text-[#89f5e7]">support_agent</span>
                차량 문의
              </h2>
              <p className="text-base text-[#d3e4fe] mb-8 leading-relaxed">
                차량 이용에 관한 자세한 안내가 필요하시면 교회 사무실로 문의해 주세요.
                탑승 노선이나 시간 변경이 필요한 경우에도 미리 알려주시면 도움을 드리겠습니다.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#d3e4fe] uppercase mb-1">
                    운행 차량
                  </p>
                  <p className="font-['Hanken_Grotesk'] text-lg font-semibold">총 3대</p>
                </div>
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#d3e4fe] uppercase mb-1">
                    이용 요금
                  </p>
                  <p className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#89f5e7]">
                    무료
                  </p>
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#89f5e7] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#00201d]">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#d3e4fe]">교회 사무실</p>
                    <p className="text-sm">031-553-0191</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#f8f9ff]">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#d3e4fe]">교회 위치</p>
                    <p className="text-sm">경기도 남양주시 덕송2로 63</p>
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
