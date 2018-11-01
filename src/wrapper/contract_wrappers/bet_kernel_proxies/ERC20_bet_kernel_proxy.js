const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class ERC20BetKernelProxy {
  constructor(web3) {
    this.web3 = web3;
    this.ERC20BetKernelProxy = contract(contracts.ERC20BetKernelProxy);
    this.instance = null;
  }

  async init() {
    try {
      await this.ERC20BetKernelProxy.setProvider(this.web3.eth.currentProvider);
      this.instance = await this.ERC20BetKernelProxy.deployed();
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
