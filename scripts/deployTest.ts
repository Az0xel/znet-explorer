import { ethers } from "hardhat";

async function main() {
    // Get the contract factory
    const TestContract = await ethers.getContractFactory("TestContract");
    console.log("Deploying TestContract...");
    
    // Deploy the contract
    const contract = await TestContract.deploy("Hello ZNET!");
    await contract.deployed();
    
    console.log(`TestContract deployed to: ${contract.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
}); 