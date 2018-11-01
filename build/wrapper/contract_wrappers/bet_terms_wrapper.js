'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contracts = require('guesser-contracts');
var contract = require('truffle-contract');

var BetTerms = function () {
  function BetTerms(web3) {
    _classCallCheck(this, BetTerms);

    this.web3 = web3;
    this.betTerms = contract(contracts.BetTerms);
    this.instance = null;
  }

  _createClass(BetTerms, [{
    key: 'init',
    value: async function init() {
      try {
        await this.betTerms.setProvider(this.web3.eth.currentProvider);
        this.instance = await this.betTerms.deployed();
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'network',
    value: function network() {
      return this.web3.eth.net.getNetworkType();
    }
  }, {
    key: 'address',
    value: function address() {
      return this.instance.address;
    }

    // Registry Setter

  }, {
    key: 'setBetRegistry',
    value: async function setBetRegistry(address, sender) {
      try {
        await this.instance.setBetRegistry(address, { from: sender });
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'betRegistry',
    value: function betRegistry() {
      return this.instance.betRegistry.call();
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this.instance.paused.call();
    }

    // Bet betTerms

  }, {
    key: 'participationPeriod',
    value: function participationPeriod(termsProxy, termsHash) {
      return this.instance.participationPeriod.call(termsProxy, termsHash);
    }
  }, {
    key: 'waitingPeriod',
    value: function waitingPeriod(termsProxy, termsHash) {
      return this.instance.waitingPeriod.call(termsProxy, termsHash);
    }
  }, {
    key: 'retrievingPeriod',
    value: function retrievingPeriod(termsProxy, termsHash) {
      return this.instance.retrievingPeriod.call(termsProxy, termsHash);
    }
  }, {
    key: 'finishedPeriod',
    value: function finishedPeriod(termsProxy, termsHash) {
      return this.instance.finishedPeriod.call(termsProxy, termsHash);
    }
  }, {
    key: 'changePeriod',
    value: async function changePeriod(termsProxy, termsHash, status, sender) {
      try {
        await this.instance.changePeriod(termsProxy, termsHash, status, { from: sender });
      } catch (err) {
        throw err;
      }
    }
  }]);

  return BetTerms;
}();

exports.default = BetTerms;