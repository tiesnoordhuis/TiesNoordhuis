window.onload = frameIni();

function frameIni() {
  var width = Math.min(document.documentElement.clientWidth, screen.width);
  var height = Math.min(document.documentElement.clientHeight, screen.height);
  console.log("window loaded with width: " + width + " and height: " + height);
  setContainer(height);
}

function setContainer(height) {
  var container = document.getElementById("mainContainer");
  container.style.height = height;
}

function checkServerStatus() {
    setServerStatus("unknown");
    var img = document.body.appendChild(document.createElement("img"));
    img.onload = function()
    {
        setServerStatus("online");
    };
    img.onerror = function()
    {
        setServerStatus("offline");
    };
    img.src = "http://localhost/favicon.ico\?" + Date.now();
}
