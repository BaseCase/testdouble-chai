function tdChai(testdouble) {
  var td = testdouble;

  return function(chai, utils) {
    utils.addProperty(chai.Assertion.prototype, "called", called_handler);
    utils.addMethod(chai.Assertion.prototype, "calledWith", called_with_handler);
    utils.addMethod(chai.Assertion.prototype, "calledTimes", called_times_handler);
    utils.addProperty(chai.Assertion.prototype, "calledOnce", called_once_handler);
    utils.addProperty(chai.Assertion.prototype, "calledTwice", called_twice_handler);  
    utils.addProperty(chai.Assertion.prototype, "calledThrice", called_thrice_handler);
    
    function called_handler () {
      assertSubjectCalled.call(this);
    }

    function assertSubjectCalled() { 
      const subject = this._obj;
      let verified = false;

      try {
        td.verify(subject.apply(subject, []), { ignoreExtraArgs: true });
        verified = true;       
      } catch(err) {
        if (/No test double invocation detected/.test(err.message)) {
          throw new Error(subject + " does not appear to be a testdouble object.");
        }
      }      

      this.assert(verified,
        `expected ${subject} to have been called, but it was not.`,
        `expected ${subject} not to have been called, but it was.`);
    }

    function called_with_handler(...expectedArguments) {
      assertSubjectCalledWithArgs.call(this, expectedArguments);
    }

    function assertSubjectCalledWithArgs(expectedArguments) {
      const subject = this._obj;
      let verified = false;

      try {
        td.verify(subject.apply(subject, expectedArguments), { ignoreExtraArgs: false });
        verified = true;
      } catch(err) {
        if (/No test double invocation detected/.test(err.message)) {
          throw new Error(subject + " does not appear to be a testdouble object.");
        }
      }
      
      const  { callCount, calls: [ { args: actual_args  } = { args: [] } ] } = td.explain(subject);
      const wasCalled = Boolean(callCount);
      
      const failure_message = `expected ${subject} to have been called with #{exp}, ` +
        (wasCalled ?  "but it received #{act}." : "but it was not called.");
      const inverted_failure_message = `expected ${subject} not to have been called with #{exp}, but it was.`;


      this.assert(verified,
        failure_message,
        inverted_failure_message,
        expectedArguments,
        actual_args,
        true);   
    }

    function called_times_handler(expectedCallCount) {
      assertSubjectCalledNTimes.call(this, expectedCallCount);
    }

    function called_once_handler() {
      assertSubjectCalledNTimes.call(this, 1);
    }

    function called_twice_handler() {
      assertSubjectCalledNTimes.call(this, 2);
    }

    function called_thrice_handler() {
      assertSubjectCalledNTimes.call(this, 3);
    }

    function assertSubjectCalledNTimes(expectedCallCount) {
      const subject = this._obj;
      let verified = false;

      try {
        td.verify(subject.apply(subject, []), { ignoreExtraArgs: true, times: expectedCallCount });
        verified = true;
      } catch(err) {
        if (/No test double invocation detected/.test(err.message)) {
          throw new Error(subject + " does not appear to be a testdouble object.");
        }
      }      

      const  { callCount: actualCallCount } = td.explain(subject);
      const wasCalled = Boolean(actualCallCount);

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
(function(root, name) {
  if (typeof module !== "undefined") {
    module.exports = tdChai;
  } else if (typeof define === "function") {
    define(name, [], function() {
      return {
        "default": tdChai
      };
    });
  } else {
    root[name] = tdChai;
  }
})(this, "testdouble-chai");
