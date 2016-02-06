var bm = require('../lib');

describe('Query', function() {
	before(function() {
		bm.configure({
			source: 'static'
		});
	});

	describe('isBusinessDay', function() {
		it('should return false on saturday', function() {
			return expect(bm.isBusinessDay('brazil', new Date(2016, 1, 6))).to.eventually.eql(false);
		});

		it('should return false on sunday', function() {
			return expect(bm.isBusinessDay('brazil', new Date(2016, 1, 7))).to.eventually.eql(false);
		});

		it('should return false on holidays', function() {
			return expect(bm.isBusinessDay('brazil', new Date(2016, 1, 8))).to.eventually.eql(false);
		});

		it('should return false on days with partial financial operation', function() {
			return expect(bm.isBusinessDay('brazil', new Date(2016, 11, 24))).to.eventually.eql(false);
		});
	});

	describe('nextBusinessDay', function() {
		it('should return the correct day', function() {
			return expect(bm.nextBusinessDay('brazil', new Date(2016, 1, 5))).to.eventually.eql(new Date(2016, 1, 10));
		});
	});
});

