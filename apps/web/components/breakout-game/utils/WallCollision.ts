interface BallState {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rad: number;
  speed: number;
}

interface Player {
  lives: number;
}

interface PaddleProps {
  x: number;
  y: number;
}

export default function WallCollision(
  ballObj: BallState,
  canvas: HTMLCanvasElement,
  player: Player,
  paddleProps: PaddleProps,
  setLives?: (lives: number) => void
): void {
  // Bottom wall (life lost)
  if (ballObj.y + ballObj.rad > canvas.height) {
    player.lives--;

    // Optional React state sync (if ever used)
    if (setLives) {
      setLives(player.lives);
    }

    ballObj.x = paddleProps.x;
    ballObj.y = paddleProps.y - 30;
    ballObj.dx = 6 * (Math.random() * 2 - 1);
    ballObj.dy = -6;
  }

  // Top wall
  if (ballObj.y - ballObj.rad < 0) {
    ballObj.dy *= -1;
  }

  // Left & right walls
  if (
    ballObj.x + ballObj.rad > canvas.width ||
    ballObj.x - ballObj.rad < 0
  ) {
    ballObj.dx *= -1;
  }
}
