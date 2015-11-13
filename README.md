# testdouble-chai

This is a tiny library that adds `.called` and `.calledWith` assertions to
[chai](http://chaijs.com/) for use with
[testdouble.js](https://github.com/testdouble/testdouble.js). These assertions
can be used as syntactic sugar over the `testdouble.verify` function. Here are
some examples:

## Use

```javascript
it("can tell you if a testdouble object was called", function() {
  var td = testdouble.function();
  td();
  expect(td).to.have.been.called;  // instead of `verify(td)`!
});
```

or with arguments:

```javascript
it("can tell you if a testdouble object was called a certain way", function() {
  var td = testdouble.function();
  td("hi");
  expect(td).to.have.been.calledWith("hi");  // instead of `verify(td("hi"))`!
});
```

## Setup

After installing the library with `npm install --save-dev testdouble-chai`,
here's how to get chai to know about `testdouble-chai`:

```javascript
// at the top of a test file or in a test helper
var td = require("testdouble");
var chai = require("chai");
var tdChai = require("testdouble-chai");
chai.use(tdChai(td)); // make sure to call tdChai with td to inject the dependency
```

And you should be good to go! Check out `test/testdouble-chai_test.js` for an
exhaustive description of how this library behaves.
