import PageHeader from '@/components/PageHeader';

export const metadata = { title: '교회소식 & 이달의 행사 - 물댄동산교회' };

const news = [
  { tag: '공지', title: '주일예배 안내', date: '2026.04.16', content: '주일예배는 오전 9시, 11시 두 차례 진행됩니다.' },
  { tag: '행사', title: '부활절 감사예배', date: '2026.04.13', content: '부활절 연합 감사예배가 진행됩니다.' },
  { tag: '공지', title: '수요기도회 안내', date: '2026.04.09', content: '매주 수요일 저녁 7시 30분에 모입니다.' },
  { tag: '소식', title: '교회학교 봄소풍', date: '2026.04.06', content: '교회학교 전 학생 봄소풍을 진행합니다.' },
];

export default function Page() {
  return (
    <>
      <PageHeader title="교회소식 & 이달의 행사" subtitle="물댄동산교회의 소식을 전합니다" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          {news.map((n, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-0.5 bg-black text-white text-xs font-semibold rounded-full">
                  {n.tag}
                </span>
                <span className="text-xs text-gray-400">{n.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{n.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
