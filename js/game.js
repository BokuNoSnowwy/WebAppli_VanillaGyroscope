const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

//canvas.width = document.documentElement.clientWidth

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
img.src = 'DVD_video_logo.pnj'


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
