"use client";

import Image from "next/image";
import Board from "./Board";

export default function BreakOut() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 flex flex-col items-center justify-center p-4">

      <div className="mb-10 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Image 
            src={"/breakoutHeading.png"} 
            alt="breakoutheading" 
            width={700} // Increased size
            height={200} 
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        </div>
        
        <div className="flex items-center gap-3">
          
          <p className="text-sm text-neutral-500 font-light">
            Single-level skill challenge · Built for Monad
          </p>
        </div>
      </div>

      {/* Game Container - Expanded size */}
      <div className="relative group w-full max-w-6xl">
        {/* Decorative Glow behind the board */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-sm shadow-2xl">
          {/* Inner Frame */}
          <div className="rounded-xl border border-neutral-800/50 overflow-hidden bg-neutral-900/90 flex justify-center">
            <Board />
          </div>
        </div>

        {/* Footer info - Positioned closely to the board */}
        <div className="mt-6 flex justify-between items-center px-4">
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
              Mouse to move paddle
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500/50" />
              Physics Engine Active
            </div>
          </div>
          
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-bold">
            No RNG · Pure Skill
          </span>
        </div>
      </div>
    </div>
  );
}