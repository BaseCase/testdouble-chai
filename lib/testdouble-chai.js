var td = require('./fake_testdouble');


module.exports = function(chai, utils) {
  utils.addMethod(chai.Assertion.prototype, "calledWith", calledHandler);
  utils.addProperty(chai.Assertion.prototype, "called", calledHandler);


  function calledHandler() {
    var msg, inverse_msg, passed, last_call, actual_args, wantedArgs;

    if ([].slice.call(arguments).length)
      wantedArgs = true;
    else
      wantedArgs = false;

    try {
      td.verify(this._obj.apply(this._obj, arguments));
      passed = true;
      msg = "";
      inverse_msg = expectationMessageFor(this._obj, wantedArgs, true);
    } catch(err) {
      if (!err.info)
        throw new Error(this._obj + " does not appear to be a testdouble object.");
      passed = false;
      last_call = err.info.calls[0];
      if (typeof last_call === "undefined")
        actual_args = [];
      else
        actual_args = last_call.args;
      msg = expectationMessageFor(this._obj, wantedArgs, false);
      inverse_msg = "";
    }

    this.assert(passed,                      // did assertion pass?
                msg,                         // msg to show if it did not pass
                inverse_msg,                 // display instead of msg if negated chain
                [].slice.call(arguments),    // expected value for diff display
                actual_args,                 // actual value for diff display
                true);                       // do display the fancy test runner diff
  }


  function expectationMessageFor(testdouble, wantedArgs, isInverted) {
    var inversion, withArgs, but;

    if (isInverted) {
      inversion = " not";
      but = "but it was."
    } else {
      inversion = "";
      but = wantedArgs? "but it received #{act}." : "but it was not.";
    }
    withArgs = wantedArgs? " with #{exp}" : "";

    return "expected " + testdouble + inversion +
           " to have been called" + withArgs + ", " +
           but;
  }
};
