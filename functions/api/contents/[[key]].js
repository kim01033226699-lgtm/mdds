// 콘텐츠 API: 인사말, 예배안내, 연혁, 오시는길 등
// GET: 공개 조회 / PUT: 관리자 수정

const ADMIN_PASSWORD = 'mdds2025!';

export async function onRequestGet(context) {
  const { params, env } = context;
  const key = Array.isArray(params.key) ? params.key.join('/') : params.key;

  try {
    const row = await env.DB.prepare("SELECT value, updated_at FROM contents WHERE key = ?").bind(key).first();
    if (!row) {
      return new Response(JSON.stringify({ error: '콘텐츠를 찾을 수 없습니다' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ data: JSON.parse(row.value), updatedAt: row.updated_at }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestPut(context) {
  const { params, env, request } = context;
  const key = Array.isArray(params.key) ? params.key.join('/') : params.key;

  try {
    const body = await request.json();
    if (body.adminPassword !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: '관리자 인증 실패' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const value = JSON.stringify(body.data);
    await env.DB.prepare(
      "INSERT INTO contents (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime('now')"
    ).bind(key, value, value).run();

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
