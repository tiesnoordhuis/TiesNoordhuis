window.onload = frameIni();

function frameIni() {
  var width = screen.width;
  var height = screen.height;
  console.log("window loaded with width: " + width + " and height: " + height);
}

function buttonTest() {
  document.getElementById("textDisplay").innerHTML = serverMsg;
}

var serverEvents = new EventSource("/serverEvents");
var serverMsg = "";

function onServerMsg(msg) {
  console.log(msg);
  if (msg === "secret") {
    serverMsg = msg;
  } else {
    serverMsg = "iets anders";
  }
}

serverEvents.onmessage = onServerMsg(e);
