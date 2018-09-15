const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class BetRegistry {
  constructor(web3) {
    this.web3 = web3;
    this.betRegistry = contract(contracts.BetRegistry);
    this.betRegistry.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.betRegistry.deployed();
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

  /** ****************
     * RegistryStorage
     **************** */

  // Getters
  betKernel() {
    return this.instance.betKernel.call();
  }

  betPayments() {
    return this.instance.betPayments.call();
  }

  betOracle() {
    return this.instance.betOracle.call();
  }

  betTerms() {
    return this.instance.betTerms.call();
  }

  proxyRegistry() {
    return this.instance.proxyRegistry.call();
  }

  // Setters
  async setBetKernel(address, sender) {
    try {
      await this.instance.setBetKernel(
        address,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  async setBetPayments(address, sender) {
    try {
      await this.instance.setBetPayments(
        address,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  async setBetOracle(address, sender) {
    try {
      await this.instance.setBetOracle(
        address,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  async setBetTerms(address, sender) {
    try {
      await this.instance.setBetTerms(
        address,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  /** ****************
     * Bet Registry
     **************** */
  async createBet(
    kernelProxy,
    paymentsProxy,
    paymentsToken,
    oracleProxy,
    termsProxy,
    termsHash,
    title,
    sender,
  ) {
    const salt = Math.random() * 9007199254740991; // Js max number
    try {
      const betHash = await this.instance.createBet.call(
        kernelProxy,
        paymentsProxy,
        paymentsToken,
        oracleProxy,
        termsProxy,
        termsHash,
        title,
        salt,
        { from: sender },
      );

      await this.instance.createBet(
        kernelProxy,
        paymentsProxy,
        paymentsToken,
        oracleProxy,
        termsProxy,
        termsHash,
        title,
        salt,
        { from: sender },
      );

      return betHash;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BetRegistry;
