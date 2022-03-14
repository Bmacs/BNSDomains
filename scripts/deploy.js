const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("buds");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
      let txn = await domainContract.register("bmacs",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    console.log("Minted domain bmacs.buds");
  
    txn = await domainContract.setRecord("bmacs", "Am I a bmacs or am I bud??");
    await txn.wait();
    console.log("Set record for bmacs.buds");
  
    const address = await domainContract.getAddress("buds");
    console.log("Owner of domain bmacs:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();