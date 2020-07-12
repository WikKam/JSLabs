"use strict";
var expect = chai.expect;
function cyfry(napis){
    let sum = 0;
    for(let i = 0; i < napis.length; i++){
        let parsed = parseInt(napis.charAt(i)); 
        if(!isNaN(parsed))sum += parsed;
    }
    return sum;
}
function litery(napis){
    let counter = 0;
    for(let i = 0; i < napis.length; i++){
        if(isNaN(parseInt(napis.charAt(i)))){
            counter++;
        }
    }
    return counter;
} 
function suma(napis){
    
    let x = parseInt(napis);
    return isNaN(x) ? 0 : x;
}


describe('The suma() function', function() {
    it('Returns 12 for "12ab"', function() {
      expect(suma("12ab")).to.equal(12);
    });
    it('Returns 0 for "ab12"', function() {
      expect(suma("ab12")).to.equal(0);
    });
    it('Returns 121 for "121"', function() {
        expect(suma("121")).to.equal(121);
      });
    it('Returns 0 for ""', function() {
        expect(suma("")).to.equal(0);
      });
    it('Returns 0 for "aaab"', function() {
        expect(suma("aaab")).to.equal(0);
      });
   });
describe('The cyfry() function', function() {
    it('Returns 7 for "abc4d3e"', function() {
      expect(cyfry("abc4d3e")).to.equal(7);
    });
    it('Returns 0 for "abcd"', function() {
      expect(cyfry("abcd")).to.equal(0);
    });
    it('Returns 4 for "121"', function() {
        expect(cyfry("121")).to.equal(4);
      });
    it('Returns 0 for ""', function() {
        expect(cyfry("")).to.equal(0);
      });
    it('Returns 0 for "aaab"', function() {
        expect(cyfry("aaab")).to.equal(0);
      });
   });
describe('The litery() function', function() {
    it('Returns 4 for "abcd1234"', function() {
      expect(litery("abcd1234")).to.equal(4);
    });
    it('Returns 0 for "1234"', function() {
      expect(litery("1234")).to.equal(0);
    });
    it('Returns 0 for "121"', function() {
        expect(litery("121")).to.equal(0);
      });
    it('Returns 0 for ""', function() {
        expect(litery("")).to.equal(0);
      });
    it('Returns 4 for "aaab"', function() {
        expect(litery("aaab")).to.equal(4);
      });
   });
