/* eslint-env mocha */

var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;
var tdChai = require("../lib/testdouble-chai");
chai.use(tdChai(td));

describe("testdouble-chai", function () {
  beforeEach(function () {
    this.subject = td.function("dubs");
  });

  afterEach(function () {
    td.reset();
  });

  describe(".called", function () {
    it("passes if the given testdouble was called with no arguments", function () {
      this.subject();

      expect(this.subject).to.have.been.called;
    });

    it("passes if the given testdouble was called with any arguments", function () {
      this.subject("hi");

      expect(this.subject).to.have.been.called;
    });

    it("fails with an AssertionError if the testdouble was not called", function () {
      expect(() => { expect(this.subject).to.have.been.called; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
        "to have been called, but it was not.");
    });

    it("throws an exception if called on an object that isn't a testdouble", function () {
      const notATestDouble = function () {};
      notATestDouble();

      expect(() => { expect(notATestDouble).to.have.been.called; })
        .to.throw(Error, "function () {} does not appear to be a testdouble object.");
    });
  });

  describe(".called, in a negated assertion chain", function () {
    it("passes if the testdouble was not called", function () {
      expect(this.subject).not.to.have.been.called;
    });

    it("fails if the testdouble was called", function () {
      this.subject();

      expect(() => { expect(this.subject).not.to.have.been.called; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
        "not to have been called, but it was.");
    });
  });

  describe(".calledWith", function () {
    it("passes if the given testdouble was called with the given arguments", function () {
      this.subject("hi");

      expect(this.subject).to.have.been.calledWith("hi");
    });

    it("fails if the testdouble was not called", function () {
      expect(() => { expect(this.subject).to.have.been.calledWith("hi", "bye"); })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
        "to have been called with [ 'hi', 'bye' ], but it was not called.");
    });

    it("fails on expected/actual arguments mismatch, detailing the discrepancies", function () {
      this.subject("what");
      
      expect(() => { expect(this.subject).to.have.been.calledWith("hi", "bye"); })
        .to.throw(chai.assertionError, 'expected [test double for "dubs"] ' + 
        "to have been called with [ 'hi', 'bye' ], but it received [ 'what' ].");
    });
  });

  describe(".calledWith, in a negated assertion chain", function () {
    it("passes if the testdouble was not called with the given arguments", function () {
      this.subject("bye");

      expect(this.subject).not.to.have.been.calledWith("hi");
    });

    it("fails if the testdouble was called with the given arguments", function () {
      this.subject("bye");
   
      expect(() => { expect(this.subject).not.to.have.been.calledWith("bye"); })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
          "not to have been called with [ 'bye' ], but it was.");
    });
  });

  describe(".calledTimes", function () {
    it("passes if the test double was not called, with calledTimes(0)", function () {
      expect(this.subject).to.have.been.calledTimes(0);
    });

    it("passes if the test double was called once, with calledTimes(1)", function () {
      this.subject(1);

      expect(this.subject).to.have.been.calledTimes(1);
    });

    it("passes if the test double was called twice, with calledTimes(2)", function () {
      this.subject(1);
      this.subject(2);

      expect(this.subject).to.have.been.calledTimes(2);
    });

    it("fails if the test double was called less than specified", function () {
      this.subject(1);
  
      expect(() => { expect(this.subject).to.have.been.calledTimes(2); })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
          "to have been called 2 times, but it was called 1 time.");
    });

    it("fails if the test double was called more than specified", function () {
      this.subject(1);
      this.subject(2);
      this.subject(3);

      expect(() => { expect(this.subject).to.have.been.calledTimes(2); })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
          "to have been called 2 times, but it was called 3 times.");
    });

    it("fails if the test double was called at all, with calledTimes(0)", function () {
      this.subject(1);
      
      expect(() => { expect(this.subject).to.have.been.calledTimes(0); })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' +
          "not to have been called (to have been called zero times), " +
          "but it was called 1 time.");
    });
  });

  describe(".calledTimes, in a negated assertion chain", function () {
    it("passes if it is not called the specified number of times", function () {
      this.subject(1);

      expect(this.subject).not.to.have.been.calledTimes(3);
    });

    it("fails if it is called the specified number of times", function () {
      this.subject(1);
      this.subject(1);

      expect(() => { expect(this.subject).not.to.have.been.calledTimes(2); })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
          "not to have been called 2 times, but in fact it was.");
    });

    it("fails if it is not called when it is expected not to be called 0 times", function () {
      expect(() => {
        expect(this.subject).not.to.have.been.calledTimes(0);
      })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' +
          "to have been called (not to have been called 0 times), but in fact it was not called.");
    });
  });

  describe(".calledOnce", function () {
    it("passes when the test double is called exactly once", function () {
      this.subject(1);

      expect(this.subject).to.have.been.calledOnce;
    });

    it("fails when the test double is not called exactly once", function () {
      this.subject(1);
      this.subject(1);

      expect(() => { expect(this.subject).to.have.been.calledOnce; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] '+
          "to have been called 1 time, but it was called 2 times.");
    });
  });

  describe(".calledOnce, in a negated assertion chain", function () {
    it("fails when the test double is called exactly once", function () {
      this.subject(1);

      expect(() => { expect(this.subject).not.to.have.been.calledOnce; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' +
          "not to have been called 1 time, but in fact it was.");
    });

    it("passes when the test double is not called exactly once", function () {
      this.subject(1);
      this.subject(1);

      expect(this.subject).not.to.have.been.calledOnce;
    });
  });

  describe(".calledTwice", function () {
    it("passes when the test double is called exactly twice", function () {
      this.subject(1);
      this.subject(1);

      expect(this.subject).to.have.been.calledTwice;
    });

    it("fails when the test double is not called exactly twice", function () {
      this.subject(1);
      this.subject(1);
      this.subject(1);
      
      expect(() => { expect(this.subject).to.have.been.calledTwice; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
          "to have been called 2 times, but it was called 3 times.");
    });
  });

  describe(".calledTwice, in a negated assertion chain", function () {
    it("fails when the test double is called exactly twice", function () {
      this.subject(1);
      this.subject(1);

      expect(() => { expect(this.subject).not.to.have.been.calledTwice; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
          "not to have been called 2 times, but in fact it was.");
    });

    it("passes when the test double is not called exactly twice", function () {
      this.subject(1);

      expect(this.subject).not.to.have.been.calledTwice;
    });
  });

  describe(".calledThrice", function () {
    it("passes when the test double is called exactly three times", function () {
      this.subject(1);
      this.subject(1);
      this.subject(1);

      expect(this.subject).to.have.been.calledThrice;
    });

    it("fails when the test double is not called exactly three times", function () {
      this.subject(1);

      expect(() => { expect(this.subject).to.have.been.calledThrice; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' +
          "to have been called 3 times, but it was called 1 time.");
    });
  });

  describe(".calledThrice, in a negated assertion chain", function () {
    it("fails when the test double is called exactly three times", function () {
      this.subject(1);
      this.subject(1);
      this.subject(1);

      expect(() => { expect(this.subject).not.to.have.been.calledThrice; })
        .to.throw(chai.AssertionError, 'expected [test double for "dubs"] ' + 
          "not to have been called 3 times, but in fact it was.");
    });

    it("passes when the test double is not called exactly three times", function () {
      this.subject(1);
      this.subject(1);

      expect(this.subject).not.to.have.been.calledThrice;
    });
  });
});
