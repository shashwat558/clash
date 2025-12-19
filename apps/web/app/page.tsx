"use client"
// import { useState } from "react";
// import { createThirdwebClient } from "thirdweb";
// import {createWallet} from "thirdweb/wallets";
// import { wrapFetchWithPayment } from "thirdweb/x402";

// const client = createThirdwebClient({
//   clientId: ""
// })



// export default function Home() {
//   const [message, setMessage] = useState("Click to pay");

//   const payAndFetch = async () => {
//     setMessage("Connecting wallet...");

//     try {
//       const wallet = createWallet("io.metamask");
//       await wallet.connect({client});
//       setMessage("Wallet connected - Paying...");

//       const fetchPay = wrapFetchWithPayment(fetch, client, wallet);

//       const res = await fetchPay("/api/play");

//       const json = await res.json();
//       setMessage("PAID SUCCESFULLY" + JSON.stringify(json, null, 2));
      
//     } catch (error: any) {
//       console.error(error)
//       setMessage("ERROR: " + error.message)
//     }
//   }
//   return (
//     <div className="w-screen h-screen flex flex-col justify-center items-center">
//     <button onClick={payAndFetch} className="border-2 py-1">Pay now</button>
//      <pre style={{ marginTop: 16, background: "#111", color: "#0f0", padding: 12 }}>
//                 {message}
//             </pre>
//     </div>
//   );
// }


import Link from "next/link"




import HowItWorks from "../components/landing/How-it-works"
import { Footer } from "../components/landing/Footer"
import { Header } from "../components/landing/Header"
// import {Button} from "@repo/ui";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              On-chain arcade. Real rewards.
            </div>
            <h1 className="mb-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Play fast. Pay once. Earn on-chain.
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Monarc is a skill-based arcade powered by Monad and HTTP-native micropayments.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* <Button size="lg" asChild>
                <Link href="/games">View Games</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button> */}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Technology Section */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-24">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight">Built on Modern Infrastructure</h2>
              <p className="text-muted-foreground">Production-grade technology stack</p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6">
                <div className="text-sm font-medium">Monad Testnet</div>
                <div className="text-xs text-muted-foreground">L1 Blockchain</div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6">
                <div className="text-sm font-medium">x402 Payments</div>
                <div className="text-xs text-muted-foreground">Micropayments</div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6">
                <div className="text-sm font-medium">Thirdweb</div>
                <div className="text-xs text-muted-foreground">Web3 SDK</div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6">
                <div className="text-sm font-medium">Smart Contracts</div>
                <div className="text-xs text-muted-foreground">EVM Compatible</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
