const canvas = document.querySelector(".myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let ballRadius = 10;

let dx = 2;
let dy = -5;

let paddleWidth = 80;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let isRightPressed = false;
let isLeftPressed = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;

  //рассчёт идёт СВЕРХУ ВНИЗ, а не наоборот как в классическом представлении графика
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX - 5 && x < paddleX + paddleWidth + 5) {
      dy = -dy * 1.01;
    } else {
      console.log("Game Over");
      // document.location.reload();
      clearInterval(interval);
    }
  }

  if (isRightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
      console.log("paddleX", paddleX);
    }
  } else if (isLeftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    isRightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    isLeftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    isRightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    isLeftPressed = false;
  }
}

let interval = setInterval(draw, 10);

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.beginPath();
//   ctx.arc(x, y, 10, 0, Math.PI * 2);
//   ctx.fillStyle = "#0095DD";
//   ctx.fill();
//   ctx.closePath();

//   x += dx;
//   y += dy;
// }

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
