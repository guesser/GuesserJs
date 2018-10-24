const chai = require('chai');
const Web3 = require('web3');
let Guesser = require('../../build/').default;

Guesser = Guesser.default;

const { expect } = chai.expect;

describe('Guesser testing', () => {
  let web3;
  let guesser;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);

    guesser = new Guesser(web3);
    await guesser.init();
  });

  it('should get the proper web3 network', async () => {
    expect(
      await guesser.contracts.betRegistry.network(),
    ).to.be.equal('private');
  });
});
