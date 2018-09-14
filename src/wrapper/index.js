// Core Contracts
const BetRegistry = require('./contract_wrappers/bet_registry_wrapper.js');

// Proxy Contracts
const ERC20BetKernelProxy = require('./contract_wrappers/bet_kernel_proxies/ERC20_bet_kernel_proxy.js');
const ERC721BetKernelProxy = require('./contract_wrappers/bet_kernel_proxies/ERC721_bet_kernel_proxy.js');
const ERC20BetPaymentProxy = require('./contract_wrappers/bet_payments_proxies/ERC20_bet_payment_proxy.js');
const ERC721BetPaymentProxy = require('./contract_wrappers/bet_payments_proxies/ERC721_bet_payment_proxy.js');

class Wrappers {
  constructor(web3) {
    this.web3 = web3;
    // Core Contracts
    this.betRegistry = new BetRegistry(web3);

    // Proxy Contracts
    this.ERC20BetKernelProxy = new ERC20BetKernelProxy(web3);
    this.ERC721BetKernelProxy = new ERC721BetKernelProxy(web3);
    this.ERC20BetPaymentProxy = new ERC20BetPaymentProxy(web3);
    this.ERC721BetPaymentProxy = new ERC721BetPaymentProxy(web3);
  }

  async init() {
    // Core Contracts
    await this.betRegistry.init();

    // Proxy Contracts
    await this.ERC20BetKernelProxy.init();
    await this.ERC721BetKernelProxy.init();
    await this.ERC20BetPaymentProxy.init();
    await this.ERC721BetPaymentProxy.init();
  }
}

module.exports = Wrappers;
