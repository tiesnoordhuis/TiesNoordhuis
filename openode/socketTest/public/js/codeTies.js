var socketClient = io("http://localhost:3000");

socketClient.on("msgOut", (data) => {
  console.log(data);
  socketClient.emit("msgIn", { data: "msg from client" });
});

socketClient.on("clientDo", (data) => {
  displayServerMsg(data);
})

function sendServerMsg() {
  socketClient.emit("msgIn", { data: "client clicked button" });
};

function tellServerToDo() {
  socketClient.emit("serverDo", { data: "tell the server to do something" });
};

function displayServerMsg(dataObject) {
  var data = dataObject.data;
  console.log(data);
  document.getElementById("serverMsgField").innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let buildString = "user with id: " + data[i].id + " connected at: " + data[i].time + "</br>";
    document.getElementById("serverMsgField").innerHTML += buildString;
  }
};
