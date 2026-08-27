export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const { name, email, msg } = await request.json();
        if (!msg) return json({ ok: false, error: 'missing message' }, 400);

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'contact@nullrose.com',
            to: 'mk@nullrose.com',
            reply_to: email || undefined,
            subject: `Nullrose // ${name || 'commission inquiry'}`,
            text: `${msg}\n\n— ${name || 'Anonymous'}${email ? ` <${email}>` : ''}`,
          }),
        });

        if (res.ok) return json({ ok: true });
        const err = await res.text();
        return json({ ok: false, error: err }, 500);
      } catch (e) {
        return json({ ok: false, error: e.message }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
