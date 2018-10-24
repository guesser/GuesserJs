'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

const BetRegistry = (function () {
  function BetRegistry(web3) {
    _classCallCheck(this, BetRegistry);

    this.web3 = web3;
    this.betRegistry = contract(contracts.BetRegistry);
    this.betRegistry.setProvider(this.web3.eth.currentProvider);
    this.instance = null;
  }

  _createClass(BetRegistry, [{
    key: 'init',
    value: async function init() {
      try {
        this.instance = await this.betRegistry.deployed();
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

    /** ****************
       * RegistryStorage
       **************** */

    // Getters

  }, {
    key: 'betKernel',
    value: function betKernel() {
      return this.instance.betKernel.call();
    },
  }, {
    key: 'betPayments',
    value: function betPayments() {
      return this.instance.betPayments.call();
    },
  }, {
    key: 'betOracle',
    value: function betOracle() {
      return this.instance.betOracle.call();
    },
  }, {
    key: 'betTerms',
    value: function betTerms() {
      return this.instance.betTerms.call();
    },
  }, {
    key: 'proxyRegistry',
    value: function proxyRegistry() {
      return this.instance.proxyRegistry.call();
    },

    // Setters

  }, {
    key: 'setBetKernel',
    value: async function setBetKernel(address, sender) {
      try {
        await this.instance.setBetKernel(address, { from: sender });
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'setBetPayments',
    value: async function setBetPayments(address, sender) {
      try {
        await this.instance.setBetPayments(address, { from: sender });
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'setBetOracle',
    value: async function setBetOracle(address, sender) {
      try {
        await this.instance.setBetOracle(address, { from: sender });
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'setBetTerms',
    value: async function setBetTerms(address, sender) {
      try {
        await this.instance.setBetTerms(address, { from: sender });
      } catch (err) {
        throw err;
      }
    },

    /** ****************
       * Bet Registry
       **************** */

  }, {
    key: 'createBet',
    value: async function createBet(kernelProxy, paymentsProxy, paymentsToken, oracleProxy, termsProxy, termsHash, title, sender) {
      const salt = Math.random() * 9007199254740991; // Js max number
      try {
        const betHash = await this.instance.createBet.call(kernelProxy, paymentsProxy, paymentsToken, oracleProxy, termsProxy, termsHash, title, salt, { from: sender });

        await this.instance.createBet(kernelProxy, paymentsProxy, paymentsToken, oracleProxy, termsProxy, termsHash, title, salt, { from: sender });

        return betHash;
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'insertPlayerBet',
    value: async function insertPlayerBet(hash, player, option, number, sender) {
      try {
        const playerBetHash = this.instance.insertPlayerBet.call(hash, sender, option, number, { from: sender });
        await this.instance.insertPlayerBet(hash, sender, option, number, { from: sender });
        return playerBetHash;
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'addToOption',
    value: async function addToOption(hash, option, number, sender) {
      try {
        return await this.instance.addToOption(hash, option, number, { from: sender });
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'setPlayerBetReturned',
    value: async function setPlayerBetReturned(hash, playerBetHash, player) {
      try {
        return await this.instance.setPlayerBetReturned(hash, playerBetHash, player);
      } catch (err) {
        throw err;
      }
    },
  }, {
    key: 'setOptionTitle',
    value: async function setOptionTitle(hash, option, title, sender) {
      try {
        return await this.instance.setOptionTitle(hash, option, title, { from: sender });
      } catch (err) {
        throw err;
      }
    },

    // Getters

  }, {
    key: 'getPlayerBetHash',
    value: function getPlayerBetHash(hash, player, option, number) {
      return this.instance.getPlayerBetHash.call(hash, player, option, number);
    },
  }, {
    key: 'getBetKernelProxy',
    value: function getBetKernelProxy(hash) {
      return this.instance.getBetKernelProxy.call(hash);
    },
  }, {
    key: 'getBetPaymentsProxy',
    value: function getBetPaymentsProxy(hash) {
      return this.instance.getBetPaymentsProxy.call(hash);
    },
  }, {
    key: 'getBetOracleProxy',
    value: function getBetOracleProxy(hash) {
      return this.instance.getBetOracleProxy.call(hash);
    },
  }, {
    key: 'getBetTermsProxy',
    value: function getBetTermsProxy(hash) {
      return this.instance.getBetTermsProxy.call(hash);
    },
  }, {
    key: 'getBetPaymentsToken',
    value: function getBetPaymentsToken(hash) {
      return this.instance.getBetPaymentsToken.call(hash);
    },
  }, {
    key: 'getBetTermsHash',
    value: function getBetTermsHash(hash) {
      return this.instance.getBetTermsHash.call(hash);
    },
  }, {
    key: 'getBetTitle',
    value: function getBetTitle(hash) {
      return this.instance.getBetTitle.call(hash);
    },
  }, {
    key: 'getBetDatetime',
    value: function getBetDatetime(hash) {
      return this.instance.getBetDatetime.call(hash);
    },
  }, {
    key: 'getBetCreator',
    value: function getBetCreator(hash) {
      return this.instance.getBetCreator.call(hash);
    },
  }, {
    key: 'getTotalPrincipal',
    value: function getTotalPrincipal(hash) {
      return this.instance.getTotalPrincipal.call(hash);
    },
  }, {
    key: 'getTotalPrincipalInOption',
    value: function getTotalPrincipalInOption(hash, option) {
      return this.instance.getTotalPrincipalInOption.call(hash, option);
    },
  }, {
    key: 'getOptionTitle',
    value: function getOptionTitle(hash, option) {
      return this.instance.getOptionTitle.call(hash, option);
    },
  }, {
    key: 'getPlayerBetPlayer',
    value: function getPlayerBetPlayer(hash, playerBetHash) {
      return this.instance.getPlayerBetPlayer.call(hash, playerBetHash);
    },
  }, {
    key: 'getPlayerBetOption',
    value: function getPlayerBetOption(hash, playerBetHash) {
      return this.instance.getPlayerBetOption.call(hash, playerBetHash);
    },
  }, {
    key: 'getPlayerBetPrincipal',
    value: function getPlayerBetPrincipal(hash, playerBetHash) {
      return this.instance.getPlayerBetPrincipal.call(hash, playerBetHash);
    },
  }, {
    key: 'getPlayerBetReturned',
    value: function getPlayerBetReturned(hash, playerBetHash) {
      return this.instance.getPlayerBetReturned.call(hash, playerBetHash);
    },
  }, {
    key: 'betExists',
    value: function betExists(hash) {
      return this.instance.betExists.call(hash);
    },
  }, {
    key: 'playerBetExists',
    value: function playerBetExists(hash, playerBetHash) {
      return this.instance.playerBetExists.call(hash, playerBetHash);
    },
  }, {
    key: 'isAuthorised',
    value: function isAuthorised(sender) {
      return this.instance.isAuthorised.call(sender);
    },
  }]);

  return BetRegistry;
}());

exports.default = BetRegistry;
