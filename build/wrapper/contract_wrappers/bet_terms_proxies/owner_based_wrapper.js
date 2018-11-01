'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contracts = require('guesser-contracts');
var contract = require('truffle-contract');

var OwnerBasedTermsProxy = function () {
  function OwnerBasedTermsProxy(web3) {
    _classCallCheck(this, OwnerBasedTermsProxy);

    this.web3 = web3;
    this.OwnerBasedTermsProxy = contract(contracts.OwnerBased);
    this.instance = null;
  }

  _createClass(OwnerBasedTermsProxy, [{
    key: 'init',
    value: async function init() {
      try {
        await this.OwnerBasedTermsProxy.setProvider(this.web3.eth.currentProvider);
        this.instance = await this.OwnerBasedTermsProxy.deployed();
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
    key: 'paused',
    value: function paused() {
      return this.instance.paused.call();
    }
  }, {
    key: 'getTermsHash',
    value: function getTermsHash(content) {
      var hex = this.web3.utils.utf8ToHex(content);
      var bytesArr = [];
      bytesArr.push(hex);

      return this.instance.getTermsHash.call(bytesArr);
    }
  }, {
    key: 'betsNumber',
    value: function betsNumber() {
      return this.instance.betsNumber.call();
    }
  }, {
    key: 'setTermsHash',
    value: async function setTermsHash(hash, sender) {
      var bytesArr = [];
      bytesArr.push(hash);
      await this.instance.setTermsHash(bytesArr, { from: sender });
    }
  }]);

  return OwnerBasedTermsProxy;
}();

exports.default = OwnerBasedTermsProxy;