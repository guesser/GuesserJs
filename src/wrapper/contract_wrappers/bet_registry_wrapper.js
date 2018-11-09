const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class BetRegistry {
  constructor(web3) {
    this.web3 = web3;
    this.betRegistry = contract(contracts.BetRegistry);
    this.instance = null;
  }

  async init() {
    try {
      await this.betRegistry.setProvider(this.web3.eth.currentProvider);
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
        sender,
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
        sender,
        salt,
        { from: sender },
      );

      return betHash;
    } catch (err) {
      throw err;
    }
  }

  async insertPlayerBet(hash, player, option, number, sender) {
    try {
      const playerBetHash = this.instance.insertPlayerBet.call(
        hash,
        sender,
        option,
        number,
        { from: sender },
      );
      await this.instance.insertPlayerBet(
        hash,
        sender,
        option,
        number,
        { from: sender },
      );
      return playerBetHash;
    } catch (err) {
      throw err;
    }
  }

  async addToOption(hash, option, number, sender) {
    try {
      return await this.instance.addToOption(
        hash,
        option,
        number,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  async setPlayerBetReturned(hash, playerBetHash, player) {
    try {
      return await this.instance.setPlayerBetReturned(hash, playerBetHash, player);
    } catch (err) {
      throw err;
    }
  }

  async setOptionTitle(hash, option, title, sender) {
    try {
      return await this.instance.setOptionTitle(
        hash,
        option,
        title,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  // Getters
  getBetByIndex(index) {
    return this.instance.getBet.call(index);
  }

  getPlayerBetHash(hash, player, option, number) {
    return this.instance.getPlayerBetHash.call(
      hash,
      player,
      option,
      number,
    );
  }

  getBetKernelProxy(hash) {
    return this.instance.getBetKernelProxy.call(hash);
  }

  getBetPaymentsProxy(hash) {
    return this.instance.getBetPaymentsProxy.call(hash);
  }

  getBetOracleProxy(hash) {
    return this.instance.getBetOracleProxy.call(hash);
  }

  getBetTermsProxy(hash) {
    return this.instance.getBetTermsProxy.call(hash);
  }

  getBetPaymentsToken(hash) {
    return this.instance.getBetPaymentsToken.call(hash);
  }

  getBetTermsHash(hash) {
    return this.instance.getBetTermsHash.call(hash);
  }

  getBetTitle(hash) {
    return this.instance.getBetTitle.call(hash);
  }

  getBetDatetime(hash) {
    return this.instance.getBetDatetime.call(hash);
  }

  getBetCreator(hash) {
    return this.instance.getBetCreator.call(hash);
  }

  getTotalPrincipal(hash) {
    return this.instance.getTotalPrincipal.call(hash);
  }

  getTotalPrincipalInOption(hash, option) {
    return this.instance.getTotalPrincipalInOption.call(hash, option);
  }

  getOptionTitle(hash, option) {
    return this.instance.getOptionTitle.call(hash, option);
  }

  getPlayerBetPlayer(hash, playerBetHash) {
    return this.instance.getPlayerBetPlayer.call(hash, playerBetHash);
  }

  getPlayerBetOption(hash, playerBetHash) {
    return this.instance.getPlayerBetOption.call(hash, playerBetHash);
  }

  getPlayerBetPrincipal(hash, playerBetHash) {
    return this.instance.getPlayerBetPrincipal.call(hash, playerBetHash);
  }

  getPlayerBetReturned(hash, playerBetHash) {
    return this.instance.getPlayerBetReturned.call(hash, playerBetHash);
  }

  betExists(hash) {
    return this.instance.betExists(hash);
  }

  playerBetExists(hash, playerBetHash) {
    return this.instance.playerBetExists.call(hash, playerBetHash);
  }

  isAuthorised(sender) {
    return this.instance.isAuthorised.call(sender);
  }
}
