var socketClient = io("http://localhost:80");

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
  console.log(data);
  document.getElementById("serverLogField").innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let buildString = "user with id: " + data[i].id + " connected at: " + data[i].time + "</br>";
    document.getElementById("serverLogField").innerHTML += buildString;
  };
};

function displayServerMsg(data) {
  console.log(data);
  document.getElementById("serverMsgField").innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let buildString = "Message: " + data[i].msg + " at: " + data[i].time + "</br>";
    document.getElementById("serverMsgField").innerHTML += buildString;
  };
};

function askServerLog() {
  tellServerToDo("log");
};

function askServerMsg() {
  tellServerToDo("msg");
};
