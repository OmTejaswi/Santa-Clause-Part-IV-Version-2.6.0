  var santaClause,santaImg;
var krampus , krampusImg;
var backGround1, backGround2, backGround3, backGround4;
var townImg;
var gift , gift1Img , gift2Img, gift3Img , gift4Img;
var krampus, krampusImg;
var invisibleGround;
var jingleBellsSound;
var collectSound;
var newYear;
var dieSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var i = 0;

function preload(){
  //load iamge and audio
  santaImg = loadImage("santaclause-1.png"); 
  krampusImg = loadImage("krampus.png");
  townImg = loadImage("snowyTown.jpg");
  gift1Img = loadImage("gift1.png");
  gift2Img = loadImage("gift2.png")
  gift3Img = loadImage("gift3.png");
  gift4Img = loadImage("gift4.png");
  jingleBellsSound = loadSound("jingleBells.mp3",loader);
  collectSound = loadSound("collect.mp3");
  dieSound = loadSound("die.mp3");
  newYear = loadSound("newyear.mp3");
  
}

function setup() {
  //create canvas
 createCanvas(windowWidth, windowHeight+10);
  
  //create Sprites
  santaClause = createSprite((width/4)-40,windowHeight/2+150);
  santaClause.addImage(santaImg);
  santaClause.scale = 0.5;
  
  backGround1 = createSprite(width/2,height/2,width,height);
  backGround1.addImage(townImg);
  backGround1.scale = 0.7;
  
  backGround2 = createSprite(width/2,height/2,width,height);
  backGround2.addImage(townImg);
  backGround2.scale = 0.7;
  
  backGround3 = createSprite(width/2,height/2,width,height);
  backGround3.addImage(townImg);
  backGround3.scale = 0.7;
  
  backGround4 = createSprite(width/2,height/2,width,height);
  backGround4.addImage(townImg);
  backGround4.scale = 0.7;

  
  //create invisibleGround
  invisibleGround = createSprite(santaClause.x,santaClause.y+55,200,2);
  invisibleGround.visible = false; 
  
  santaClause.depth = backGround1.depth+1;
  santaClause.depth = backGround2.depth+1;
  santaClause.depth = backGround3.depth+1;
  santaClause.depth = backGround4.depth+1;
  
  //give velocity to ground

  backGround1.velocityX = -7;
  backGround2.velocityX = -7;
  backGround3.velocityX = -7;
  backGround4.velocityX = -7;
  
  
  //give the collider to santa
  santaClause.setCollider("rectangle",0,0,550,200);
  santaClause.debug = false;
  
  //hide cursor
  noCursor();
  
  if(gameState === PLAY) {
    seconds();
  }
  
  //make groups
  giftGroup = new Group();
  krampusGroup = new Group();
 
}

//function for audio
function loader() {

    
  
  if(gameState === PLAY) {
  jingleBellsSound.play();
}
  
}


function draw() {
 
  
  
  //indroduce gameSate PLAY;
if(gameState === PLAY) {
  
    

    
   //make the backGround fit according the screen size
  
  if(windowWidth < 1100 ) {
  if(backGround1.x < windowWidth) {
    backGround2.x = backGround1.x+600;
  }
  
  if(backGround2.x < windowWidth) {
    backGround3.x = backGround2.x+600;
  }
  
  if(backGround3.x < windowWidth) {
    backGround1.x = backGround3.x+600;
  }
  
  
  }
  
  if(windowWidth > 1100 ) {
  if(backGround1.x < windowWidth) {
    backGround2.x = backGround1.x+600;
  }
  
  if(backGround2.x < windowWidth) {
    backGround3.x = backGround2.x+600;
  }
  
  if(backGround3.x < windowWidth) {
    backGround4.x = backGround3.x+600;
  }
  
  if(backGround4.x < windowWidth) {
    backGround1.x = backGround4.x+600;
  }
  }
  
  //to jump santa if space key is pressed
  if(keyDown("space") && santaClause.y >= 150) {
    santaClause.velocityY = -6;
  }
  
  //add gravity
  santaClause.velocityY = santaClause.velocityY + 0.5;
  
  //give santa a constant position
  santaClause.collide(invisibleGround);
  
  //give scoring system and audio function
    if(santaClause.isTouching(giftGroup)) {
     collectSound.play(); 
     collectSound.setVolume(30);
     score = score+Math.round(random(1,5));
     giftGroup.destroyEach();
    }
 
  //what happens when krampus touches santa
    if(krampusGroup.isTouching(santaClause) ) {
      i = i+1;
      dieSound.play();
      dieSound.setVolume(50);
      score = score-5;
      krampusGroup.destroyEach();
      
  }
  
  //give krampus velocity according to score
  krampusGroup.velocityX = -5-(4 + 3* score/30);
 
  
   if(i === 3) {
     jingleBellsSound.stop();
     newYear.stop();
     gameState = END;
   }
  

  
  //call the functions
  gifts();
  enemy();
  //introduce gameState END
  } else if(gameState === END) {
    
   
    
    //make velocity 0 and destroy groups
    santaClause.velocityX = 0;
    backGround1.velocityX = 0;
    backGround2.velocityX = 0;
    backGround3.velocityX = 0;
    backGround4.velocityX = 0;
    santaClause.setVelocity(0,0);
    giftGroup.destroyEach();
    krampusGroup.destroyEach();
    

  
  //give monkey a constant position
  santaClause.collide(invisibleGround);
  
    //i will be 0
    i = 0;
    
    reset();
    
    
  }

 
  
  //to draw the sprites
  drawSprites();
  
  //draw text when game end
  if(gameState === END) {
    stroke("black");
    fill("black");
    textSize(25);
    text('Press "R" to Restart Game',windowWidth/2-40,windowHeight/2);
   stroke("red");
   fill("red");
   textSize(25);
   text('Game Over',windowWidth/2,windowHeight/2-30);
  }
  
  //score
   stroke("grey");
   fill("grey");
   textSize(20);
   text("© Om Tejaswi | Image Source:- Google Image",windowWidth/2 - 200,(windowHeight/2)+290);
  
  //Display Score
   stroke("white");
   fill("Black");
   textSize(20);
   text("score: " + score,windowWidth-150,(windowHeight/3)-50);

   //display death
   text("Death:" + i, windowWidth-250,(windowHeight/3)-50);

   
}

    
//function for gift
function gifts() {
  if(frameCount%150===0) {
    gift = createSprite(windowWidth + 10,200);
    gift.velocityX = -10;
    santaClause.depth = gift.depth+1;   
    
     r = Math.round(random(1,4));
    if(r == 1) {
      gift.addImage(gift1Img);
      gift.scale = 0.3;
    } else if(r == 2) {
      gift.addImage(gift2Img);
      gift.scale = 0.2;
    } else if(r == 3) {
      gift.addImage(gift3Img);
      gift.scale = 0.4;
    } else if(r == 4) {
      gift.addImage(gift4Img);
      gift.scale = 0.1+0.03;
    }
    
     gift.y = Math.round(random(130,438));
     gift.setLifetime = windowWidth + 10;
    
     giftGroup.add(gift);
    
   
  }
}

//function for enemy
function enemy() {
if(frameCount%1000===0) { 
  krampus = createSprite(windowWidth+10,invisibleGround.y-80,10,40);
  krampus.velocityX = -12;
  krampus.addImage(krampusImg);
  krampus.scale = 0.7;
  
  krampus.setLifetime = windowWidth + 10;
  
  krampusGroup.add(krampus);
  
  krampus.setCollider("circle",0,0,130);
  krampus.debug = false;

}
}

function seconds() {
  setTimeout(()=> {
    newYear.play();
  },355000)
  
  setTimeout(()=> {
    jingleBellsSound.play();
  },476000)
}



function reset() {
//restart game
if(keyDown("R") || keyDown("r") ) {
  jingleBellsSound.play(); 
  seconds();
  score = 0;
  gameState = PLAY;

  backGround1.velocityX = -7;
  backGround2.velocityX = -7;
  backGround3.velocityX = -7;
  backGround4.velocityX = -7;
}
}

//Image source - Google