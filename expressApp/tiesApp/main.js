const express = require("express");
const webSocket = require("ws");
const app = express();
const router = express.Router();
const serverEventMesseger = express.Router();
const serverSocket = express.Router();
const ws = new webSocket.Server({ noServer: true});
const events = require("events");
const createHTTPError = require('http-errors');
const path = require('path');

const serverLogEvent = new events.EventEmitter();

var serverLog = [];

serverLogEvent.on("request", (request) => {
  serverLog.push(request.ip);
  console.log(serverLog.length);
});

ws.on("connection", (websocketObject) => {
  console.log("websocket connection reached");
  console.log(websocketObject);
})

ws.on("upgrade", (websocketObject) => {
  console.log("webSocket connection upgraded");
  console.log(websocketObject);
})

serverSocket.all("*", (request, response) => {
  console.log("websocket request send to middleware");
  console.log(request.headers.connection);
  console.log(request.headers.upgrade);
  if (request.headers.connection === "Upgrade") {
    console.log("websocket request should be upgraded");
    console.log(ws.shouldHandle(request));
    ws.handleUpgrade(request, server.socket, server.head, (websocketObject) => {
        ws.emit('connection', websocketObject, request);
        console.log("emit websocket connection");
      });
    };
});

serverEventMesseger.get("", (request, response) => {
  request.setTimeout(1000000000);
  request.addListener("close", () => {
    response.end();
    console.log("ended serverEventMesseger after recieving close");
  })
  console.log("serverEventMesseger got request");
  response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });
  response.write("event: message\n");
  response.write("data: secret\n\n");
  console.log(request.eventNames());
  console.log(request.listenerCount("close"));
});

router.get("*favicon.ico", express.static(path.join(__dirname, 'public/images'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "image/x-icon")
}}));

router.get("/user/:id", (request, response, next) => {
  response.locals.userID = request.params.id;
  console.log("made id");
  next();
});

router.get("/user/*", (request, response) => {
  console.log("router response point reached");
  if (response.locals.userID) {
    console.log("check id true");
    response.end("welkom user " + response.locals.userID);
  } else {
    console.log("check id false");
    response.end("no valid userID")
    createHTTPError(500, "no valid userID");
  }
});

router.param("id", (request, response, next, id) => {
  console.log("user " + id + " made request to server");
  next();
});

router.get("/", (request, response) => {
  console.log("redirect naar index");
  response.redirect("/index.html")
});

router.get("/serverLog", (request,response) => {
  for (var i = 0; i < serverLog.length; i++) {
    console.log(i + ": " +  serverLog[i]);
  }
  response.redirect("/");
});

app.use((request, response, next) => {
  serverLogEvent.emit("request", request);
  next();
});

app.use((request, response, next) => {
  console.log(request.url);
  console.log(request.method);
  next();
})
app.use(router);
app.use("/serverEvents", serverEventMesseger);
app.use("/webSocket", serverSocket);
app.use(express.static(path.join(__dirname, 'public/html'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/html")
}}));
app.use(express.static(path.join(__dirname, 'public/css'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/css")
}}));
app.use(express.static(path.join(__dirname, 'public/js'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/javascript")
}}));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/css")
}}));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/javascript")
}}));

var server = app.listen(3000, () => {
  console.log("app listening port 3000");
  console.log(Object.keys(server));
});

server.on("upgrade", () => {
  console.log(" nieuwe server upgrade");
})
