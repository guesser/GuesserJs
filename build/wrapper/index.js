'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bet_registry_wrapper = require('./contract_wrappers/bet_registry_wrapper');

var _bet_registry_wrapper2 = _interopRequireDefault(_bet_registry_wrapper);

var _proxy_registry_wrapper = require('./contract_wrappers/proxy_registry_wrapper');

var _proxy_registry_wrapper2 = _interopRequireDefault(_proxy_registry_wrapper);

var _registry_setter_wrapper = require('./contract_wrappers/registry_setter_wrapper');

var _registry_setter_wrapper2 = _interopRequireDefault(_registry_setter_wrapper);

var _bet_kernel_wrapper = require('./contract_wrappers/bet_kernel_wrapper');

var _bet_kernel_wrapper2 = _interopRequireDefault(_bet_kernel_wrapper);

var _bet_payments_wrapper = require('./contract_wrappers/bet_payments_wrapper');

var _bet_payments_wrapper2 = _interopRequireDefault(_bet_payments_wrapper);

var _bet_oracle_wrapper = require('./contract_wrappers/bet_oracle_wrapper');

var _bet_oracle_wrapper2 = _interopRequireDefault(_bet_oracle_wrapper);

var _bet_terms_wrapper = require('./contract_wrappers/bet_terms_wrapper');

var _bet_terms_wrapper2 = _interopRequireDefault(_bet_terms_wrapper);

var _ERC20_bet_kernel_proxy = require('./contract_wrappers/bet_kernel_proxies/ERC20_bet_kernel_proxy');

var _ERC20_bet_kernel_proxy2 = _interopRequireDefault(_ERC20_bet_kernel_proxy);

var _ERC721_bet_kernel_proxy = require('./contract_wrappers/bet_kernel_proxies/ERC721_bet_kernel_proxy');

var _ERC721_bet_kernel_proxy2 = _interopRequireDefault(_ERC721_bet_kernel_proxy);

var _ERC20_bet_payment_proxy = require('./contract_wrappers/bet_payments_proxies/ERC20_bet_payment_proxy');

var _ERC20_bet_payment_proxy2 = _interopRequireDefault(_ERC20_bet_payment_proxy);

var _ERC721_bet_payment_proxy = require('./contract_wrappers/bet_payments_proxies/ERC721_bet_payment_proxy');

var _ERC721_bet_payment_proxy2 = _interopRequireDefault(_ERC721_bet_payment_proxy);

var _bet_owner_based_oracle_wrapper = require('./contract_wrappers/bet_oracle_proxies/bet_owner_based_oracle_wrapper');

var _bet_owner_based_oracle_wrapper2 = _interopRequireDefault(_bet_owner_based_oracle_wrapper);

var _owner_based_oracle_wrapper = require('./contract_wrappers/bet_oracle_proxies/owner_based_oracle_wrapper');

var _owner_based_oracle_wrapper2 = _interopRequireDefault(_owner_based_oracle_wrapper);

var _owner_based_wrapper = require('./contract_wrappers/bet_terms_proxies/owner_based_wrapper');

var _owner_based_wrapper2 = _interopRequireDefault(_owner_based_wrapper);

var _time_based_terms_wrapper = require('./contract_wrappers/bet_terms_proxies/time_based_terms_wrapper');

var _time_based_terms_wrapper2 = _interopRequireDefault(_time_based_terms_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wrappers = function () {
  function Wrappers(web3) {
    _classCallCheck(this, Wrappers);

    this.web3 = web3;
    // Core Contracts
    this.betRegistry = new _bet_registry_wrapper2.default(web3);
    this.proxyRegistry = new _proxy_registry_wrapper2.default(web3);
    this.registrySetter = new _registry_setter_wrapper2.default(web3);
    this.betKernel = new _bet_kernel_wrapper2.default(web3);
    this.betPayments = new _bet_payments_wrapper2.default(web3);
    this.betOracle = new _bet_oracle_wrapper2.default(web3);
    this.betTerms = new _bet_terms_wrapper2.default(web3);

    // Proxy Contracts
    this.ERC20BetKernelProxy = new _ERC20_bet_kernel_proxy2.default(web3);
    this.ERC721BetKernelProxy = new _ERC721_bet_kernel_proxy2.default(web3);
    this.ERC20BetPaymentProxy = new _ERC20_bet_payment_proxy2.default(web3);
    this.ERC721BetPaymentProxy = new _ERC721_bet_payment_proxy2.default(web3);
    this.betOwnerBasedOracle = new _bet_owner_based_oracle_wrapper2.default(web3);
    this.ownerBasedOracle = new _owner_based_oracle_wrapper2.default(web3);
    this.ownerBasedTermsProxy = new _owner_based_wrapper2.default(web3);
    this.timeBasedTermsProxy = new _time_based_terms_wrapper2.default(web3);
  }

  _createClass(Wrappers, [{
    key: 'init',
    value: async function init() {
      // Core Contracts
      await this.betRegistry.init();
      await this.proxyRegistry.init();
      await this.registrySetter.init();
      await this.betKernel.init();
      await this.betPayments.init();
      await this.betOracle.init();
      await this.betTerms.init();

      // Proxy Contracts
      await this.ERC20BetKernelProxy.init();
      await this.ERC721BetKernelProxy.init();
      await this.ERC20BetPaymentProxy.init();
      await this.ERC721BetPaymentProxy.init();
      await this.betOwnerBasedOracle.init();
      await this.ownerBasedOracle.init();
      await this.ownerBasedTermsProxy.init();
      await this.timeBasedTermsProxy.init();
    }
  }]);

  return Wrappers;
}();

exports.default = Wrappers;