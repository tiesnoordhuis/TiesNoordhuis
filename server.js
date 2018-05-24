const http = require("http");
const moduleTies = require("./moduleTies");
const url = require("url");
const fs = require("fs");
const stream = require("stream");
const events = require("events");
const eventEmitter = new events.EventEmitter();

const hostname = "localhost";
const port = "3000";

const server = http.createServer();

server.on("request", (request, response) => {
  request.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });

  response.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });
  //logRequestInfo(request);
  response.statusCode = 200;
  response.setHeader("Content-type", "text/html");
  makeServerResponse(request);
  eventEmitter.on("serverResponseFile", (responseFile) => {
    console.log("starting to write response in server");
    response.write(responseFile, () => {
      console.log("response written");
    });
  });
  eventEmitter.once("serverResponseEnd", () => {
    console.log("starting to write end in server");
    response.end("", () => {
      console.log("response end sent");
    });
    console.log("response finished");
    console.log(response.finished);
  });
  console.log(eventEmitter.listenerCount("serverResponseFile"));
  console.log(eventEmitter.rawListeners("serverResponseFile"));
  response.on("finish", () => {
    console.log("response finish event");
    eventEmitter.removeAllListeners("serverResponseFile");
    eventEmitter.removeAllListeners("serverResponseEnd");
  });
});

function makeServerResponse(request) {
  console.log(request.url);
  if (request.url === "/favicon.ico") {
    makeIconResponse(request);
  } else {
    console.log("function to make response called");
    var readStream = fs.createReadStream("index.html", "utf8");
    readStream.on("data", (data) => {
      console.log("data in response function being read, emitting serverResponseFile");
      eventEmitter.emit("serverResponseFile", data);
    });
    readStream.on("close", () => {
      console.log("data in response function reading has ended, emitting serverResponseEnd");
      eventEmitter.emit("serverResponseEnd");
    });
  }
}

function makeIconResponse(request) {
  var readStream = fs.createReadStream("favicon.ico");
  readStream.on("data", (data) => {
    console.log("data in icon response function being read, emitting serverResponseFile");
    eventEmitter.emit("serverResponseFile", data);
  })
  readStream.on("close", () => {
    console.log("data in icon response function reading has ended, emitting serverResponseEnd");
    eventEmitter.emit("serverResponseEnd");
  });
}

function logRequestInfo(request) {
  console.log("headers: ");
  console.log(request.headers);
  console.log("\n url: ");
  console.log(request.url);
  console.log("url in parts: ");
  console.log(url.parse(request.url, true));
  console.log("\n aborted: ");
  console.log(request.aborted);
  console.log("\n method: ");
  console.log(request.method);
  console.log("\n headers raw:");
  console.log(request.rawHeaders);
  console.log("\n entries van het request object:");
  console.log(Object.entries(request));
}

server.listen(port, hostname, () => {
  console.log(`server running on ${hostname}:${port}`);
});

eventEmitter.on("newListener", (event, listener) => {
  console.log("new listener added:");
  console.log(event);
  console.log(listener);
})

eventEmitter.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});
