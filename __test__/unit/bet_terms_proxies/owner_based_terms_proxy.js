const chai = require('chai');
const Web3 = require('web3');
const Guesser = require('../../../src/index');

const { expect } = chai;

describe('Owner Based Terms Proxy', () => {
  let guesser;
  let web3;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);

    guesser = new Guesser(web3);
    await guesser.init();
  });

  it('should be the same address as the proxy registry registry', async () => {
    const proxyAddress = await guesser.contracts.ownerBasedTermsProxy.address();

    expect(
      await guesser.contracts.proxyRegistry.addressInProxies(proxyAddress),
    ).to.be.equal(true);
  });
});
