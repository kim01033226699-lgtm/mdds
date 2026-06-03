import PageHeader from '@/components/PageHeader';
import DriveBoard from '@/components/DriveBoard';

export const metadata = { title: '교회소식 - 물댄동산교회' };

export default function Page() {
  return (
    <>
      <PageHeader
        pill="성도의 교제"
        title="교회소식"
        subtitle="물댄동산교회의 주요 공지와 소식을 안내합니다."
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <DriveBoard boardId="news" mode="list" emptyMessage="아직 등록된 소식이 없습니다." />
        </div>
      </section>
    </>
  );
}
