const supertest = require("supertest");

const server = supertest.agent("http://localhost:3000");

const assert = require('assert');

describe('GET /', () => {
    it('multiply test',(done) =>{
          server
          .get('/')
          .expect('Content-Type', /html/)
          .end((err, res) => {
                console.log(res.text);
                if(err) return done(err);
                let expected = '<div>1 * 2 = 2</div>'
                assert.equal(res.text.includes(expected), true);
                done();
          })
    }),
    it('division test',(done) => {
        server
        .get('/')
          .expect('Content-Type', /html/)
          .end((err, res) => {
                if(err) return done(err);
                let expected = '<div>10 / 5 = 2</div>'
                assert.equal(res.text.includes(expected), true);
                done();
          })
    }),
    it('sum test',(done) => {
        server
        .get('/')
          .expect('Content-Type', /html/)
          .end((err, res) => {
                if(err) return done(err);
                let expected = '<div>7 + 3 = 10</div>'
                assert.equal(res.text.includes(expected), true);
                done();
          })
    }),
    it('substraction test',(done) => {
        server
        .get('/')
          .expect('Content-Type', /html/)
          .end((err, res) => {
                if(err) return done(err);
                let expected = '<div>2 - 2 = 0</div>'
                assert.equal(res.text.includes(expected), true);
                done();
          })
    })
});