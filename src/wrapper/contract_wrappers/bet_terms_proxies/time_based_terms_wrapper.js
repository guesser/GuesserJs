const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class TimeBasedTerms {
  constructor(web3) {
    this.web3 = web3;
    this.TimeBasedTermsProxy = contract(contracts.TimeBasedTerms);
    this.instance = null;
  }

  async init() {
    try {
      await this.TimeBasedTermsProxy.setProvider(this.web3.eth.currentProvider);
      this.instance = await this.TimeBasedTermsProxy.deployed();
    } catch (err) {
      throw err;
    }
  }

  async network() {
    return this.web3.eth.net.getNetworkType();
  }

  address() {
    return this.instance.address;
  }

  // Registry Setter
  async setBetRegistry(address, sender) {
    try {
      await this.instance.setBetRegistry(
        address,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  betRegistry() {
    return this.instance.betRegistry.call();
  }

  paused() {
    return this.instance.paused.call();
  }

  getTermsHash(content) {
    return this.instance.getTermsHash.call(content);
  }

  uintToBytes32(number) {
    return this.instance.uintToBytes32.call(number);
  }

  async setTermsHash(terms, sender) {
    const result = await this.instance.setTermsHash.call(
      terms,
      { from: sender },
    );
    await this.instance.setTermsHash(
      terms,
      { from: sender },
    );
    return result;
  }
}
