export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";
    const accept = request.headers.get("accept") || "";

    const isBrowser =
      /Chrome|Firefox|Safari|Edg/i.test(ua) &&
      !/bot|crawler|spider|curl|wget|node|python/i.test(ua);

    const wantsHTML = accept.includes("text/html");

    const needsPrerender = !isBrowser && wantsHTML;

    console.log("UA:", ua);
    console.log("isBrowser:", isBrowser);
    console.log("needsPrerender:", needsPrerender);

    if (needsPrerender) {
      return fetch(
        "http://34.60.197.31:3000/render?url=" +
          encodeURIComponent(request.url),
        { headers: { "User-Agent": ua } }
      );
    }

    return fetch(request);
  }
};
