import PageHeader from '@/components/PageHeader';

export const metadata = { title: '교회행사앨범 & 새가족소개 - 물댄동산교회' };

const albums = [
  { title: '부활절 감사예배', date: '2026.04.13' },
  { title: '교회학교 봄소풍', date: '2026.04.06' },
  { title: '신년 특별 새벽기도회', date: '2026.01.05' },
];

const newFamilies = [
  { name: '김○수 성도 가족', date: '2026.04.06' },
  { name: '이○희 성도', date: '2026.03.30' },
  { name: '박○민 성도', date: '2026.03.16' },
];

export default function Page() {
  return (
    <>
      <PageHeader title="교회행사앨범 & 새가족소개" subtitle="함께한 시간의 기록" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">교회행사 앨범</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {albums.map((a, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className="aspect-square bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
                  📷
                </div>
                <div className="p-5">
                  <div className="text-sm font-bold text-gray-900 mb-1">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">새가족 소개</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl">
            {newFamilies.map((f, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 last:border-b-0">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm">◉</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">{f.name}</div>
                  <div className="text-xs text-gray-500">{f.date} 등록</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
