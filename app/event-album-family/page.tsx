import PageHeader from '@/components/PageHeader';
import DriveAlbumBoard from '@/components/DriveAlbumBoard';

export const metadata = { title: '교회행사앨범 - 물댄동산교회' };

export default function Page() {
  return (
    <>
      <PageHeader
        pill="성도의 교제"
        title="교회행사앨범"
        subtitle="함께한 행사들의 사진을 앨범으로 만나보세요."
      />

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <DriveAlbumBoard boardId="album" basePath="/event-album-family" />
        </div>
      </section>
    </>
  );
}
