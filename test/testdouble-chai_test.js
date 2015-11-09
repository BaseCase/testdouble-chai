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
        }).to.throw(chai.AssertionError, "AssertionError: Expected " +
                                         test_double +
                                         " to have been called but it was not.");
      });

      it("throws an exception if called on an object that isn't a testdouble");
    });
  });
});
