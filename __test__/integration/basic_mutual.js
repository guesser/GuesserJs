const { expect } = require('chai');
const Web3 = require('web3');
const contracts = require('guesser-contracts');
const contract = require('truffle-contract');
let Guesser = require('../../build/').default;

Guesser = Guesser.default;
console.log(Guesser);

describe('Basic Mutual Integration', () => {
  let guesser;
  let web3;
  let accounts;
  let betHash;
  let dummyTokenInstance;
  let playerBetHash1;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);
    accounts = await web3.eth.getAccounts();


    guesser = new Guesser(web3);
    await guesser.init();

    // Deploying the fake token
    const dummyToken = contract(contracts.DummyToken);
    dummyToken.setProvider(web3.eth.currentProvider.host);
    dummyTokenInstance = await dummyToken.new(
      'DummyToken',
      'DMT',
      10,
      15,
      { from: accounts[0] },
    );

    await dummyTokenInstance.setBalance(
      accounts[1],
      5,
      { from: accounts[0] },
    );

    await dummyTokenInstance.setBalance(
      accounts[2],
      5,
      { from: accounts[0] },
    );
  });

  it('should tell the proper default bet registry', async () => {
    const betRegistryAddress = await guesser.contracts.betRegistry.address();

    expect(
      await guesser.contracts.betKernel.betRegistry(),
    ).to.be.equal(betRegistryAddress);
  });

  it('should tell that the contract is already paused', async () => {
    expect(
      await guesser.contracts.betKernel.paused(),
    ).to.be.equal(true);
  });

  it('should allow to create mutual bets', async () => {
    const title = web3.utils.asciiToHex('Hello world');

    let startTime = await web3.eth.getBlock(await web3.eth.getBlockNumber());
    startTime = await startTime.timestamp;
    const terms = [
      await guesser.contracts.timeBasedTermsProxy.uintToBytes32(startTime + (60 * 10)),
      await guesser.contracts.timeBasedTermsProxy.uintToBytes32(startTime + (60 * 20)),
      await guesser.contracts.timeBasedTermsProxy.uintToBytes32(startTime + (60 * 30)),
    ];

    const betResult = await guesser.helper.createBasicMutualBet(
      dummyTokenInstance.address,
      terms,
      title,
      accounts[0],
    );

    betHash = betResult['0'];
  });

  it('should allow to place a bet from a user', async () => {
    await dummyTokenInstance.approve(
      guesser.contracts.betPayments.address(),
      5,
      { from: accounts[1] },
    );

    await dummyTokenInstance.approve(
      guesser.contracts.betPayments.address(),
      5,
      { from: accounts[2] },
    );

    await guesser.contracts.betRegistry.setOptionTitle(
      betHash,
      0,
      'Option1',
      accounts[0],
    );

    await guesser.contracts.betRegistry.setOptionTitle(
      betHash,
      1,
      'Option2',
      accounts[0],
    );

    playerBetHash1 = await guesser.contracts.betKernel.placeBet(
      betHash,
      0,
      1,
      accounts[1],
    );

    await guesser.contracts.betKernel.placeBet(
      betHash,
      1,
      1,
      accounts[2],
    );

    const betPrincipal = await guesser.contracts.betRegistry
      .getTotalPrincipal(betHash);

    expect(
      betPrincipal.toNumber(),
    ).to.be.equal(2);
  });

  it('should return the parameters of the player bet', async () => {
    const option = await guesser.contracts.betRegistry.getPlayerBetOption(
      betHash,
      playerBetHash1,
    );
    expect(
      option.toNumber(),
    ).to.be.equal(0);
    expect(
      await guesser.contracts.betRegistry.getPlayerBetPlayer(
        betHash,
        playerBetHash1,
      ),
    ).to.be.equal(accounts[1]);
  });
});
