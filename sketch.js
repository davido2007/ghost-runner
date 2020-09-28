var tower, tower_image;
var door,door_image,doorsGroup;
var railing,railing_Image,railingGroup
var ghost, ghost_Image;
var invisibleBlock,invisibleBlock_Group;
var gameState="play";
var spookySound;
function preload(){
  spookySound=loadSound("spooky.wav");
  door_image=loadImage("door.png");
  railing_Image=loadImage("climber.png");
 tower_image=loadImage("tower.png");
  ghost_Image=loadImage("ghost-standing.png");
}
function setup(){
    createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",tower_image);
  tower.velocityY=1;
  doorsGroup=new Group();
  railingGroup=new Group();
  invisibleBlockGroup=new Group();
  //creating ghost
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3
  ghost.addImage("ghost",ghost_Image);
  }

function draw(){
background(0);
  if(gameState==="play"){
    if(keyDown("right")){
   ghost.x=ghost.x+3;
  }
  
   if(keyDown("left")){
   ghost.x=ghost.x-3;
  }
    if(keyDown("space")){
   ghost.velocityY=-5;
  }
    ghost.velocityY=ghost.velocityY+0.8;
    
    if(tower.y>400){
    tower.y=300;
  }
    spawnDoors();
     if(railingGroup.isTouching(ghost)){
   ghost.velocityY=0; 
  }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy();
      gameState="end";
}
     drawSprites();
  }
 if(gameState==="end"){
  stroke("yellow");
   fill("yellow");
   textSize(30);
   text("game Over",230,250);
 }
 
  //making ghost move left or right
  
  //making ghost jump when space key is pressed
   
  //gravity for ghost
 
    


  
 
}

function spawnDoors(){
 if(frameCount%240===0){
  door=createSprite(200,-50);
   door.addImage(door_image);
   door.x=Math.round(random(120,400));
   door.velocityY=1;
   door.lifetime=800;
   doorsGroup.add(door);
   
   railing=createSprite(200,10);
   railing.addImage(railing_Image);
   railing.velocityY=1;
   railing.x=door.x;
   railing.lifetime=800;
   railingGroup.add(railing);
   
   //dept
   ghost.depth=door.depth;
   ghost.depth=ghost.depth+1;
   
   invisibleBlock=createSprite(200,15);
   invisibleBlock.width=railing.width;
   invisibleBlock.height=2;
   invisibleBlock.x=door.x;
   invisibleBlock.velocityY=1;
   invisibleBlock.debug=true;
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.lifetime=800;
 }
  
}