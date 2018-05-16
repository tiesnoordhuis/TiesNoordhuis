const http = require("http");
const moduleTies = require("./moduleTies");

const hostname = "localhost";
const port = "3000";

const server = http.createServer((request, responce) => {
  responce.statusCode = 200;
  responce.setHeader("Content-type", "text/html");
  responce.write(moduleTies.whatIsMyName() + "\n");
  responce.end("hello world");
  responce.on("finish", () => console.log("server responce send: " + Object.keys(responce._event)));
});

server.listen(port, hostname, () => {
  console.log(`server running on ${hostname}:${port}`);
});
