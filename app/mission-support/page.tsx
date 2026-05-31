import PageHeader from '@/components/PageHeader';

export const metadata = { title: '선교후원 및 기관 - 물댄동산교회' };

const missions = [
  { region: '동남아', name: '태국 선교사', desc: '청년 사역 및 교회 개척' },
  { region: '중앙아시아', name: '몽골 선교사', desc: '신학교 사역' },
  { region: '아프리카', name: '케냐 선교사', desc: '의료 및 교육 사역' },
  { region: '국내', name: '미자립 교회 후원', desc: '농어촌 미자립 교회 5곳' },
];

export default function Page() {
  return (
    <>
      <PageHeader title="선교후원 및 기관" subtitle="땅끝까지 복음을 전합니다" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">선교 사역</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((m) => (
              <div key={m.name} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
                <div className="text-xs font-bold text-gray-500 mb-2">{m.region}</div>
                <div className="text-lg font-bold text-gray-900 mb-2">{m.name}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">선교 후원에 동참해주세요</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            여러분의 정성스러운 후원이 복음 전파의 큰 힘이 됩니다.
          </p>
          <div className="inline-block bg-gray-800 rounded-xl px-8 py-6">
            <div className="text-xs text-gray-400 mb-2">선교 후원 문의</div>
            <div className="text-lg font-bold">031-553-0191</div>
          </div>
        </div>
      </section>
    </>
  );
}
