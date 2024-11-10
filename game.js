const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let score = 0;
let timeLeft = 60;
let candies = [];
let obstacles = [];
let powerUps = [];
let gameInterval;
let spawnInterval;

class Candy {
    constructor(x, y, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
    }
}

class Obstacle {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}

class PowerUp {
    constructor(x, y, radius, speed, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.type = type;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
    }
}

function spawnCandy() {
    const x = Math.random() * canvas.width;
    const radius = 10 + Math.random() * 10;
    const speed = 2 + Math.random() * 3;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    candies.push(new Candy(x, 0, radius, speed, color));
}

function spawnObstacle() {
    const x = Math.random() * (canvas.width - 50);
    const width = 50;
    const height = 20;
    const speed = 3;
    obstacles.push(new Obstacle(x, 0, width, height, speed));
}

function spawnPowerUp() {
    const x = Math.random() * canvas.width;
    const radius = 15;
    const speed = 3;
    const type = 'extraTime'; // Can add more types like 'doublePoints'
    powerUps.push(new PowerUp(x, 0, radius, speed, type));
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    candies.forEach((candy, index) => {
        candy.update();
        candy.draw();

        if (candy.y - candy.radius > canvas.height) {
            candies.splice(index, 1);
            score++;
            scoreDisplay.innerText = `Candies Collected: ${score}`;
        }
    });

    obstacles.forEach((obstacle, index) => {
        obstacle.update();
        obstacle.draw();

        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
        }
    });

    powerUps.forEach((powerUp, index) => {
        powerUp.update();
        powerUp.draw();

        if (powerUp.y - powerUp.radius > canvas.height) {
            powerUps.splice(index, 1);
        }
    });

    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        alert(`Game Over! Your score is ${score}`);
    }

    requestAnimationFrame(updateGame);
}

function startGame() {
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    }, 1000);

    spawnInterval = setInterval(() => {
        spawnCandy();
        if (Math.random() < 0.3) spawnObstacle();
        if (Math.random() < 0.1) spawnPowerUp();
    }, 1000);

    updateGame();
}

startGame();
