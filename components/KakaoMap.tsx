'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    daum?: {
      roughmap: {
        Lander: new (config: {
          timestamp: string;
          key: string;
          mapWidth: string;
          mapHeight: string;
        }) => { render: () => void };
      };
    };
  }
}

const TIMESTAMP = '1780215059828';
const KEY = 'opx2sxcxhqc';

export default function KakaoMap() {
  useEffect(() => {
    let cancelled = false;

    const tryRender = () => {
      if (cancelled || typeof window === 'undefined') return false;
      const Lander = window.daum?.roughmap?.Lander;
      if (!Lander) return false;
      const el = document.getElementById(`daumRoughmapContainer${TIMESTAMP}`);
      if (!el) return false;
      el.innerHTML = '';
      new Lander({
        timestamp: TIMESTAMP,
        key: KEY,
        mapWidth: '640',
        mapHeight: '360',
      }).render();
      return true;
    };

    if (tryRender()) return;
    const interval = setInterval(() => {
      if (tryRender()) clearInterval(interval);
    }, 200);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Script
        src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"
        strategy="afterInteractive"
      />
      <div
        id={`daumRoughmapContainer${TIMESTAMP}`}
        className="root_daum_roughmap root_daum_roughmap_landing"
      />
    </>
  );
}
