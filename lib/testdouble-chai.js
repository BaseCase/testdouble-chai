function tdChai(testdouble) {
  var td = testdouble;

  return function(chai, utils) {
    utils.addProperty(chai.Assertion.prototype, "called", called_handler);
    utils.addMethod(chai.Assertion.prototype, "calledWith", called_with_handler);

    function called_handler() {
      enact_expectation.call(this, {
        subject: this._obj,
        did_want_args: false,
        display_diff: false
      });
    }

    function called_with_handler() {
      enact_expectation.call(this, {
        subject: this._obj,
        expected_args: [].slice.call(arguments),
        did_want_args: true,
        display_diff: true
      });
    }


    function enact_expectation(opts) {
      var subject        = opts.subject,
          expected_args  = opts.expected_args,
          did_want_args  = opts.did_want_args,
          display_diff   = opts.display_diff,
          actual_args    = [],
          verified       = false,
          last_call      = null,
          explanation;

      try {
        td.verify(subject.apply(subject, expected_args), {ignoreExtraArgs: !did_want_args});
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
                  failure_message(subject, did_want_args, !!last_call),
                  inverted_failure_message(subject, did_want_args),
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
      return "expected " + testdouble + " not to have been called" +
             with_args + ", but it was.";
    }
  };
};

(function(root, name) {
  if (typeof module !== 'undefined') {
    module.exports = tdChai;
  } else if (typeof define === 'function') {
    define(name, [], function() {
      return {
        'default': tdChai
      };
    });
  } else {
    root[name] = tdChai;
  }
})(this, 'testdouble-chai');
