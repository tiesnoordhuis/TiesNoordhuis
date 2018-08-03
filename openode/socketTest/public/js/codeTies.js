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

function displayServerMsg(data) {
  console.log(data);
  document.getElementById("serverMsgField").innerHTML = data.data;
};
