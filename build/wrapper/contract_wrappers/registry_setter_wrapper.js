'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contracts = require('guesser-contracts');
var contract = require('truffle-contract');

var RegistrySetter = function () {
  function RegistrySetter(web3) {
    _classCallCheck(this, RegistrySetter);

    this.web3 = web3;
    this.registrySetter = contract(contracts.RegistrySetter);
    this.instance = null;
  }

  _createClass(RegistrySetter, [{
    key: 'init',
    value: async function init() {
      try {
        await this.registrySetter.setProvider(this.web3.eth.currentProvider);
        this.instance = await this.registrySetter.deployed();
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
  }]);

  return RegistrySetter;
}();

exports.default = RegistrySetter;