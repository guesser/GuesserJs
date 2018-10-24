const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

export default class BetPayments {
  constructor(web3) {
    this.web3 = web3;
    this.betPayments = contract(contracts.BetPayments);
    this.betPayments.setProvider(this.web3.eth.currentProvider);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.betPayments.deployed();
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

  allowance(paymentsProxy, token, owner, chosen) {
    return this.instance.allowance.call(paymentsProxy, token, owner, chosen);
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

  // Bet Payments

  async transferFrom(paymentsProxy, token, owner, to, profit, sender) {
    try {
      await this.instance.transferFrom(
        paymentsProxy,
        token,
        owner,
        to,
        profit,
        { from: sender, gas: 1000000 },
      );
    } catch (err) {
      throw err;
    }
  }

  async transfer(paymentsProxy, token, to, profit, sender) {
    try {
      await this.instance.transfer(
        paymentsProxy,
        token,
        to,
        profit,
        { from: sender, gas: 1000000 },
      );
    } catch (err) {
      throw err;
    }
  }

  balanceOf(paymentsProxy, token, address) {
    return this.instance.balanceOf.call(paymentsProxy, token, address);
  }
}
