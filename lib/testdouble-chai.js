var td = require('./fake_testdouble');


module.exports = function(chai, utils) {
  addCalledProperty();
  addCalledWithMethod();

  function addCalledProperty() {
    utils.addProperty(chai.Assertion.prototype, "called", function() {
      var msg, passed;

      try {
        td.verify(this._obj());
        passed = true;
        msg = "";
      } catch(err) {
        passed = false;
        msg = "expected " + err.info.testDouble + " to have been called but it was not.";
      }

      this.assert(passed, msg);
    });
  }


  function addCalledWithMethod() {
    utils.addMethod(chai.Assertion.prototype, "calledWith", function() {
      var msg, passed, actual_args;

      try {
        td.verify(this._obj.apply(this._obj, arguments));
        passed = true;
        msg = "";
      } catch(err) {
        passed = false;
        msg = "expected " + this._obj + " to have been called with #{exp} but it received #{act}";
        actual_args = err.info.calls[0].args;
      }

      this.assert(passed,                      // did assertion pass?
                  msg,                         // msg to show if it did not pass
                  "not implemented yet",       // display instead of msg if negated chain
                  [].slice.call(arguments),    // expected value for diff display
                  actual_args,                 // actual value for diff display
                  true);                       // do display the fancy test runner diff
    });
  }
};
