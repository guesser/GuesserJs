const { expect } = require('chai');
const Web3 = require('web3');
const contracts = require('guesser-contracts');
const contract = require('truffle-contract');
let Guesser = require('../../build/').default;

Guesser = Guesser.default;

describe('Bet Registry testing', () => {
  let guesser;
  let web3;
  let accounts;
  let betHash;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);
    accounts = await web3.eth.getAccounts();

    guesser = new Guesser(web3);
    await guesser.init();
  });

  it('should set the proper bet kernel', async () => {
    const betKernelAddress = await guesser.contracts.betRegistry.betKernel();
    const betRegistryAddress = await guesser.contracts.betRegistry.address();

    await guesser.contracts.betRegistry.setBetKernel(betRegistryAddress, accounts[0]);
    expect(
      await guesser.contracts.betRegistry.betKernel(),
    ).to.be.equal(betRegistryAddress);

    await guesser.contracts.betRegistry.setBetKernel(betKernelAddress, accounts[0]);
  });

  it('should create a bet', async () => {
    const betKernelProxyAddress = await guesser.contracts.ERC20BetKernelProxy.address();
    const betPaymentsProxyAddress = await guesser.contracts.ERC20BetPaymentProxy.address();

    const dummyToken = contract(contracts.DummyToken);
    dummyToken.setProvider(web3.eth.currentProvider.host);
    const dummyTokenInstance = await dummyToken.new(
      'DummyToken',
      'DMT',
      10,
      10,
      { from: accounts[0] },
    );


    const betOracleProxyAddress = await guesser.contracts.betOwnerBasedOracle.address();
    const betTermsProxyAddress = await guesser.contracts.ownerBasedTermsProxy.address();
    // Here we should ask for the hash of the terms
    const betTermsHash = await guesser.contracts.ownerBasedTermsProxy.getTermsHash('');
    await guesser.contracts.ownerBasedTermsProxy.setTermsHash(
      await betTermsHash,
      accounts[0],
    );

    const title = web3.utils.asciiToHex('Hello world');

    betHash = await guesser.contracts.betRegistry.createBet(
      betKernelProxyAddress,
      betPaymentsProxyAddress,
      dummyTokenInstance.address,
      betOracleProxyAddress,
      betTermsProxyAddress,
      betTermsHash,
      title,
      accounts[0],
    );
    expect(
      await guesser.contracts.betRegistry.betExists(betHash),
    ).to.be.equal(true);

    expect(
      await guesser.contracts.betRegistry.getBetTitle(betHash),
    ).to.be.equal(title);
  });

  it('should allow to place a bet from a player', async () => {
    const playerBetHashCall = await guesser.contracts.betRegistry.getPlayerBetHash(
      betHash,
      accounts[0],
      0,
      1,
    );

    const playerBetHash = await guesser.contracts.betRegistry.insertPlayerBet(
      betHash,
      accounts[0],
      0,
      1,
      accounts[0],
    );

    const playerBetPrincipal = await guesser.contracts.betRegistry
      .getPlayerBetPrincipal(betHash, playerBetHash);

    const betPrincipal = await guesser.contracts.betRegistry
      .getTotalPrincipal(betHash);

    expect(
      playerBetHashCall,
    ).to.be.equal(playerBetHash);
    expect(
      playerBetPrincipal.toNumber(),
    ).to.be.equal(1);
    expect(
      betPrincipal.toNumber(),
    ).to.be.equal(0); // Not 1 because that should be handled by the proxy
  });

  it('should allow to set the title of an option', async () => {
    await guesser.contracts.betRegistry.setOptionTitle(
      betHash,
      0,
      'Option 1',
      accounts[0],
    );

    expect(
      await guesser.contracts.betRegistry.getOptionTitle(betHash, 0),
    ).to.be.equal('Option 1');
  });
});
