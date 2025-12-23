export default {
  async fetch(request, env) {
    const ua = request.headers.get("user-agent") || "";

    // Устройства, которым нужен пререндер
    const needsPrerender =
      /Tizen|SamsungBrowser|SmartTV|SMART-TV|HbbTV|NetCast|WebOS|Presto/i.test(ua);

    if (!needsPrerender) {
      // Обычным браузерам — обычный сайт
      return fetch(request);
    }

    const url = new URL(request.url);
    const prerenderURL =
      "http://34.60.197.31:3000/render?url=" + encodeURIComponent(url.href);

    return fetch(prerenderURL, {
      headers: {
        "User-Agent": ua
      }
    });
  }
};
