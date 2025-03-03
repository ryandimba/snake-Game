const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = box, dy = 0;
let score = 5;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -box;
    } else if (key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = box;
    } else if (key === "ArrowLeft" && dx === 0) {
        dx = -box;
        dy = 0;
    } else if (key === "ArrowRight" && dx === 0) {
        dx = box;
        dy = 0;
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Collision with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
        return;
    }

    // Collision with itself
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
}

function resetGame() {
    alert("Game Over! Your score: " + score);
    snake = [{ x: 200, y: 200 }];
    dx = box;
    dy = 0;
    score = 0;
    generateFood();
}
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
}

generateFood();
setInterval(update, 100);