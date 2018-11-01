'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contracts = require('guesser-contracts');
var contract = require('truffle-contract');

var ProxyRegistry = function () {
  function ProxyRegistry(web3) {
    _classCallCheck(this, ProxyRegistry);

    this.web3 = web3;
    this.proxyRegistry = contract(contracts.ProxyRegistry);
    this.instance = null;
  }

  _createClass(ProxyRegistry, [{
    key: 'init',
    value: async function init() {
      try {
        await this.proxyRegistry.setProvider(this.web3.eth.currentProvider);
        this.instance = await this.proxyRegistry.deployed();
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
    key: 'setKernelProxiesAllowance',
    value: async function setKernelProxiesAllowance(address, allowance, sender) {
      try {
        await this.instance.setKernelProxiesAllowance(address, allowance, {
          from: sender,
          gas: 6385875
        });
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'setPaymentsProxiesAllowance',
    value: async function setPaymentsProxiesAllowance(address, allowance, sender) {
      try {
        await this.instance.setPaymentsProxiesAllowance(address, allowance, {
          from: sender,
          gas: 6385875
        });
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'setOracleProxiesAllowance',
    value: async function setOracleProxiesAllowance(address, allowance, sender) {
      try {
        await this.instance.setOracleProxiesAllowance(address, allowance, {
          from: sender,
          gas: 6385875
        });
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'setTermsProxiesAllowance',
    value: async function setTermsProxiesAllowance(address, allowance, sender) {
      try {
        await this.instance.setTermsProxiesAllowance(address, allowance, {
          from: sender,
          gas: 6385875
        });
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: 'addressInProxies',
    value: function addressInProxies(address) {
      return this.instance.addressInProxies.call(address);
    }
  }]);

  return ProxyRegistry;
}();

exports.default = ProxyRegistry;