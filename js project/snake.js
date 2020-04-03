

// The initializer function
function init(){
    canvas= document.getElementById("mycanvas");
    
    // set the height of canvas
    W = canvas.width = 670;
    H = canvas.height = 670;

    // create a pen
    pen = canvas.getContext("2d");
    cs = 67;
    food = getRandomFood();
    game_over = false;
    score = 0;

    // create an image object for food
    food_image = new Image();
    food_image.src = "assets/apple.png";


    // create an image object for trophy
    trophy_image = new Image();
    trophy_image.src = "assets/trophy.png";

    // Getting sound tracks
    var bgm = document.getElementById('bgm');
    var overbgm = document.getElementById('overbgm');

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        // createSnake() --> Will be called once when game is loaded
        createSnake : function() {
            for(var i = this.init_len;i >= 1;i--)
                this.cells.push({x:i,y:1});
        },

        // drawSnake() --> Will be called once when game is loaded 
         drawSnake : function(){
            pen.fillStyle = this.color;
            for(var i = 0;i< this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },

        // updateSnake() --> Will call every time when we need to change position/size of snake
        updateSnake: function() {
      
      
            // if snake has eaten the food, increase the snaake length plus generate a new food object
            var headX = this.cells[0].x;
            var headY =this.cells[0].y;
            if(headX == food.x && headY == food.y) {
                console.log("Eaten");
                score++;
                getRandomFood();

            }
            else {
                this.cells.pop();
            }

            // updating the snake according to the direction        
            var nextX = headX,nextY = headY;
            
            // if nextX/nextY going out of bound game over
            var last_x = 8;
            var last_y = 9;
            
            if(nextX < 1 || nextY <= 0 || nextX > last_x || nextY > last_y) {
                console.log(nextX);
                console.log(nextY);

                game_over = true;
            }

            // updating coordinates
            if(this.direction == "right"){
                nextX++;
            }
            else if(this.direction == "down"){
                nextY++;
            }
            else if(this.direction == "up") {
                nextY--;
            }
            else{
                nextX--;
            }
            this.cells.unshift({x:nextX,y:nextY});
        }

    };
    snake.createSnake();

    function keyPressed(e){
 
        // sensing the key pressed and changing the direction accordingly
        if(e.key == "ArrowRight")
            snake.direction = "right";
        else if(e.key == "ArrowLeft")
            snake.direction = "left";
        else if(e.key == "ArrowUp")
            snake.direction = "up";
        else{
            snake.direction = "down";
        }
    }

    // Add a event listener to Document object
    document.addEventListener('keydown',keyPressed);
}
function draw(){
    pen.clearRect(0,0,W,H);
    bgm.play();
    snake.drawSnake();

    //Drawing the food
    pen.drawImage(food_image,food.x*cs,food.y*66,cs,cs);

    //Drawing the trophy
    pen.drawImage(trophy_image,0,0,cs,cs);


    //Display the score
    pen.fillStyle = "black";
    pen.font = "25px Roboto";
    pen.fillText(score,26 ,30);

}

function update(){
snake.updateSnake();
}

function getRandomFood(){

    foodX = Math.round(Math.random()*8)+1;
    foodY = Math.round(Math.random()*8)+1;

    food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;
}

function gameloop(){
if(game_over){
    clearInterval(f);
    bgm.pause();
    bgm.currentTime = 0;
    overbgm.play();
    alert("Oops! Game over ') ");
    return;
}
draw();
update();
}

init();
var f = setInterval(gameloop,200);


