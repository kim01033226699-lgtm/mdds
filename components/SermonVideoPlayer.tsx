'use client';

import { useEffect, useState } from 'react';

type Sermon = {
  id: string;
  title?: string;
  verseDisplay?: string;
  verse?: string;
  pastor?: string;
  date?: string;
};

export default function SermonVideoPlayer() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/youtube/sermons', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!data.configured || !Array.isArray(data.sermons) || data.sermons.length === 0) {
          throw new Error(data.error || '설교 영상이 없습니다.');
        }
        setSermons(data.sermons);
        setSelectedId(data.sermons[0].id);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const selected = sermons.find((sermon) => sermon.id === selectedId);

  if (!selected) {
    return (
      <div className="aspect-video bg-[#0b1c30] text-white flex items-center justify-center px-6 text-center text-sm">
        {failed ? '설교 영상을 불러오지 못했습니다.' : '최신 설교 영상을 불러오는 중입니다.'}
      </div>
    );
  }

  return (
    <>
      <div className="aspect-video bg-[#0b1c30]">
        <iframe
          key={selected.id}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${selected.id}?rel=0`}
          title={selected.title || '주일설교 영상'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-4 md:p-6 border-t border-[#c2c6d4]">
        <p className="text-xs font-semibold tracking-wider text-[#00488d] mb-3">최근 설교</p>
        <div className="grid gap-2 md:grid-cols-2">
          {sermons.map((sermon) => (
            <button
              key={sermon.id}
              type="button"
              onClick={() => setSelectedId(sermon.id)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                sermon.id === selected.id
                  ? 'border-[#00488d] bg-[#eff4ff]'
                  : 'border-[#c2c6d4] hover:border-[#00488d]'
              }`}
            >
              <span className="block text-sm font-semibold text-[#0b1c30]">{sermon.title}</span>
              <span className="block mt-1 text-xs text-[#424752]">
                {[sermon.date, sermon.verseDisplay || sermon.verse, sermon.pastor].filter(Boolean).join(' · ')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
