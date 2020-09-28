var trex, trex_running, trex_collided, ground_image, invisG, ground,clouds,cloud_image,obstacle,obstacle_image1,obstacle_image2,obstacle_image3,obstacle_image4,obstacle_image5,obstacle_image6,cloudsG,obstacleG, score,PLAY,END,gamestate,reset,reset_image,gameOver,gameOver_image;

function preload(){

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");

  trex_collided=loadImage("trex_collided.png");
  
  ground_image=loadImage("ground2.png");
  
  cloud_image=loadImage("cloud.png")
  
  obstacle_image1=loadImage("obstacle1.png")
  obstacle_image2=loadImage("obstacle2.png")
  obstacle_image3=loadImage("obstacle3.png")
  obstacle_image4=loadImage("obstacle4.png")
  obstacle_image5=loadImage("obstacle5.png")
  obstacle_image6=loadImage("obstacle6.png")
  
  gameOver_image=loadImage("gameOver.png")
  reset_image=loadImage("restart.png")
}

function setup() {
  createCanvas(600,200);

  trex = createSprite(50,170,15,15);
  trex.addAnimation("running",trex_running);
 trex.addAnimation("collide",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(50,180,400,15)
  ground.addImage("ground", ground_image)
  ground.velocityX=-7;
  ground.x=ground.width/2
  
  obstacleG=new Group();
  cloudG=new Group();
  
  reset=createSprite(254,104,15,15);
  reset.addImage(reset_image);
  reset.visible=false;
  reset.scale=0.5;
  
  gameOver=createSprite(254,60,15,15);
  gameOver.addImage(gameOver_image);
  gameOver.visible=false;
  gameOver.scale=0.6; 
  
  //score=createSprite(530,20,15,15);
  score=0
  
  invisG = createSprite(200,190,400,5);
  invisG.visible=false;
PLAY=1
  END=0
  gamestate=PLAY
}

function draw() {
  background(180);
  
  text(mouseX+","+mouseY,mouseX,mouseY);
  
  trex.collide(invisG);
  
 
  trex.velocityY=trex.velocityY+0.8
  
  text("score: "+score,520,20)
  
  if (gamestate===PLAY) {
  
    if(keyDown("space")&&trex.y>163){
     trex.velocityY=-10
     }
 
  spawnClouds();
  spawnObstacles();
  
  if(ground.x<0){
       ground.x=ground.width/2
     
     }
    
    
     score = score + Math.round(getFrameRate()/60);
    
  if (trex.isTouching(obstacleG)){

    gamestate=END
  }
  }

  else if (gamestate===END){
  
    cloudG.setVelocityXEach(0);
   obstacleG.setVelocityXEach(0);
    ground.velocityX=0;
    
    cloudG.setLifetimeEach(-1);
    obstacleG.setLifetimeEach(-1);
  
    gameOver.visible=true;
    reset.visible=true;
  
    
  trex.changeAnimation("collide",trex_collided)
  
    if(mousePressedOver(reset)){
    restart();
    
    }
    
  }
  
  drawSprites();
}

function restart(){
gamestate=PLAY;
  obstacleG.destroyEach();
  cloudG.destroyEach();
reset.visible=false;
  gameOver.visible=false;
  trex.changeAnimation("running",trex_running)

}


function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(590,78,40,10);
    cloud.y = Math.round(random(25,128));
   cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -8;
    console.log(cloud.y)
      cloudG.add(cloud);

    
     //assign lifetime to the variable
    cloud.lifetime = 75.8;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}

function spawnObstacles(){
if(World.frameCount%80===0){
var obstacle = createSprite(600,170,10,10)
obstacle.velocityX=-8;
  obstacle.scale=0.5;
var rand = Math.round(random(1,6));
switch(rand){
  case 1 :obstacle.addImage(obstacle_image1);
    break;
    case 2 :obstacle.addImage(obstacle_image2);
    break;
    case 3 :obstacle.addImage(obstacle_image3);
    break;
    case 4 :obstacle.addImage(obstacle_image4);
    break;
    case 5 :obstacle.addImage(obstacle_image5);
    break;
    case 6 :obstacle.addImage(obstacle_image6);
 
  break;
  default:break;
   }
obstacle.lifetime=75.8; 
  obstacleG.add(obstacle);
}
}