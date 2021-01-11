const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth


let rect = {
    x = 50,
    y = 10,
    w = 150,
    h = 100,
    color : 'red',
    dx = 2,
    dy = 2
}

let xAdd = 1
let yAdd = 1

let frame = 0
let variable = "Hello"

var img = new Image();
img.src = 'DVD_video_logo.pnj'




function gameLoop(){

    let widthRectangle = 100
    let heighRectangle = 100


    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    //ctx.drawImage(img, x,y, widthRectangle,heighRectangle)
    
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, widthRectangle, heighRectangle); 
    

        if(x + widthRectangle > canvas.width){
            xAdd = -1
        }

        if(x < 0){
            xAdd = 1
        }

        if(y + heighRectangle > canvas.height){
            yAdd = -1
        }

        if(y < 0){
            yAdd = 1
        }
    

    x += xAdd
    y += yAdd

}

function rectDraw(){
    
}

setInterval(gameLoop,1000 /60)
