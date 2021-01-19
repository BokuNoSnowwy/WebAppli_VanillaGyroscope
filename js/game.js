const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight - 60|| document.body.clientHeight - 60;

let debugText = new Text();
debugText = document.getElementById('text');


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

//let rect = rect_create(10,20,30,50,'red',3,3)
//let rect2 = rect_create(100,20,30,50,'blue',2,3)

let gameobjects = [
    //rect,
    //rect2
]

let colorsDrawing = [
    "#ffbe0b",
    "#fb5607",
    "#ff006e",
    "#8338ec",
    "#3a86ff"
]

let frame = 0

var img = new Image();
//img.src = 'DVD_video_logo.pnj'

let gyroValue = {
    x: 0,
    y: 0,
    z: 0
}

let acceValue = {
    x: 0,
    y: 0,
    z: 0
}

let gyroscope = new Gyroscope({frequency: 15});

gyroscope.addEventListener('reading', e => {
  gyroValue.x += gyroscope.x;
  gyroValue.y += gyroscope.y;
  gyroValue.z += gyroscope.z;
  
});

let acl = new Accelerometer({frequency: 15});

acl.addEventListener('reading', () => {
  acceValue.x = acl.x;
  acceValue.y = acl.y;
  acceValue.z = acl.x;

  acceValue.x = Math.min(Math.max(parseInt(acceValue.x), -20), 20);
  acceValue.y = Math.min(Math.max(parseInt(acceValue.y), -20), 20);
  acceValue.z = Math.min(Math.max(parseInt(acceValue.z), -20), 20);

  //gameLoop
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getRandomBetween2Values(min, max) 
{
    return Math.floor(Math.random() * (+max + 1 - +min)) + +min; 
}

function gameLoop(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    //ctx.drawImage(img, x,y, widthRectangle,heighRectangle)
    debugText.textContent = "Debug console : ";
    //debugText.textContent += "xGyro : " + Math.round(gyroValue.x) + "  yGyro : " + Math.round(gyroValue.y) + "  zGyro : " + Math.round(gyroValue.z);
    debugText.textContent += "xAcc : " + Math.round(acceValue.x) + "  yAcc : " + Math.round(acceValue.y) + "  zAcc : " + Math.round(acceValue.z);

    console.log(gyroValue.x);
    console.log(gyroValue.y);
    console.log(gyroValue.z);


    gameobjects.forEach((obj) => obj.draw())
    gameobjects.forEach((obj) => obj.dx = gyroValue.x);
    gameobjects.forEach((obj) => obj.dy = gyroValue.z);

    gameobjects.forEach((obj) => obj.dx = acceValue.x);
    gameobjects.forEach((obj) => obj.dy = acceValue.y);
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


function startup() {
    canvas.addEventListener("mouseup", handleStart, false);
    //canvas.addEventListener("touchend", handleEnd, false);
    //canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);
  }

  document.addEventListener("DOMContentLoaded", startup);

function handleStart(evt) {
   
    evt.preventDefault();

    let dxRect = getRandomBetween2Values(-4, 4);
    let dyRect = getRandomBetween2Values(-4, 4);

    let xSize = getRandomBetween2Values(10, 200);
    let ySize = getRandomBetween2Values(10, 200);

    let color = colorsDrawing[getRandomInt(colorsDrawing.length)];
    

    let rect = rect_create(evt.x,evt.y,xSize,ySize,color,dxRect,dyRect);
    gameobjects.push(rect);
}
  
function handleMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
}

gyroscope.start();
acl.start();
