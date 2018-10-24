'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

const TimeBasedTerms = (function () {
  function TimeBasedTerms(web3) {
    _classCallCheck(this, TimeBasedTerms);

    this.web3 = web3;
    this.TimeBasedTermsProxy = contract(contracts.TimeBasedTerms);
    this.TimeBasedTermsProxy.setProvider(this.web3.eth.currentProvider);
    this.instance = null;
  }

  _createClass(TimeBasedTerms, [{
    key: 'init',
    value: async function init() {
      try {
        this.instance = await this.TimeBasedTermsProxy.deployed();
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'network',
    value: async function network() {
      return this.web3.eth.net.getNetworkType();
    },
  }, {
    key: 'address',
    value: function address() {
      return this.instance.address;
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
  }, {
    key: 'getTermsHash',
    value: function getTermsHash(content) {
      return this.instance.getTermsHash.call(content);
    },
  }, {
    key: 'uintToBytes32',
    value: function uintToBytes32(number) {
      return this.instance.uintToBytes32.call(number);
    },
  }, {
    key: 'setTermsHash',
    value: async function setTermsHash(terms, sender) {
      const result = await this.instance.setTermsHash.call(terms, { from: sender });
      await this.instance.setTermsHash(terms, { from: sender });
      return result;
    },
  }]);

  return TimeBasedTerms;
}());

exports.default = TimeBasedTerms;
