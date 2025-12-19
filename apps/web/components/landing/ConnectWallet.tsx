"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [address] = useState("0x71C...392A");

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsConnected(!isConnected)}
      className="relative group flex items-center gap-3 px-6 py-3 bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(131,110,251,0.2)]"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

      <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-linear-to-br from-purple-500 to-blue-600 rounded-md p-1 shadow-lg">
        <Image 
          src="/monad.svg" 
          alt="Monad" 
          width={16} 
          height={16} 
          className="brightness-0 invert" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-start leading-none">
        <span className="text-[10px] font-bold text-purple-400 tracking-[0.2em] uppercase mb-1">
          {isConnected ? "Network: Monad" : "Web3 Identity"}
        </span>
        <span className="text-sm font-semibold text-neutral-100">
          {isConnected ? address : "Connect Wallet"}
        </span>
      </div>

      <div className="relative z-10 ml-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-neutral-600'}`} />
      </div>

      {/* Shine Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "linear" }}
        className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/5 to-transparent pointer-events-none"
      />
    </motion.button>
  );
}