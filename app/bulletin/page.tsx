import PageHeader from '@/components/PageHeader';
import DriveBoard from '@/components/DriveBoard';

export const metadata = { title: '주보보기 - 물댄동산교회' };

export default function Page() {
  return (
    <>
      <PageHeader
        pill="성도의 교제"
        title="주보보기"
        subtitle="주간 주보 이미지를 확인하세요."
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <DriveBoard boardId="bulletin" mode="gallery" emptyMessage="아직 등록된 주보가 없습니다." />
        </div>
      </section>
    </>
  );
}
