const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class RegistrySetter {
  constructor(web3) {
    this.web3 = web3;
    this.registrySetter = contract(contracts.RegistrySetter);
    this.registrySetter.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.registrySetter.deployed();
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
}

module.exports = RegistrySetter;
