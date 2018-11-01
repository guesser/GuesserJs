const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class BetOracle {
  constructor(web3) {
    this.web3 = web3;
    this.betOracle = contract(contracts.BetOracle);
    this.instance = null;
  }

  async init() {
    try {
      await this.betOracle.setProvider(this.web3.eth.currentProvider);
      this.instance = await this.betOracle.deployed();
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

  // Bet Oracle
  outcomeReady(proxy, betHash) {
    return this.instance.outcomeReady.call(proxy, betHash);
  }

  getOutcome(proxy, betHash) {
    return this.instance.getOutcome.call(proxy, betHash);
  }
}
