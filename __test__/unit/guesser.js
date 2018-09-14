const chai = require('chai');

const { expect } = chai.expect;
const Guesser = require('../../src/index');

describe('Guesser testing', () => {
  it('should get the proper web3 network', async () => {
    const guesser = new Guesser('http://localhost:8545');
    await guesser.init();
    expect(
      await guesser.contracts.betRegistry.network(),
    ).to.be.equal('private');
  });
});
