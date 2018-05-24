const httpModule = require("http");
const moduleTies = require("./moduleTies");
const urlModule = require("url");
const fsModule = require("fs");
const streamModule = require("stream");
const eventsModule = require("events");
const eventEmitter = new eventsModule.EventEmitter();

const hostname = "localhost";
const port = "3000";

const server = httpModule.createServer();

server.on("request", (request, response) => {
  request.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });

  response.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });
  var respnseData = createResponse(request);
  response.end("");
});

server.listen(port, hostname, () => {
  console.log(`server running on ${hostname}:${port}`);
});



eventEmitter.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});

function createResponse(request) {
  let { readable, domain, socket, connection, httpVersionMajor, httpVersionMinor, httpVersion, complete, headers, rawHeaders, trailers, rawTrailers, upgrade, url, method, statusCode, statusMessage, client} = request;
  let { protocol, slashes, auth, host, port, hostname, hash, search, query, pathname, path, href} = urlModule.parse(url);
  console.log(Object.keys(request));
  console.log(Object.keys(urlModule.parse(url)));
  console.log(url);
  console.log(method);
  console.log(protocol);
}
