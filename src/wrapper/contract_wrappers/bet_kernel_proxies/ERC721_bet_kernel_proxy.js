const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class ERC721BetKernelProxy {
  constructor(web3) {
    this.web3 = web3;
    this.ERC721BetKernelProxy = contract(contracts.ERC721BetKernelProxy);
    this.ERC721BetKernelProxy.setProvider(this.web3.eth.currentProvider);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.ERC721BetKernelProxy.deployed();
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
