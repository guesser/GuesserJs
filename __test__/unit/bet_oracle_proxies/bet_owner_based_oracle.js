// const chai = require('chai');

// const expect = chai.expect;
const Web3 = require('web3');
const Guesser = require('../../../src/index');

describe('Bet Owner Based Oracle Proxy', () => {
  let guesser;
  let web3;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);

    guesser = new Guesser(web3);
    await guesser.init();
  });

  it('should be the same address as the proxy registry registry', async () => {
    await guesser.contracts.betOwnerBasedOracle.address();
  });
});
