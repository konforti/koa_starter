const common = require('test/common');
const request = require('supertest').agent(common.app.listen());
const assert = require('assert');

describe('Get root', function() {
    it('should display success', function(done) {
        request
        .get('/')
        .expect(200, done);
    });
});

describe('Errors', function() {
    it('should return 404', function(done) {
        request.get('/urlThatDoesNotExist')
        .expect(404)
        .end(done);
    });
});
