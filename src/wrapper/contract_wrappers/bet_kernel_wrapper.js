const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class BetKernel {
  constructor(web3) {
    this.web3 = web3;
    this.betKernel = contract(contracts.BetKernel);
    this.betKernel.setProvider(this.web3.eth.currentProvider);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.betKernel.deployed();
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

  // Registry Setter
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

  paused() {
    return this.instance.paused.call();
  }

  // Bet Kernel
  async createBet(
    kernelProxy,
    paymentsProxy,
    paymentsToken,
    oracleProxy,
    termsProxy,
    terms,
    title,
    sender,
  ) {
    const salt = Math.random() * 9007199254740991; // Js max number
    try {
      const betResult = await this.instance.createBet.call(
        kernelProxy,
        paymentsProxy,
        paymentsToken,
        oracleProxy,
        termsProxy,
        terms,
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
        terms,
        title,
        salt,
        { from: sender },
      );

      return betResult;
    } catch (err) {
      throw err;
    }
  }

  async placeBet(betHash, option, number, sender) {
    try {
      const playerBetHash = await this.instance.placeBet.call(
        betHash,
        option,
        number,
        { from: sender },
      );
      await this.instance.placeBet(
        betHash,
        option,
        number,
        { from: sender },
      );

      return playerBetHash;
    } catch (err) {
      throw err;
    }
  }

  async getProfits(betHash, playerBetHash, sender) {
    try {
      await this.instance.getProfits(
        betHash,
        playerBetHash,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }
}
