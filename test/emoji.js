var expect = require('chai').expect
var emoji = require('../src/plugins/emoji/plugin.js')

describe('Emoji', () => {
    describe('#bigger', () => {
        var regexp = emoji.bigger.regexp
        it('should match expressions', (done) => {
            expect('<:foo:1235783498>'.match(regexp)).to.be.ok
            expect(' <:bar:5555555555>'.match(regexp)).to.be.ok
            done()
        })
        it('should not match expressions', (done) => {
            expect(''.match(regexp)).to.not.be.ok
            expect('foobar'.match(regexp)).to.not.be.ok
            expect(':foobar:'.match(regexp)).to.not.be.ok
            expect(': hello:'.match(regexp)).to.not.be.ok
            expect('<:hello:12345> extra words'.match(regexp)).to.not.be.ok
            done()
        })
    })
})
