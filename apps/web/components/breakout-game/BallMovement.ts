export interface BallState {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rad: number;
}

export function BallMovement(
  ctx: CanvasRenderingContext2D,
  ballObj: BallState
): void {
  const data = new Ball(ballObj.x, ballObj.y, ballObj.rad);
  data.draw(ctx);

  ballObj.x += ballObj.dx;
  ballObj.y += ballObj.dy;
}

class Ball {
  x: number;
  y: number;
  rad: number;

  constructor(x: number, y: number, rad: number) {
    this.x = x;
    this.y = y;
    this.rad = rad;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = "#58a6ff";
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.strokeStyle = "#58a6ff";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
  }
}
