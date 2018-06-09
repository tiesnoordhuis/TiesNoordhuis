const express = require("express");
const app = express();
const router = express.Router();
const serverEventMesseger = express.Router();
const events = require("events");
const createHTTPError = require('http-errors');
const path = require('path');

const serverLogEvent = new events.EventEmitter();

var serverLog = [];

serverLogEvent.on("request", (request) => {
  serverLog.push(request.ip);
  console.log(serverLog.length);
});

serverEventMesseger.get((request, response) => {
  response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });

    setInterval(() => {
      console.log("writing serverEvent message");
      if (serverLog.length > 6) {
        response.send("secret");
      } else {
        response.send("niet speciaal");
      }
    }, 1000);
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
app.use(express.static(path.join(__dirname, 'public/html'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/html")
}}));
app.use(express.static(path.join(__dirname, 'public/css'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/css")
}}));
app.use(express.static(path.join(__dirname, 'public/js'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/javascript")
}}));

app.listen(3000, () => {
  console.log("app listening port 3000");
});