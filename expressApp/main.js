const express = require("express");
const app = express();
const router = express.Router();

router.get("/user/:id", (request, response, next) => {
  response.locals.storage = ("hi user with number: " + request.params.id);
  next();
});

router.param("id", (request, response, next, id) => {
  console.log("user " + id + " made request to server");
  next();
});

router.get("/*", (request, response) => {
  response.send(response.locals.storage + "bye world");
  response.end();
});

app.use(router);

app.listen(3000, () => {
  console.log("app listening port 3000");
});
