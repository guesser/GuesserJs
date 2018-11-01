'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contracts = require('guesser-contracts');
var contract = require('truffle-contract');

var BetOwnerBasedOracle = function () {
  function BetOwnerBasedOracle(web3) {
    _classCallCheck(this, BetOwnerBasedOracle);

    this.web3 = web3;
    this.BetOwnerBasedOracle = contract(contracts.BetOwnerBasedOracle);
    this.instance = null;
  }

  _createClass(BetOwnerBasedOracle, [{
    key: 'init',
    value: async function init() {
      try {
        await this.BetOwnerBasedOracle.setProvider(this.web3.eth.currentProvider);
        this.instance = await this.BetOwnerBasedOracle.deployed();
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
    key: 'outcomeReady',
    value: function outcomeReady(betHash) {
      return this.instance.outcomeReady.call(betHash);
    }
  }, {
    key: 'getOutcome',
    value: function getOutcome(betHash) {
      return this.instance.getOutcome.call(betHash);
    }
  }, {
    key: 'setOutcomeReady',
    value: async function setOutcomeReady(betHash, state, sender) {
      try {
        await this.instance.setOutcomeReady(betHash, state, { from: sender });
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'setOutcome',
    value: async function setOutcome(betHash, outcome, sender) {
      try {
        await this.instance.setOutcome(betHash, outcome, { from: sender });
      } catch (err) {
        throw err;
      }
    }
  }]);

  return BetOwnerBasedOracle;
}();

exports.default = BetOwnerBasedOracle;