<script setup lang="ts">
  interface Ball {
    x: number;
    y: number;
    dx: number;
    dy: number;
    reverseColor: string;
    ballColor: string;
  }

  const colorPalette = {
    ArcticPowder: '#F1F6F4',
    MysticMint: '#D9E8E3',
    Forsythia: '#FFC801',
    DeepSaffron: '#FF9932',
    NocturnalExpedition: '#114C5A',
    OceanicNoir: '#172B36'
  };

  onMounted(() => {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas?.getContext('2d');
    const scoreElement = document.getElementById('score');

    const DAY_COLOR = colorPalette.MysticMint;
    const DAY_BALL_COLOR = colorPalette.NocturnalExpedition;
    const NIGHT_COLOR = colorPalette.NocturnalExpedition;
    const NIGHT_BALL_COLOR = colorPalette.MysticMint;
    const SQUARE_SIZE = 25;
    const MIN_SPEED = 5;
    const MAX_SPEED = 10;

    const clientWidth = canvas?.clientWidth || 25;
    const clientHeight = canvas?.clientHeight || 25;

    const numSquaresX = clientWidth / SQUARE_SIZE;
    const numSquaresY = clientHeight / SQUARE_SIZE;

    let dayScore = 0;
    let nightScore = 0;

    const squares: string[][] = [];

    // Populate the fields, one half day, one half night
    for (let i = 0; i < numSquaresX; i++) {
      squares[i] = [];
      for (let j = 0; j < numSquaresY; j++) {
        squares[i][j] = i < numSquaresX / 2 ? DAY_COLOR : NIGHT_COLOR;
      }
    }

    const balls: Ball[] = [
      {
        x: clientWidth / 4,
        y: clientHeight / 2,
        dx: 8,
        dy: -8,
        reverseColor: DAY_COLOR,
        ballColor: DAY_BALL_COLOR
      },
      {
        x: (clientWidth / 4) * 3,
        y: clientHeight / 2,
        dx: -8,
        dy: 8,
        reverseColor: NIGHT_COLOR,
        ballColor: NIGHT_BALL_COLOR
      }
    ];

    let iteration = 0;

    function drawBall(ball: Ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, SQUARE_SIZE / 2, 0, Math.PI * 2, false);
      ctx.fillStyle = ball.ballColor;
      ctx.fill();
      ctx.closePath();
    }

    function drawSquares() {
      dayScore = 0;
      nightScore = 0;

      for (let i = 0; i < numSquaresX; i++) {
        for (let j = 0; j < numSquaresY; j++) {
          ctx.fillStyle = squares[i][j];
          ctx.fillRect(i * SQUARE_SIZE, j * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

          // Update scores
          if (squares[i][j] === DAY_COLOR) dayScore++;
          if (squares[i][j] === NIGHT_COLOR) nightScore++;
        }
      }
    }

    function checkSquareCollision(ball: Ball) {
      // Check multiple points around the ball's circumference
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        const checkX = ball.x + Math.cos(angle) * (SQUARE_SIZE / 2);
        const checkY = ball.y + Math.sin(angle) * (SQUARE_SIZE / 2);

        const i = Math.floor(checkX / SQUARE_SIZE);
        const j = Math.floor(checkY / SQUARE_SIZE);

        if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
          if (squares[i][j] !== ball.reverseColor) {
            // Square hit! Update square color
            squares[i][j] = ball.reverseColor;

            // Determine bounce direction based on the angle
            if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
              ball.dx = -ball.dx;
            } else {
              ball.dy = -ball.dy;
            }
          }
        }
      }
    }

    function checkBoundaryCollision(ball: Ball) {
      if (ball.x + ball.dx > clientWidth - SQUARE_SIZE / 2 || ball.x + ball.dx < SQUARE_SIZE / 2) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy > clientHeight - SQUARE_SIZE / 2 || ball.y + ball.dy < SQUARE_SIZE / 2) {
        ball.dy = -ball.dy;
      }
    }

    function addRandomness(ball: Ball) {
      ball.dx += Math.random() * 0.01 - 0.005;
      ball.dy += Math.random() * 0.01 - 0.005;

      // Limit the speed of the ball
      ball.dx = Math.min(Math.max(ball.dx, -MAX_SPEED), MAX_SPEED);
      ball.dy = Math.min(Math.max(ball.dy, -MAX_SPEED), MAX_SPEED);

      // Make sure the ball always maintains a minimum speed
      if (Math.abs(ball.dx) < MIN_SPEED) ball.dx = ball.dx > 0 ? MIN_SPEED : -MIN_SPEED;
      if (Math.abs(ball.dy) < MIN_SPEED) ball.dy = ball.dy > 0 ? MIN_SPEED : -MIN_SPEED;
    }

    function draw() {
      ctx.clearRect(0, 0, clientWidth, clientHeight);
      drawSquares();

      scoreElement.textContent = `day ${dayScore} | night ${nightScore}`;

      balls.forEach((ball) => {
        drawBall(ball);
        checkSquareCollision(ball);
        checkBoundaryCollision(ball);
        ball.x += ball.dx;
        ball.y += ball.dy;

        addRandomness(ball);
      });

      iteration++;
      if (iteration % 1_000 === 0) console.log('iteration', iteration);

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  });
</script>

<template>
  <div id="container">
    <div id="canvas">
      <canvas id="pongCanvas" width="600" height="600"></canvas>
      <div id="score"></div>

      <p id="made">
        made by
        <a href="https://koenvangilst.nl/labs/pong-wars">Koen van Gilst</a> | source on
        <a href="https://github.com/vnglst/pong-wars">github</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
  #container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  #canvas {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: min(70vh, 80%);
    max-width: 600px;
    height: 100%;
  }

  canvas {
    display: block;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    margin-top: auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  #score {
    font-family: monospace;
    margin-top: 30px;
    font-size: 16px;
    padding-left: 20px;
    color: #172b36;
  }

  #made {
    text-align: center;
    line-height: 1.5;
    font-family: monospace;
    margin-top: auto;
    margin-bottom: 20px;
    font-size: 10px;
  }

  #made a {
    color: #172b36;
  }
</style>
