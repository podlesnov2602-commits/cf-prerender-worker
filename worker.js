export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";
    const accept = request.headers.get("accept") || "";
    const url = new URL(request.url);

    // ===== DEBUG-ФЛАГ =====
    // https://fk-alatau.kz/?prerender=1
    const forcePrerender = url.searchParams.has("prerender");

    // ===== БАЗОВАЯ ЛОГИКА =====
    const wantsHTML = accept.includes("text/html");

    const isBrowser =
      /Chrome|Firefox|Safari|Edg/i.test(ua) &&
      !/bot|crawler|spider|curl|wget|node|python|http/i.test(ua);

    const needsPrerender =
      forcePrerender || (!isBrowser && wantsHTML);

    // ===== ЛОГИ =====
    console.log("URL:", request.url);
    console.log("UA:", ua);
    console.log("Accept:", accept);
    console.log("forcePrerender:", forcePrerender);
    console.log("isBrowser:", isBrowser);
    console.log("needsPrerender:", needsPrerender);

    // ===== PRERENDER =====
    if (needsPrerender) {
      console.log(">>> PRERENDER MODE <<<");

      return fetch(
        "http://34.60.197.31:3000/render?url=" +
          encodeURIComponent(request.url),
        {
          headers: {
            "User-Agent": ua
          }
        }
      );
    }

    // ===== SPA =====
    console.log(">>> NORMAL SPA MODE <<<");
    return fetch(request);
  }
};
