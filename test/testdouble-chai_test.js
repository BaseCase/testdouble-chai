var td = require('../lib/fake_testdouble');
var chai = require('chai');
var expect = chai.expect;

var tdChai = require('../lib/testdouble-chai');
chai.use(tdChai);


describe("testdouble-chai", function() {
  beforeEach(function() {
    this.subject = td.function("dubs");
  });

  describe("using chai expect", function() {
    describe(".called", function() {
      it("is a property you can assert against in a chai expect chain", function() {
        this.subject();
        expect(this.subject).to.have.been.called;
      });

      it("will fail with an AssertionError if the testdouble was not called", function() {
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

      it("counts it as called regardless of arguments");


      describe("in a negated chain", function() {
        it("can assert that the testdouble wasn't called", function() {
          expect(this.subject).not.to.have.been.called;
        });

        it("fails if you call the testdouble when you said you wouldn't", function() {
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
      it("is a method in a chai expect chain that matches against function arguments", function() {
        this.subject("hi");
        expect(this.subject).to.have.been.calledWith("hi");
      });

      it("will fail on expected/actual arguments mismatch, detailing the discrepancies.", function() {
        // this is a pretty nasty assertion, but I wanted to make sure it captured the full error message
        // and don't want to pull in the actual chai string template functions to use here
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
        it("can assert that the testdouble wasn't called with given args", function() {
          this.subject("bye");
          expect(this.subject).not.to.have.been.calledWith("hi");
        });

        it("fails if you call the testdouble with given args when you said you wouldn't", function() {
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
});
