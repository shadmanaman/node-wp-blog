const https = require("https");

module.exports = async (req, res) => {
  const wpApiUrl = "https://organokala.ir/wp-json/wp/v2/posts?per_page=5&_embed";

  https.get(wpApiUrl, (wpRes) => {
    let data = "";

    wpRes.on("data", (chunk) => {
      data += chunk;
    });

    wpRes.on("end", () => {
      const posts = JSON.parse(data);

      let html = "<h1>📰 مطالب وبلاگ ارگانوکالا</h1><ul>";

      posts.forEach((post) => {
        html += `
          <li style="margin-bottom:20px">
            <h2>${post.title.rendered}</h2>
            <div>${post.excerpt.rendered}</div>
          </li>
        `;
      });

      html += "</ul>";

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  }).on("error", (err) => {
    res.writeHead(500);
    res.end("خطا در دریافت مطالب وبلاگ");
  });
};
