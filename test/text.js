var expect = require('chai').expect
var text = require('../src/plugins/text/plugin.js')

describe('Text', () => {
    describe('#echo', () => {
        var regexp = text.echo.regexp
        it('should match expressions', (done) => {
            expect('echo hello world'.match(regexp)).to.be.ok
            expect('echo echo echo echo'.match(regexp)).to.be.ok
            expect('echo FOO'.match(regexp)).to.be.ok
            expect('echo .'.match(regexp)).to.be.ok
            expect('echo    bar'.match(regexp)).to.be.ok
            done()
        })
        it('should not match expressions', (done) => {
            expect('hello world'.match(regexp)).to.not.be.ok
            expect('echofoobar'.match(regexp)).to.not.be.ok
            expect('foo echo bar'.match(regexp)).to.not.be.ok
            expect('echo'.match(regexp)).to.not.be.ok
            expect('echo '.match(regexp)).to.not.be.ok
            expect('echo        '.match(regexp)).to.not.be.ok
            done()
        })
    })

    describe('#ping', () => {
        var regexp = text.ping.regexp
        it('should match expressions', (done) => {
            expect('ping'.match(regexp)).to.be.ok
            done()
        })
        it('should not match expressions', (done) => {
            expect('hello world'.match(regexp)).to.not.be.ok
            expect('pinger'.match(regexp)).to.not.be.ok
            expect('pong'.match(regexp)).to.not.be.ok
            expect('ping pong'.match(regexp)).to.not.be.ok
            expect('foo ping bar'.match(regexp)).to.not.be.ok
            expect('ping   '.match(regexp)).to.not.be.ok
            done()
        })
    })
})
