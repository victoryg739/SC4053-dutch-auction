## Metamask Setup
### Step 1: Open MetaMask Settings
1. Open MetaMask.
2. Click on the profile icon in the top right corner.
3. Go to Settings.


### Step 2: Add a Custom Network
1. In Settings, select Networks from the left sidebar.
2. Click on Add a network and then Add a network manually.


### Step 3: Configure Localhost Network
![image](https://github.com/user-attachments/assets/d4ac56f0-53b4-4e27-ab54-491dcc8db7d7)


Enter the following details in the fields:

	•	Network Name: Localhost 8545
	•	New RPC URL: http://localhost:8545/
	•	Chain ID: 1337
	•	Currency Symbol: ETH
	•	Block Explorer URL: Leave this blank (optional)


### Step 4: Save the Network
1. Click Save.
2. Your MetaMask is now connected to your local Hardhat network.


### Step 5: Switch to Localhost Network

1. Go back to the main MetaMask screen.
2. Select Localhost 8545 from the network dropdown menu.

## Project Setup
### Step 1: Install Dependencies

To get started, install the necessary Node.js packages by running this command in the project’s root directory:

npm install

### Step 2: Compile Smart Contracts

Once dependencies are installed, compile the smart contracts by executing:

npm run compile

### Step 3: Deploy Auction Factory Contract

1. Start the Local Hardhat Network
Begin by launching a local Hardhat network in the root of the project:
npm run node
2. Deploy to the Local Network
In a new terminal, deploy the Auction Factory contract to the local Hardhat network:
npm run deploy:local

### Step 4: Frontend Configuration and Launch

1. Set Environment Variable
After deployment, copy the Auction Factory contract address output. In the .env file, set the NEXT_PUBLIC_AUCTION_FACTORY_ADDRESS to this address:
NEXT_PUBLIC_AUCTION_FACTORY_ADDRESS=<your_auction_factory_address>
2. Start Frontend Server
Launch the frontend development server with:
npm run dev
3. Access the Application
Open http://localhost:3000/auctions in your browser to view the application.

### Step 5: Connect Your Wallet

To interact with the application:
•	Connect to your metamask wallet
•	Switch the wallet’s network to localhost to interact with the local Hardhat network.
