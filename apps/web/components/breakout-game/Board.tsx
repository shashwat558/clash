"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { BallMovement } from "./BallMovement";
import Brick from "./Brick";
import Paddle from "./Paddle";
import PlayerStates from "./PlayerStats";
import data from "./data";
import ResetBall from "./utils/ResetBall";
import WallCollision from "./utils/WallCollision";
import BrickCollision from "./utils/BrickCollision";
import PaddleHit from "./utils/PaddleHit";
import { playSound } from "./utils/sound";
/* ---------- Types ---------- */
interface BallState { x: number; y: number; dx: number; dy: number; rad: number; }
interface PaddleProps { x: number; y: number; width: number; height: number; }
interface Player { lives: number; score: number; }
interface BrickType { x: number; y: number; width: number; height: number; broke: boolean; draw: (ctx: CanvasRenderingContext2D) => void; }

let bricks: BrickType[] = [];

const { ballObj, paddleProps, brickObj, player }: {
  ballObj: BallState;
  paddleProps: PaddleProps;
  brickObj: any;
  player: Player;
} = data;

export default function Board(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let audioUnlocked = false;

const unlockAudio = () => {
  if (audioUnlocked) return;
  audioUnlocked = true;
  playSound("hit"); // silent unlock
};
  
  // UI State
  const [gameState, setGameState] = useState<"playing" | "won" | "gameOver">("playing");
  const [score, setScore] = useState(0);

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    player.lives = 5;
    player.score = 0;
    setScore(0);
    bricks.length = 0; // Force brick re-initialization
    ResetBall(ballObj, canvas, paddleProps);
    setGameState("playing");
  };

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Only run game logic if state is playing
      if (gameState === "playing") {
        paddleProps.y = canvas.height - paddleProps.height;

        // Brick initialization logic
        const newBrickSet = Brick(bricks, canvas, brickObj);
        if (newBrickSet && newBrickSet.length > 0 && bricks.length === 0) {
          bricks = newBrickSet as BrickType[];
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Game Elements
        PlayerStates(ctx, player, canvas);
        bricks.forEach((brick) => brick.draw(ctx));
        BallMovement(ctx, ballObj);
        Paddle(ctx, canvas, paddleProps);

        // Update Score state for React UI
        if (player.score !== score) setScore(player.score);

        // Win Condition
        if (bricks.length > 0 && bricks.every(brick => brick.broke)) {
          playSound("win")
          setGameState("won");
          return;
        }

        // Lose Condition
        if (player.lives <= 0) {
          playSound("lose")
          setGameState("gameOver");
          return;
        }

        // Collisions
        WallCollision(ballObj, canvas, player, paddleProps);
        PaddleHit(ballObj, paddleProps);

        for (let i = 0; i < bricks.length; i++) {
          const collision = BrickCollision(ballObj, bricks[i]!);
          if (collision.hit && !bricks[i]?.broke) {
            playSound("break");
            if (collision.axis === "X") ballObj.dx *= -1;
            if (collision.axis === "Y") ballObj.dy *= -1;
            bricks[i]!.broke = true;
            player.score += 10;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, score]);

  return (
    <div className="relative flex justify-center items-center bg-neutral-900 rounded-lg overflow-hidden shadow-inner">
      <canvas
        ref={canvasRef}
        height={600}
        width={1000} // Set a fixed aspect ratio for stability, or keep your dynamic logic
        className="cursor-none"
        onMouseMove={(event) => {
          unlockAudio();
          if (gameState !== "playing") return;
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            paddleProps.x = event.clientX - rect.left - paddleProps.width / 2;
          }
        }}
      />

      {/* Overlay UI */}
      {gameState !== "playing" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all">
          <div className="text-center p-8 border border-neutral-700 bg-neutral-800 rounded-2xl shadow-2xl max-w-xs w-full">
            <h2 className={`text-4xl font-black mb-2 tracking-tighter ${gameState === 'won' ? 'text-green-400' : 'text-red-500'}`}>
              {gameState === "won" ? "VICTORY!" : "GAME OVER"}
            </h2>
            <p className="text-neutral-400 mb-6 text-sm uppercase tracking-widest">
              Final Score: <span className="text-white font-mono">{score}</span>
            </p>
            
            <button
              onClick={resetGame}
              className="w-full py-3 bg-neutral-100 hover:bg-white text-black font-bold rounded-lg transition-transform active:scale-95 shadow-[0_4px_0_rgb(163,163,163)] active:shadow-none active:translate-y-0.5"
            >
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}