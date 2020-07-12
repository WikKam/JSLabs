//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

const assert = require('assert');
// UNIT test begin
describe('GET /', function() {
      it('correct result with numbers in file', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .end((err, res) => {
            if(err) return done(err);
            let expected = '<h1>1 + 2 = 3</h1>'
            assert.equal(res.text.includes(expected), true);
            done();
         })
      });
});

describe('GET /add/x/y', () => {
      it('correct result with numbers in url',(done) =>{
            server
            .get('/add/4/5')
            .expect('Content-Type', /html/)
            .end((err, res) => {
                  if(err) return done(err);
                  let expected = '<h1>4 + 5 = 9</h1>'
                  assert.equal(res.text.includes(expected), true);
                  done();
            })
      })
});