import PageHeader from '@/components/PageHeader';
import DriveBoard from '@/components/DriveBoard';

export const metadata = { title: '새가족소개 - 물댄동산교회' };

export default function Page() {
  return (
    <>
      <PageHeader
        pill="성도의 교제"
        title="새가족소개"
        subtitle="물댄동산교회의 새 가족을 환영합니다."
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <DriveBoard boardId="newfamily" mode="gallery" emptyMessage="아직 등록된 새가족이 없습니다." />
        </div>
      </section>
    </>
  );
}
