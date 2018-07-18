window.onload = frameIni();

function frameIni() {
  var width = screen.width;
  var height = screen.height;
  console.log("window loaded with width: " + width + " and height: " + height);
}

function buttonTest() {
  document.getElementById("textDisplay").innerHTML = "work in progress";
}

/*
var serverEvents = new EventSource("/serverEvents");
var serverMsg = "";

serverEvents.addEventListener("message", function onServerMsg(msg) {
  console.log(msg);
  if (msg.data === "secret") {
    serverMsg = msg;
  } else {
    serverMsg = "iets anders";
  }
});

var socket = new WebSocket("ws://localhost:3000/webSocket");

socket.addEventListener("open", () => {
  socket.send("hello server");
  console.log("send hello to server");
});

socket.addEventListener("message", (msg) => {
  console.log("recieved message from server reading: " + msg.data);
});
*/
