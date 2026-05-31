// 게시판 API: 글 상세 조회 (비밀번호 인증), 글 삭제

const ADMIN_PASSWORD = 'mdds2025!';

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password, hashed) {
  return (await hashPassword(password)) === hashed;
}

export async function onRequestPost({ params, env, request }) {
  try {
    const id = params.id;
    const { password } = await request.json();
    if (!password) {
      return new Response(JSON.stringify({ error: '비밀번호를 입력해주세요' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const post = await env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first();
    if (!post) {
      return new Response(JSON.stringify({ error: '글을 찾을 수 없습니다' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!(await verifyPassword(password, post.password))) {
      return new Response(JSON.stringify({ error: '비밀번호가 올바르지 않습니다' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const { results: replies } = await env.DB.prepare(
      'SELECT id, content, created_at FROM replies WHERE post_id = ? ORDER BY id ASC'
    ).bind(id).all();
    return new Response(JSON.stringify({
      post: {
        id: post.id, name: post.name, category: post.category, content: post.content,
        createdAt: post.created_at, isAnswered: post.is_answered === 1,
      },
      replies: (replies || []).map(r => ({ id: r.id, content: r.content, createdAt: r.created_at })),
    }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestDelete({ params, env, request }) {
  try {
    const id = params.id;
    const { adminPassword, password } = await request.json();
    let authorized = false;
    if (adminPassword === ADMIN_PASSWORD) {
      authorized = true;
    } else if (password) {
      const post = await env.DB.prepare('SELECT password FROM posts WHERE id = ?').bind(id).first();
      if (post && await verifyPassword(password, post.password)) authorized = true;
    }
    if (!authorized) {
      return new Response(JSON.stringify({ error: '인증 실패' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    await env.DB.prepare('DELETE FROM replies WHERE post_id = ?').bind(id).run();
    await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();
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
