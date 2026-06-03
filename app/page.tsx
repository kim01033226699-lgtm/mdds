import Image from 'next/image';
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';

const SERMON_PLAYLIST_ID = 'PLuyd60PWgGd2rEYGrUkFLffSaQZDjOd1H';

const LATEST_SERMONS = [
  {
    id: '32XoOSfxhpg',
    title: '말씀의 사람, 소명의 사람',
    verse: '히브리서 1:1-3',
    pastor: '신기원 목사',
    series: '온 세대 통합예배',
    date: '2026.05.31',
    desc: '우리는 말씀의 통로가 되어 하나님의 소명을 따라가는 사람들입니다. 오늘 선포되는 말씀을 통해 당신의 삶을 향한 하나님의 새로운 계획을 발견하시길 바랍니다.',
  },
  {
    id: 'uct4XofUC44',
    title: '내 영을 만민에게',
    verse: '욜 2:28-32',
    pastor: '정종한 목사',
    series: '주일 2부예배',
    date: '2026.05.24',
  },
  {
    id: 'qaDk6yLjjYQ',
    title: '참된 스승은',
    verse: '딤후 2:1-2',
    pastor: '정종한 목사',
    series: '주일 2부예배',
    date: '2026.05.17',
  },
];

const NEWS = [
  { tag: '공지', tone: 'primary', title: '주일예배 안내', date: '2026.04.16' },
  { tag: '행사', tone: 'secondary', title: '부활절 감사예배', date: '2026.04.13' },
  { tag: '공지', tone: 'primary', title: '수요기도회 안내', date: '2026.04.09' },
  { tag: '소식', tone: 'tertiary', title: '교회학교 봄소풍', date: '2026.04.06' },
];

const TAG_TONES: Record<string, string> = {
  primary: 'bg-[#0045bc]/10 text-[#0045bc]',
  secondary: 'bg-[#006b5d]/10 text-[#006b5d]',
  tertiary: 'bg-[#8f2f00]/10 text-[#8f2f00]',
};

const NEW_FAMILY_STEPS = [
  {
    num: '1',
    title: '등록카드 작성',
    desc: '안내데스크에서 등록카드를 작성해주시면 정성껏 안내해 드립니다.',
  },
  {
    num: '2',
    title: '예배 참석 & 담임목사 면담',
    desc: '은혜로운 예배 후 목사님과 따뜻한 만남의 시간을 갖습니다.',
  },
  {
    num: '3',
    title: '새가족 교육 (4주)',
    desc: '공동체의 일원이 되기 위한 체계적인 교육 과정을 거치게 됩니다.',
  },
];

export default function Home() {
  const featured = LATEST_SERMONS[0];

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-['Manrope']">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-01.jpg" alt="물댄동산교회" fill priority className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-6 w-full py-20 md:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#0045bc]/15">
              <span className="text-[#0045bc] text-[13px] font-semibold tracking-[0.08em]">
                COLOSSIANS 2:6-7
              </span>
            </div>
            <h1
              className="text-[40px] md:text-[56px] leading-[1.15] font-extrabold text-[#0045bc] tracking-tight"
              style={{ textShadow: '0 0 20px rgba(0, 69, 188, 0.08)' }}
            >
              복음으로 다시 세워지는 교회
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#434655] max-w-xl">
              &ldquo;그러므로 너희가 그리스도 예수를 주로 받았으니 그 안에서 행하되 그 안에 뿌리를 박으며
              세움을 받아 교훈을 받은 대로 믿음에 굳게 서서 감사함을 넘치게 하라&rdquo;
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#sermon"
                className="bg-[#0045bc] text-white px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-[#0045bc]/20 transition-shadow"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_circle
                </span>
                최신 설교 보기
              </a>
              <Link
                href="/greeting"
                className="bg-white/80 backdrop-blur-sm text-[#0045bc] border border-[#0045bc]/20 px-7 py-3.5 rounded-full font-semibold hover:bg-white transition-colors"
              >
                교회 소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Bento */}
      <section className="py-20 md:py-24 max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 우리의 예배 (col-span-2, mint) */}
          <Link
            href="/worship-guide"
            className="md:col-span-2 group relative overflow-hidden bg-[#E0F5F0] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="space-y-4">
                <span className="material-symbols-outlined text-4xl text-[#006b5d]">church</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#191c1d]">우리의 예배</h3>
                <p className="text-[#434655] text-base leading-relaxed">
                  예배는 우리의 삶의 목적입니다. 영과 진리로 드리는 거룩한 산 제사로 나아갑니다.
                </p>
              </div>
              <span className="text-[#006b5d] text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                예배안내 자세히 <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          </Link>

          {/* 말씀과 찬양 (primary) */}
          <Link
            href="/sunday-sermon"
            className="bg-[#0045bc] p-8 rounded-3xl text-white transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col h-full justify-between">
              <span className="material-symbols-outlined text-4xl text-[#61fadf]">music_note</span>
              <div className="mt-6">
                <h3 className="text-xl font-bold">말씀과 찬양</h3>
                <p className="text-white/80 text-sm mt-2">감동이 있는 예배</p>
              </div>
              <span className="mt-8 material-symbols-outlined self-end group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* 양육과 훈련 (cream) */}
          <Link
            href="/discipleship"
            className="bg-[#FFF9E1] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col h-full justify-between text-[#191c1d]">
              <span className="material-symbols-outlined text-4xl text-[#8f2f00]">menu_book</span>
              <div className="mt-6">
                <h3 className="text-xl font-bold">양육과 훈련</h3>
                <p className="text-[#434655] text-sm mt-2">그리스도의 제자로</p>
              </div>
              <span className="mt-8 material-symbols-outlined self-end text-[#8f2f00] group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest Sermon */}
      <section id="sermon" className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-[#0045bc] text-sm font-semibold uppercase tracking-widest">
                주일 메시지
              </span>
              <h2 className="text-3xl md:text-[32px] font-bold leading-tight">최신 설교 영상</h2>
            </div>
            <Link
              href="/sunday-sermon"
              className="text-[#434655] hover:text-[#0045bc] flex items-center gap-2 transition-colors font-medium"
            >
              전체 설교 보기 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Featured */}
            <div className="lg:col-span-8 group">
              <a
                href={`https://www.youtube.com/watch?v=${featured.id}&list=${SERMON_PLAYLIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-video rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center text-[#0045bc] shadow-xl">
                    <span
                      className="material-symbols-outlined text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-[#0045bc] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">
                  NEW
                </div>
              </a>
              <div className="mt-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-[#434655] text-sm">
                  <span className="bg-[#edeeef] px-3 py-1 rounded-md font-medium">{featured.date}</span>
                  <span>{featured.verse}</span>
                  <span className="w-1 h-1 bg-[#737686] rounded-full" />
                  <span>{featured.series}</span>
                  <span className="w-1 h-1 bg-[#737686] rounded-full" />
                  <span>{featured.pastor}</span>
                </div>
                <h3 className="text-2xl md:text-[28px] font-bold text-[#0045bc] leading-tight">
                  {featured.title}
                </h3>
                {featured.desc && (
                  <p className="text-base text-[#434655] max-w-2xl leading-relaxed">
                    {featured.desc}
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <h4 className="text-lg font-bold border-b border-[#c3c6d7] pb-4">지난 설교</h4>
              <div className="space-y-2">
                {LATEST_SERMONS.slice(1).map((s, i) => (
                  <a
                    key={s.id}
                    href={`https://www.youtube.com/watch?v=${s.id}&list=${SERMON_PLAYLIST_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex gap-4 p-4 rounded-2xl hover:bg-[#f3f4f5] transition-colors group ${
                      i > 0 ? 'border-t border-[#e1e3e4]' : ''
                    }`}
                  >
                    <div className="w-24 h-16 bg-[#edeeef] rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={`https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`}
                        alt={s.title}
                        fill
                        sizes="96px"
                        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#0045bc] text-xs font-semibold mb-1">{s.date}</p>
                      <p className="text-sm font-semibold text-[#191c1d] truncate">
                        {s.title} ({s.verse})
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-[#e1e3e4]/70 p-7 rounded-3xl mt-8">
                <h5 className="text-lg font-bold text-[#0045bc] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">schedule</span>
                  예배안내
                </h5>
                <ul className="space-y-3 text-sm text-[#434655]">
                  <li className="flex justify-between">
                    <span>주일예배</span>
                    <span className="font-bold text-[#191c1d]">오전 9시 &amp; 11시</span>
                  </li>
                  <li className="flex justify-between">
                    <span>수요예배</span>
                    <span className="font-bold text-[#191c1d]">오후 7시 30분</span>
                  </li>
                  <li className="flex justify-between">
                    <span>금요기도회</span>
                    <span className="font-bold text-[#191c1d]">오후 8시</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Family */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="bg-white rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.04)] overflow-hidden border border-[#e1e3e4]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 space-y-8">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-[32px] font-bold text-[#0045bc] leading-tight">
                    처음 오셨나요?
                  </h2>
                  <p className="text-[#434655] text-base md:text-lg">
                    물댄동산교회는 하나님의 사랑 안에서 여러분을 환영합니다. 함께 성장하는 기쁨을 누려보세요.
                  </p>
                </div>

                <div className="space-y-6">
                  {NEW_FAMILY_STEPS.map((s) => (
                    <div key={s.num} className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-[#dbe1ff] text-[#0045bc] flex items-center justify-center font-bold shrink-0">
                        {s.num}
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-[#191c1d] mb-1">{s.title}</h5>
                        <p className="text-[#434655] text-sm md:text-base">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/discipleship#new-family"
                  className="inline-flex items-center gap-3 text-[#0045bc] text-lg font-bold hover:underline decoration-2 underline-offset-8"
                >
                  새가족 안내 자세히 보기
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                </Link>
              </div>

              <div className="bg-[#E0F5F0] relative hidden lg:block overflow-hidden min-h-[400px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-xs px-6">
                    <span className="material-symbols-outlined text-[120px] text-[#0045bc]/25">
                      diversity_1
                    </span>
                    <p className="text-[#0045bc]/70 text-lg italic leading-relaxed">
                      &ldquo;우리는 사랑 안에서 하나되는 공동체입니다&rdquo;
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#0045bc]/5 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church News + Location */}
      <section className="py-20 md:py-24 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* News */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl md:text-[32px] font-bold">교회 소식</h2>
                <Link href="/church-news-events" className="text-[#0045bc] text-sm font-semibold">
                  더보기 →
                </Link>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden border border-[#e1e3e4]">
                {NEWS.map((n, i) => (
                  <Link
                    key={i}
                    href="/church-news-events"
                    className={`flex justify-between items-center p-5 md:p-6 hover:bg-[#f3f4f5] transition-colors ${
                      i !== NEWS.length - 1 ? 'border-b border-[#e1e3e4]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`px-3 py-1 text-xs font-bold rounded shrink-0 ${TAG_TONES[n.tone]}`}>
                        {n.tag}
                      </span>
                      <span className="text-[#191c1d] truncate">{n.title}</span>
                    </div>
                    <span className="text-[#434655] text-sm shrink-0 ml-3">{n.date}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-[32px] font-bold">오시는 길</h2>
              <div className="bg-white rounded-3xl overflow-hidden border border-[#e1e3e4] shadow-sm">
                {/* Map - Google Maps interactive embed */}
                <div className="relative aspect-[16/10] bg-[#dbe1ff]">
                  <iframe
                    title="물댄동산교회 지도"
                    src="https://www.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%82%A8%EC%96%91%EC%A3%BC%EC%8B%9C%20%EB%8D%95%EC%86%A12%EB%A1%9C%2063&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  {/* 외부지도 바로가기 핀 (우상단) */}
                  <a
                    href="https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%82%A8%EC%96%91%EC%A3%BC%EC%8B%9C%20%EB%8D%95%EC%86%A12%EB%A1%9C%2063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#0045bc] text-xs font-semibold px-3 py-2 rounded-full shadow-md hover:bg-white hover:shadow-lg transition"
                    aria-label="카카오맵에서 보기"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    카카오맵
                  </a>
                </div>
                {/* Info */}
                <div className="p-7 md:p-8 space-y-5">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-[#0045bc]">location_on</span>
                    <div>
                      <p className="font-bold text-[#191c1d]">경기도 남양주시 덕송2로 63(별내동)</p>
                      <p className="text-[#434655] text-sm mt-1">별가람역 인근 · 우 12097</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-[#0045bc]">call</span>
                    <p className="font-bold text-[#191c1d]">031-553-0191</p>
                  </div>
                  <div className="pt-4 border-t border-[#e1e3e4] flex gap-4">
                    <span className="material-symbols-outlined text-[#006b5d]">directions_car</span>
                    <p className="text-[#434655] text-sm">
                      교회 인근에 방문자 주차 공간이 마련되어 있습니다.
                    </p>
                  </div>
                  <Link
                    href="/directions"
                    className="inline-flex items-center gap-2 text-[#0045bc] text-sm font-semibold hover:underline decoration-2 underline-offset-4"
                  >
                    오시는 길 자세히 보기
                    <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
