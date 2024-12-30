const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/about") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end("server response from  about section");
    } else {
      res.writeHead(500, {
        "Content-Type": "text/html",
      });

      res.end("500 error response");
    }
  })
  .listen(4000);
