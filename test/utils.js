var expect = require('chai').expect
var util = require('../src/plugins/util/plugin.js')

describe('Util', () => {
    describe('#help', () => {
        var regexp = util.help.regexp
        it('should match expressions', (done) => {
            expect('help'.match(regexp)).to.be.ok
            expect('help foo'.match(regexp)).to.be.ok
            expect('help bar'.match(regexp)).to.be.ok
            done()
        })
        it('should not match expressions', (done) => {
            expect(''.match(regexp)).to.not.be.ok
            expect('helpfoo'.match(regexp)).to.not.be.ok
            expect('foo help bar'.match(regexp)).to.not.be.ok
            expect('help foo bar'.match(regexp)).to.not.be.ok
            done()
        })
    })
    
    describe('#list', () => {
        var regexp = util.list.regexp
        it('should match expressions', (done) => {
            expect('list'.match(regexp)).to.be.ok
            expect('commands'.match(regexp)).to.be.ok
            done()
        })
        it('should not match expressions', (done) => {
            expect(''.match(regexp)).to.not.be.ok
            expect('list foo'.match(regexp)).to.not.be.ok
            expect('foo list bar'.match(regexp)).to.not.be.ok
            expect('help list bar'.match(regexp)).to.not.be.ok
            done()
        })
    })
})
