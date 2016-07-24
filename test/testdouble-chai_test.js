var td = require('testdouble');
var chai = require('chai');
var expect = chai.expect;
var tdChai = require('../lib/testdouble-chai');
chai.use(tdChai(td));


describe("testdouble-chai", function() {
  beforeEach(function() {
    this.subject = td.function("dubs");
  });

  afterEach(function() {
    td.reset();
  });

  describe(".called", function() {
    it("passes if the given testdouble was called with no arguments", function() {
      this.subject();
      expect(this.subject).to.have.been.called;
    });

    it("passes if the given testdouble was called with any arguments", function() {
      this.subject('hi');
      expect(this.subject).to.have.been.called;
    });

    it("fails with an AssertionError if the testdouble was not called", function() {
      expect(function() {
        expect(this.subject).to.have.been.called;
      }.bind(this))
      .to.throw(chai.AssertionError,
          "AssertionError: expected " +
          this.subject +
          " to have been called, but it was not.");
    });

    it("throws an exception if called on an object that isn't a testdouble", function() {
      var not_a_testdouble = function() {};
      not_a_testdouble();
      expect(function() {
        expect(not_a_testdouble).to.have.been.called;
      }.bind(this))
      .to.throw(Error, not_a_testdouble + " does not appear to be a testdouble object.");
    });

    describe("in a negated assertion chain", function() {
      it("passes if the testdouble was not called", function() {
        expect(this.subject).not.to.have.been.called;
      });

      it("fails if the testdouble was called", function() {
        this.subject();
        expect(function() {
          expect(this.subject).not.to.have.been.called;
        }.bind(this))
        .to.throw(chai.AssertionError,
            "AssertionError: expected " +
            this.subject +
            " not to have been called, but it was.");
      });
    });
  });


  describe(".calledWith", function() {
    it("passes if the given testdouble was called with the given arguments", function() {
      this.subject("hi");
      expect(this.subject).to.have.been.calledWith("hi");
    });

    it("fails if the testdouble was not called", function() {
      expect(function() {
        expect(this.subject).to.have.been.calledWith("hi", "bye");
      }.bind(this))
      .to.throw(chai.AssertionError,
          "AssertionError: expected " +
          this.subject +
          " to have been called with " +
          "[ \'hi\', \'bye\' ]," +
          " but it was not called.");
    });

    it("fails on expected/actual arguments mismatch, detailing the discrepancies", function() {
      this.subject("what");
      expect(function() {
        expect(this.subject).to.have.been.calledWith("hi", "bye");
      }.bind(this))
      .to.throw(chai.AssertionError,
          "AssertionError: expected " +
          this.subject +
          " to have been called with " +
          "[ \'hi\', \'bye\' ]," +
          " but it received " +
          "[ \'what\' ]");
    });


    describe("in a negated chain", function() {
      it("passes if the testdouble was not called with the given arguments", function() {
        this.subject("bye");
        expect(this.subject).not.to.have.been.calledWith("hi");
      });

      it("fails if the testdouble was called with the given arguments", function() {
        this.subject("bye");
        expect(function() {
          expect(this.subject).not.to.have.been.calledWith("bye");
        }.bind(this))
        .to.throw(chai.AssertionError,
            "AssertionError: expected " +
            this.subject +
            " not to have been called with [ \'bye\' ], " +
            "but it was.");
      });
    });
  });
});
