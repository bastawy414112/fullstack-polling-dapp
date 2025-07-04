#1. open folder hellosolidity inside hardhat_template folder

#2. cd into backend
cd backend

#3. make sure node is installed, validate the by checking version
npm -v

#4. install hardhat if not installed
npm install --save-dev hardhat

#5. do npm install
npm install

#6. compile smartcontracts, skip sudo on windows powershell
sudo npx hardhat compile

#7. create the blockchain node, skip sudo on windows powershell
sudo npx hardhat node

#8. split the new terminal window, skip sudo on windows powershell
sudo npx hardhat run scripts/deploy.js --network localhost

#9. now configure the metamask wallet and import accounts

#10. cd into frontend and copy the abi and contract address in contract.js from HelloSolidity.json
cd ..
cd frontend

#11. install react dependencies
npm install

#12. run the react side
npm start 

#==================== L2 Setup Instruction #====================

#1 move to folder outside fullstack-polling-dapp-L2 to checkout zkSync-local
git clone https://github.com/matter-labs/local-setup.git zkSync-local

#2 move inside zkSync-local
cd zkSync-local

#3 make sure you have docker installed
docker --version

#4 start local zksync instance
./start.sh

#5 move into pollingapp/backend to install dependencies
npm install --save-dev hardhat
npm install @nomicfoundation/hardhat-ethers 
npm install @matterlabs/hardhat-zksync-solc   
npm install @matterlabs/hardhat-zksync-deploy --save-dev 
npm install zksync-ethers
npm install

#6 start console to observe the activity on zkSyncLocal
sudo npx hardhat console --network zkSyncLocal

#7 Setup metamask wallet get info from log of ./start.sh or use
#network name: zkSync Local rpc: http://127.0.0.1:3050 chainId: 270  currency: ETH 
#rich wallets: https://github.com/matter-labs/local-setup/blob/main/rich-wallets.json
#for more info use
docker ps 


#8 update hardhat.config.js

#9 update deploy.js

#10 Deploy Your Contract Locally
sudo npx hardhat run scripts/deploy.js --network zkSyncLocal


#11 End the zksync instances
docker stop zksync-local-zksync-1 zksync-local-reth-1 zksync-local-postgres-1 zkcli-in-memory-node-zksync-1 buildx_buildkit_mybuilder0

#12 move inside frontend
npm install zksync-ethers

#13 update the contract.js for admin
#14 update the contract.js for voting



