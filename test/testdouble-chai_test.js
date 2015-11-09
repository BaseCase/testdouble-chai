var td = require('../lib/fake_testdouble');
var chai = require('chai');
var expect = chai.expect;

var tdChai = require('../lib/testdouble-chai');
chai.use(tdChai);


describe("testdouble-chai", function() {
  describe("using chai expect", function() {
    describe(".called", function() {
      it("is a property you can assert against in a chai expect chain", function() {
        var test_double = td.function("dubs");
        test_double();
        expect(test_double).to.have.been.called;
      });

      it("will fail with an AssertionError if the testdouble was not called", function() {
        var test_double = td.function("dubs");
        expect(function() {
          expect(test_double).to.have.been.called;
        }).to.throw(chai.AssertionError, "AssertionError: expected " +
                                         test_double +
                                         " to have been called but it was not.");
      });

      it("throws an exception if called on an object that isn't a testdouble");
      it("also works in a negated chain");
    });


    describe(".calledWith", function() {
      it("is a method in a chai expect chain that matches against function arguments", function() {
        var test_double = td.function("dubs");
        test_double("hi");
        expect(test_double).to.have.been.calledWith("hi");
      });

      it("will fail on expected/actual arguments mismatch, detailing the discrepancies.", function() {
        // this is a pretty nasty assertion, but I wanted to make sure it captured the full error message
        // and don't want to pull in the actual chai string template functions to use here
        var test_double = td.function("dubs");
        test_double("what");
        expect(function() {
          expect(test_double).to.have.been.calledWith("hi", "bye");
        }).to.throw(chai.AssertionError, "AssertionError: expected " +
                                         test_double +
                                         " to have been called with " +
                                         "[ \'hi\', \'bye\' ]" +
                                         " but it received " +
                                         "[ \'what\' ]");
      });

      it("throws an exception if called on an object that isn't a testdouble");
      it("also works in a negated chain");
    });
  });
});
