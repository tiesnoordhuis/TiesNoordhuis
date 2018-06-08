const express = require("express");
const app = express();
const router = express.Router();
const events = require("events");

const serverLogEvent = new events.EventEmitter();

var serverLog = [];

serverLogEvent.on("request", (request) => {
  serverLog.push(request.ip);
  console.log(serverLog.length);
})

router.get("/user/:id", (request, response, next) => {
  response.locals.storage = ("hi user with number: " + request.params.id);
  next();
});

router.param("id", (request, response, next, id) => {
  console.log("user " + id + " made request to server");
  next();
});

router.get("/*", (request, response) => {
  var responseString = "bye world";
  if (response.locals.storage) {
    responseString = response.locals.storage + " " + responseString;
  }
  response.send(responseString);
  response.end();
});

app.use((request, response, next) => {
  serverLogEvent.emit("request", request);
  next();
})
app.use(router);

app.listen(3000, () => {
  console.log("app listening port 3000");
});
