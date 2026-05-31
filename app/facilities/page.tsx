import PageHeader from '@/components/PageHeader';

export const metadata = { title: '교회시설안내 - 물댄동산교회' };

const overview = [
  { num: '5', label: '층수' },
  { num: '500', label: '수용인원' },
  { num: '50', label: '주차대수' },
  { num: '15', label: '교육실' },
];

const facilities = [
  { icon: '◈', title: '대예배당', desc: '주일예배와 주요 집회가 열리는 메인 예배당입니다.', features: ['수용인원 300명', '음향시스템 완비', '대형 스크린', '에어컨 및 난방'] },
  { icon: '♪', title: '찬양실', desc: '찬양대 연습과 음악 사역을 위한 전용 공간입니다.', features: ['피아노 및 악기 완비', '음향시스템', '연습 공간'] },
  { icon: '☰', title: '도서관', desc: '성경과 신앙 관련 도서를 보관하는 도서관입니다.', features: ['신학서적 1,000여권', '독서 공간', '대출 서비스'] },
  { icon: '◉', title: '식당', desc: '교회 식사와 교제를 위한 식당입니다.', features: ['수용인원 100명', '전용 주방', '식기류 완비'] },
  { icon: '✦', title: '기도실', desc: '개인 기도와 소그룹 기도를 위한 공간입니다.', features: ['개인 기도실 5개', '소그룹 기도실 2개', '24시간 이용 가능'] },
  { icon: '◐', title: '유아실', desc: '어린 아이들을 위한 안전하고 편안한 공간입니다.', features: ['안전한 놀이시설', '전담 보육사', '예배 중 이용'] },
];

const floors = [
  { level: '5층', rooms: '기도실, 도서관' },
  { level: '4층', rooms: '교육실, 회의실' },
  { level: '3층', rooms: '청년부, 청소년부' },
  { level: '2층', rooms: '유치부, 아동부' },
  { level: '1층', rooms: '대예배당, 찬양실' },
  { level: '지하1층', rooms: '주차장, 식당' },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader title="교회시설안내" subtitle="아름답고 편안한 시설로 여러분을 환영합니다" />

      <section className="bg-black text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {overview.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{s.num}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">주요 시설</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="text-3xl text-gray-700 mb-3">{f.icon}</div>
                <div className="text-lg font-bold text-gray-900 mb-2">{f.title}</div>
                <div className="text-sm text-gray-600 mb-4 leading-relaxed">{f.desc}</div>
                <ul className="text-xs text-gray-700 space-y-1">
                  {f.features.map((feat) => (
                    <li key={feat}>· {feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">층별 안내</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {floors.map((f, i) => (
              <div
                key={f.level}
                className={`flex justify-between items-center px-8 py-5 ${
                  i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } border-b border-gray-200 last:border-b-0`}
              >
                <div className="text-base font-bold text-gray-900">{f.level}</div>
                <div className="text-sm text-gray-600">{f.rooms}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
