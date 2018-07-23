window.onload = frameIni();

function frameIni() {
  var width = Math.min(document.documentElement.clientWidth, screen.width);
  var height = Math.min(document.documentElement.clientHeight, screen.height);
  console.log("window loaded with width: " + width + " and height: " + height);
  makeBoxes(width);
}

function makeBoxes(width) {
  var contentRow = document.getElementsByClassName("contentRow");
  contentRow[0].style.height = ((width/2) * (3/4));
}

function selectBlock(n) {
  var hiddenContentBoxes = document.getElementsByClassName("hiddenContentBox");
  for (var i = 0; i < hiddenContentBoxes.length; i++) {
    hiddenContentBoxes[i].classList.add("d-none");
  }
  hiddenContentBoxes[n - 1].classList.remove("d-none");
}
