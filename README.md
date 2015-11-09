# testdouble-chai

Like [sinon-chai](https://github.com/domenic/sinon-chai) but for [testdouble.js](https://github.com/testdouble/testdouble.js).

Will hopefully exist in the near future!

**Please note** this is not what I consider publicly usable yet. The README and code should be considered scratch work until I remove this disclaimer.


## TODO
- [ ] clean up spiked code so it's ready for the rest of this
- [ ] get this happening for `expect(dubs).to.have.been.calledWith("hi");`
- [ ] submit testdouble.js PR to support slotting this in (based on changes in fake_testdouble.js)
- [ ] fill out this list with the rest of the things we should support (e.g. multiple times in config, etc.)
- [ ] make the README good
- [ ] add a LICENSE
- [ ] update package.json to reflect reality
- [ ] figure out all the stuff you need for node installability and whatnot
- [ ] post in testdouble.js issue #41
- [ ] post in trying_testdouble issue #1

## DONE
- [x] learn how verify() works
- [x] get this happening for `expect(dubs).to.have.been.called;`
