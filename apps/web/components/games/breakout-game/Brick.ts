/* ---------- Types ---------- */

export interface BrickConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  colors: string[];
}

export interface BrickInstance {
  x: number;
  y: number;
  width: number;
  height: number;
  colors: string[];
  broke: boolean;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function Brick(
  bricks: BrickInstance[] | undefined,
  canvas: HTMLCanvasElement,
  brick: BrickConfig
): BrickInstance[] | undefined {
  if (!bricks || bricks.length > 0) return;

  const BRICK_COLUMNS = 8;
  const BRICK_ROWS = 5;
  const BRICK_GAP = 5;


  brick.width = (canvas.width - (BRICK_COLUMNS + 1) * BRICK_GAP) / BRICK_COLUMNS;

  const newBricks: BrickInstance[] = [];

  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLUMNS; col++) {
      newBricks.push(
        new SingleBrick(
          BRICK_GAP + col * (brick.width + BRICK_GAP),
          brick.y + row * (brick.height + BRICK_GAP),
          brick.width,
          brick.height,
          brick.colors
        )
      );
    }
  }

  return newBricks;
}

class SingleBrick implements BrickInstance {
  x: number;
  y: number;
  width: number;
  height: number;
  colors: string[];
  broke: boolean;

  constructor(x: number, y: number, w: number, h: number, c: string[]) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colors = c;
    this.broke = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.broke) return;

    const borderRadius = 4;
    const colorPrimary = this.colors[0] || "#836EFB"; // Monad Purple-ish
    const colorSecondary = this.colors[1] || "#4c1d95";

    ctx.save();

    // 1. Draw Shadow/Glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = colorPrimary + "66"; // Low opacity glow

    // 2. Create Rounded Rectangle Path
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, borderRadius);
    
    // 3. Create Gradient for Body
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(0, colorPrimary);
    gradient.addColorStop(1, colorSecondary);
    
    ctx.fillStyle = gradient;
    ctx.fill();

    // 4. Inner Highlight (Bevel effect)
    ctx.beginPath();
    ctx.roundRect(this.x + 2, this.y + 2, this.width - 4, (this.height - 4) / 2, borderRadius);
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fill();

    // 5. Stroke/Border
    ctx.shadowBlur = 0; // Turn off shadow for the stroke
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }
}