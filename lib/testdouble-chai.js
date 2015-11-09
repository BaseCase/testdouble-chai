var td = require('./fake_testdouble');
var util = require('util');

module.exports = (function() {
  return function(chai, utils) {
    utils.addProperty(chai.Assertion.prototype, "called", function() {
      var msg, passed;
      try {
        td.verify(this._obj());
        passed = true;
      } catch(e) {
        passed = false;
        //console.log('ohhh', e.testDouble, e.calls, e.expectedArgs, e.config);
        msg = "You didn't call it!";
      }
      this.assert(passed, msg);
    });
  }
})();
