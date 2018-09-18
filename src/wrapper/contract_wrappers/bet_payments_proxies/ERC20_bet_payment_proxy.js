const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class ERC20BetPaymentProxy {
  constructor(web3) {
    this.web3 = web3;
    this.ERC20BetPaymentProxy = contract(contracts.ERC20PaymentProxy);
    this.ERC20BetPaymentProxy.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.ERC20BetPaymentProxy.deployed();
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
}

module.exports = ERC20BetPaymentProxy;
