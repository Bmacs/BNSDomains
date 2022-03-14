const main = async () => {
    // use randomPerson to simulate a person changing a contract
    const [owner, superCoder] = await hre.ethers.getSigners();

    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("buds");
    await domainContract.deployed();

    console.log("Contract owner:", owner.address);

    let txn = await domainContract.register("a16z", {value: hre.ethers.utils.parseEther('1234')});
    await txn.wait();

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
    
    try {
      txn = await domainContract.connect(superCoder).withdraw();
      await txn.wait();
    }
    catch (error) {
      console.log("You suck for trying to rob the contract, and you failed at doing so too!")
    }
  
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  txn = await domainContract.connect(owner).withdraw()
  await txn.wait()

  // get balance of contract & owner

  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Owner balance after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
    

    // txn = await domainContract.connect(randomPerson).setRecord("bmacs", "I own bmacs now!");
    // await txn.wait();
};
  
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