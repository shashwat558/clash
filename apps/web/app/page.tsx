"use client"
import { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import {createWallet} from "thirdweb/wallets";
import { wrapFetchWithPayment } from "thirdweb/x402";

const client = createThirdwebClient({
  clientId: "c1a1e062dc8048ab04f1079deee88de2"
})



export default function Home() {
  const [message, setMessage] = useState("Click to pay");

  const payAndFetch = async () => {
    setMessage("Connecting wallet...");

    try {
      const wallet = createWallet("io.metamask");
      await wallet.connect({client});
      setMessage("Wallet connected - Paying...");

      const fetchPay = wrapFetchWithPayment(fetch, client, wallet);

      const res = await fetchPay("/api/play");

      const json = await res.json();
      setMessage("PAID SUCCESFULLY" + JSON.stringify(json, null, 2));
      
    } catch (error: any) {
      console.error(error)
      setMessage("ERROR: " + error.message)
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
    <button onClick={payAndFetch} className="border-2 py-1">Pay now</button>
     <pre style={{ marginTop: 16, background: "#111", color: "#0f0", padding: 12 }}>
                {message}
            </pre>
    </div>
  );
}
