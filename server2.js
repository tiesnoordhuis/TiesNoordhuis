const http = require("http");
const moduleTies = require("./moduleTies");
const url = require("url");
const fs = require("fs");
const stream = require("stream");
const events = require("events");
const eventEmitter = new events.EventEmitter();

request.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});

const hostname = "localhost";
const port = "3000";

const server = http.createServer();

server.on("request", (request, responce) => {
  console.log("request made");
  var url = request.url;
  console.log(url);
  var method = request.method;
  console.log(method);
  responce.end(url + method);
});

server.listen(port, hostname, () => {
  console.log(`server running on ${hostname}:${port}`);
});
