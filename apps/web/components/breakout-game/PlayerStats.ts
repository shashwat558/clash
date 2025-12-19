interface Player {
  lives: number;
  score: number;
}

const monadImage = new Image();
monadImage.src = "/monad.svg";

export default function PlayerStates(
  ctx: CanvasRenderingContext2D,
  player: Player,
  canvas: HTMLCanvasElement
): void {
  ctx.save();

  // 1. Draw a subtle top-bar background (Glass-morphism effect)
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  ctx.fillRect(0, 0, canvas.width, 50);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.lineTo(canvas.width, 50);
  ctx.stroke();

  // 2. Game Title Styling
  ctx.font = "bold 16px 'JetBrains Mono', 'Fira Code', monospace";
  ctx.fillStyle = "#836EFB"; // Monad Purple
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(131, 110, 251, 0.5)";
  ctx.fillText("BREAKOUT // MONAD", 25, 32);
  ctx.shadowBlur = 0; // Reset shadow for other elements

  // 3. Lives (Pulsing Icons)
  const lifeSize = 22;
  const startX = canvas.width / 2 - (player.lives * 30) / 2; // Perfectly centered
  
  // Add a soft glow behind the lives
  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(131, 110, 251, 0.3)";

  for (let i = 0; i < player.lives; i++) {
    ctx.drawImage(
      monadImage, 
      startX + i * 30, 
      14, 
      lifeSize, 
      lifeSize
    );
  }
  ctx.shadowBlur = 0;

  // 4. Score Styling
  // Draw a small container for the score
  const scoreText = `SCORE: ${player.score.toString().padStart(5, '0')}`;
  ctx.font = "bold 16px 'JetBrains Mono', 'Fira Code', monospace";
  
  // Right-aligning the score properly
  const scoreWidth = ctx.measureText(scoreText).width;
  
  // Score label
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText("SCORE:", canvas.width - scoreWidth - 25, 32);
  
  // Score value
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(player.score.toString().padStart(5, '0'), canvas.width - scoreWidth + 35, 32);

  ctx.restore();
}