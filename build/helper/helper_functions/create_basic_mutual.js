'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const CreateBasicMutual = (function () {
  function CreateBasicMutual() {
    _classCallCheck(this, CreateBasicMutual);

    this.contracts = null;
  }

  _createClass(CreateBasicMutual, [{
    key: 'init',
    value: async function init(contracts) {
      this.contracts = contracts;
    },
  }, {
    key: 'createBasicMutual',
    value: async function createBasicMutual(paymentToken, timeTerms, title, sender) {
      return this.contracts.betKernel.createBet(this.contracts.ERC20BetKernelProxy.address(), this.contracts.ERC20BetPaymentProxy.address(), paymentToken, this.contracts.ownerBasedOracle.address(), this.contracts.timeBasedTermsProxy.address(), timeTerms, title, sender);
    },
  }]);

  return CreateBasicMutual;
}());

exports.default = CreateBasicMutual;
