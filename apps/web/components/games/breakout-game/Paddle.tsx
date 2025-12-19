interface PaddleProps {
  x: number;
  width: number;
}

export default function Paddle(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  paddleProps: PaddleProps
): void {
  const y = canvas.height - 20;
  const height = 16;
  const radius = 8;
  const x = paddleProps.x;

  // -------- Gradient --------
  const gradient = ctx.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, "#5fd3ff");
  gradient.addColorStop(0.5, "#1e90ff");
  gradient.addColorStop(1, "#003a8f");

  ctx.save();

  // -------- Glow --------
  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(95,211,255,0.7)";

  // -------- Rounded rectangle (manual) --------
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + paddleProps.width - radius, y);
  ctx.quadraticCurveTo(
    x + paddleProps.width,
    y,
    x + paddleProps.width,
    y + radius
  );
  ctx.lineTo(x + paddleProps.width, y + height - radius);
  ctx.quadraticCurveTo(
    x + paddleProps.width,
    y + height,
    x + paddleProps.width - radius,
    y + height
  );
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);

  ctx.fillStyle = gradient;
  ctx.fill();

  // -------- Highlight strip --------
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillRect(x + 6, y + 4, paddleProps.width - 12, 3);

  ctx.restore();

  // -------- Clamp --------
  if (paddleProps.x < 0) {
    paddleProps.x = 0;
  } else if (paddleProps.x + paddleProps.width > canvas.width) {
    paddleProps.x = canvas.width - paddleProps.width;
  }
}
