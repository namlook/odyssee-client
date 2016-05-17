'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducer = require('../../stores/RecordStore/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reducer2.default)({
  schema: {
    _id: 'string',
    participant: 'string',
    at: 'number',
    score: 'string'
  }
});