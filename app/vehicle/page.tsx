import PageHeader from '@/components/PageHeader';

export const metadata = { title: '차량 운행안내 - 물댄동산교회' };

const routes = [
  {
    name: '1번 노선',
    desc: '별내신도시 → 교회',
    stops: [
      { time: '08:30', place: '별내중앙역 1번출구' },
      { time: '08:35', place: '별내우체국' },
      { time: '08:40', place: '별내중학교' },
      { time: '08:50', place: '교회 도착' },
    ],
  },
  {
    name: '2번 노선',
    desc: '퇴계원 → 교회',
    stops: [
      { time: '08:30', place: '퇴계원역' },
      { time: '08:40', place: '퇴계원우체국' },
      { time: '08:50', place: '교회 도착' },
    ],
  },
];

export default function VehiclePage() {
  return (
    <>
      <PageHeader title="차량 운행안내" subtitle="주일예배 차량 운행 정보를 안내합니다" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {routes.map((r) => (
              <div key={r.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-6">
                  <div className="text-xl font-bold">{r.name}</div>
                  <div className="text-sm text-gray-400 mt-1">{r.desc}</div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {r.stops.map((s, i) => (
                      <div key={i} className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-16 text-sm font-bold text-gray-900">{s.time}</div>
                        <div className="text-sm text-gray-700">{s.place}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">차량 이용 안내</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            주일예배 차량을 이용하시려면 사전에 신청해주시기 바랍니다.<br />
            새벽기도, 수요예배 차량은 별도 운행하지 않습니다.
          </p>
          <div className="inline-block bg-gray-50 border border-gray-200 rounded-xl px-8 py-6">
            <div className="text-xs text-gray-500 mb-2">차량 문의</div>
            <div className="text-lg font-bold text-gray-900">031-553-0191</div>
          </div>
        </div>
      </section>
    </>
  );
}
