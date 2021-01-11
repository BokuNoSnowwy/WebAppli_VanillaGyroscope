const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

let x = 50
let y = 10

let xAdd = 1
let yAdd = 1

let frame = 0
let variable = "Hello"

function gameLoop(){



    let firstTime

    let widthRectangle = 100
    let heighRectangle = 100

    let bounceRight = true;
    let bounceDown = true

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, widthRectangle, heighRectangle); 



        if(x + widthRectangle > canvas.width){
            xAdd = -1
            bounceRight = false
            console.log("BounceRight")
        }

        if(x < 0){
            xAdd = 1
            bounceRight = true
            console.log("BounceLeft")
        }

  
        if(y + heighRectangle > canvas.height){
            yAdd = -1
            bounceDown = false
            console.log("BounceDown")
        }

        if(y < 0){
            yAdd = 1
            bounceDown = true
            console.log("BounceUp")
        }
    

    x += xAdd
    y += yAdd
    
       
}

setInterval(gameLoop,1000 /60)