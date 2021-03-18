var dog,sadDog,happyDog;

var feed;
var addfood;

var food;

var foodStockRef;
var foodStock;
//var foodCount=0;
var database;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database=firebase.database();

  food=new Food();
  foodStockRef=database.ref("Food")
  foodStockRef.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addfood=createButton("Add Food")
  addfood.position(800,95);
  addfood.mousePressed(addFood)

}

function draw() {
  background(46,139,87);
  drawSprites();
  food.display();


}

function feedDog(){
  dog.addImage(happyDog);

    if(food.getFoodStock()<=0){
      food.updateFoodStock(food.getFoodStock()*0);

    }else{
      food.updateFoodStock(food.getFoodStock()-1);
    }

}


function addFood(){
  foodStock++;

  //dog.addImage(sadDog);

  database.ref('/').update({
    Food:foodStock
  })

}

function readStock(data){

  foodStock=data.val();

food.updateFoodStock(foodStock);
}