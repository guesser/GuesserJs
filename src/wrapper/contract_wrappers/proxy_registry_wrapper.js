const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class ProxyRegistry {
  constructor(web3) {
    this.web3 = web3;
    this.proxyRegistry = contract(contracts.ProxyRegistry);
    this.proxyRegistry.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.proxyRegistry.deployed();
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

  async setKernelProxiesAllowance(address, allowance, sender) {
    try {
      await this.instance.setKernelProxiesAllowance(
        address,
        allowance,
        {
          from: sender,
          gas: 6385875,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async setPaymentsProxiesAllowance(address, allowance, sender) {
    try {
      await this.instance.setPaymentsProxiesAllowance(
        address,
        allowance,
        {
          from: sender,
          gas: 6385875,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async setOracleProxiesAllowance(address, allowance, sender) {
    try {
      await this.instance.setOracleProxiesAllowance(
        address,
        allowance,
        {
          from: sender,
          gas: 6385875,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async setTermsProxiesAllowance(address, allowance, sender) {
    try {
      await this.instance.setTermsProxiesAllowance(
        address,
        allowance,
        {
          from: sender,
          gas: 6385875,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  addressInProxies(address) {
    return this.instance.addressInProxies.call(
      address,
    );
  }
}

module.exports = ProxyRegistry;
