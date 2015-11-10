var td = require('./fake_testdouble');


module.exports = function(chai, utils) {
  addCalledProperty();
  addCalledWithMethod();

  function addCalledProperty() {
    utils.addProperty(chai.Assertion.prototype, "called", function() {
      var msg, inverse_msg, passed;

      try {
        td.verify(this._obj());
        passed = true;
        msg = "";
        inverse_msg = "expected " + this._obj + " not to be called, but it was.";
      } catch(err) {
        passed = false;
        msg = "expected " + err.info.testDouble + " to have been called but it was not.";
        inverse_msg = "";
      }

      this.assert(passed,         // did assertion pass?
                  msg,            // msg to show if it did not pass
                  inverse_msg);   // display instead of msg if negated chain
    });
  }


  function addCalledWithMethod() {
    utils.addMethod(chai.Assertion.prototype, "calledWith", function() {
      var msg, inverse_msg, passed, actual_args;

      try {
        td.verify(this._obj.apply(this._obj, arguments));
        passed = true;
        msg = "";
        inverse_msg = "expected " + this._obj + " not to be called with #{exp}, but it was.";
      } catch(err) {
        passed = false;
        msg = "expected " + this._obj + " to have been called with #{exp} but it received #{act}";
        inverse_msg = "";
        actual_args = err.info.calls[0].args;
      }

      this.assert(passed,                      // did assertion pass?
                  msg,                         // msg to show if it did not pass
                  inverse_msg,       // display instead of msg if negated chain
                  [].slice.call(arguments),    // expected value for diff display
                  actual_args,                 // actual value for diff display
                  true);                       // do display the fancy test runner diff
    });
  }
};
