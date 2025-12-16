import {network} from "hardhat";

const {ethers} = await network.connect();

async function main() {
    const MNCToken = await ethers.getContractFactory("MonarcToken");
    const monarc = await MNCToken.deploy();
    await monarc.waitForDeployment();

    console.log("Monarc Token to:", await monarc.getAddress());
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;   
})
