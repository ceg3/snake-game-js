
const snakeCanvas = document.querySelector("#snake-game");
const context = snakeCanvas.getContext("2d");
const width   = snakeCanvas.width;
const height  = snakeCanvas.height;

const cellSize = 10;
const updateRate = 150;

let direction = "right"; // initial value
let foodX;
let foodY;
let gameloop;
let score = 0;  // initial value

// snake data structure
let snake = [
            {"x": 0,"y": 0},
            {"x": 1,"y": 0},
            {"x": 2,"y": 0},
            {"x": 3,"y": 0},
            {"x": 4,"y": 0}];

start();

// starts the game
function start() {
    createNewFood();
    gameLoop = setInterval(updateCanvas, updateRate);
}

// stops the game
function stop() {
    clearInterval(gameLoop);
}

//  Redraws the canvas at each interval point
function updateCanvas(){
    clearCanvas(); // reset entire canvas
    moveSnake(); // update the location of the snake
    drawSnake();  // draw snake
    drawFood(); // draw food
    drawScore();  // draw score

    let collisionStatus = checkForCollision();
    if(collisionStatus == "food"){
        score++;
        createNewFood();
        snake.unshift(updateDirection()); // add length to snake
    }else if(collisionStatus == "wall"){
        stop();
    }
}

// randomly place x,y coordinate of food
function createNewFood(){
    foodX = parseInt(Math.random()*width/cellSize);
    foodY = parseInt(Math.random()*height/cellSize);
}

// paint an area of the canvas
function paint(x, y, w, h, fillColor, borderColor){
    context.fillStyle = fillColor;
    context.fillRect(x, y, w, h);
    context.strokeStyle = borderColor;
    context.strokeRect(x, y, w, h);
}

function clearCanvas() {
    paint(0, 0, width, height, "white", "black");
}

function drawFood(){
    paint(foodX*cellSize, foodY*cellSize, cellSize, cellSize, "green", "black");  
}

function drawSnake() {
    snake.forEach(function(element){
        paint(cellSize*element.x, cellSize*element.y, cellSize, cellSize, "orange", "black");
    });
}

function drawScore(){
    context.fillStyle = "black";
    context.fillText("Score:  " + score, 5, height-5);
}

// moves snake one cell in the current direction
function moveSnake(){
    snake.shift();
    snake.push(updateDirection());
};

// does the actual math of moving the snake
function updateDirection(){
    let x = snake[snake.length-1].x;
    let y = snake[snake.length-1].y;

    if(direction === "right") {
        x = x + 1;
    } else if (direction === "left") {
        x = x - 1;
    } else if (direction === "up") {
        y = y - 1;
    } else if (direction === "down") {
        y = y + 1;
    }
    return {"x": x, "y": y};
};


// read arrow keys to manually set direction
document.addEventListener("keydown", (e)=>{
    switch (e.keyCode) {
        case 37:
            direction = "left";
            break;
        case 38:
            direction = "up";
            break;
        case 39:
            direction = "right";
            break;
        case 40:
            direction = "down";
            break;
        }
    })

// check for collision against wall or food
function checkForCollision(){
    let collision = "nothing";   
    snake.every(function(cell){
        if(cell.x == foodX && cell.y == foodY){
            collision = "food";
            return false;
        } else if(cell.x == -1 || cell.x == width/cellSize){
            collision = "wall";
            return false;
        } else if(cell.y == -1 || cell.y == height/cellSize){
            collision = "wall";
            return false;
        } else {
            return true;
        }
    })
    return collision;
}
