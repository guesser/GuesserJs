'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contracts = require('guesser-contracts');
var contract = require('truffle-contract');

var ERC20BetPaymentProxy = function () {
  function ERC20BetPaymentProxy(web3) {
    _classCallCheck(this, ERC20BetPaymentProxy);

    this.web3 = web3;
    this.ERC20BetPaymentProxy = contract(contracts.ERC20PaymentProxy);
    this.instance = null;
  }

  _createClass(ERC20BetPaymentProxy, [{
    key: 'init',
    value: async function init() {
      try {
        await this.ERC20BetPaymentProxy.setProvider(this.web3.eth.currentProvider);
        this.instance = await this.ERC20BetPaymentProxy.deployed();
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'network',
    value: async function network() {
      return this.web3.eth.net.getNetworkType();
    }
  }, {
    key: 'address',
    value: function address() {
      return this.instance.address;
    }
  }]);

  return ERC20BetPaymentProxy;
}();

exports.default = ERC20BetPaymentProxy;