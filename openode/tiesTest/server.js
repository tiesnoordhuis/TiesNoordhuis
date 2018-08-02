const http = require("http");
const express = require("express");
const app = express();
const router = express.Router();
const events = require("events");
const path = require("path");
const createHTTPError = require("http-errors");
const serverEventMesseger = express.Router();
const serverSocket = express.Router();
const serverLogEvent = new events.EventEmitter();
const socketIO = require("socket.io");

var ioServerInstance = socketIO(server);

ioServerInstance.on("connection", (socket) => {
  socket.emit("serverData", { msg: "hello from server" });
  socket.on("clientData", (data) => {
    console.log(data);
  })
});

var serverLog = [];

serverLogEvent.on("request", (request) => {
  serverLog.push(request.ip);
  console.log(serverLog.length);
});

router.get("*favicon.ico", express.static(path.join(__dirname, 'public/images'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "image/x-icon")
}}));

router.get("/", (request, response) => {
  console.log("redirect naar index");
  response.redirect("/index.html")
});

app.use((request, response, next) => {
  console.log(request.url);
  console.log(request.method);
  serverLogEvent.emit("request", request);
  next();
});
app.use(router);
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
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/javascript")
}}));
app.use(express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/javascript")
}}));
app.use(express.static(path.join(__dirname, 'node_modules/socket.io-client/dist'), {setHeaders: (response, path, stat) => {
  response.setHeader("Content-Type", "text/javascript")
}}));

var port = process.env.PORT || 3000;

var socketApp = require("express")();
var socketServer = http.Server(socketApp)
var socketInstancee = socketIO(server);

socketServer.listen(80);

socketInstancee.on("connection", (socket) => {
  socket.emit("serverData", { msg: "hello from server" });
  socket.on("clientData", (data) => {
    console.log(data);
  })
});

var server = http.createServer(socketApp).listen(port, () => {
  console.log("app listening port " + port);
});
