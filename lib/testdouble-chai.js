module.exports = function(testdouble) {
  var td = testdouble;

  return function(chai, utils) {
    utils.addProperty(chai.Assertion.prototype, "called", called_handler);
    utils.addMethod(chai.Assertion.prototype, "calledWith", called_handler);

    function called_handler() {
      var subject        = this._obj,
          expected_args  = [].slice.call(arguments),
          did_want_args  = display_diff = !!expected_args.length,
          actual_args    = [],
          verified       = false,
          last_call      = null,
          explanation;

      try {
        td.verify(subject.apply(subject, arguments));
        verified = true;
      } catch(err) {
        if (/No test double invocation detected/.test(err.message))
          throw new Error(subject + " does not appear to be a testdouble object.");

        explanation = td.explain(subject);
        if (explanation.callCount) {
          last_call = explanation.calls[0];
          actual_args = last_call.args;
        }
      }

      this.assert(verified,
                  failure_message(this._obj, did_want_args, !!last_call),
                  inverted_failure_message(subject, did_want_args, verified),
                  expected_args,
                  actual_args,
                  display_diff);
    }

    function failure_message(testdouble, did_want_args, was_called) {
      var with_args, but;

      with_args = did_want_args? " with #{exp}" : "";
      but = did_want_args?
        was_called? "but it received #{act}." : "but it was not called."
        : "but it was not.";

      return "expected " + testdouble +
             " to have been called" + with_args + ", " + but;
    }

    function inverted_failure_message(testdouble, did_want_args) {
      var with_args = did_want_args? " with #{exp}" : "";
      return "expected " + testdouble + " not to have been called"
             + with_args + ", but it was.";
    }
  }
};
