const chai = require('chai');

const { expect } = chai.expect;
const Web3 = require('web3');
const Guesser = require('../../src/index');

describe('Bet Registry testing', () => {
  let guesser;
  let web3;
  let accounts;

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
});
