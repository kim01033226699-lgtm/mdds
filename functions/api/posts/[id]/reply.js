// 게시판 API: 관리자 답변

const ADMIN_PASSWORD = 'mdds2025!';

export async function onRequestPost({ params, env, request }) {
  try {
    const id = params.id;
    const { content, adminPassword } = await request.json();
    if (adminPassword !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: '관리자 인증 실패' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!content) {
      return new Response(JSON.stringify({ error: '답변 내용을 입력해주세요' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    await env.DB.prepare('INSERT INTO replies (post_id, content) VALUES (?, ?)').bind(id, content).run();
    await env.DB.prepare('UPDATE posts SET is_answered = 1 WHERE id = ?').bind(id).run();
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
