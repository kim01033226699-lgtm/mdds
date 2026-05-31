import PageHeader from './PageHeader';

interface MinistryPageProps {
  title: string;
  subtitle?: string;
  description: string;
  schedule?: { label: string; value: string }[];
  contact?: string;
  features?: { icon: string; title: string; desc: string }[];
}

export default function MinistryPage({ title, subtitle, description, schedule, contact, features }: MinistryPageProps) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-xl p-10 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">소개</h2>
            <p className="text-sm text-gray-700 leading-loose whitespace-pre-line">{description}</p>
          </div>

          {schedule && schedule.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-10 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">활동 안내</h2>
              <div className="space-y-3">
                {schedule.map((s) => (
                  <div key={s.label} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-b-0">
                    <div className="w-24 text-sm font-bold text-gray-900 flex-shrink-0">{s.label}</div>
                    <div className="text-sm text-gray-700">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contact && (
            <div className="bg-black text-white rounded-xl p-8 text-center">
              <div className="text-xs text-gray-400 mb-2">문의</div>
              <div className="text-lg font-bold">{contact}</div>
            </div>
          )}
        </div>
      </section>

      {features && features.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 text-lg">
                    {f.icon}
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-2">{f.title}</div>
                  <div className="text-sm text-gray-600 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
