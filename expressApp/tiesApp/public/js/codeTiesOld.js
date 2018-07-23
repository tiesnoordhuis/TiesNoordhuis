window.onload = frameIni();

function frameIni() {
  var width = Math.min(document.documentElement.clientWidth, screen.width);
  var height = Math.min(document.documentElement.clientHeight, screen.height);
  console.log("window loaded with width: " + width + " and height: " + height);
  if (width >= 320) {
    setClasses("large");
  } else {
    setClasses("small");
  }
  setContentBlocks(width);
}

function setContentBlocks(width) {
  if (width < 250) {
    var flexRows = document.getElementsByClassName("flexRow");
    for (var i = 0; i < flexRows.length; i++) {
      flexRows[i].style.flexWrap = "wrap";
    }
  }
  var widthBlock = (Math.floor(width) / 2);
  console.log(widthBlock);
  console.log(widthBlock * 2);
  var heightBlock = widthBlock * (3/4);
  if (heightBlock > 500) {
    heightBlock = 500;
  }
  var contentBlocks = document.getElementsByClassName("contentBlock");
  for (var i = 0; i < contentBlocks.length; i++) {
    contentBlocks[i].style.height = heightBlock.toString() + "px";
  }
}

function setClasses(size) {
  switch (size) {
    case ("large"): {
      setClassesLarge();
      break;
    }
    case ("small"): {
      setClassesSmall();
      break;
    }
    default: {
      console.error("no valid size to set classes");
    }
  }
}

function setClassesLarge() {
  document.getElementById("titleText").classList.add("titleTextBigScreenClass");
  document.getElementById("titleSubText").classList.add("titleSubTextBigScreenClass");
  document.getElementById("titleSubSubText").classList.add("titleSubSubTextBigScreenClass");
}

function setClassesSmall() {
  document.getElementById("titleText").classList.add("titleTextSmallScreenClass");
  document.getElementById("titleSubText").classList.add("titleSubTextSmallScreenClass");
  document.getElementById("titleSubSubText").classList.add("titleSubSubTextSmallScreenClass");
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