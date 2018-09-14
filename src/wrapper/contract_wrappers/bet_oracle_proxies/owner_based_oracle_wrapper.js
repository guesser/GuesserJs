const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class OwnerBasedOracle {
  constructor(web3) {
    this.web3 = web3;
    this.OwnerBasedOracle = contract(contracts.OwnerBasedOracle);
    this.OwnerBasedOracle.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.OwnerBasedOracle.deployed();
    } catch (err) {
      throw err;
    }
  }

  async network() {
    return this.web3.eth.net.getNetworkType();
  }

  async address() {
    return this.instance.address;
  }
}

module.exports = OwnerBasedOracle;
