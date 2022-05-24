// para que sea responsivo sin pixelarse, doy ancho y altura por defecto al canvas en el HTML (de no poner nada por defecto toma 300*150), adapto medidas a la pantalla con CSS, tomo las medidas del CSS con función "getComputedStyle" y modifico en el HTML las medidas
const canvas=document.getElementById('cancha')
var canchaW, canchaH
var s=getComputedStyle(canvas)
canchaW = s.width
canchaH = s.height
const ctx = canvas.getContext('2d')

const paddleSound = document.createElement('audio')
const failSound = document.createElement('audio')
paddleSound.src='https://actions.google.com/sounds/v1/sports/football_punts.ogg'
failSound.src='../assets/aplausos.mp3'
const score = {
    left: 0,
    right: 0
}
// Esta función crea las paletas u objetos que colisionarán con la pelota (jugadores y arcos). Acepta parámetro de ubicación "x", "color", etc..
const getPaddle = ({x=0, y=0, w=10, h=18, color='orange'}) =>({
    x,
    y,
    w,
    h,
    color,
    speed:15,
    draw() {
        ctx.fillStyle=this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle="black"
        ctx.arc(this.x+(w/2), this.y+h/2, w/2, 0, 6.28319)
        ctx.fill()
        ctx.closePath()
    },
    moveUp(h){
        if(h<1){return
        }
        this.y-=this.speed
    },
    moveDown(h){
        if(h>canvas.height-this.h-1){return}
        this.y+=this.speed
    },
    contains(b) {
        return (this.x < b.x + b.w) &&
        (this.x + this.w > b.x) &&
        (this.y < b.y + b.h) &&
        (this.y + this.h > b.y)
    }
})

// Genero los arcos como objetos con la misma función que uso para los jugadores)
const leftSoccerGoal=getPaddle({
    x:0,
    y:100,
    w:4,
    h:100,
    color: 'AntiqueWhite'
})
const rightSoccerGoal=getPaddle({
    x:canvas.width-4,
    y:100,
    w:4,
    h:100,
    color: 'AntiqueWhite'
})

// función para crear pelota
const getBall=()=> ({
    x:canvas.width/2,
    y:canvas.height/2,
    r:6,
    w:10,
    h:10,
    color:'#F9E79F',
    directionX: 'right',
    directionY: 'up',
    friction:.7,
    speedX:1,
    speedY:1,
    isMoving:false,
    handleMovement() {
        if(!this.isMoving){return}
        if(this.x<0){
            this.directionX='right'
        } else if(this.x > canvas.width-this.w){
            this.directionX='left'
        }
        if(this.directionX==='right'){
            this.speedX++
        }else {
            this.speedX--
        }
        this.speedX*=this.friction
        this.x += this.speedX
        if(this.y<0){
            this.directionY='down'
        } else if(this.y > canvas.height-this.h){
            this.directionY = 'up'
        }
        if(this.directionY === 'down') {
            this.speedY++
        }else {
            this.speedY--
        }
        this.speedY*=this.friction
        this.y += this.speedY
    },
    draw(){
        this.handleMovement()
        ctx.fillStyle=this.color
        ctx.strokeStyle = 'DarkSlateGray'
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.r, 0, 6.28319,false)
        ctx.fill();
        ctx.stroke();
    }
})

function ballMoving(boolean){
    ball.isMoving = boolean
}

// creo las paletas izquierda enviando posición eje x y color
const paddleLeft=getPaddle({
    x:6,
    y: 150-9,
    Color: 'yelow'
})

const paddleLeft2a=getPaddle({
    x:86,
    color: 'blue'
})
const paddleLeft2b=getPaddle({
    x:86,
    y:90,
    color: 'blue'
})
const paddleLeft2c=getPaddle({
    x:86,
    y:180,
    color: 'blue'
})

const paddleLeft3a=getPaddle({
    x:258,
    color: 'blue'
})
const paddleLeft3b=getPaddle({
    x:258,
    y:70,
    color: 'blue'
})
const paddleLeft3c=getPaddle({
    x:258,
    y:140,
    color: 'blue'
})
const paddleLeft3d=getPaddle({
    x:258,
    y:210,
    color: 'blue'
})

const paddleLeft4a=getPaddle({
    x:430,
    color: 'blue'
})
const paddleLeft4b=getPaddle({
    x:430,
    y:90,
    color: 'blue'
})
const paddleLeft4c=getPaddle({
    x:430,
    y:180,
    color: 'blue'
})


// Jugadores de la derecha
const paddleRight=getPaddle({
    x:canvas.width-16,
    y:150-9,
    color: 'white'
})

const paddleRight4a=getPaddle({
    x:172,
    color: 'red'
})
const paddleRight4b=getPaddle({
    x:172,
    y:90,
    color: 'red'
})
const paddleRight4c=getPaddle({
    x:172,
    y:180,
    color: 'red'
})

const paddleRight3a=getPaddle({
    x:344,
    color: 'red'
})
const paddleRight3b=getPaddle({
    x:344,
    y:70,
    color: 'red'
})
const paddleRight3c=getPaddle({
    x:344,
    y:140,
    color: 'red'
})
const paddleRight3d=getPaddle({
    x:344,
    y:210,
    color: 'red'
})

const paddleRight2a=getPaddle({
    x:516,
    color: 'red'
})
const paddleRight2b=getPaddle({
    x:516,
    y:90,
    color: 'red'
})
const paddleRight2c=getPaddle({
    x:516,
    y:180,
    color: 'red'
})

const ball=getBall()


// esta función se repica a 60 frames por segundo. Ésto es por defecto, pero se puede modificar. En este caso le dejaremos manejarlo al navegador con requestAnimationFrame
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCourt()
    leftSoccerGoal.draw()
    rightSoccerGoal.draw()
    drawScore()
    ball.draw()

    paddleLeft.draw()
    paddleLeft2a.draw()
    paddleLeft2b.draw()
    paddleLeft2c.draw()
    paddleLeft3a.draw()
    paddleLeft3b.draw()
    paddleLeft3c.draw()
    paddleLeft3d.draw()
    paddleLeft4a.draw()
    paddleLeft4b.draw()
    paddleLeft4c.draw()

    paddleRight4a.draw()
    paddleRight4b.draw()
    paddleRight4c.draw()
    paddleRight3a.draw()
    paddleRight3b.draw()
    paddleRight3c.draw()
    paddleRight3d.draw()
    paddleRight2a.draw()
    paddleRight2b.draw()
    paddleRight2c.draw()
    paddleRight.draw()
    checkCollitions()

    requestAnimationFrame(update)
}

// aux functions (dibujo la cancha)
const drawCourt=() => {
    ctx.fillStyle = 'ForestGreen'
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.strokeStyle = 'LightSlateGray'
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'Snow'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(canvas.width/2, 0)
    ctx.lineTo(canvas.width/2, canvas.height)
    ctx.stroke()
    ctx.closePath()
    ctx.strokeStyle = 'Snow'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(canvas.width/2, canvas.height/2, 40, 0, 2*Math.PI)
    ctx.stroke()
    ctx.closePath()
// Área con medio circulo del arco derecho
    ctx.strokeStyle = 'Snow'
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width, 70, -90, 160)
    ctx.strokeRect(canvas.width, 95, -60, 110)
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(canvas.width-90, canvas.height/2, 40, 1.5708, 4.71239)
    ctx.stroke()
    ctx.closePath()
// Área con medio circulo del arco izquierdo
    ctx.beginPath()
    ctx.arc(90, canvas.height/2, 40,4.71239, 1.5708)
    ctx.stroke()
    ctx.closePath()
    ctx.strokeStyle = 'Snow'
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 70, 90, 160)
    ctx.strokeRect(0, 95, 60, 110)
    ctx.closePath()

}

const checkCollitions = () => {
    if(paddleLeft.contains(ball) || paddleLeft2a.contains(ball) || paddleLeft2b.contains(ball) || paddleLeft2c.contains(ball) || paddleLeft3a.contains(ball) || paddleLeft3b.contains(ball) || paddleLeft3c.contains(ball) || paddleLeft3d.contains(ball) || paddleLeft4a.contains(ball) || paddleLeft4b.contains(ball) || paddleLeft4c.contains(ball)) {
        ball.directionX = 'right'
        paddleSound.play()
        ball.speedX++
    }else if(paddleRight.contains(ball) || paddleRight2a.contains(ball) || paddleRight2b.contains(ball) || paddleRight2c.contains(ball) || paddleRight3a.contains(ball) || paddleRight3b.contains(ball) || paddleRight3c.contains(ball) || paddleRight3d.contains(ball) || paddleRight4a.contains(ball) || paddleRight4b.contains(ball) || paddleRight4c.contains(ball)){
        ball.directionX = 'left'
        paddleSound.play()
        ball.speedX++
        console.log(ball.speedX)
    }



    // if(paddleLeft.contains(ball)) {
    //     ball.directionX = 'right'
    //     paddleSound.play()
    // }else if(paddleRight.contains(ball)){
    //     ball.directionX = 'left'
    //     paddleSound.play()
    // }

    if(leftSoccerGoal.contains(ball)){
        ball.x=canvas.width/2
        ball.y=canvas.height/2
        ballMoving(false),
        score.right++
        failSound.play()
    } else if(rightSoccerGoal.contains(ball)){
        ball.x=canvas.width/2
        ball.y=canvas.height/2
        ballMoving(false),
        score.left++
        failSound.play()
    }
}

const drawScore = () => {
    ctx.fillStyle = 'gray'
    ctx.font = '70px "Press Start 2P"'
    ctx.fillText(score.left, 165,185)
    ctx.fillText(score.right, 390,185)
}
function leftMoveUp(){
    paddleLeft.moveUp(paddleLeft.y-96)
    paddleLeft2a.moveUp(paddleLeft2a.y)
    paddleLeft2b.moveUp(paddleLeft2b.y-90)
    paddleLeft2c.moveUp(paddleLeft2c.y-180)
    paddleLeft3a.moveUp(paddleLeft3a.y)
    paddleLeft3b.moveUp(paddleLeft3b.y-70)
    paddleLeft3c.moveUp(paddleLeft3c.y-140)
    paddleLeft3d.moveUp(paddleLeft3d.y-210)
    paddleLeft4a.moveUp(paddleLeft4a.y)
    paddleLeft4b.moveUp(paddleLeft4b.y-90)
    paddleLeft4c.moveUp(paddleLeft4c.y-180)
}
function leftMoveDown(){
    paddleLeft.moveDown(paddleLeft.y+96)
    paddleLeft2a.moveDown(paddleLeft2c.y)
    paddleLeft2b.moveDown(paddleLeft2c.y)
    paddleLeft2c.moveDown(paddleLeft2c.y)
    paddleLeft3a.moveDown(paddleLeft3d.y)
    paddleLeft3b.moveDown(paddleLeft3d.y)
    paddleLeft3c.moveDown(paddleLeft3d.y)
    paddleLeft3d.moveDown(paddleLeft3d.y)
    paddleLeft4a.moveDown(paddleLeft4c.y)
    paddleLeft4b.moveDown(paddleLeft4c.y)
    paddleLeft4c.moveDown(paddleLeft4c.y)
}
function rightMoveUp(){
    paddleRight.moveUp(paddleRight.y-96)
    paddleRight4a.moveUp(paddleRight4a.y)
    paddleRight4b.moveUp(paddleRight4b.y-90)
    paddleRight4c.moveUp(paddleRight4c.y-180)
    paddleRight3a.moveUp(paddleRight3a.y)
    paddleRight3b.moveUp(paddleRight3b.y-70)
    paddleRight3c.moveUp(paddleRight3c.y-140)
    paddleRight3d.moveUp(paddleRight3d.y-210)
    paddleRight2a.moveUp(paddleRight2a.y)
    paddleRight2b.moveUp(paddleRight2b.y-90)
    paddleRight2c.moveUp(paddleRight2c.y-180) 
}
function rightMoveDown(){
    paddleRight.moveDown(paddleRight.y+96)
    paddleRight4a.moveDown(paddleRight4c.y)
    paddleRight4b.moveDown(paddleRight4c.y)
    paddleRight4c.moveDown(paddleRight4c.y)
    paddleRight3a.moveDown(paddleRight3d.y)
    paddleRight3b.moveDown(paddleRight3d.y)
    paddleRight3c.moveDown(paddleRight3d.y)
    paddleRight3d.moveDown(paddleRight3d.y)
    paddleRight2a.moveDown(paddleRight2c.y)
    paddleRight2b.moveDown(paddleRight2c.y)
    paddleRight2c.moveDown(paddleRight2c.y) 
}

// listeners
addEventListener('keydown', e=>{
        switch(e.keyCode){
        case 87:
            leftMoveUp()
            break;
        case 83:
            leftMoveDown()
            break;
        case 32:
            ballMoving(true)
            break;
        case 13:
            ballMoving(true)
            break;
        case 38:
            rightMoveUp()
            break;
        case 40:
            rightMoveDown()
            break;
    }
})

addEventListener('touchmove',e=>{
    e.preventDefault();
    if(e.touches.directionY<0){
        leftMoveUp()
    } else {leftMoveDown()}

})

requestAnimationFrame(update)