'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contracts = require('guesser-contracts');
var contract = require('truffle-contract');

var OwnerBasedOracle = function () {
  function OwnerBasedOracle(web3) {
    _classCallCheck(this, OwnerBasedOracle);

    this.web3 = web3;
    this.OwnerBasedOracle = contract(contracts.OwnerBasedOracle);
    this.instance = null;
  }

  _createClass(OwnerBasedOracle, [{
    key: 'init',
    value: async function init() {
      try {
        await this.OwnerBasedOracle.setProvider(this.web3.eth.currentProvider);
        this.instance = await this.OwnerBasedOracle.deployed();
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

  return OwnerBasedOracle;
}();

exports.default = OwnerBasedOracle;