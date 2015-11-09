var td = require('./fake_testdouble');


module.exports = function(chai, utils) {
  addCalledProperty();

  function addCalledProperty() {
    utils.addProperty(chai.Assertion.prototype, "called", function() {
      var msg, passed;

      try {
        td.verify(this._obj());
        passed = true;
        msg = "";
      } catch(err) {
        passed = false;
        msg = "Expected " + err.info.testDouble + " to have been called but it was not.";
      }

      this.assert(passed, msg);
    });
  }
};
