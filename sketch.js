var ground
var pc,movement
var window,bg
var sand
var score = 0 
var planks = 0
var garbageGroup,sandGroup,plankGroup 
var time = 180
PLAY = 0
END = 1
WIN = 2
var gameState = PLAY
// var plankImg,plank
// var plank2img,plank2

function preload() {
  bg = loadImage("bg1.jpg")
  garbage1 = loadImage("banana.png")
  garbage2 = loadImage("chips.png")
  garbage3 = loadImage("can.png")
  sand1 = loadImage("sand1.png")
  sand2 = loadImage("sand2.png")
  sand3 = loadImage("sand3.png")
  movement = loadAnimation("img1.1.png","img1.2.png","img1.3.png","img1.4.png","img1.5.png","img1.6.png","img1.7.png","img1.8.png","img1.9.png","img1.10.png","img1.11.png","img1.12.png","img1.13.png","img1.14.png","img1.15.png","img1.16.png","img1.17.png",)
  plankImg = loadImage("plank.png")
  plank2img = loadImage("plankOnWindow.png")
  
}

function setup() {
  //create the canvas
  createCanvas(displayWidth * 0.99, displayHeight * 0.885);

  ground = createSprite(displayWidth/2,displayHeight-200,displayWidth,10);
  ground.visible = false;

  pc = createSprite(1300,displayHeight-200,50,50)
  pc.addAnimation("walking_man",movement)
  pc.scale = 2.5

 // window = createSprite(displayWidth-1300,displayHeight-450,50,100)
  garbageGroup = new Group()
  sandGroup = new Group()
  plankGroup = new Group()

}

function draw() {
  //draw the background
  background(bg);
  //camera.position.x = pc.x

  if(gameState === PLAY){
    spawnSand()
    spawnTrash()
    pc.velocityY= pc.velocityY + 0.5;

    if(keyDown("space")&&pc.y>=250){
      pc.velocityY = -8
    }
  
    if(keyDown(LEFT_ARROW)){
      if(pc.x>width/2){
        pc.x = pc.x - 5
      }
    }
  
    if(keyDown(RIGHT_ARROW)){
      pc.x = pc.x + 5
    }

    for (let index = 0; index < garbageGroup.length; index++) {

      if(garbageGroup.get(index).isTouching(pc)){
        garbageGroup.get(index).destroy()
        score = score - 1
  
      }
      
    }
    if(planks === 3){
      gameState = WIN
    }

    if(score === 15){
      if(planks === 3){
        y = displayHeight+500

      }
      else{
        y = random(displayHeight-700,displayHeight-400)
      }
      plank = createSprite(displayWidth-1250,y,50,50)
      plank.addImage("plank",plankImg)
      plank.scale = 0.3
      plank.velocityX = 10
      plank.velocityY = random(0,3)
      score = 0
      plankGroup.add(plank)
    }

    for (let index = 0; index < plankGroup.length; index++) {
    
    
      if(plankGroup.get(index).isTouching(pc)){
        
        plankGroup.get(index).destroy()
        planks = planks +1
        if(planks === 1){
          y = displayHeight-450
        }
        else if(planks === 2){
          y = displayHeight-550
        }
        else if(planks === 3){
          y = displayHeight-650
        }
        plank2 = createSprite(displayWidth-1250,y,50,50)
        plank2.addImage("board",plank2img)
        plank2.scale = 1
      }
    
    }
    if(frameCount%15 === 0){
      time = time -1
    }
  
    if(time < 0){
      gameState = END
    }

  }
  else if(gameState === END){
    pc.velocityY= 0
    console.log("game over")
  }
  if(gameState === WIN){
    textSize(50)
    fill("white")
    text("You Win",displayWidth/2-200,displayHeight/2)
    sandGroup.destroyEach()
    garbageGroup.destroyEach()
    pc.destroy()
  }

  

  textSize(20)
  fill(255)
  text("Score : "+score,displayWidth-200,50)
  text("*Reach a score of 15 to get a plank*",100,50)
  text("*Collect 3 planks to Win*",100,70)
  text("Planks : "+planks,displayWidth-200,70)
  text("Time : "+time,displayWidth-200,30)


  pc.collide(ground)

  
  
  
  drawSprites()
}


function spawnSand(){
  if(frameCount%1 === 0){
    var y
    if(planks === 1){
      y = random(displayHeight-500,displayHeight-700)
    }
    else if(planks === 2){
    y = random(displayHeight-550,displayHeight-700)
    }
    else if(planks === 3){
      y = displayHeight+500
      }
      else if(planks === 0){
        y = random(displayHeight-700,displayHeight-400)
        }
    sand = createSprite(displayWidth-1250,y,5,5)
    sand.velocityX = 10//-2
    sand.velocityY = random(0,3)//2
    sand.lifetime = 200
    r=Math.round(random(1,3));
    if (r == 1) {
      sand.addImage(sand1);
      sand.scale = 0.02
    } else if (r == 2) {
      sand.addImage(sand2);
      sand.scale = 0.05
    } else if (r == 3) {
      sand.addImage(sand3);
      sand.scale = 0.05
    } 

    
    sandGroup.add(sand)
  }
}

function spawnTrash(){
  if(frameCount%20 === 0){
    var y
    if(planks === 1){
      y = random(displayHeight-450,displayHeight-700)
    }
    else if(planks === 2){
    y = random(displayHeight-550,displayHeight-700)
    }
    else if(planks === 3){
      y = displayHeight+500
      }
      else if(planks === 0){
        y = random(displayHeight-700,displayHeight-400)
        }
    garbage = createSprite(displayWidth-1250,y,50,50)
    garbage.velocityX = 10//-2
    garbage.velocityY = random(0,3)//2
    garbage.lifetime = 200
    score = score+1
    
    r=Math.round(random(1,3));
    if (r == 1) {
      garbage.addImage(garbage1);
      garbage.scale = 0.2
    } else if (r == 2) {
      garbage.addImage(garbage2);
      garbage.scale = 0.5
    } else if (r == 3) {
      garbage.addImage(garbage3);
      garbage.scale = 0.2
    } 

    if(garbage.x>displayWidth/2){
      garbage.x = pc.x
    }
    
    garbageGroup.add(garbage)
  }
}