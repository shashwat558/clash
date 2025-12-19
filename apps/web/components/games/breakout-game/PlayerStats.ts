const monadImage = new Image();
monadImage.src = "/monad.svg";

export default function PlayerStates(ctx: CanvasRenderingContext2D, player: any, canvas: HTMLCanvasElement) {
  ctx.save();

  // Glass-morphism header background
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  ctx.fillRect(0, 0, canvas.width, 60);

  // Title
  ctx.font = "bold 14px monospace";
  ctx.fillStyle = "#836EFB";
  ctx.fillText("MONAD // BREAKOUT", 25, 35);

  // Centered Lives
  const startX = (canvas.width / 2) - (player.lives * 15);
  for (let i = 0; i < player.lives; i++) {
    ctx.drawImage(monadImage, startX + (i * 30), 20, 20, 20);
  }

  // Score
  const scoreVal = player.score.toString().padStart(5, '0');
  ctx.font = "bold 14px monospace";
  ctx.fillStyle = "white";
  ctx.textAlign = "right";
  ctx.fillText(`SCORE: ${scoreVal}`, canvas.width - 25, 35);

  ctx.restore();
}