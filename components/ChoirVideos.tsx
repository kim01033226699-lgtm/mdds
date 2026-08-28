'use client';

import { useEffect, useState } from 'react';

type ChoirName = '샤론찬양대' | '시온찬양대';
type Video = { id: string; title: string; choir: ChoirName; date: string };

export default function ChoirVideos({ choir, mode }: { choir: ChoirName; mode: 'player' | 'list' }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/youtube/choir?choir=${encodeURIComponent(choir)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!data.configured || !Array.isArray(data.videos) || data.videos.length === 0) {
          throw new Error(data.error || '영상이 없습니다.');
        }
        setVideos(data.videos);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setFailed(true);
      });
    return () => controller.abort();
  }, [choir]);

  if (mode === 'player') {
    const latest = videos[0];
    if (!latest) {
      return (
        <div className="aspect-video bg-[#0b1c30] text-white flex items-center justify-center px-6 text-center text-sm">
          {failed ? '찬양 영상을 불러오지 못했습니다.' : '최신 찬양 영상을 불러오는 중입니다.'}
        </div>
      );
    }
    return (
      <div className="aspect-video bg-[#0b1c30]">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${latest.id}`}
          title={`${choir} ${latest.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (failed) return <p className="text-sm text-[#424752]">최신 영상 목록을 불러오지 못했습니다.</p>;
  if (videos.length === 0) return <p className="text-sm text-[#424752]">최신 영상을 불러오는 중입니다.</p>;

  return (
    <ul className="space-y-2">
      {videos.slice(0, 5).map((video, index) => (
        <li key={video.id}>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline gap-2 text-sm text-[#0b1c30] hover:text-[#00488d] transition-colors group"
          >
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#424752] tabular-nums shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 truncate group-hover:underline">{video.title}</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#424752] shrink-0">{video.date}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
