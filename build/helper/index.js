'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _create_basic_mutual = require('./helper_functions/create_basic_mutual');

var _create_basic_mutual2 = _interopRequireDefault(_create_basic_mutual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helpers = function () {
  function Helpers() {
    _classCallCheck(this, Helpers);

    this.contracts = null;
    this.createBasicMutual = new _create_basic_mutual2.default();
  }

  _createClass(Helpers, [{
    key: 'init',
    value: async function init(contracts) {
      this.contract = contracts;
      this.createBasicMutual.init(contracts);
    }
  }, {
    key: 'createBasicMutualBet',
    value: async function createBasicMutualBet(paymentToken, timeTerms, title, sender) {
      return this.createBasicMutual.createBasicMutual(paymentToken, timeTerms, title, sender);
    }
  }]);

  return Helpers;
}();

exports.default = Helpers;