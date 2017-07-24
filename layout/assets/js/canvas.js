var canvas = document.getElementById('canvas');
var confirmar = document.getElementById('confirmar');
var limpar = document.getElementById('limpar');
var cancelar = document.getElementById('cancelar');
var ctx = canvas.getContext('2d');
var ongoingTouches = new Array; 
 
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};


 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
canvas.addEventListener("touchcancel", handleCancel, false);
canvas.addEventListener("touchleave", handleEnd, false);
canvas.addEventListener("touchmove", handleMove, false);




ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#2647A4';
  
var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

function handleStart(evt) {
  evt.preventDefault();
  log("touchstart.");
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
        
  for (var i=0; i < touches.length; i++) {
    log("touchstart:"+i+"...");
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0,2*Math.PI, false);  // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
    log("touchstart:"+i+".");
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i=0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if(idx >= 0) {
      log("continuing touch "+idx);
      ctx.beginPath();
      log("ctx.moveTo("+ongoingTouches[idx].pageX+", "+ongoingTouches[idx].pageY+");");
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      log("ctx.lineTo("+touches[i].pageX+", "+touches[i].pageY+");");
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
      log(".");
    } else {
      log("can't figure out which touch to continue");
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  log("touchend/touchleave.");
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i=0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if(idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX-4, touches[i].pageY-4, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  log("touchcancel.");
  var touches = evt.changedTouches;
  
  for (var i=0; i < touches.length; i++) {
    ongoingTouches.splice(i, 1);  // remove it; we're done
  }
}