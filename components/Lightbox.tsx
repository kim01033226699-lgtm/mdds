'use client';

import { useCallback, useEffect } from 'react';

export type LightboxItem = {
  src: string;
  name?: string;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const total = items.length;
  const current = items[index];

  const prev = useCallback(
    () => onChange((index - 1 + total) % total),
    [index, total, onChange]
  );
  const next = useCallback(
    () => onChange((index + 1) % total),
    [index, total, onChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* top bar */}
      <div
        className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between text-white/90 text-sm bg-gradient-to-b from-black/60 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-['Manrope'] font-bold">
          {total > 1 ? `${index + 1} / ${total}` : ''}
        </div>
        <div className="flex items-center gap-3 min-w-0">
          {current.name && (
            <span className="truncate max-w-[55vw] text-xs md:text-sm hidden sm:inline">
              {current.name}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      {/* prev */}
      {total > 1 && (
        <button
          type="button"
          aria-label="이전"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
      )}

      {/* image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current.src}
        alt={current.name || ''}
        className="max-w-[92vw] max-h-[85vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* next */}
      {total > 1 && (
        <button
          type="button"
          aria-label="다음"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}

      {/* mobile bottom name */}
      {current.name && (
        <div
          className="absolute bottom-3 left-0 right-0 text-center text-white/90 text-xs px-4 sm:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="truncate inline-block max-w-[90vw]">{current.name}</span>
        </div>
      )}
    </div>
  );
}
