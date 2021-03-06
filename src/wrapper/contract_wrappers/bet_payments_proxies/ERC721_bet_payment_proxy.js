const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class ERC721BetPaymentProxy {
  constructor(web3) {
    this.web3 = web3;
    this.ERC721BetPaymentProxy = contract(contracts.ERC721PaymentProxy);
    this.instance = null;
  }

  async init() {
    try {
      await this.ERC721BetPaymentProxy.setProvider(this.web3.eth.currentProvider);
      this.instance = await this.ERC721BetPaymentProxy.deployed();
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
