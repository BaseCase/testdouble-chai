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
                                         " to have been called, but it was not.");
      });

      it("throws an exception if called on an object that isn't a testdouble");
      it("counts it as called regardless of arguments");

      describe("in a negated chain", function() {
        it("can assert that the testdouble wasn't called", function() {
          var test_double = td.function("dubs");
          expect(test_double).not.to.have.been.called;
        });

        it("fails if you call the testdouble when you said you wouldn't", function() {
          var test_double = td.function("dubs");
          test_double();
          expect(function() {
            expect(test_double).not.to.have.been.called;
          }).to.throw(chai.AssertionError, "AssertionError: expected " +
                                            test_double +
                                            " not to have been called, but it was.");
        });
      });
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
                                         "[ \'hi\', \'bye\' ]," +
                                         " but it received " +
                                         "[ \'what\' ]");
      });

      it("throws an exception if called on an object that isn't a testdouble");

      describe("in a negated chain", function() {
        it("can assert that the testdouble wasn't called with given args", function() {
          var test_double = td.function("dubs");
          test_double("bye");
          expect(test_double).not.to.have.been.calledWith("hi");
        });

        it("fails if you call the testdouble with given args when you said you wouldn't", function() {
          var test_double = td.function("dubs");
          test_double("bye");
          expect(function() {
            expect(test_double).not.to.have.been.calledWith("bye");
          }).to.throw(chai.AssertionError, "AssertionError: expected " +
                                            test_double +
                                            " not to have been called with [ \'bye\' ], " +
                                            "but it was.");
        });
      });
    });
  });
});
