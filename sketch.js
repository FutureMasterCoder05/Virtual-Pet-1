var dog, happyDog, dogImage, dogIMG;
var foodS, foodStock;
var database;

function preload() {
  dogImage = loadImage("images/dogImg.png");
  dogIMG = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database= firebase.database();

  dog = createSprite(250,300,30,30);
  dog.addImage(dogImage);
  dog.scale= 0.2;
  
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87); 

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogIMG);
}

  drawSprites();
  fill("black");
  stroke("black");
  text("Food Remaining:"+ foodS, 200,200);

  fill("black");
  stroke("black");
  text("Note: Press the Up Arrow Key to feed Drago Milk", 120,20);
  //add styles here

}

function readStock(data){
  foodS= data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0; 
  }
  else {
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

