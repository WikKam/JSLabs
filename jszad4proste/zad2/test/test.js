/* eslint-disable no-undef */
const { expect } = require('chai');
const mod = require('../index.js');

describe('the check() method', () => {
  it('Returns dir for a directory path', () => {
    const type = mod.check('C:\\Users\\wkami\\Desktop\\JS\\jszad4proste\\zad2');
    expect(mod.print(type)).to.equal('dir');
  });
  it('Returns file for a file path', () => {
    const type = mod.check('C:\\Users\\wkami\\Desktop\\JS\\jszad4proste\\zad2\\sample');
    expect(mod.print(type)).to.equal('file');
  });
  it('Returns none for an invalid path', () => {
    const type = mod.check('C:\\Users\\wkami\\Desktop\\JS\\jszad4proste\\abcdef');
    expect(mod.print(type)).to.equal('none');
  });
});
