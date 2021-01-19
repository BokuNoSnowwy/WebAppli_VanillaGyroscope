const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

function rect_create(x,y,w,h,color,dx,dy){
    let obj = {
        x : x,
        y : y,
        w : w,
        h : h,
        color : color,
        dx : dx,
        dy : dy,
        draw : rect_draw
    }
    return obj
}

let rect = rect_create(10,20,30,50,'red',3,3)
let rect2 = rect_create(100,20,30,50,'blue',2,3)

let gameobjects = [
    rect,
    rect2
]

let frame = 0

var img = new Image();
//img.src = 'DVD_video_logo.pnj'


function gameLoop(){
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    //ctx.drawImage(img, x,y, widthRectangle,heighRectangle)

    gameobjects.forEach((obj) => obj.draw())
}

function rect_draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.w,this.h);

    
    if(this.x + this.w > canvas.width){
        this.dx = -this.dx
    }

    if(this.x < 0){
        this.dx = Math.abs(this.dx)
    }

    if(this.y + this.h > canvas.height){
        this.dy = -this.dy
    }

    if(this.y < 0){
        this.dy = Math.abs(this.dy)
    }

    this.x += this.dx;
    this.y += this.dy;
}

setInterval(gameLoop,1000 /60)

let acl = new Accelerometer({frequency: 60});

acl.addEventListener('reading', () => {
  console.log("Acceleration along the X-axis " + acl.x);
  console.log("Acceleration along the Y-axis " + acl.y);
  console.log("Acceleration along the Z-axis " + acl.z);
  console.log("Test");
  //gameLoop
});

let gyroscope = new Gyroscope({frequency: 60});

gyroscope.addEventListener('reading', e => {
  console.log("Angular velocity along the X-axis " + gyroscope.x);
  console.log("Angular velocity along the Y-axis " + gyroscope.y);
  console.log("Angular velocity along the Z-axis " + gyroscope.z);
});


function startup() {
    canvas.addEventListener("touchstart", handleStart, false);
    //canvas.addEventListener("touchend", handleEnd, false);
    //canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);
  }

  document.addEventListener("DOMContentLoaded", startup);

function handleStart(evt) {
evt.preventDefault();
console.log("touchstart.");
var touches = evt.changedTouches;

for (var i = 0; i < touches.length; i++) {
    console.log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
    console.log("touchstart:" + i + ".");
}
}
  
function handleMove(evt) {
evt.preventDefault();
var touches = evt.changedTouches;

for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
    console.log("continuing touch "+idx);
    ctx.beginPath();
    console.log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
    ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
    console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
    ctx.lineTo(touches[i].pageX, touches[i].pageY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();

    ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    console.log(".");
    } else {
    console.log("can't figure out which touch to continue");
    }
}
}

gyroscope.start();
acl.start();
