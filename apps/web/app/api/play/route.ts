import { createThirdwebClient } from "thirdweb";
import { facilitator, settlePayment } from "thirdweb/x402";
import { monadTestnet } from "thirdweb/chains";
import { NextRequest, NextResponse } from "next/server";

const client = createThirdwebClient({
    secretKey: process.env.SECRET_KEY!
});

const thirdWebX402Facilitator = facilitator({
    client,
    serverWalletAddress: process.env.SERVER_WALLET!
})


const GAME_PRICE = "10";

export async function POST(req: NextRequest) {
    try {
        const paymentData = req.headers.get("x-payment");

        const result = await settlePayment({
            resourceUrl: "http://localhost:3000/api/play",
            method: "POST",
            paymentData,
            network: monadTestnet,
            price: GAME_PRICE,
            payTo: "",
            facilitator: thirdWebX402Facilitator
        });

        if(result.status === 200) {
            return NextResponse.json({
              success: true,
              message: "Payment verified. Game unlocked",
              sessionId: crypto.randomUUID(),
              tx: result.paymentReceipt
            })
        };

        return new NextResponse(
            JSON.stringify(result.responseBody),
            {
                status: result.status,
                headers: {"Content-Type": "application/json", ...(result.responseHeaders || {})}
            }
        );
        
} catch(error) {
    console.error(error);
    return new NextResponse(
            JSON.stringify({ error: "server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
}
}