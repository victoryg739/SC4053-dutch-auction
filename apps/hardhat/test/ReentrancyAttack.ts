import { expect } from "chai";
import { ethers } from "hardhat";
import { DutchAuction, Attack } from "../typechain-types";

describe("DutchAuction Reentrancy Attack Test", function () {
  let auction: DutchAuction;
  let attack: Attack;
  let auctionCreator: any, attacker: any;

  beforeEach(async function () {
    [auctionCreator, attacker] = await ethers.getSigners();

    // Deploy the DutchAuction contract
    const DutchAuction = await ethers.getContractFactory("DutchAuction");
    auction = await DutchAuction.deploy(
      "Test Token", // token name
      "TT", // token symbol
      1000, // total token supply
      ethers.parseEther("1"), // start price (1 ETH per token)
      ethers.parseEther("0.5"), // reserved price (0.5 ETH per token)
      auctionCreator.address, // auction creator
    );
    await auction.waitForDeployment();

    // Deploy the Attack contract, targeting the DutchAuction contract
    const Attack = await ethers.getContractFactory("Attack");
    attack = await Attack.connect(attacker).deploy(auction.getAddress);
    await attack.deployed();
  });

  it("should prevent reentrancy attack on placeBid", async function () {
    // Fund the Attack contract with Ether
    await attacker.sendTransaction({
      to: attack.address,
      value: ethers.parseEther("1"), // 1 ETH
    });

    // Attempt to execute the attack by calling placeBid from the Attack contract
    await expect(
      attack.connect(attacker).executeAttack({ value: ethers.parseEther("1") }),
    ).to.be.revertedWith("Reentrant call detected");

    // Verify that the auction's total commitment remains correct
    const totalCommitment = await auction.getTotalCommitment();
    expect(totalCommitment).to.equal(ethers.parseEther("1")); // Should only include initial bid
  });

  it("should prevent reentrancy attack on distributeTokens", async function () {
    // Fast-forward time to end the auction
    await ethers.provider.send("evm_increaseTime", [20 * 60]); // 20 minutes
    await ethers.provider.send("evm_mine", []); // Mine a new block to apply time increase

    // Attempt to trigger distributeTokens from the Attack contract
    await expect(
      attack.connect(attacker).executeAttack({ value: ethers.parseEther("1") }),
    ).to.be.revertedWith("Auction not ended yet");

    // Call distributeTokens correctly and check tokens are distributed as expected
    await auction.connect(auctionCreator).distributeTokens();
    const tokensDistributed = await auction.getTokensDistributed();
    expect(tokensDistributed).to.be.true;
  });
});
