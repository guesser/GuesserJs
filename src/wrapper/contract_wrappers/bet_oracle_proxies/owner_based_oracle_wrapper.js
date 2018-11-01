const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class OwnerBasedOracle {
  constructor(web3) {
    this.web3 = web3;
    this.OwnerBasedOracle = contract(contracts.OwnerBasedOracle);
    this.instance = null;
  }

  async init() {
    try {
      await this.OwnerBasedOracle.setProvider(this.web3.eth.currentProvider);
      this.instance = await this.OwnerBasedOracle.deployed();
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
        { from: sender },
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
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }
}
