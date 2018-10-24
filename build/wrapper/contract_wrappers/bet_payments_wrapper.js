'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

const BetPayments = (function () {
  function BetPayments(web3) {
    _classCallCheck(this, BetPayments);

    this.web3 = web3;
    this.betPayments = contract(contracts.BetPayments);
    this.betPayments.setProvider(this.web3.eth.currentProvider);
    this.instance = null;
  }

  _createClass(BetPayments, [{
    key: 'init',
    value: async function init() {
      try {
        this.instance = await this.betPayments.deployed();
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'network',
    value: function network() {
      return this.web3.eth.net.getNetworkType();
    },
  }, {
    key: 'address',
    value: function address() {
      return this.instance.address;
    },
  }, {
    key: 'allowance',
    value: function allowance(paymentsProxy, token, owner, chosen) {
      return this.instance.allowance.call(paymentsProxy, token, owner, chosen);
    },

    // Registry Setter

  }, {
    key: 'setBetRegistry',
    value: async function setBetRegistry(address, sender) {
      try {
        await this.instance.setBetRegistry(address, { from: sender });
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'betRegistry',
    value: function betRegistry() {
      return this.instance.betRegistry.call();
    },
  }, {
    key: 'paused',
    value: function paused() {
      return this.instance.paused.call();
    },

    // Bet Payments

  }, {
    key: 'transferFrom',
    value: async function transferFrom(paymentsProxy, token, owner, to, profit, sender) {
      try {
        await this.instance.transferFrom(paymentsProxy, token, owner, to, profit, { from: sender, gas: 1000000 });
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'transfer',
    value: async function transfer(paymentsProxy, token, to, profit, sender) {
      try {
        await this.instance.transfer(paymentsProxy, token, to, profit, { from: sender, gas: 1000000 });
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'balanceOf',
    value: function balanceOf(paymentsProxy, token, address) {
      return this.instance.balanceOf.call(paymentsProxy, token, address);
    },
  }]);

  return BetPayments;
}());

exports.default = BetPayments;
