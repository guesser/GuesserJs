const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class OwnerBasedTermsProxy {
  constructor(web3) {
    this.web3 = web3;
    this.OwnerBasedTermsProxy = contract(contracts.OwnerBased);
    this.OwnerBasedTermsProxy.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.OwnerBasedTermsProxy.deployed();
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

module.exports = OwnerBasedTermsProxy;
