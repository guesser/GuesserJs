const { expect } = require('chai');
const Web3 = require('web3');
const contracts = require('guesser-contracts');
const contract = require('truffle-contract');
const Guesser = require('../../src/index');

describe('Bet Payments testing', () => {
  let guesser;
  let web3;
  let accounts;
  // let betHash;
  let dummyTokenInstance;

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
      await guesser.contracts.betPayments.betRegistry(),
    ).to.be.equal(betRegistryAddress);
  });

  it('should allow to change the proxies allowance', async () => {
    const betRegistryAddress = await guesser.contracts.betRegistry.address();
    await guesser.contracts.registrySetter.setBetRegistry(betRegistryAddress, accounts[0]);
    expect(
      await guesser.contracts.registrySetter.betRegistry(),
    ).to.be.equal(betRegistryAddress);
  });

  it('should tell the amount a player has', async () => {
    const creatorAmount = await guesser.contracts.betPayments.balanceOf(
      guesser.contracts.ERC20BetPaymentProxy.address(),
      dummyTokenInstance.address,
      accounts[1],
    );
    expect(
      creatorAmount.toNumber(),
    ).to.be.equal(5);
  });

  it('should allow to approve to other accounts', async () => {
    await dummyTokenInstance.approve(
      guesser.contracts.betPayments.address(),
      5,
      { from: accounts[1] },
    );

    const creatorAmount = await guesser.contracts.betPayments.allowance(
      guesser.contracts.ERC20BetPaymentProxy.address(),
      dummyTokenInstance.address,
      accounts[1],
      5,
    );

    expect(
      creatorAmount,
    ).to.be.equal(true);
  });

  it('should tell that the contract is already paused', async () => {
    expect(
      await guesser.contracts.betPayments.paused(),
    ).to.be.equal(true);
  });

  it('should allow transfering the tokens to the payments contract', async () => {
    await guesser.contracts.betPayments.transferFrom(
      guesser.contracts.ERC20BetPaymentProxy.address(),
      dummyTokenInstance.address,
      accounts[1],
      guesser.contracts.betPayments.address(),
      5,
      accounts[0],
    );

    const paymentsBalance = await dummyTokenInstance.balanceOf(
      guesser.contracts.betPayments.address(),
    );

    expect(
      paymentsBalance.toNumber(),
    ).to.be.equal(5);
  });

  it('should allow to transfer to other accounts', async () => {
    await guesser.contracts.betPayments.transfer(
      guesser.contracts.ERC20BetPaymentProxy.address(),
      dummyTokenInstance.address,
      accounts[3],
      5,
      accounts[0],
    );

    const winnerBalance = await dummyTokenInstance.balanceOf(accounts[3]);

    expect(
      winnerBalance.toNumber(),
    ).to.be.equal(5);
  });
});
