const http = require("http");
const moduleTies = require("./moduleTies");
const url = require("url");
const fs = require("fs");
const stream = require("stream");
const events = require("events");
const eventEmitter = new events.EventEmitter();

eventEmitter.on("error", (err) => {
  console.error("eventEmitter encountered error");
  console.error(err);
});

const hostname = "localhost";
const port = "3000";

const server = http.createServer((request, responce) => {
  //logRequestInfo(request);
  responce.statusCode = 200;
  responce.setHeader("Content-type", "text/html");
  fs.readFile("index.html", (err, data) => {
    responce.write(data);
    responce.end();
  })
  /*makeServerResponce(request);
  eventEmitter.on("serverResponceFile", (responceFile) => {
    console.log("starting to write responce in server");
    responce.write(responceFile, () => {
      console.log("responce written");
    });
  });
  eventEmitter.on("serverResponceEnd", () => {
    console.log("starting to write end in server");
    responce.end();
  });
  */
  responce.on("finish", () => console.log("responce finish event"));
});

function makeServerResponce(request) {
  console.log(request.url);
  if (request.url === "/flavicon.ico") {
    console.log("icon request");
  } else {
    console.log("function to make responce called");
    var readStream = fs.createReadStream("index.html", "utf8");
    readStream.on("data", (data) => {
      console.log("data in responce function being read, emitting serverResponceFile");
      eventEmitter.emit("serverResponceFile", data);
    });
    readStream.on("end", () => {
      console.log("data in responce function reading has ended, emitting serverResponceEnd");
      eventEmitter.emit("serverResponceEnd");
    });
  }
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
