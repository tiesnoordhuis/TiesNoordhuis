var socketClient = io("http://localhost:3000");

socketClient.on("msgOut", (data) => {
  console.log(data);
  socketClient.emit("msgIn", { data: "msg from client" });
});
