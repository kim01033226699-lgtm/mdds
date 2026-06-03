'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ALBUM_SAMPLES, type SampleAlbum } from './driveSamples';
import Lightbox from './Lightbox';

type Album = {
  id: string;
  name: string;
  modifiedTime: string;
  coverUrl: string | null;
  photoCount: number;
};

type Photo = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  thumbnailUrl: string;
  fullUrl: string;
  webViewLink: string;
};

type AlbumsResp = { albums?: Album[]; configured?: boolean };
type PhotosResp = { photos?: Photo[]; folderName?: string; configured?: boolean };

const SampleBanner = () => (
  <div className="mb-4 inline-flex items-center gap-2 bg-[#FFF9E1] border border-[#FFE69C] text-[#8f2f00] text-xs font-bold px-3 py-1.5 rounded-full">
    <span className="material-symbols-outlined text-sm">science</span>
    샘플 데이터 — Drive 연동 시 실제 자료로 자동 교체됩니다
  </div>
);

const sampleAlbumToAlbum = (s: SampleAlbum): Album => ({
  id: s.id,
  name: s.name,
  modifiedTime: s.modifiedTime,
  coverUrl: encodeURI(s.coverSrc),
  photoCount: s.photoCount,
});

const findSampleAlbum = (boardId: string, albumId: string): SampleAlbum | undefined => {
  const list = ALBUM_SAMPLES[boardId] || [];
  return list.find((a) => a.id === albumId);
};

const formatDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

function AlbumGrid({ boardId, basePath }: { boardId: string; basePath: string }) {
  const [data, setData] = useState<AlbumsResp | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`/api/drive/albums/${boardId}`)
      .then((r) => r.json())
      .then((d: AlbumsResp) => {
        if (alive) setData(d);
      })
      .catch(() => {
        if (alive) setData({ albums: [], configured: false });
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [boardId]);

  if (loading) {
    return (
      <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center text-[#434655]">
        <span className="material-symbols-outlined animate-spin text-[#0045bc] text-3xl mb-2 block">
          progress_activity
        </span>
        앨범 불러오는 중...
      </div>
    );
  }

  const usingSamples = !data?.configured;
  const albums: Album[] = usingSamples
    ? (ALBUM_SAMPLES[boardId] || []).map(sampleAlbumToAlbum)
    : data?.albums || [];

  if (albums.length === 0) {
    return (
      <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center">
        <span className="material-symbols-outlined text-[#737686] text-4xl mb-2 block">
          photo_album
        </span>
        <p className="text-sm text-[#434655]">아직 등록된 앨범이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      {usingSamples && <SampleBanner />}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {albums.map((a) => (
        <Link
          key={a.id}
          href={`${basePath}?album=${a.id}`}
          className="group bg-white border border-[#e1e3e4] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          <div className="aspect-[4/3] bg-[#edeeef] relative overflow-hidden">
            {a.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.coverUrl}
                alt={a.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#737686]">
                <span className="material-symbols-outlined text-5xl">folder</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
              <span className="material-symbols-outlined text-xs align-middle mr-0.5">image</span>
              {a.photoCount}
            </div>
          </div>
          <div className="p-3 md:p-4">
            <h4 className="text-sm font-bold text-[#191c1d] truncate" title={a.name}>
              {a.name}
            </h4>
            <p className="font-['Manrope'] text-xs text-[#737686] mt-1">
              {formatDate(a.modifiedTime)}
            </p>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}

function AlbumPhotos({
  albumId,
  basePath,
  boardId,
}: {
  albumId: string;
  basePath: string;
  boardId: string;
}) {
  // 샘플 앨범 ID인지 먼저 확인
  const sampleAlbum = findSampleAlbum(boardId, albumId);
  const sampleData: PhotosResp | null = sampleAlbum
    ? {
        photos: sampleAlbum.photos.map((p) => {
          const src = p.localSrc ? encodeURI(p.localSrc) : '';
          return {
            id: p.id,
            name: p.name,
            mimeType: p.mimeType,
            modifiedTime: p.modifiedTime,
            thumbnailUrl: src,
            fullUrl: src,
            webViewLink: src,
          };
        }),
        folderName: sampleAlbum.name,
        configured: false,
      }
    : null;

  const [data, setData] = useState<PhotosResp | null>(sampleData);
  const [loading, setLoading] = useState(!sampleData);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    // 샘플 앨범이면 API 호출 안 함
    if (sampleAlbum) return;
    let alive = true;
    fetch(`/api/drive/photos/${albumId}`)
      .then((r) => r.json())
      .then((d: PhotosResp) => {
        if (alive) setData(d);
      })
      .catch(() => {
        if (alive) setData({ photos: [], configured: false });
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [albumId, sampleAlbum]);

  if (loading) {
    return (
      <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center text-[#434655]">
        <span className="material-symbols-outlined animate-spin text-[#0045bc] text-3xl mb-2 block">
          progress_activity
        </span>
        사진 불러오는 중...
      </div>
    );
  }

  const photos = data?.photos || [];
  const usingSamples = !!sampleAlbum;

  return (
    <div>
      {usingSamples && <SampleBanner />}
      <div className="flex items-center justify-between mb-6 gap-3">
        <div>
          <Link
            href={basePath}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#0045bc] hover:underline mb-2"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>앨범 목록
          </Link>
          {data?.folderName && (
            <h3 className="font-['Manrope'] text-xl md:text-2xl font-extrabold text-[#191c1d]">
              {data.folderName}
            </h3>
          )}
        </div>
        {photos.length > 0 && (
          <span className="font-['Manrope'] text-xs font-bold text-[#737686]">
            총 {photos.length}장
          </span>
        )}
      </div>

      {photos.length === 0 ? (
        <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center">
          <span className="material-symbols-outlined text-[#737686] text-4xl mb-2 block">
            image
          </span>
          <p className="text-sm text-[#434655]">이 앨범에는 사진이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="aspect-square bg-[#edeeef] rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              aria-label={p.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.thumbnailUrl}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={photos.map((p) => ({ src: p.fullUrl, name: p.name }))}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function Content({ boardId, basePath }: { boardId: string; basePath: string }) {
  const params = useSearchParams();
  const albumId = params.get('album');
  return albumId ? (
    <AlbumPhotos albumId={albumId} basePath={basePath} boardId={boardId} />
  ) : (
    <AlbumGrid boardId={boardId} basePath={basePath} />
  );
}

export default function DriveAlbumBoard({
  boardId,
  basePath,
}: {
  boardId: string;
  basePath: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center text-[#434655]">
          불러오는 중...
        </div>
      }
    >
      <Content boardId={boardId} basePath={basePath} />
    </Suspense>
  );
}
