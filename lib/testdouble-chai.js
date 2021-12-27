function tdChai (testdouble) {
  var td = testdouble;

  return function (chai, utils) {
    utils.addProperty(chai.Assertion.prototype, "called", calledHandler);
    utils.addMethod(chai.Assertion.prototype, "calledWith", calledWithHandler);
    utils.addMethod(chai.Assertion.prototype, "calledTimes", calledTimesHandler);
    utils.addProperty(chai.Assertion.prototype, "calledOnce", calledOnceHandler);
    utils.addProperty(chai.Assertion.prototype, "calledTwice", calledTwiceHandler);  
    utils.addProperty(chai.Assertion.prototype, "calledThrice", calledThriceHandler);
    
    function verify ({ subject, args, times }) {
      const options = { 
        ignoreExtraArgs: !args,  
        ... (typeof times === "undefined" ? {} : { times })
      };

      let verified = false;

      try {
        td.verify(subject.apply(subject, args || []), options);
        verified = true;
      } catch (err) {
        if (/No test double invocation detected/.test(err.message)) {
          throw new Error(subject + " does not appear to be a testdouble object.");
        }
      }
      
      const  { callCount: actualCallCount, calls: [ { args: actualArgs  } = { args: [] } ] } = td.explain(subject);
      const wasCalled = Boolean(actualCallCount);

      return { verified, wasCalled, actualCallCount, actualArgs };
    }


    function calledHandler () {
      const subject = this._obj;

      const { verified } = verify({ subject });
  
      this.assert(verified,
        `expected ${subject} to have been called, but it was not.`,
        `expected ${subject} not to have been called, but it was.`);
    }


    function calledWithHandler (...expectedArgs) {
      const subject = this._obj;
      const { verified, actualArgs, wasCalled } = verify({ subject, args: expectedArgs });
      
      const failure_message = `expected ${subject} to have been called with #{exp}, ` +
        (wasCalled ?  "but it received #{act}." : "but it was not called.");
      const inverted_failure_message = `expected ${subject} not to have been called with #{exp}, but it was.`;

      this.assert(verified,
        failure_message,
        inverted_failure_message,
        expectedArgs,
        actualArgs,
        true);   
    }

    function calledOnceHandler () {
      calledTimesHandler.call(this, 1);
    }

    function calledTwiceHandler () {
      calledTimesHandler.call(this, 2);
    }

    function calledThriceHandler () {
      calledTimesHandler.call(this, 3);
    }

    function calledTimesHandler (expectedCallCount) {
      const subject = this._obj;

      const { verified, actualCallCount, wasCalled } = verify({ subject, times: expectedCallCount });

      const failure_message = (expectedCallCount === 0 
        ? `expected ${subject} not to have been called (to have been called zero times), ` 
        : `expected ${subject} to have been called #{exp} ${expectedCallCount === 1 ? "time" : "times"}, `) + 
        ( wasCalled 
          ? `but it was called #{act} ${actualCallCount === 1 ? "time" : "times"}.`  
          : "but it was not called.");

      const inverted_failure_message = expectedCallCount === 0 
        ? `expected ${subject} to have been called (not to have been called 0 times), but in fact it was not called.`
        : (`expected ${subject} not to have been called #{exp} ${expectedCallCount === 1 ? "time" : "times"}, ` 
            + (wasCalled ? "but in fact it was." : "but in fact it was not called at all.")); 
 
      this.assert(verified,
        failure_message,
        inverted_failure_message,
        expectedCallCount,
        actualCallCount,
        false);  
    }
  };
}

/* global define */
(function (root, name) {
  if (typeof module !== "undefined") {
    module.exports = tdChai;
  } else if (typeof define === "function") {
    define(name, [], function () {
      return {
        "default": tdChai
      };
    });
  } else {
    root[name] = tdChai;
  }
})(this, "testdouble-chai");
