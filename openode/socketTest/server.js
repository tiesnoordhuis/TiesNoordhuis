const http = require("http");
const events = require("events");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");

var app = express();

var serverLogEvent = new events.EventEmitter();

var serverLog = [];

var serverRecievedMessages = [];

serverLogEvent.on("connect", (data) => {
  serverLog.push(data);
})

var port = process.env.PORT || 80;

var server = http.createServer(app).listen(port);

var socketServer = socketIO(server);

socketServer.on("connection", (socket) => {
  console.log(socket.handshake.headers["user-agent"]);
  serverLogEvent.emit("connect", { id: socket.id, browserType: socket.handshake.headers["user-agent"], time: socket.handshake.time });
  socket.emit("msgOut", { data: "msg from server" });
  socket.on("msgIn", (data) => {
    console.log(data);
    serverRecievedMessages.push({ msg: data.data, time: new Date() , id: socket.id});
  });
  socket.on("serverDo", (data) => {
    console.log(data);
    if (data.data === "log") {
      socket.emit("clientDoLog", { data: serverLog });
    } else {
      socket.emit("clientDoMsg", { data: serverRecievedMessages });
    }
  });
});

app.use((request, response, next) => {
  console.log(request.url);
  console.log(request.method);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io-client/dist/socket.io.js");
});

app.get("/codeTies.js", (req, res) => {
  res.sendFile(__dirname + "/public/js/codeTies.js");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/public/images/favicon.ico");
});
