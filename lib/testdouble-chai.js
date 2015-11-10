var td = require('./fake_testdouble');


module.exports = function(chai, utils) {
  utils.addProperty(chai.Assertion.prototype, "called", called_handler);
  utils.addMethod(chai.Assertion.prototype, "calledWith", called_handler);

  function called_handler() {
    var msg, subject, inverse_msg, passed, last_call, expected_args, actual_args, wanted_args;

    subject = this._obj;
    expected_args = [].slice.call(arguments);
    wanted_args = !!expected_args.length;

    try {
      td.verify(subject.apply(subject, arguments));
      passed = true;
      msg = "";
      inverse_msg = expectation_message_for(subject, wanted_args, true);
    } catch(err) {
      if (!err.info)
        throw new Error(subject + " does not appear to be a testdouble object.");
      passed = false;
      last_call = err.info.calls[0];
      if (typeof last_call === "undefined")
        actual_args = [];
      else
        actual_args = last_call.args;
      msg = expectation_message_for(this._obj, wanted_args, false, !!last_call);
      inverse_msg = "";
    }

    this.assert(passed,                      // did assertion pass?
                msg,                         // msg to show if it did not pass
                inverse_msg,                 // display instead of msg if negated chain
                expected_args,               // expected value for diff display
                actual_args,                 // actual value for diff display
                wanted_args);                 // do display the fancy test runner diff
  }


  function expectation_message_for(testdouble, wanted_args, isInverted, wasCalled) {
    var inversion, withArgs, but;

    if (isInverted) {
      inversion = " not";
      but = "but it was."
    } else {
      inversion = "";
      but = wanted_args?
        wasCalled?
          "but it received #{act}." : "but it was not called."
        : "but it was not.";
    }
    withArgs = wanted_args? " with #{exp}" : "";

    return "expected " + testdouble + inversion +
           " to have been called" + withArgs + ", " +
           but;
  }
};
