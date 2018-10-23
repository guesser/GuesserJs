const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class BetTerms {
  constructor(web3) {
    this.web3 = web3;
    this.betTerms = contract(contracts.BetTerms);
    this.betTerms.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.betTerms.deployed();
    } catch (err) {
      throw err;
    }
  }

  network() {
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

  // Bet betTerms
  participationPeriod(termsProxy, termsHash) {
    return this.instance.participationPeriod.call(
      termsProxy,
      termsHash,
    );
  }

  waitingPeriod(termsProxy, termsHash) {
    return this.instance.waitingPeriod.call(termsProxy, termsHash);
  }

  retrievingPeriod(termsProxy, termsHash) {
    return this.instance.retrievingPeriod.call(termsProxy, termsHash);
  }

  finishedPeriod(termsProxy, termsHash) {
    return this.instance.finishedPeriod.call(termsProxy, termsHash);
  }

  async changePeriod(termsProxy, termsHash, status, sender) {
    try {
      await this.instance.changePeriod(
        termsProxy,
        termsHash,
        status,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BetTerms;
