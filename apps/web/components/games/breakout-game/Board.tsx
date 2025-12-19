"use client";

import React, { useEffect, useRef, useState } from "react";
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

let bricks: any[] = [];
const { ballObj, paddleProps, brickObj, player } = data;

export default function Board() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const isSubmitting = useRef(false);

  const [gameState, setGameState] = useState<"playing" | "won" | "gameOver">("playing");
  const [score, setScore] = useState(0);

  const submitResult = async (finalScore: number) => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    const bricksDestroyed = finalScore / 10;
    const brickRatio = bricksDestroyed / 40;
    const result = brickRatio === 1 ? 2 : brickRatio >= 0.4 ? 1 : 0;

    try {
      await fetch("/api/game/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });
      console.log("Result saved.");
    } catch (error) {
      console.error("API Error:", error);
      isSubmitting.current = false;
    }
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    player.lives = 5;
    player.score = 0;
    setScore(0);
    bricks = [];
    isSubmitting.current = false;
    ResetBall(ballObj, canvas, paddleProps);
    setGameState("playing");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.parentElement?.offsetWidth || 1000;
    canvas.height = 600;

    let animationFrameId: number;

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (gameState === "playing") {
        paddleProps.y = canvas.height - paddleProps.height;

        const newBrickSet = Brick(bricks, canvas, brickObj);
        if (newBrickSet && newBrickSet.length > 0 && bricks.length === 0) {
          bricks = newBrickSet;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        PlayerStates(ctx, player, canvas);
        bricks.forEach((b) => b.draw(ctx));
        BallMovement(ctx, ballObj);
        Paddle(ctx, canvas, paddleProps);

        if (player.score !== score) setScore(player.score);

        if (bricks.length > 0 && bricks.every(b => b.broke)) {
          playSound("win");
          setGameState("won");
          submitResult(player.score);
          return;
        }

        if (player.lives <= 0) {
          playSound("lose");
          setGameState("gameOver");
          submitResult(player.score);
          return;
        }

        WallCollision(ballObj, canvas, player, paddleProps);
        PaddleHit(ballObj, paddleProps);

        bricks.forEach((brick) => {
          const collision = BrickCollision(ballObj, brick);
          if (collision.hit && !brick.broke) {
            playSound("break");
            if (collision.axis === "X") ballObj.dx *= -1;
            if (collision.axis === "Y") ballObj.dy *= -1;
            brick.broke = true;
            player.score += 10;
          }
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, score]);

  return (
    <div className="relative w-full flex flex-col items-center bg-neutral-900 shadow-inner">
      <canvas
        ref={canvasRef}
        className="block cursor-none w-full"
        onMouseMove={(e) => {
          if (gameState !== "playing") return;
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) paddleProps.x = e.clientX - rect.left - paddleProps.width / 2;
        }}
      />

      {gameState !== "playing" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="text-center p-10 border border-neutral-700 bg-neutral-800 rounded-3xl shadow-2xl max-w-sm w-full animate-in zoom-in duration-300">
            <h2 className={`text-5xl font-black mb-4 tracking-tighter ${gameState === 'won' ? 'text-green-400' : 'text-red-500'}`}>
              {gameState === "won" ? "WINNER" : "FAILED"}
            </h2>
            <p className="text-neutral-400 mb-8 text-sm uppercase tracking-[0.3em]">
              Final Score: <span className="text-white font-mono">{score}</span>
            </p>
            <button
              onClick={resetGame}
              className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-black rounded-xl transition-all active:scale-95 uppercase tracking-widest"
            >
              Restart Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
}