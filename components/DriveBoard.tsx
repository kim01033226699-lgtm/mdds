'use client';

import { useEffect, useState } from 'react';

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  thumbnailLink?: string;
  webViewLink: string;
  iconLink?: string;
};

type DriveResponse = {
  files: DriveFile[];
  configured?: boolean;
  message?: string;
  error?: string;
};

type Props = {
  /** API endpoint board id: news | bulletin | events | album | newfamily */
  boardId: 'news' | 'bulletin' | 'events' | 'album' | 'newfamily';
  /** 그리드(이미지 중심) 또는 리스트(첨부파일 혼합) */
  mode: 'gallery' | 'list';
  emptyMessage?: string;
};

const isImage = (mime: string) => mime.startsWith('image/');
const isPdf = (mime: string) => mime === 'application/pdf';

const driveImageUrl = (id: string, size = 'w800') =>
  `https://lh3.googleusercontent.com/d/${id}=${size}`;

function formatDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
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

export default function DriveBoard({ boardId, mode, emptyMessage }: Props) {
  const [data, setData] = useState<DriveResponse | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (!data?.configured) {
    return (
      <div className="bg-[#FFF9E1] border border-[#FFE69C] rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2 text-[#8f2f00]">
          <span className="material-symbols-outlined">cloud_off</span>
          <span className="font-['Manrope'] font-bold">Google Drive 연동 준비중</span>
        </div>
        <p className="text-sm text-[#802a00] leading-relaxed">
          관리자가 Google Drive 폴더를 연결하면 이곳에 자동으로 파일이 표시됩니다.
        </p>
      </div>
    );
  }

  if (data.files.length === 0) {
    return (
      <div className="bg-white border border-[#e1e3e4] rounded-2xl p-10 text-center">
        <span className="material-symbols-outlined text-[#737686] text-4xl mb-2 block">inbox</span>
        <p className="text-sm text-[#434655]">{emptyMessage ?? '아직 등록된 자료가 없습니다.'}</p>
      </div>
    );
  }

  if (mode === 'gallery') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {data.files.map((f) => {
          const img = isImage(f.mimeType);
          return (
            <a
              key={f.id}
              href={f.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#e1e3e4] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-[#edeeef] relative overflow-hidden">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={driveImageUrl(f.id, 'w800')}
                    alt={f.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#737686]">
                    <span className="material-symbols-outlined text-5xl">{iconForMime(f.mimeType)}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-[#191c1d] truncate mb-1" title={f.name}>
                  {f.name}
                </h4>
                <p className="font-['Manrope'] text-xs text-[#737686]">
                  {formatDate(f.modifiedTime)}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // list mode
  return (
    <div className="bg-white border border-[#e1e3e4] rounded-2xl overflow-hidden">
      {data.files.map((f, i) => (
        <a
          key={f.id}
          href={f.webViewLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 px-5 md:px-6 py-4 hover:bg-[#f3f4f5] transition-colors ${
            i !== data.files.length - 1 ? 'border-b border-[#e1e3e4]' : ''
          }`}
        >
          <div className="w-12 h-12 shrink-0 rounded-lg bg-[#dbe1ff] flex items-center justify-center overflow-hidden">
            {isImage(f.mimeType) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={driveImageUrl(f.id, 'w200')}
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
          <div className="min-w-0 flex-1">
            <h4 className="text-sm md:text-base font-bold text-[#191c1d] truncate" title={f.name}>
              {f.name}
            </h4>
            <p className="font-['Manrope'] text-xs text-[#737686] mt-1">
              {formatDate(f.modifiedTime)}
            </p>
          </div>
          <span className="material-symbols-outlined text-[#737686] shrink-0">open_in_new</span>
        </a>
      ))}
    </div>
  );
}
