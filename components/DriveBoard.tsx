'use client';

import { useEffect, useState } from 'react';
import { FILE_SAMPLES, type SampleFile } from './driveSamples';
import Lightbox from './Lightbox';

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  thumbnailLink?: string;
  webViewLink?: string;
  iconLink?: string;
  localSrc?: string;
};

type DriveResponse = {
  files: DriveFile[];
  configured?: boolean;
  message?: string;
  error?: string;
};

type Props = {
  /** API endpoint board id */
  boardId: 'news' | 'bulletin' | 'events' | 'album' | 'newfamily' | 'missionary';
  /** 그리드(이미지 중심) 또는 리스트(첨부파일 혼합) */
  mode: 'gallery' | 'list';
  emptyMessage?: string;
  /** 파일명에 포함된 문자열로 필터링 (예: 선교사 이름) */
  filter?: string;
};

const isImage = (mime: string) => mime.startsWith('image/');
const isPdf = (mime: string) => mime === 'application/pdf';

const driveImageUrl = (id: string, size = 'w800') =>
  `https://lh3.googleusercontent.com/d/${id}=${size}`;

const fileImageSrc = (f: DriveFile, size = 'w800') =>
  f.localSrc ? encodeURI(f.localSrc) : driveImageUrl(f.id, size);

const fileLinkHref = (f: DriveFile) =>
  f.webViewLink ?? (f.localSrc ? encodeURI(f.localSrc) : '#');

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function SampleBanner() {
  return (
    <div className="mb-4 inline-flex items-center gap-2 bg-[#FFF9E1] border border-[#FFE69C] text-[#8f2f00] text-xs font-bold px-3 py-1.5 rounded-full">
      <span className="material-symbols-outlined text-sm">science</span>
      샘플 데이터 — Drive 연동 시 실제 자료로 자동 교체됩니다
    </div>
  );
}

function iconForMime(mime: string) {
  if (isImage(mime)) return 'image';
  if (isPdf(mime)) return 'picture_as_pdf';
  if (mime.includes('word')) return 'description';
  if (mime.includes('sheet') || mime.includes('excel')) return 'table_chart';
  if (mime.includes('presentation') || mime.includes('powerpoint')) return 'slideshow';
  if (mime.includes('video')) return 'movie';
  return 'insert_drive_file';
}

export default function DriveBoard({ boardId, mode, emptyMessage, filter }: Props) {
  const [data, setData] = useState<DriveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`/api/drive/${boardId}`)
      .then((r) => r.json())
      .then((d: DriveResponse) => {
        if (alive) setData(d);
      })
      .catch(() => {
        if (alive) setData({ files: [], configured: false, error: '불러오는 데 실패했습니다.' });
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
      <div className="bg-white border border-[#e1e3e4] rounded-2xl p-8 text-center text-[#434655]">
        <span className="material-symbols-outlined animate-spin text-[#0045bc] text-3xl mb-2 block">
          progress_activity
        </span>
        불러오는 중...
      </div>
    );
  }

  // Drive 미설정 시 샘플 데이터 사용
  const usingSamples = !data?.configured;
  const sourceFiles: DriveFile[] = usingSamples
    ? (FILE_SAMPLES[boardId] || []) as SampleFile[]
    : data?.files || [];

  const visibleFiles = filter
    ? sourceFiles.filter((f) => f.name.includes(filter))
    : sourceFiles;

  if (visibleFiles.length === 0) {
    return (
      <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center">
        <span className="material-symbols-outlined text-[#737686] text-4xl mb-2 block">inbox</span>
        <p className="text-sm text-[#434655]">{emptyMessage ?? '아직 등록된 자료가 없습니다.'}</p>
      </div>
    );
  }

  // 이미지 파일만 추출 → Lightbox 슬라이드용
  const imageFiles = visibleFiles.filter((f) => isImage(f.mimeType));
  const lightboxItems = imageFiles.map((f) => ({
    src: fileImageSrc(f, 'w1600'),
    name: f.name,
  }));
  const imageIndexOf = (f: DriveFile) => imageFiles.findIndex((x) => x.id === f.id);

  if (mode === 'gallery') {
    return (
      <div>
        {usingSamples && <SampleBanner />}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {visibleFiles.map((f) => {
            const img = isImage(f.mimeType);
            const cardInner = (
              <>
                <div className="aspect-[4/3] bg-[#edeeef] relative overflow-hidden">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={fileImageSrc(f, 'w800')}
                      alt={f.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#737686]">
                      <span className="material-symbols-outlined text-5xl">
                        {iconForMime(f.mimeType)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-left">
                  <h4 className="text-sm font-bold text-[#191c1d] truncate mb-1" title={f.name}>
                    {f.name}
                  </h4>
                  <p className="font-['Manrope'] text-xs text-[#737686]">
                    {formatDate(f.modifiedTime)}
                  </p>
                </div>
              </>
            );

            const cls =
              'group block w-full bg-white border border-[#e1e3e4] rounded-2xl overflow-hidden hover:shadow-md transition-shadow';

            return img ? (
              <button
                key={f.id}
                type="button"
                onClick={() => setLightboxIndex(imageIndexOf(f))}
                className={cls}
              >
                {cardInner}
              </button>
            ) : (
              <a
                key={f.id}
                href={fileLinkHref(f)}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {cardInner}
              </a>
            );
          })}
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            items={lightboxItems}
            index={lightboxIndex}
            onChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </div>
    );
  }

  // list mode
  return (
    <div>
      {usingSamples && <SampleBanner />}
      <div className="bg-white border border-[#e1e3e4] rounded-2xl overflow-hidden">
        {visibleFiles.map((f, i) => {
          const img = isImage(f.mimeType);
          const rowInner = (
            <>
              <div className="w-12 h-12 shrink-0 rounded-lg bg-[#dbe1ff] flex items-center justify-center overflow-hidden">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fileImageSrc(f, 'w200')}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[#0045bc]">
                    {iconForMime(f.mimeType)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h4 className="text-sm md:text-base font-bold text-[#191c1d] truncate" title={f.name}>
                  {f.name}
                </h4>
                <p className="font-['Manrope'] text-xs text-[#737686] mt-1">
                  {formatDate(f.modifiedTime)}
                </p>
              </div>
              <span className="material-symbols-outlined text-[#737686] shrink-0">
                {img ? 'zoom_in' : 'open_in_new'}
              </span>
            </>
          );

          const cls = `flex items-center gap-4 w-full px-5 md:px-6 py-4 hover:bg-[#f3f4f5] transition-colors ${
            i !== visibleFiles.length - 1 ? 'border-b border-[#e1e3e4]' : ''
          }`;

          return img ? (
            <button
              key={f.id}
              type="button"
              onClick={() => setLightboxIndex(imageIndexOf(f))}
              className={cls}
            >
              {rowInner}
            </button>
          ) : (
            <a
              key={f.id}
              href={fileLinkHref(f)}
              target="_blank"
              rel="noopener noreferrer"
              className={cls}
            >
              {rowInner}
            </a>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
