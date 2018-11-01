'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./wrapper/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./helper/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Guesser = function () {
  function Guesser(Web3) {
    _classCallCheck(this, Guesser);

    this.web3 = Web3;
    this.contracts = new _index2.default(this.web3);
    this.helper = new _index4.default();
  }

  _createClass(Guesser, [{
    key: 'init',
    value: async function init() {
      await this.contracts.init();
      await this.helper.init(this.contracts);
    }
  }]);

  return Guesser;
}();

exports.default = Guesser;