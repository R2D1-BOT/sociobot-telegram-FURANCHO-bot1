export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      const update = await request.json();

      // ⚡ Aquí procesamos mensajes de Telegram
      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;

        // Respuesta de prueba
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `Pong: ${text}`);
      }

      return new Response("OK", { status: 200 });
    }

    return new Response("Bot online ✅", { status: 200 });
  }
};

async function sendMessage(token, chatId, text) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}
