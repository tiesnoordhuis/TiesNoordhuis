window.onload = frameIni();

function frameIni() {
  var width = Math.min(document.documentElement.clientWidth, screen.width);
  var height = Math.min(document.documentElement.clientHeight, screen.height);
  console.log("window loaded with width: " + width + " and height: " + height);
  makeBoxes(width, height);
}

function makeBoxes(width, height) {
  var contentRow = document.getElementsByClassName("contentRow");
  var setHeight = ((width/2) * (3/4));
  var headerHeight = document.getElementById("headerRow").clientHeight;
  console.log("headerHeight: " + headerHeight);
  if (setHeight > height - headerHeight) {
    setHeight = Math.max((height - headerHeight - 100), 150);
  }
  contentRow[0].style.height = setHeight;
}

function selectBlock(n) {
  closeBlocks();
  if (checkOpen(n)) {
    for (var i = 1; i < 5; i++) {
      if (i != n) {
        setOpen(i);
      }
    }
    setClose(n);
    openBlock(n);
    return;
  }
  setOpen(n);
  return;
}

function checkOpen(n) {
  var blocks = document.getElementsByClassName("contentBlock");
  var block = blocks[n - 1];
  console.log(block);
  var blockText = block.children[0].children[0].children[0].innerHTML;
  console.log(blockText);
  console.log(blockText != "Close");
  return blockText != "Close";
}

function setOpen(n) {
  console.log("set open " + n);
  var blocks = document.getElementsByClassName("contentBlock");
  var block = blocks[n - 1];
  var blockText = block.children[0].children[0].children[0];
  var textArray = ["Projects", "Server Stats", "Info", "Contact"]
  blockText.innerHTML = textArray[n - 1];
}

function setClose(n) {
  var blocks = document.getElementsByClassName("contentBlock");
  var block = blocks[n - 1];
  var blockText = block.children[0].children[0].children[0];
  blockText.innerHTML = "Close";
}

function openBlock(n) {
  var hiddenContentBoxes = document.getElementsByClassName("hiddenContentBox");
  var hiddenContentBoxesSmall = document.getElementsByClassName("hiddenContentBoxSmall");
  var hiddenContentBoxesLarge = document.getElementsByClassName("hiddenContentBoxLarge");
  if (n === 1) {
    hiddenContentBoxes[0].classList.remove("d-none");
    return
  } else if (n === 3) {
    hiddenContentBoxes[1].classList.remove("d-none");
    return
  }
  var blockWidth = document.getElementById("block1").clientWidth;
  var rowWidth = document.getElementById("headerRow").clientWidth;
  if (blockWidth < rowWidth) {
    if (n === 2) {
      hiddenContentBoxesLarge[0].classList.remove("d-none");
      return
    } else if (n === 4) {
      hiddenContentBoxesLarge[1].classList.remove("d-none");
      return
    }
  }
  if (n === 2) {
    hiddenContentBoxesSmall[0].classList.remove("d-none");
    return
  } else if (n === 4) {
    hiddenContentBoxesSmall[1].classList.remove("d-none");
    return
  }
}

function closeBlocks() {
  var hiddenContentBoxes = document.getElementsByClassName("hiddenContentBox");
  var hiddenContentBoxesSmall = document.getElementsByClassName("hiddenContentBoxSmall");
  var hiddenContentBoxesLarge = document.getElementsByClassName("hiddenContentBoxLarge");
  for (var i = 0; i < hiddenContentBoxes.length; i++) {
    hiddenContentBoxes[i].classList.add("d-none");
  }
  for (var i = 0; i < hiddenContentBoxesSmall.length; i++) {
    hiddenContentBoxesSmall[i].classList.add("d-none");
  }
  for (var i = 0; i < hiddenContentBoxesLarge.length; i++) {
    hiddenContentBoxesLarge[i].classList.add("d-none");
  }
}

var socketIO = io.connect("http://localhost:3000");

socketIO.on("serverData", (data) => {
  console.log(data);
  socketIO.emit("clientData", { msg: "hello from client" });
});
