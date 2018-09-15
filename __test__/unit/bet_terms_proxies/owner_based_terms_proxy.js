const chai = require('chai');
const Web3 = require('web3');
const Guesser = require('../../../src/index');

const { expect } = chai;

describe('Owner Based Terms Proxy', () => {
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

  it('should be the same address as the proxy registry registry', async () => {
    const proxyAddress = await guesser.contracts.ownerBasedTermsProxy.address();

    expect(
      await guesser.contracts.proxyRegistry.addressInProxies(proxyAddress),
    ).to.be.equal(true);
  });

  it('should be able to create a bet terms', async () => {
    const betTermsNumber = await guesser.contracts.ownerBasedTermsProxy.betsNumber();
    const hash = await guesser.contracts.ownerBasedTermsProxy.getTermsHash();
    await guesser.contracts.ownerBasedTermsProxy.setTermsHash(
      hash,
      accounts[0],
    );

    const finalBetTermsNumber = await guesser.contracts.ownerBasedTermsProxy.betsNumber();
    expect(
      finalBetTermsNumber.toNumber(),
    ).to.be.equal(betTermsNumber.toNumber() + 1);
  });
});
