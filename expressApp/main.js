const express = require("express");
const app = express();

app.get("/", (require, response) => {
  response.send("hello world");
});

app.listen(3000, () => {
  console.log("app listening port 3000");
});
