const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class BetOwnerBasedOracle {
  constructor(web3) {
    this.web3 = web3;
    this.BetOwnerBasedOracle = contract(contracts.BetOwnerBasedOracle);
    this.BetOwnerBasedOracle.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.BetOwnerBasedOracle.deployed();
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

  outcomeReady(betHash) {
    return this.instance.outcomeReady.call(betHash);
  }

  getOutcome(betHash) {
    return this.instance.getOutcome.call(betHash);
  }

  async setOutcomeReady(betHash, state, sender) {
    try {
      await this.instance.setOutcomeReady(
        betHash,
        state,
        { from: sender }
      );
    } catch (err) {
      throw err;
    }
  }

  async setOutcome(betHash, outcome, sender) {
    try {
      await this.instance.setOutcome(
        betHash,
        outcome,
        { from: sender }
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BetOwnerBasedOracle;
