export default {
  async fetch(request, env, ctx) {
    const ua = request.headers.get("user-agent") || "NO-UA";

    // ===== ЛОГИ ДЛЯ ОТЛАДКИ =====
    console.log("========== NEW REQUEST ==========");
    console.log("URL:", request.url);
    console.log("USER-AGENT:", ua);

    // ===== ДЕТЕКТ УСТРОЙСТВ =====
    const needsPrerender =
      /Tizen|SamsungBrowser|SmartTV|SMART-TV|HbbTV|NetCast|WebOS|Presto/i.test(ua);

    if (needsPrerender) {
      console.log(">>> PRERENDER MODE <<<");

      const prerenderURL =
        "http://34.60.197.31:3000/render?url=" +
        encodeURIComponent(request.url);

      return fetch(prerenderURL, {
        headers: {
          "User-Agent": ua
        }
      });
    }

    console.log(">>> NORMAL MODE <<<");

    // Обычные браузеры — напрямую
    return fetch(request);
  }
};
