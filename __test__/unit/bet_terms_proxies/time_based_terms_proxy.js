const chai = require('chai');
const Web3 = require('web3');
const Guesser = require('../../../src/index');

const { expect } = chai;

describe('Time Based Terms Proxy', () => {
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
    const proxyAddress = await guesser.contracts.timeBasedTermsProxy.address();

    expect(
      await guesser.contracts.proxyRegistry.addressInProxies(proxyAddress),
    ).to.be.equal(true);
  });

  it('should be able to create a bet terms', async () => {
    let startTime = await web3.eth.getBlock(await web3.eth.getBlockNumber());
    startTime = await startTime.timestamp;
    var terms = [
      await guesser.contracts.timeBasedTermsProxy.uintToBytes32(startTime + (60 * 10)),
      await guesser.contracts.timeBasedTermsProxy.uintToBytes32(startTime + (60 * 20)),
      await guesser.contracts.timeBasedTermsProxy.uintToBytes32(startTime + (60 * 30))
    ];

    const termsHash = await guesser.contracts.timeBasedTermsProxy.getTermsHash(
      terms
    );
    let termsSet = await guesser.contracts.timeBasedTermsProxy.setTermsHash(
      terms,
      accounts[0],
    );
    expect(
      await termsSet,
    ).to.be.equal(true);
  });
});
