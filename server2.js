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
  var responseData = createResponse(request);
  response.writeHead(responseData[0][0], responseData[0][1], responseData[0][2]);
  if (responseData[1][0]) {
    eventEmitter.on("serverResponseFile", (serverResponseFile) => {
      response.write(serverResponseFile);
    });
    eventEmitter.once("serverResponseEnd", () => {
      eventEmitter.removeAllListeners("serverResponseFile");
      eventEmitter.removeAllListeners("serverResponseEnd");
      response.end(responseData[2][0]);
    });
  } else {
    console.log("server request heeft geen goede response en stuurt end");
    response.end(responseData[2][0]);
  }
});

server.listen(port, hostname, () => {
  console.log(`server running on ${hostname}:${port}`);
});



eventEmitter.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});

function createResponse(request) {
  var returnArray = [];
  var errorResponse = [];
  errorResponse[0] = [404, "", {}];
  errorResponse[1] = [false];
  errorResponse[2] = [""];
  var { readable, domain, socket, connection, httpVersionMajor, httpVersionMinor, httpVersion, complete, headers, rawHeaders, trailers, rawTrailers, upgrade, url, method, statusCode, statusMessage, client} = request;
  var { protocol, slashes, auth, host, port, hostname, hash, search, query, pathname, path, href} = urlModule.parse(url);
  console.log(method);
  console.log(pathname);
  switch (method) {
    case "GET":
      switch (pathname) {
        case "/":
          returnArray[0] = [200, "html page", {"Content-Type": "text/html"}];
          returnArray[1] = [true];
          returnArray[2] = [""];
          createStreamToServerResponse(pathname);
          break;
        case "/favicon.ico":
          returnArray[0] = [200, "favicon", {"Content-Type": "image/x-icon"}];
          returnArray[1] = [true];
          returnArray[2] = [""];
          createStreamToServerResponse(pathname);
          break;
        default:
        console.error("pathname not found: " + pathname);
        returnArray = errorResponse;
        console.log(errorResponse);
      }
      break;
    default:
      console.error("method not found" + method);
      returnArray = errorResponse;
  }
  return returnArray;
}

function createStreamToServerResponse(pathname) {
  switch (pathname) {
    case "/":
      var readStream = fsModule.createReadStream("index.html", "utf8");
      readStream.on("data", (data) => {
        eventEmitter.emit("serverResponseFile", data);
      });
      readStream.on("close", () => {
        eventEmitter.emit("serverResponseEnd");
      });
      break;
    case "/favicon.ico":
      var readStream = fsModule.createReadStream("favicon.ico");
      readStream.on("data", (data) => {
        eventEmitter.emit("serverResponseFile", data);
      });
      readStream.on("close", () => {
        eventEmitter.emit("serverResponseEnd");
      });
      break;
    default:
    console.error("invalid pathname in createStreamToServerResponse: " + pathname);
      return
  }
}
