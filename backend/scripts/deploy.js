const { ethers } = require("hardhat");
const { Wallet, Provider } = require("zksync-ethers");
const { Deployer } = require("@matterlabs/hardhat-zksync-deploy");
const fs = require("fs/promises");

const privatekey =
  "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";

async function main() {
  const zkSyncProvider = new Provider(hre.network.config.url);
  const wallet = new Wallet(privatekey, zkSyncProvider);
  const deployer = new Deployer(hre, wallet);

  // Load the artifact
  const contractArtifactName = "SingleElectionVoting";
  const artifact = await deployer.loadArtifact(contractArtifactName);

  const contract = await deployer.deploy(artifact);
  const filename = "SingleElectionVoting.json";
  await writeDeploymentInfo(contract, artifact, filename);
  console.log(`Deployment details saved to ${filename}`);

  // Estimate the deployment fee
  /*const deploymentFee = await deployer.estimateDeployFee(contractArtifact);
  console.log("Estimated deployment cost:", deploymentFee);

  // Verify if the wallet has enough balance
  const walletBalance = await wallet.getBalance();
  if (walletBalance.lt(deploymentFee)) {
    throw new Error(
      `Insufficient balance. Required: ${ethers.formatEther(
        deploymentFee
      )} ETH, Available: ${ethers.formatEther(walletBalance)} ETH`
    );
  }*/
}

async function writeDeploymentInfo(contract, artifact, filename = "") {
  const data = {
    contract: {
      address: await contract.getAddress(), // Contract address
      abi: artifact.abi,
    },
  };

  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(filename, content, { encoding: "utf-8" });
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});
