import {network} from "hardhat";

const {ethers} = await network.connect();

async function main() {
    const MNCToken = await ethers.getContractFactory("MonarcToken");
    const monarc = await MNCToken.deploy();
    await monarc.waitForDeployment();

    console.log("Monarc Token to:", await monarc.getAddress());

    const tokenAddress = await monarc.getAddress();

    const GameManager = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManager.deploy(tokenAddress);
    await gameManager.waitForDeployment();

    const gameManagerAddress = await gameManager.getAddress();
    console.log("Game Manager deployed to:", gameManagerAddress);
    
    const tx = await monarc.transferOwnership(gameManagerAddress);
    await tx.wait();

    console.log("Ownership transferred to game manager");
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;   
})
