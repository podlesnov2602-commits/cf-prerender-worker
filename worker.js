export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";
    const accept = request.headers.get("accept") || "";
    const url = new URL(request.url);

    // debug: https://fk-alatau.kz/?prerender=1
    const forcePrerender = url.searchParams.has("prerender");

    const wantsHTML = accept.includes("text/html");

    const isBrowser =
      /Chrome|Firefox|Safari|Edg/i.test(ua) &&
      !/bot|crawler|spider|curl|wget|node|python/i.test(ua);

    const needsPrerender =
      forcePrerender || (!isBrowser && wantsHTML);

    if (needsPrerender) {
      console.log(">>> PRERENDER MODE <<<");

      return fetch(
        "http://34.60.197.31:3000/render?url=" +
          encodeURIComponent("https://fk-alatau.kz"),
        {
          headers: {
            "User-Agent": ua
          }
        }
      );
    }

    console.log(">>> NORMAL MODE <<<");
    return fetch(request);
  }
};
