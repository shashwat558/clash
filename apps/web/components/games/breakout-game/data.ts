/* ---------- Types ---------- */

export interface BallState {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rad: number;
  speed: number;
}

export interface BrickConfig {
  x: number;
  y: number;
  height: number;
  density: number;
  colors: string[];
  width?: number; // computed later
}

export interface Player {
  name: string;
  lives: number;
  score: number;
  
}

export interface PaddleProps {
  height: number;
  width: number;
  x: number;
  color: string;
}

/* ---------- Game Data ---------- */

const data = {
  ballObj: {
    x: 20,
    y: 200,
    dx: 5,
    dy: 5,
    rad: 10,
    speed: 10,
  } satisfies BallState,

  brickObj: {
    x: 0.5,
    y: 50,
    height: 20,
    density: 2,
    colors: ["red", "lightblue"],
  } satisfies BrickConfig,

  player: {
    name: "Player",
    lives: 5,
    score: 0,

  } satisfies Player,

  paddleProps: {
    height: 20,
    width: 100,
    x: 100,
    color: "orange",
  } satisfies PaddleProps,
};

export default data;
