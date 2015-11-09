var td = require('../lib/fake_testdouble');
var chai = require('chai');
var expect = chai.expect;
var tdChai = require('../lib/testdouble-chai');
chai.use(tdChai);

describe("testdouble-chai bidness", function() {
  it("lets you be all chai-ish instead of all verify()-ish", function() {
    var dubs = td.function("dubs funcs");
    dubs();
    expect(dubs).to.have.been.called;
  });

  it("fails ef you donae call et", function() {
    var dubs = td.function("dubs it up");
    // not calling dubs();
    expect(function() {
      expect(dubs).to.have.been.called;
    }).to.throw(chai.AssertionError);
  });
});
