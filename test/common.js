const app = require('../index');
const request = require('supertest').agent(app.listen());
const should = require('should');

module.exports = {
    app,
    request,
    should,
};