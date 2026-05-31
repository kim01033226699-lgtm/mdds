// 관리자: 전체 글 + 답변 조회

const ADMIN_PASSWORD = 'mdds2025!';

export async function onRequestPost({ env, request }) {
  try {
    const { adminPassword } = await request.json();
    if (adminPassword !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: '관리자 인증 실패' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const { results } = await env.DB.prepare('SELECT * FROM posts ORDER BY id DESC').all();
    const posts = [];
    for (const p of (results || [])) {
      const { results: replies } = await env.DB.prepare(
        'SELECT id, content, created_at FROM replies WHERE post_id = ? ORDER BY id ASC'
      ).bind(p.id).all();
      posts.push({
        id: p.id, name: p.name, category: p.category, content: p.content,
        createdAt: p.created_at, isAnswered: p.is_answered === 1,
        replies: (replies || []).map(r => ({ id: r.id, content: r.content, createdAt: r.created_at })),
      });
    }
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
