window.onload = frameIni();

function frameIni() {
  var width = screen.width;
  var height = screen.height;
  console.log("window loaded with width: " + width + " and height: " + height);
  if (width >= 320) {
    setClasses("large");
  } else {
    setClasses("small");
  }
  //setContentBlocks(width);
}

function setContentBlocks(width) {
  var widthBlock = ((Math.floor(width)) / 2) - 4;
  var heightBlock = widthBlock
  if (heightBlock > 800) {
    heightBlock = 796;
  }
  var contentBlocks = document.getElementsByClassName("contentBlock");
  for (var i = 0; i < contentBlocks.length; i++) {
    contentBlocks[i].style.height = heightBlock.toString() + "px";
    contentBlocks[i].style.width = widthBlock.toString() + "px";
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
