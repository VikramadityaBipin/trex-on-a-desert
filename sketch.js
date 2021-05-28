var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds;
var gameOver
var jumpS,checkpS,gameOS

var obs1,obs2,obs3,obs4,obs5,obs6;


var restart
var score=0

var gameState='play'

var obsGroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudsImage =loadImage('cloud.png');
 
  Obs1 =loadImage ('obstacle1.png')
  Obs2 =loadImage ('obstacle2.png')
  Obs3 =loadImage ('obstacle3.png')
  Obs4 =loadImage ('obstacle4.png')
  Obs5 =loadImage ('obstacle5.png')
  Obs6 =loadImage ('obstacle6.png')
 gameOverImage=loadImage('gameOver.png')
  jumpS=loadSound('jump.mp3')
  gameOS=loadSound('die.mp3')
  checkpS=loadSound('checkPoint.mp3')
  restartImage=loadImage('restart.png')
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //trex crashed
  trex.addAnimation('crash',trex_collided)
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -8;
  
  //game over
  gameOver=createSprite(200,100,30,30)
  gameOver.addImage('game over',gameOverImage)
  gameOver.scale=1.2
  
  //creating invisible ground
  invisibleGround = createSprite(200,185,400,10);
  invisibleGround.visible = false;
  
  
  //restart icon
  restart=createSprite(200,120,20,20);
  restart.addImage(restartImage)
  restart.scale=0.3 
  
  //generate random numbers
  var rand =  Math.round(random(1,100))

  //groups
  obsGroup=new Group()
cloudsgroup=new Group()
  
  trex.debug=false
  trex.setCollider('rectangle',0,0,100,100,180)
}

function draw() {
  //set background color
  background('cyand');
  
//score
 text('score:'+score,500,50)
  
  
   
  
  console.log(gameState)

  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
 
  //gameState
  if(gameState==='play') {
    trex.changeAnimation('running',trex_running)
    obsGroup.setVelocityEach(-4,0)
   ground.setVelocity(-4,0);
     obstacles()
     //Spawn Clouds
    gameOver.visible=false
  restart.visible=false
    
  spawnClouds()
            
      // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 151) {
    trex.velocityY = -14;
    jumpS.play()
  }
   
  score =score +Math.round(getFrameRate()/60);
                      
  }
 if(obsGroup.isTouching(trex)&&(gameState==='play')) {
   gameOS.play()
  // trex.y=-14
   gameState='end'
   
 }
  if(gameState==='end') {
     obsGroup.setVelocityEach(0,0)
   ground.setVelocity(0,0);
   // clouds.visible=false
    cloudsgroup.setVelocityEach(0,0)
    trex.changeAnimation('crash',trex_collided)
 obsGroup.setLifetimeEach(-1)
    gameOver.visible=true
    restart.visible=true
  cloudsgroup.setLifetimeEach(-1)
    
    
   
    //text
    textSize(30)
    //text('click R to restart',75,150)
    
  
  }
   if(gameState==='end'&&(mousePressedOver(restart))) {
     obsGroup.destroyEach()
      gameState='play'
     cloudsgroup.destroyEach()
     score=0
    }

  
  if(score%100===0 && score!==0) {
    checkpS.play()
    ground.velocityX=ground.velocityX-0.5
   // obsgroup.velocityX=obsGroup.velocityX-0.5
  }
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
  
 
  if(frameCount%60===0) {
     clouds=createSprite(600,30,40,40);
  clouds.addImage(cloudsImage)
    clouds.lifetime=180
  clouds.velocityX=-4-score/200
    clouds.y=random(30,60)
    clouds.scale=random(0.5,1)
    
    cloudsgroup.add(clouds)
  }
  
}

function obstacles(){
 
  
  
  if(frameCount%100===0)  {
    
    
  obs1=createSprite(700,155,20,20);
     obs1.velocityX=-8-score/200;
    obs1.scale=0.5
    rand=Math.round(random(1,6))
 //   console.log(rand)
    obs1.lifetime=180
   
    obs1.debug=false
switch(rand){
  case 1  :obs1.addImage(Obs1);
    break;
     case 2  :obs1.addImage(Obs2);
    break;
     case 3  :obs1.addImage(Obs3);
    break;
    case 4  :obs1.addImage(Obs4);
    break;
    case 5  :obs1.addImage(Obs5);
    break;
    case 6  :obs1.addImage(Obs6);
      break;
  default:break;
    
}
obsGroup.add(obs1)
  
}

}
