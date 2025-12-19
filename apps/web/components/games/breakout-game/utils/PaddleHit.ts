import { playSound } from "./sound";

interface BallState {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rad: number;
  speed: number;
}

interface PaddleProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PaddleHit(
  ballObj: BallState,
  paddleProps: PaddleProps
): void {
 
  if (
    ballObj.x < paddleProps.x + paddleProps.width &&
    ballObj.x > paddleProps.x &&
    ballObj.y + ballObj.rad > paddleProps.y - paddleProps.height / 2
  ) {

    let collidePoint =
      ballObj.x - (paddleProps.x + paddleProps.width / 2);

    // Normalize between -1 and 1
    collidePoint = collidePoint / (paddleProps.width / 2);

    // Max bounce angle = 60 degrees
    const angle = (collidePoint * Math.PI) / 3;

    ballObj.dx = ballObj.speed * Math.sin(angle);
    ballObj.dy = -ballObj.speed * Math.cos(angle);
  }
}
