const canvas = document.querySelector('canvas')
const ctx   = canvas.getContext('2d')

let life = 1;
let obstacles = [];

const images = {
    paper: src='./Art/Background/Background Notebook.jpg',
    sun: src='./Art/Characters/Surya/suryaSprite.png',
    meteor: src='./Art/Characters/Asteroid/asteroidSprite.png'
}

const dinoRex = {
dinoRight: src='./Art/Characters/t-Rex/tRexRight.png',
dinoLeft: src='./Art/Characters/t-Rex/tRexLeft.png',
dinoCorpse: src ='./Art/Characters/t-Rex/tRexDeath.png'
}

class Board {
    constructor(notebook) {
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.img = new Image()
      this.img.src = notebook
      this.img.onload = () => {
       this.draw()
      }
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }

class Surya{
    constructor(x, y, height, width, img) {
        this.x = x
        this.y = y
        this.sx = 0
        this.sy = 0
        this.height = height
        this.width = width
        this.radius = 15
        this.img = new Image()
        this.img.src = img
        this.img.onload = () => {
          this.draw(this.height, this.width)
        }
      }
      draw(){
        if (this.sx > 439) this.sx = 0
        ctx.drawImage(
          this.img, 
          this.sx,
          this.sy,
          225, 
          220,
          this.x,
          this.y, 
          220,
          210
          )
        this.sx+=232
      }
      moveUp(){
        this.y-=30
        if(surya.y <= 0) surya.y=0;
      }
      moveDown(){
        this.y+=30
        if(surya.y >= 320) surya.y=320;
      }
      moveRight(){
        this.x+=30
        if(surya.x >= 800) surya.x=800;
      }
      moveLeft(){
        this.x-=30
        if(surya.x <=40) surya.x=40;
      }
      isTouching(obstacle){
        return (
            (Math.sqrt((this.x-obstacle.x) * 
            (this.x-obstacle.x) + 
            (this.y-obstacle.y) *
            (this.y-obstacle.y)) < 15 + 35)
    )} 
  }

class TRex{
    constructor(x, y, height, width, img) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.life = life
        this.radius = 15
        this.imgArr = img
        this.img = new Image()
        this.img.src = img.dinoRight
        this.img.onload = () => {
          this.draw(this.height, this.width)
        }
      }
      draw(){
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width)
      }
      moveRight(){
        this.img = new Image()
        this.img.src = this.imgArr.dinoRight
        this.x+=10
        if(tRex.x >= 900) tRex.x=900;
      }
      moveLeft = () => {
        this.img = new Image() 
        this.img.src = this.imgArr.dinoLeft
        this.x-=10
        if(tRex.x <=40) tRex.x=40;
      }
      dinoDie(){
        this.img.src = ''
        this.img.src = this.imgArr.dinoCorpse
        this.height = 145
        this.width = 100 
        this.y =+410
      }
      isTouching(obstacle){
        return (
            (Math.sqrt((this.x-obstacle.x) * 
            (this.x-obstacle.x) + 
            (this.y-obstacle.y) *
            (this.y-obstacle.y)) < 10 + 35)
        )}    
        //if touching obstacle true, print dinoDie
}
    
class GenericMeteorite {
    constructor(){
        this.x =  Math.random() * board.width
        this.y = Math.random() * 13
        this.sx = 0
        this.sy = 0
        this.height = (Math.random() * 100)  + 90 //SIZE
        this.width = this.height
        this.gravity = 4
        this.img = new Image()
        this.img.src = images.meteor
        this.img.onload = () => {
            this.draw()
        }
    }
    draw(){ 
            if (this.sx > 438) this.sx = 0
            ctx.drawImage(
              this.img, 
              this.sx,
              this.sy,
              225, 
              230,
              this.x,
              this.y, 
              100,
              100
              )
            this.sx+=234
            this.x-= this.gravity *10
            this.y+= this.gravity *10

            if(this.y === board.height - this.height) this.width = 0
          }
}


const board = new Board(images.paper)
const surya = new Surya(50, 0, 210, 190, images.sun)
const tRex = new TRex(450, 370, 100, 145, dinoRex)


let frames = 0
let interval

function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    board.draw()
    surya.draw()
    tRex.draw()
    generateMeteorites()
    drawMeteorites(true)
    frames++
}

function startGame(){
if(interval) return
interval = setInterval(update, 1000/16)
}

function gameOver(){
    tRex.dinoDie()
    alert ('Se han extinto los dinosaurios!!!')
}


function generateMeteorites(){
    if (!(frames % 12 === 0)) return
      let obs = new GenericMeteorite()
      obstacles.push(obs)
  }
  
  function drawMeteorites(isdrawing){ 
      if (isdrawing) {
          obstacles.forEach(x => {
           x.draw()
           checkColission(x)
      })
    }
  }    

function delMetorite(){
    checkColission(x => {
    obstacles.splice(x,1) // debe desapaecer el meteorito
})
  }

  function checkColission(obstacles){
      //foreach de los meteoritos
      //para cada obstACULO, HACER CHECKCOLLITION CON surya y TREX
      //o al reves vas a checar si surya o trex tienen un istouching en true contra cada oobstaculo
      if(tRex.isTouching(obstacles)){
          life--
          if(life <= 0) {
              gameOver()
             
              drawMeteorites(false);
          }
        }}
        // obstacles.forEach((e, indice)=>{
        //     e.isTouching(item)
        //     drawMeteorites = false;

    //     }
        
    //   }
    // //   if(surya.isTouching(item)){
    //     life--
    //     console.log(life)
                            
    //                         // el toque de surya elimina a los meteoritos
    //     if(life == 0) {
    //       setTimeout(() => {
    //           surya.draw()
    //       }, 10000)
    //     }
    // }
  

addEventListener('keydown', e => {
    e.preventDefault()
  switch (e.keyCode) {
      case 32: 
        startGame() 
        break; 
      case 68: //d tRex
        return tRex.moveRight()
      case 65: //a tRex
        return tRex.moveLeft()
      case 38: // flecha arriba
        return surya.moveUp()
      case 40: // flecha abajo
        return surya.moveDown()
      case 37:
        return surya.moveLeft()
      case 39:
        return surya.moveRight()
    }
  })