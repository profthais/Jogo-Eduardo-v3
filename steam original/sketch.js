
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine;
var world;
var PLAY = 1;
var END = 0;
var SERVE;
var gamestate;
var serve;
var backgroundImg1;
var backgroundImg2;
var score;
var canvas;
var power;

var invisibleGround
var key = 0
var delayInMilliseconds = 1000;

var fighter1;
var fighter1_gif, fighter1_side;
var fighter1_punch, fighter1_punch_side;
var fighter1_life = 100;
var fighter1d

var fighter2;
var fighter2_gif, fighter2_side;
var fighter2_punch, fighter2_punch_side;
var fighter2_life = 100;
var fighter2d;

var power_animation;
var power_spriteData;
var power_spriteSheet;


function preload(){
    backgroundImg1 = loadImage("assets/MicrosoftTeams-image (2).png");
    backgroundImg2 = loadImage("assets/aaa.png");
    img = loadImage("assets/eduardo.png");
    img1 = loadImage("assets/edu12.png");
    fighter1_gif = loadImage("assets/animeBB.gif");
    fighter2_gif = loadImage("assets/red1.gif");
    fighter1_punch = loadImage("assets/poopy.gif");
    fighter1_punch_side = loadImage("assets/poopy_side.gif");
    fighter2_punch = loadImage("assets/bloob.gif");
    fighter2_punch_side = loadImage("assets/bloob_side.gif");
    fighter1d = loadImage("assets/DamageBlue.png");
    fighter2d = loadImage("assets/RedDamage.png");
    redwin = loadImage("assets/wwr.png");
    bluewin = loadImage("assets/wwb.png");
    fighter1_side = loadImage("assets/animeBB_side.gif");
    fighter2_side = loadImage("assets/red1_side.gif");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    fundo = createSprite(windowWidth/2, windowHeight/2);
    fundo.addImage(backgroundImg1);
    
    fighter1 = createSprite(70,windowHeight-200,20,300);
    fighter1.addImage(fighter1_gif);    
    fighter1.setCollider("rectangle",0,0,200,150);
    
    fighter2 = createSprite(1200,windowHeight-200,20,300);
    fighter2.addImage(fighter2_gif);
    fighter2.setCollider("rectangle",0,0,200,150);
    
    fighter1.visible = false;
    fighter2.visible = false;
    
    edges = createEdgeSprites();
    
    backgroundImg2.visible = false;
    backgroundImg1.visible = true;
    
    gamestate = SERVE;
    
    invisibleGround = createSprite(800, windowHeight - 10, 2000, 100);
    invisibleGround.visible = false;
    
}


function draw() {
    background(180);

    if(gamestate === "serve"){
        fundo.addImage(backgroundImg1);
    }
    else{
        gameplay();
    }
    


    fighter1.collide(invisibleGround);
    fighter2.collide(invisibleGround);

    drawSprites();

    if(fighter1.visible == true) {
        textSize(40);
        noStroke();
        fill("blue");
        text("LIFE: " + fighter1_life , windowWidth-1300, 100);
        fill("red")
        text("LIFE: " + fighter2_life , windowWidth-300, 100); 
    }
}


function keyPressed(){
    if(keyCode===69){
        //backgroundImg1.visible = false;
        //backgroundImg2.visible = true;
        fundo.addImage(backgroundImg2);

        fighter1.visible = true;
        fighter2.visible = true;
        if(gamestate == "serve"){
            gamestate = "play";
        }
    }
    
    if(fighter1_life >= 0 || fighter2_life >= 0){
        if(keyCode===16){
        location.reload();
    }
    }
}

function gameplay(){
    fighter1.bounceOff(edges[0]);
    fighter1.bounceOff(edges[1]);
    
    fighter2.bounceOff(edges[0]);
    fighter2.bounceOff(edges[1]);

    if(keyIsDown("68")){
        fighter1.x += 10; 
    } 
    if(keyIsDown("65")){
        fighter1.x -= 10;
    }
    
    if(keyIsDown("87") && fighter1.y >= 522){ //prof: alterar o isTouching para y
        fighter1.velocityY = -16; //prof: alterar para velocityY

    }
        
    if(keyIsDown("74")){
        fighter2.x -= 10;
    }
    if(keyIsDown("76")){
        fighter2.x += 10;
    }
    
    
    if(keyIsDown("73") && fighter2.y >= 522){ //prof: alterar o isTouching para y
        fighter2.velocityY = -16; //prof: alterar para velocityY
     }
    
    //prof: mudar a gravidade para aqui
    fighter1.velocityY = fighter1.velocityY + 0.5
    fighter2.velocityY = fighter2.velocityY + 0.5   
     
      
    if(fighter1_life <=0){
        fundo.visible = false;
        fundo.addImage(redwin);
        image(redwin,0,0,windowWidth+50,windowHeight+50);
        fighter1.visible = false;
        fighter2.visible = false;
    }

    if(fighter2_life <=0){
        fundo.visible = false;
        fundo.addImage(bluewin);
        image(bluewin,0,0,windowWidth+50,windowHeight+50);
        fighter1.visible = false;
        fighter2.visible = false;
    }

    //prof: condicional para personagens alterarem o lado
    if(fighter1.x > fighter2.x){
        fighter1.addImage(fighter1_side); //prof: gif do fighter1 para o outro lado
        fighter2.addImage(fighter2_side); //prof: gif do fighter2 para o outro lado
        
        if(keyIsDown("83")){ //prof: alterar o soco para aqui (apagar do keyPressed)
            fighter1.addImage(fighter1_punch_side);
            
            if(fighter1.isTouching(fighter2)){
                fighter2_life -= 1;
            }
        
            if(fighter1.isTouching(fighter2) && fighter2.x < windowWidth-100 && fighter2.x < windowWidth+100){
            fighter2.x += 100;
            }
        }

        if(keyIsDown("75")){ //prof: alterar o soco para aqui (apagar do keyPressed)
            fighter2.addImage(fighter2_punch_side);
        
            if(fighter2.isTouching(fighter1)){
                fighter1_life -= 1;
            }
    
            if(fighter2.isTouching(fighter1) && fighter1.x < windowWidth+100 && fighter2.x < windowWidth-100){
               fighter1.x -= 100;
            }
        }

    } else {
        fighter1.addImage(fighter1_gif);
        fighter2.addImage(fighter2_gif);
        if(keyIsDown("83")){ //prof: alterar o soco para aqui (apagar do keyPressed)
            fighter1.addImage(fighter1_punch);
            
            if(fighter1.isTouching(fighter2)){
                fighter2_life -= 1;
            }
        
            if(fighter1.isTouching(fighter2) && fighter2.x < windowWidth-100 && fighter2.x < windowWidth+100){
            fighter2.x += 100;
            }
        }

        if(keyIsDown("75")){ //prof: alterar o soco para aqui (apagar do keyPressed)
            fighter2.addImage(fighter2_punch);
        
            if(fighter2.isTouching(fighter1)){
                fighter1_life -= 1;
            }
    
            if(fighter2.isTouching(fighter1) && fighter1.x < windowWidth+100 && fighter2.x < windowWidth-100){
               fighter1.x -= 100;
            }
        }
    }


}
