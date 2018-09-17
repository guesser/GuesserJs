const { expect } = require('chai');
const Web3 = require('web3');
const Guesser = require('../../src/index');

describe('Registry Setter testing', () => {
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

  it('should tell the proper default bet registry', async () => {
    const betRegistryAddress = await guesser.contracts.betRegistry.address();

    expect(
      await guesser.contracts.registrySetter.betRegistry(),
    ).to.be.equal(betRegistryAddress);
  });

  it('should allow to change the proxies allowance', async () => {
    const betRegistryAddress = await guesser.contracts.betRegistry.address();
    await guesser.contracts.registrySetter.setBetRegistry(betRegistryAddress, accounts[0]);
    expect(
      await guesser.contracts.registrySetter.betRegistry(),
    ).to.be.equal(betRegistryAddress);
  });
});
