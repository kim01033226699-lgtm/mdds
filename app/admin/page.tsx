'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ADMIN_PASSWORD = 'mdds2025!';
const SESSION_KEY = 'mdds_admin_session';

type Section = 'greeting' | 'worship' | 'serving' | 'history' | 'directions' | 'posts';

const SECTIONS: { key: Section; label: string; icon: string }[] = [
  { key: 'greeting', label: '인사말', icon: '✎' },
  { key: 'worship', label: '예배안내', icon: '✦' },
  { key: 'serving', label: '섬기는사람들', icon: '◉' },
  { key: 'history', label: '교회연혁', icon: '◷' },
  { key: 'directions', label: '오시는길', icon: '◈' },
  { key: 'posts', label: '문의게시판', icon: '☰' },
];

export default function AdminPage() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<Section>('greeting');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === ADMIN_PASSWORD) {
      setAuthed(true);
      setPw(ADMIN_PASSWORD);
    }
  }, []);

  function login() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, pw);
      setAuthed(true);
      setLoginError('');
    } else {
      setLoginError('비밀번호가 올바르지 않습니다');
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPw('');
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-sm text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 font-bold">
            물
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">관리자 로그인</h2>
          <p className="text-xs text-gray-500 mb-6">관리자 비밀번호를 입력하세요</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:border-black mb-3"
          />
          <button
            onClick={login}
            className="w-full py-3 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition"
          >
            로그인
          </button>
          {loginError && <p className="text-red-500 text-xs mt-3">{loginError}</p>}
          <Link href="/" className="block mt-6 text-xs text-gray-500 hover:text-gray-700">
            ← 홈으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* 사이드바 */}
      <aside className="w-60 bg-black text-white flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-gray-800">
          <h1 className="text-base font-bold">관리자</h1>
          <p className="text-xs text-gray-400 mt-1">물댄동산교회</p>
        </div>
        <nav className="flex-1 py-3">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`w-full text-left px-5 py-3 text-sm flex items-center gap-3 transition ${
                section === s.key
                  ? 'bg-gray-800 text-white border-l-2 border-white font-bold'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white border-l-2 border-transparent'
              }`}
            >
              <span className="w-5 text-center">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 flex justify-between text-xs">
          <Link href="/" className="text-gray-400 hover:text-white">← 홈</Link>
          <button onClick={logout} className="text-gray-400 hover:text-white">로그아웃</button>
        </div>
      </aside>

      {/* 콘텐츠 */}
      <main className="flex-1 p-8 overflow-auto">
        <SectionContent section={section} adminPassword={pw} />
      </main>
    </div>
  );
}

function SectionContent({ section, adminPassword }: { section: Section; adminPassword: string }) {
  if (section === 'greeting') return <GreetingEditor adminPassword={adminPassword} />;
  if (section === 'worship') return <WorshipEditor adminPassword={adminPassword} />;
  if (section === 'serving') return <ServingEditor adminPassword={adminPassword} />;
  if (section === 'history') return <HistoryEditor adminPassword={adminPassword} />;
  if (section === 'directions') return <DirectionsEditor adminPassword={adminPassword} />;
  if (section === 'posts') return <PostsManager adminPassword={adminPassword} />;
  return null;
}

function showToast(msg: string) {
  const el = document.createElement('div');
  el.textContent = '✅ ' + msg;
  el.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg z-50';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-2">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputCls = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black';
const btnCls = 'mt-6 px-8 py-3 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition';

// === 인사말 ===
function GreetingEditor({ adminPassword }: { adminPassword: string }) {
  const [data, setData] = useState({ pastorName: '', pastorTitle: '', paragraphs: '', signature: '' });

  useEffect(() => {
    fetch('/api/contents/greeting').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data) setData({
        pastorName: d.data.pastorName || '',
        pastorTitle: d.data.pastorTitle || '',
        paragraphs: (d.data.paragraphs || []).join('\n\n'),
        signature: d.data.signature || '',
      });
    }).catch(() => {});
  }, []);

  async function save() {
    const body = {
      adminPassword,
      data: {
        pastorName: data.pastorName.trim(),
        pastorTitle: data.pastorTitle.trim(),
        paragraphs: data.paragraphs.trim().split(/\n\s*\n/).filter(p => p.trim()),
        signature: data.signature.trim(),
      },
    };
    const res = await fetch('/api/contents/greeting', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) showToast('인사말이 저장되었습니다');
    else { const e = await res.json(); alert(e.error || '저장 실패'); }
  }

  return (
    <Section title="인사말 관리">
      <Field label="목사 이름">
        <input className={inputCls} value={data.pastorName} onChange={(e) => setData({ ...data, pastorName: e.target.value })} />
      </Field>
      <Field label="직분">
        <input className={inputCls} value={data.pastorTitle} onChange={(e) => setData({ ...data, pastorTitle: e.target.value })} />
      </Field>
      <Field label="인사말 본문" hint="문단 구분은 빈 줄로">
        <textarea className={inputCls} rows={10} value={data.paragraphs} onChange={(e) => setData({ ...data, paragraphs: e.target.value })} />
      </Field>
      <Field label="서명">
        <input className={inputCls} value={data.signature} onChange={(e) => setData({ ...data, signature: e.target.value })} />
      </Field>
      <button className={btnCls} onClick={save}>저장</button>
    </Section>
  );
}

// === 예배안내 ===
function WorshipEditor({ adminPassword }: { adminPassword: string }) {
  const [services, setServices] = useState([
    { title: '', time: '', description: '' },
    { title: '', time: '', description: '' },
    { title: '', time: '', description: '' },
  ]);

  useEffect(() => {
    fetch('/api/contents/worship').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data?.services) {
        const s = [...services];
        d.data.services.forEach((svc: any, i: number) => { if (i < 3) s[i] = svc; });
        setServices(s);
      }
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    const body = { adminPassword, data: { services: services.filter(s => s.title.trim()) } };
    const res = await fetch('/api/contents/worship', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) showToast('예배안내가 저장되었습니다');
    else { const e = await res.json(); alert(e.error || '저장 실패'); }
  }

  return (
    <Section title="예배안내 관리">
      {services.map((s, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-4 border-b border-gray-100 last:border-b-0">
          <input className={inputCls} placeholder="예배명" value={s.title} onChange={(e) => { const n = [...services]; n[i].title = e.target.value; setServices(n); }} />
          <input className={inputCls} placeholder="시간" value={s.time} onChange={(e) => { const n = [...services]; n[i].time = e.target.value; setServices(n); }} />
          <input className={inputCls} placeholder="설명" value={s.description} onChange={(e) => { const n = [...services]; n[i].description = e.target.value; setServices(n); }} />
        </div>
      ))}
      <button className={btnCls} onClick={save}>저장</button>
    </Section>
  );
}

// === 섬기는사람들 ===
function ServingEditor({ adminPassword }: { adminPassword: string }) {
  const [text, setText] = useState({ pastor: '', staff: '', elders: '', seniorElders: '' });

  useEffect(() => {
    fetch('/api/contents/serving').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data?.categories) {
        const map: Record<string, string> = {};
        d.data.categories.forEach((c: any) => {
          map[c.title] = (c.members || []).map((m: any) => `${m.name} | ${m.position}`).join('\n');
        });
        setText({
          pastor: map['담임목사'] || '',
          staff: map['교역자'] || '',
          elders: map['시무장로'] || '',
          seniorElders: map['원로장로'] || '',
        });
      }
    }).catch(() => {});
  }, []);

  function parse(t: string) {
    return t.trim().split('\n').filter(l => l.trim()).map(l => {
      const [name, position] = l.split('|').map(s => s.trim());
      return { name: name || '', position: position || '' };
    });
  }

  async function save() {
    const categories = [
      { title: '담임목사', members: parse(text.pastor) },
      { title: '교역자', members: parse(text.staff) },
      { title: '시무장로', members: parse(text.elders) },
      { title: '원로장로', members: parse(text.seniorElders) },
    ].filter(c => c.members.length > 0);
    const body = { adminPassword, data: { categories } };
    const res = await fetch('/api/contents/serving', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) showToast('섬기는사람들이 저장되었습니다');
    else { const e = await res.json(); alert(e.error || '저장 실패'); }
  }

  return (
    <Section title="섬기는사람들 관리">
      <p className="text-xs text-gray-500">한 줄에 하나씩. 형식: <strong>이름 | 직분</strong></p>
      <Field label="담임목사">
        <textarea className={inputCls} rows={2} value={text.pastor} onChange={(e) => setText({ ...text, pastor: e.target.value })} />
      </Field>
      <Field label="교역자">
        <textarea className={inputCls} rows={5} value={text.staff} onChange={(e) => setText({ ...text, staff: e.target.value })} />
      </Field>
      <Field label="시무장로">
        <textarea className={inputCls} rows={4} value={text.elders} onChange={(e) => setText({ ...text, elders: e.target.value })} />
      </Field>
      <Field label="원로장로">
        <textarea className={inputCls} rows={2} value={text.seniorElders} onChange={(e) => setText({ ...text, seniorElders: e.target.value })} />
      </Field>
      <button className={btnCls} onClick={save}>저장</button>
    </Section>
  );
}

// === 교회연혁 ===
function HistoryEditor({ adminPassword }: { adminPassword: string }) {
  const [stats, setStats] = useState(['', '', '', '']);
  const [timeline, setTimeline] = useState('');
  const labels = ['설립년도', '등록교인', '섬기는 분들', '선교지'];

  useEffect(() => {
    fetch('/api/contents/history').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data) {
        const s = (d.data.stats || []).map((x: any) => x.number || '');
        setStats([s[0] || '', s[1] || '', s[2] || '', s[3] || '']);
        if (d.data.timeline) {
          setTimeline(d.data.timeline.map((t: any) => `${t.year} | ${t.title} | ${(t.events || []).join('; ')}`).join('\n'));
        }
      }
    }).catch(() => {});
  }, []);

  async function save() {
    const data = {
      stats: labels.map((label, i) => ({ number: stats[i].trim(), label })),
      timeline: timeline.trim().split('\n').filter(l => l.trim()).map(l => {
        const [year, title, events] = l.split('|').map(s => s.trim());
        return { year: year || '', title: title || '', events: (events || '').split(';').map(s => s.trim()).filter(s => s) };
      }),
    };
    const res = await fetch('/api/contents/history', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adminPassword, data }) });
    if (res.ok) showToast('교회연혁이 저장되었습니다');
    else { const e = await res.json(); alert(e.error || '저장 실패'); }
  }

  return (
    <Section title="교회연혁 관리">
      <div className="grid grid-cols-4 gap-3">
        {labels.map((l, i) => (
          <Field key={l} label={l}>
            <input className={inputCls} value={stats[i]} onChange={(e) => { const n = [...stats]; n[i] = e.target.value; setStats(n); }} />
          </Field>
        ))}
      </div>
      <Field label="연혁 목록" hint="한 줄에 하나씩. 형식: 연월 | 제목 | 세부내용1; 세부내용2">
        <textarea className={inputCls} rows={12} value={timeline} onChange={(e) => setTimeline(e.target.value)} />
      </Field>
      <button className={btnCls} onClick={save}>저장</button>
    </Section>
  );
}

// === 오시는길 ===
function DirectionsEditor({ adminPassword }: { adminPassword: string }) {
  const [data, setData] = useState({ address: '', phone: '', phoneHours: '', email: '', visitHours: '', parkingSpaces: '', parkingFee: '' });

  useEffect(() => {
    fetch('/api/contents/directions').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.data) setData(d.data);
    }).catch(() => {});
  }, []);

  async function save() {
    const res = await fetch('/api/contents/directions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adminPassword, data }) });
    if (res.ok) showToast('오시는길이 저장되었습니다');
    else { const e = await res.json(); alert(e.error || '저장 실패'); }
  }

  return (
    <Section title="오시는길 관리">
      <Field label="주소"><input className={inputCls} value={data.address || ''} onChange={(e) => setData({ ...data, address: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="전화번호"><input className={inputCls} value={data.phone || ''} onChange={(e) => setData({ ...data, phone: e.target.value })} /></Field>
        <Field label="전화 운영시간"><input className={inputCls} value={data.phoneHours || ''} onChange={(e) => setData({ ...data, phoneHours: e.target.value })} /></Field>
      </div>
      <Field label="이메일"><textarea className={inputCls} rows={2} value={data.email || ''} onChange={(e) => setData({ ...data, email: e.target.value })} /></Field>
      <Field label="방문시간"><textarea className={inputCls} rows={3} value={data.visitHours || ''} onChange={(e) => setData({ ...data, visitHours: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="주차 가능 대수"><input className={inputCls} value={data.parkingSpaces || ''} onChange={(e) => setData({ ...data, parkingSpaces: e.target.value })} /></Field>
        <Field label="주차 요금"><input className={inputCls} value={data.parkingFee || ''} onChange={(e) => setData({ ...data, parkingFee: e.target.value })} /></Field>
      </div>
      <button className={btnCls} onClick={save}>저장</button>
    </Section>
  );
}

// === 게시판 관리 ===
type AdminPost = {
  id: number; name: string; category: string; content: string;
  createdAt: string; isAnswered: boolean;
  replies: { id: number; content: string; createdAt: string }[];
};

function PostsManager({ adminPassword }: { adminPassword: string }) {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [selected, setSelected] = useState<AdminPost | null>(null);
  const [reply, setReply] = useState('');

  async function load() {
    const res = await fetch('/api/admin/posts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword }),
    });
    if (res.ok) {
      const d = await res.json();
      setPosts(d.posts || []);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  async function sendReply() {
    if (!selected || !reply) return;
    const res = await fetch(`/api/posts/${selected.id}/reply`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword, content: reply }),
    });
    if (res.ok) {
      showToast('답변이 등록되었습니다');
      setReply('');
      await load();
      const updated = (await fetch('/api/admin/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adminPassword }) }).then(r => r.json())).posts.find((p: AdminPost) => p.id === selected.id);
      if (updated) setSelected(updated);
    }
  }

  async function deletePost(id: number) {
    if (!confirm('삭제하시겠습니까?')) return;
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword }),
    });
    if (res.ok) {
      showToast('삭제되었습니다');
      setSelected(null);
      load();
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">문의게시판 관리 ({posts.length}건)</h2>
      <div className={selected ? 'grid grid-cols-2 gap-6' : ''}>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-10 text-sm text-gray-500">등록된 글이 없습니다</div>
          ) : posts.map(p => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className={`px-5 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 ${selected?.id === p.id ? 'bg-gray-100' : ''}`}
            >
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-900">[{p.category}] {p.name}</div>
                <span className={`text-xs font-bold ${p.isAnswered ? 'text-green-600' : 'text-amber-600'}`}>
                  {p.isAnswered ? '답변완료' : '대기중'}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{p.createdAt?.slice(0, 10)}</div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-base font-bold text-gray-900">[{selected.category}] {selected.name}</div>
              <button onClick={() => deletePost(selected.id)} className="px-3 py-1.5 border border-red-300 text-red-600 rounded-md text-xs font-semibold hover:bg-red-50">삭제</button>
            </div>
            <div className="text-xs text-gray-500 mb-3">{selected.createdAt?.slice(0, 10)}</div>
            <p className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap mb-5">{selected.content}</p>

            {selected.replies.length > 0 && (
              <div className="mb-5">
                <h4 className="text-xs font-bold text-gray-700 mb-2">등록된 답변</h4>
                {selected.replies.map(r => (
                  <div key={r.id} className="bg-gray-100 rounded-lg p-3 mb-2 text-sm">
                    <p className="text-gray-700 whitespace-pre-wrap">{r.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{r.createdAt?.slice(0, 10)}</p>
                  </div>
                ))}
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold text-gray-700 mb-2">답변 작성</h4>
              <textarea className={inputCls} rows={4} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="답변 내용" />
              <button onClick={sendReply} disabled={!reply} className="mt-2 px-6 py-2 bg-black text-white rounded-lg text-sm font-bold disabled:bg-gray-300">답변 등록</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
