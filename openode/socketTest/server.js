const http = require("http");
const events = require("events");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");

const app = express();

var port = process.env.PORT || 3000;

var server = http.createServer(app).listen(port);

var socketServer = socketIO(server);

socketServer.on("connection", (socket) => {
  socket.emit("msgOut", { data: "msg from server" });
  socket.on("msgIn", (data) => {
    console.log(data);
  });
});

app.use((request, response, next) => {
  console.log(request.url);
  console.log(request.method);
  next();
});

app.get("/", (req, res) => {
  res.sendFile("public/html/index.html");
});

app.get("/socket.io.js", (req, res) => {
  res.sendFile("node_modules/socket.io-client/dist/socket.io.js");
});

app.get("/codeTies.js", (req, res) => {
  res.sendFile("public/js/codeTies.js");
});
