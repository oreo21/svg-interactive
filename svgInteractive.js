var frame = document.getElementById("frame");
var clearButton = document.getElementById("clear-btn");
var moveButton = document.getElementById("move-btn");
var e = window.event;
var requestID = null;

var createCircle = function(x, y, r){
  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("r", r);
  c.setAttribute("vx", 1);
  c.setAttribute("vy", 1);
  c.setAttribute("fill", "#3498db");
  c.addEventListener("click", modifyColor);
  frame.appendChild(c);
  return c;
};

var modifyColor = function(e){
  this.setAttribute("fill", "#e67e22");
  this.addEventListener("click", replaceCircle);
  e.stopPropagation();
};

var replaceCircle = function(e){
  var clickedTarget = e.target;
  clickedTarget.parentNode.removeChild(clickedTarget);
  var x = Math.random() * (frame.clientWidth - 50) + 25;
  var y = Math.random() * (frame.clientHeight - 50) + 25;
  createCircle(x, y, 20);
  e.stopPropagation();
};

var addCircle = function(e){
  var x = e.offsetX, y = e.offsetY;
  createCircle(x, y, 30);
};

var moveStuff = function(e){
  window.cancelAnimationFrame(requestID);
  var cList = document.getElementsByTagName("circle");
  var drawThem = function(){
    for (var i = 0; i < cList.length; i++){
      var c = cList[i];
      var x = parseInt(c.getAttribute("cx"));
      var y = parseInt(c.getAttribute("cy"));
      var r = parseInt(c.getAttribute("r"));
      var vx = parseInt(c.getAttribute("vx"));
      var vy = parseInt(c.getAttribute("vy"));
      if (r <= 2) frame.removeChild(c);
      if (x + r > frame.clientWidth || x - r < 0) vx *= -1;
      if (y + r > frame.clientHeight || y - r < 0) vy *= -1;
      x += vx, y += vy;
      c.setAttribute("cx", x), c.setAttribute("cy", y);
      c.setAttribute("vx", vx),c.setAttribute("vy", vy);
      if (y == frame.clientHeight / 2){
        frame.removeChild(c);
        var c1 = createCircle(x, y, r / 2);
        var c2 = createCircle(x, y, r / 2);
        c1.setAttribute("vx", vx), c1.setAttribute("vy", vy);
        c2.setAttribute("vx", vx), c2.setAttribute("vy", -vy);
      }
    }
    requestID = window.requestAnimationFrame(drawThem);
  };
  drawThem();
};

var clearFrame = function(e){
    while(frame.childNodes.length > 0)
    frame.removeChild(frame.childNodes[0]);
};

frame.addEventListener("click", addCircle);
clearButton.addEventListener("click", clearFrame);
moveButton.addEventListener("click", moveStuff);
