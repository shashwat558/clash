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
}

export default function ResetBall(
  ballObj: BallState,
  canvas: HTMLCanvasElement,
  paddleProps: PaddleProps
): void {
  ballObj.x = paddleProps.x;
  ballObj.y = paddleProps.y - 80;

  ballObj.dx = 6 * (Math.random() * 2 - 1);
  ballObj.dy = -6;
}
