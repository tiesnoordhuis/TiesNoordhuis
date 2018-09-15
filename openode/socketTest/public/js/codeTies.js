var socketClient = io("http://localhost/");

socketClient.on("msgOut", (data) => {
  console.log(data);
});

socketClient.on("clientDoLog", (data) => {
  displayServerLog(data.data);
});

socketClient.on("clientDoMsg", (data) => {
  displayServerMsg(data.data)
});

function sendServerMsg() {
  var msg = document.getElementById("serverMsg").value;
  if (msg === " ") {
    msg = "empty message";
  };
  console.log(msg);
  socketClient.emit("msgIn", { data: msg });
};

function tellServerToDo(ask) {
  socketClient.emit("serverDo", { data: ask });
};

function displayServerLog(data) {
  var regexTime = /\d{1,2}:\d{1,2}:\d{1,2}/g;
  var regexOS = /\(\w+/g;
  console.log(data);
  document.getElementById("serverLogField").innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let oS = data[i].browserType.match(regexOS)[0];
    oS = " from a " + oS.slice(1) + " device";
    let buildString = "user with id: " + data[i].id + " connected at: " + data[i].time.match(regexTime)[0] + oS + "</br>";
    document.getElementById("serverLogField").innerHTML += buildString;
  };
};

function displayServerMsg(data) {
  var regexTime = /\d{1,2}:\d{1,2}:\d{1,2}/g;
  console.log(data);
  document.getElementById("serverMsgField").innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let buildString = "Message from: " + data[i].id + " : " + data[i].msg + " at: " + data[i].time.match(regexTime)[0] + "</br>";
    document.getElementById("serverMsgField").innerHTML += buildString;
  };
};

function askServerLog() {
  tellServerToDo("log");
};

function askServerMsg() {
  tellServerToDo("msg");
};
