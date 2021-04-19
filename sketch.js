var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    console.log(database); 
    
//ref  -- used to refer the location of the data

//on   - listener event - which will listen for the changes

//set  - set is used to update the database

var ball_address = database.ref('ball/position'); //I have got the address of the data
ball_address.on("value",readPosition,showError)


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x1,y1){
  database.ref("ball/position").set(
      {
     x:position.x+x1,
     y:position.y+y1 

      }
  )
}

function readPosition(snapShot){
position=snapShot.val()
ball.x=position.x;
ball.y=position.y;
}

function showError(){
    console.log("Error in the database");
}