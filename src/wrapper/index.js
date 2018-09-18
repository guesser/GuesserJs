// Core Contracts
const BetRegistry = require('./contract_wrappers/bet_registry_wrapper.js');
const ProxyRegistry = require('./contract_wrappers/proxy_registry_wrapper.js');
const RegistrySetter = require('./contract_wrappers/registry_setter_wrapper.js');
const BetPayments = require('./contract_wrappers/bet_payments_wrapper.js');

// Proxy Contracts
const ERC20BetKernelProxy = require('./contract_wrappers/bet_kernel_proxies/ERC20_bet_kernel_proxy.js');
const ERC721BetKernelProxy = require('./contract_wrappers/bet_kernel_proxies/ERC721_bet_kernel_proxy.js');
const ERC20BetPaymentProxy = require('./contract_wrappers/bet_payments_proxies/ERC20_bet_payment_proxy.js');
const ERC721BetPaymentProxy = require('./contract_wrappers/bet_payments_proxies/ERC721_bet_payment_proxy.js');
const BetOwnerBasedOracle = require('./contract_wrappers/bet_oracle_proxies/bet_owner_based_oracle_wrapper.js');
const OwnerBasedOracle = require('./contract_wrappers/bet_oracle_proxies/owner_based_oracle_wrapper.js');
const OwnerBasedTermsProxy = require('./contract_wrappers/bet_terms_proxies/owner_based_wrapper.js');

class Wrappers {
  constructor(web3) {
    this.web3 = web3;
    // Core Contracts
    this.betRegistry = new BetRegistry(web3);
    this.proxyRegistry = new ProxyRegistry(web3);
    this.registrySetter = new RegistrySetter(web3);
    this.betPayments = new BetPayments(web3);

    // Proxy Contracts
    this.ERC20BetKernelProxy = new ERC20BetKernelProxy(web3);
    this.ERC721BetKernelProxy = new ERC721BetKernelProxy(web3);
    this.ERC20BetPaymentProxy = new ERC20BetPaymentProxy(web3);
    this.ERC721BetPaymentProxy = new ERC721BetPaymentProxy(web3);
    this.betOwnerBasedOracle = new BetOwnerBasedOracle(web3);
    this.ownerBasedOracle = new OwnerBasedOracle(web3);
    this.ownerBasedTermsProxy = new OwnerBasedTermsProxy(web3);
  }

  async init() {
    // Core Contracts
    await this.betRegistry.init();
    await this.proxyRegistry.init();
    await this.registrySetter.init();
    await this.betPayments.init();

    // Proxy Contracts
    await this.ERC20BetKernelProxy.init();
    await this.ERC721BetKernelProxy.init();
    await this.ERC20BetPaymentProxy.init();
    await this.ERC721BetPaymentProxy.init();
    await this.betOwnerBasedOracle.init();
    await this.ownerBasedOracle.init();
    await this.ownerBasedTermsProxy.init();
  }
}

module.exports = Wrappers;
