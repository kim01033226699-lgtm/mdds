import PageHeader from '@/components/PageHeader';
import DriveBoard from '@/components/DriveBoard';

export const metadata = { title: '이달의 행사 - 물댄동산교회' };

export default function Page() {
  return (
    <>
      <PageHeader
        pill="성도의 교제"
        title="이달의 행사"
        subtitle="이달의 주요 행사와 일정을 안내합니다."
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <DriveBoard boardId="events" mode="list" emptyMessage="아직 등록된 행사가 없습니다." />
        </div>
      </section>
    </>
  );
}
