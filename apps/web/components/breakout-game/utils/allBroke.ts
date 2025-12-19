
/* ---------- Types ---------- */

import data from "../data";
import ResetBall from "./ResetBall";

interface Brick {
  broke: boolean;
}

interface Player {
  level: number;
}

interface BallState {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rad: number;
  speed: number;
}

/* ---------- Utility ---------- */

export default function AllBroken(
  bricks: Brick[],
  player: Player,
  canvas: HTMLCanvasElement,
  ballObj: BallState
): void {
  const { brickObj, paddleProps } = data;

  let total = 0;

  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i]?.broke === true) {
      total++;
    }
  }

  if (bricks.length > 0 && total === bricks.length) {
    player.level++;
    //@ts-ignore
    ResetBall(ballObj, canvas, paddleProps);
    brickObj.y = 50;
  }
}
