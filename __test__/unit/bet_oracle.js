const { expect } = require('chai');
const Web3 = require('web3');
const contracts = require('guesser-contracts');
const contract = require('truffle-contract');
const Guesser = require('../../src/index');

describe('Bet Terms testing', () => {
  let guesser;
  let web3;
  let accounts;
  let termsHash;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);
    accounts = await web3.eth.getAccounts();

    guesser = new Guesser(web3);
    await guesser.init();
  });

  it('should tell that the outcome is not ready', async () => {
    expect(
      await guesser.contracts.betOracle.outcomeReady();
    ).to.be.equal(false);
  });
  it('shoud tell the outcome of the oracle', async () => {
    expect(
      await guesser.contracts.betOracle.getOutcome();
    ).to.be.equal(0);
  });
});
