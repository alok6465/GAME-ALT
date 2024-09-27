const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const totalCells = canvasSize / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = { x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells) };

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (gameOver()) {
        alert('Game Over!');
        document.location.reload();
    } else {
        setTimeout(() => {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            gameLoop();
        }, 150);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'UP':
            head.y -= 1;
            break;
        case 'DOWN':
            head.y += 1;
            break;
        case 'LEFT':
            head.x -= 1;
            break;
        case 'RIGHT':
            head.x += 1;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells) };
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction === 'UP';
    const goingDown = direction === 'DOWN';
    const goingLeft = direction === 'LEFT';
    const goingRight = direction === 'RIGHT';

    if (keyPressed === 37 && !goingRight) {
        direction = 'LEFT';
    } else if (keyPressed === 38 && !goingDown) {
        direction = 'UP';
    } else if (keyPressed === 39 && !goingLeft) {
        direction = 'RIGHT';
    } else if (keyPressed === 40 && !goingUp) {
        direction = 'DOWN';
    }
}

function gameOver() {
    const head = snake[0];
    const body = snake.slice(1);

    const hitWall = head.x < 0 || head.x >= totalCells || head.y < 0 || head.y >= totalCells;
    const hitBody = body.some(segment => segment.x === head.x && segment.y === head.y);

    return hitWall || hitBody;
}

gameLoop();
