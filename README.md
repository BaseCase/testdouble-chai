# testdouble-chai

Like [sinon-chai](https://github.com/domenic/sinon-chai) but for [testdouble.js](https://github.com/testdouble/testdouble.js).

Will hopefully exist in the near future!

**Please note** this is not what I consider publicly usable yet. The README and code should be considered scratch work until I remove this disclaimer.


## TODO
- [ ] complete pending tests
- [ ] don't print expected/actual on simple .called checks
- [ ] refactor
- [ ] submit testdouble.js PR to support slotting this in (based on changes in fake_testdouble.js)
- [ ] make the README good
- [ ] add a LICENSE
- [ ] edit all the assertion error language to make it consistent
- [ ] update package.json to reflect reality
- [ ] figure out all the stuff you need for node installability and whatnot
- [ ] post in testdouble.js issue #41
- [ ] post in trying_testdouble issue #1
- [ ] update `require`s to point to regular testdouble instead of fake_testdouble
- [ ] support for multiple calls (e.g. `.calledTwice`) -- not sure what the syntax should be for this yet

## DONE
- [x] learn how verify() works
- [x] get this happening for `expect(dubs).to.have.been.called;`
- [x] clean up spiked code so it's ready for the rest of this
- [x] get this happening for `expect(dubs).to.have.been.calledWith("hi");`
- [x] fill out this list with the rest of the things we should support (e.g. multiple times in config, etc.)
