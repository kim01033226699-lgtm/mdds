// 게시판 API: 글 목록 조회, 글 작성

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function maskName(name) {
  if (!name || name.length <= 1) return name;
  if (name.length === 2) return name[0] + '*';
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT id, name, category, created_at, is_answered FROM posts ORDER BY id DESC'
    ).all();
    const posts = (results || []).map(p => ({
      id: p.id,
      name: maskName(p.name),
      category: p.category,
      createdAt: p.created_at,
      isAnswered: p.is_answered === 1,
    }));
    return new Response(JSON.stringify({ posts }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestPost({ env, request }) {
  try {
    const { name, category, content, password } = await request.json();
    if (!name || !content || !password) {
      return new Response(JSON.stringify({ error: '필수 항목을 입력해주세요' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const hashedPw = await hashPassword(password);
    await env.DB.prepare(
      'INSERT INTO posts (name, category, content, password) VALUES (?, ?, ?, ?)'
    ).bind(name, category || '기타', content, hashedPw).run();
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
