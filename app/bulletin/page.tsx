import PageHeader from '@/components/PageHeader';

export const metadata = { title: '주보보기 - 물댄동산교회' };

const bulletins = [
  { date: '2026.04.13', title: '주보 (부활절)', size: '2.4MB' },
  { date: '2026.04.06', title: '주보', size: '2.1MB' },
  { date: '2026.03.30', title: '주보 (고난주간)', size: '2.5MB' },
  { date: '2026.03.23', title: '주보', size: '2.2MB' },
];

export default function Page() {
  return (
    <>
      <PageHeader title="주보보기" subtitle="주간 주보를 확인하세요" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {bulletins.map((b, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center text-xl">
                    ◫
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{b.title}</div>
                    <div className="text-xs text-gray-500">{b.date}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{b.size}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
