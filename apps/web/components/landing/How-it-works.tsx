import React from "react";
import { Wallet, Gamepad2, Coins } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Wallet,
        title: "Connect & Pay",
        description: "Connect your wallet and pay a small USDC fee via x402 micropayment."
    },
    {
        number: "02",
        icon: Gamepad2,
        title: "Play Instantly",
        description: "Jump into a 30-second skill-based game with no delays or downloads."
    },
    {
        number: "03",
        icon: Coins,
        title: "Earn On-Chain",
        description: "Receive CLSH tokens as rewards, recorded permanently on Monad."
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-4">
                        How It Works
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-xl mx-auto">
                        Three steps to start earning. No complexity.
                    </p>
                </div>


                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <div 
                            key={step.number}
                            className="group relative"
                        >

                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-zinc-800 to-transparent z-0" />
                            )}
                            
                            <div className="relative bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-8 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80">
 
                                <span className="absolute top-6 right-6 text-sm font-mono text-zinc-700">
                                    {step.number}
                                </span>

                                <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6 transition-all group-hover:border-zinc-600 group-hover:bg-zinc-800/80">
                                    <step.icon className="w-5 h-5 text-zinc-400" />
                                </div>

                                <h3 className="text-xl font-medium text-zinc-100 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}