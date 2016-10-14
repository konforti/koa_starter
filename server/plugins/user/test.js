const common = require('test/common');
const request = require('supertest').agent(common.app.listen());

describe('Get current user', function() {
    it('should display success', function(done) {
        request
        .get('/account')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI1NzVlODRiZjBiMGM0N2IwNDA5ZDEzMDciLCJpYXQiOjE0NjY1MDI0NDd9.Bk1tk9Z4sQLTh9R1M4BMWmTh6rPmXTR0EAgKnRMEZCE')
        .expect(200, done);
    });

    it('Should return 401', function(done) {
        request
        .get('/account')
        .expect(401, done)
    });
});

describe('Get user by phone', function() {
    it('should display success', function(done) {
        request
        .get('/user/972528834404')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI1NzVlODRiZjBiMGM0N2IwNDA5ZDEzMDciLCJpYXQiOjE0NjY1MDI0NDd9.Bk1tk9Z4sQLTh9R1M4BMWmTh6rPmXTR0EAgKnRMEZCE')
        .expect(200, done);
    });

    it('Should return 401', function(done) {
        request
        .get('/user/972528834404')
        .expect(401, done)
    });
});


