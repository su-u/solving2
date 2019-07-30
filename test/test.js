const assert = require('assert');
const request = require('supertest');
const app = require('../api/app');
const expect = require('expect');

describe('Calltest', function (done) {
    it('/', function (done) {
        request(app)
            .get('/')
            .expect(302)
            .end(done);
    });
    it('/index.html', function (done) {
        request(app)
            .get('/index.html')
            .expect(200)
            .end(done);
    });
    it('/aaaa', function (done) {
        request(app)
            .get('/aaaa')
            .expect(404, {
                status: 404,
                message: 'Not Found',
                response: ''
            }, done);
    });
    it('/wiaiiaaiai/djwodw', function (done) {
        request(app)
            .get('/wiaiiaaiai/djwodw')
            .expect(404, {
                status: 404,
                message: 'Not Found',
                response: ''
            }, done);
    });
});