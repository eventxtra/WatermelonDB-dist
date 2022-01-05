"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.writer = writer;
exports.reader = reader;
exports.default = action;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

// Wraps function calls in `database.write(() => { ... })`. See docs for more details
// You can use this on Model subclass methods (or methods of any object that has a `database` property)
function writer(target, key, descriptor) {
  var actionName = "".concat(target.table, ".").concat(key);
  return (0, _extends2.default)({}, descriptor, {
    value: function value(...args) {
      var _this = this;

      return this.database.write(function () {
        return descriptor.value.apply(_this, args);
      }, actionName);
    }
  });
} // Wraps function calls in `database.read(() => { ... })`. See docs for more details
// You can use this on Model subclass methods (or methods of any object that has a `database` property)


function reader(target, key, descriptor) {
  var actionName = "".concat(target.table, ".").concat(key);
  return (0, _extends2.default)({}, descriptor, {
    value: function value(...args) {
      var _this2 = this;

      return this.database.read(function () {
        return descriptor.value.apply(_this2, args);
      }, actionName);
    }
  });
}

function action(target, key, descriptor) {
  var actionName = "".concat(target.table, ".").concat(key);
  return (0, _extends2.default)({}, descriptor, {
    value: function value(...args) {
      var _this3 = this;

      return this.database.action(function () {
        return descriptor.value.apply(_this3, args);
      }, actionName);
    }
  });
}