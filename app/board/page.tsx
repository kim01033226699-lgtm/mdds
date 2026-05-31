'use client';

import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';

type Post = {
  id: number; name: string; category: string;
  createdAt: string; isAnswered: boolean;
};

type PostDetail = {
  id: number; name: string; category: string; content: string;
  createdAt: string; isAnswered: boolean;
};

type Reply = { id: number; content: string; createdAt: string };

const CATEGORIES = ['신앙상담', '교회생활', '부서활동', '행사문의', '기타'];

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showWrite, setShowWrite] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [detail, setDetail] = useState<PostDetail | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [verifiedPw, setVerifiedPw] = useState('');

  // 폼 상태
  const [form, setForm] = useState({ name: '', category: '신앙상담', content: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await fetch('/api/posts');
    if (res.ok) {
      const d = await res.json();
      setPosts(d.posts || []);
    }
  }

  async function viewPost() {
    if (!selectedId || !pwInput) return;
    setPwError('');
    const res = await fetch(`/api/posts/${selectedId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwInput }),
    });
    if (res.ok) {
      const d = await res.json();
      setDetail(d.post);
      setReplies(d.replies || []);
      setVerifiedPw(pwInput);
      setPwInput('');
    } else {
      const d = await res.json();
      setPwError(d.error || '비밀번호가 올바르지 않습니다');
    }
  }

  async function deletePost() {
    if (!detail || !verifiedPw) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/posts/${detail.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: verifiedPw }),
    });
    if (res.ok) {
      alert('삭제되었습니다');
      setDetail(null);
      setReplies([]);
      setVerifiedPw('');
      setSelectedId(null);
      load();
    } else {
      const d = await res.json();
      alert(d.error || '삭제 실패');
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.content || !form.password) return;
    setSubmitting(true);
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      alert('문의가 접수되었습니다');
      setShowWrite(false);
      setForm({ name: '', category: '신앙상담', content: '', password: '' });
      load();
    }
  }

  return (
    <>
      <PageHeader title="문의게시판" subtitle="궁금하신 내용을 문의해주세요" />

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {/* 상세 보기 */}
          {detail && (
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">[{detail.category}] 문의</h2>
                <div className="flex gap-2">
                  <button onClick={deletePost} className="px-4 py-1.5 bg-black text-white rounded-md text-xs font-semibold hover:bg-gray-800">삭제</button>
                  <button onClick={() => { setDetail(null); setReplies([]); setVerifiedPw(''); setSelectedId(null); }} className="text-gray-400 text-xl leading-none">×</button>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-3">{detail.name} | {detail.createdAt?.slice(0, 10)}</div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">{detail.content}</p>

              {replies.length > 0 ? (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">답변</h3>
                  {replies.map(r => (
                    <div key={r.id} className="bg-gray-100 rounded-lg p-4 mb-2">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{r.content}</p>
                      <p className="text-xs text-gray-400 mt-2">{r.createdAt?.slice(0, 10)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">아직 답변이 등록되지 않았습니다</p>
              )}
            </div>
          )}

          {/* 글쓰기 버튼 */}
          {!showWrite && !detail && (
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowWrite(true)} className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition">
                + 문의하기
              </button>
            </div>
          )}

          {/* 글쓰기 폼 */}
          {showWrite && (
            <form onSubmit={submit} className="bg-white border border-gray-200 rounded-xl p-8 mb-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">문의하기</h2>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">이름 *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">유형 선택</label>
                <div className="flex gap-3 flex-wrap">
                  {CATEGORIES.map(c => (
                    <label key={c} className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input type="radio" name="cat" value={c} checked={form.category === c} onChange={() => setForm({ ...form, category: c })} />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">문의 내용 *</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required rows={5} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">비밀번호 * <span className="font-normal text-gray-400">(답변 확인 시 필요)</span></label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required className="w-48 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-bold disabled:bg-gray-400">
                  {submitting ? '접수중...' : '문의 접수'}
                </button>
                <button type="button" onClick={() => setShowWrite(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300">취소</button>
              </div>
            </form>
          )}

          {/* 목록 */}
          {!detail && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[60px_100px_1fr_100px_80px] px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600">
                <span>번호</span><span>유형</span><span>작성자</span><span>날짜</span><span>상태</span>
              </div>
              {posts.length === 0 ? (
                <div className="text-center py-10 text-sm text-gray-400">등록된 문의가 없습니다</div>
              ) : posts.map(p => (
                <div
                  key={p.id}
                  onClick={() => { setSelectedId(p.id); setPwError(''); }}
                  className={`grid grid-cols-[60px_100px_1fr_100px_80px] px-4 py-3 border-b border-gray-100 last:border-b-0 text-sm cursor-pointer hover:bg-gray-50 ${selectedId === p.id ? 'bg-gray-100' : ''}`}
                >
                  <span className="text-gray-500">{p.id}</span>
                  <span><span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded-full">{p.category}</span></span>
                  <span className="text-gray-700">{p.name}</span>
                  <span className="text-xs text-gray-500">{p.createdAt?.slice(0, 10)}</span>
                  <span className={`text-xs font-bold ${p.isAnswered ? 'text-green-600' : 'text-amber-600'}`}>
                    {p.isAnswered ? '답변완료' : '대기중'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 비밀번호 입력 */}
          {selectedId && !detail && (
            <div className="mt-4 bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-sm font-bold text-gray-700 mb-3">글 확인을 위해 비밀번호를 입력해주세요</p>
              <div className="flex gap-2">
                <input type="password" value={pwInput} onChange={e => setPwInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && viewPost()} placeholder="비밀번호" className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm w-48 focus:outline-none focus:border-black" />
                <button onClick={viewPost} className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-bold">확인</button>
                <button onClick={() => { setSelectedId(null); setPwInput(''); setPwError(''); }} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300">취소</button>
              </div>
              {pwError && <p className="text-xs text-red-500 mt-2">{pwError}</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
