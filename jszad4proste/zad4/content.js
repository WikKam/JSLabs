const fs = require('fs');
const util = require('util');

const lstat = util.promisify(fs.lstat);
const readFile = util.promisify(fs.readFile);
//const path ='C:\\Users\\wkami\\Desktop\\JS\\jszad4proste\\zad4\\index.js';
let currentDir = '';
async function check(dir) {
  currentDir = dir; 
  let ret;
  let stat;
  let content= ''
  try {
    stat = await lstat(dir);
    if(stat.isFile()){
        ret = 'file';
        content += 'file\n';
        let inside = await readFile(dir);
        content += inside;
    }
    else if(stat.isDirectory()) {
        ret = 'dir'
        content = 'dir'
    };
  } catch(err){
    console.log(err)
    content = 'none';
    ret = 'none';
  } 
  return content;
}
function print(type) {
  switch (type) {
    case 'dir':
      console.log('Directory');
      break;
    case 'file':
      console.log('File');
      console.log(String(fs.readFileSync(currentDir)));
      break;
    default:
      console.log('File does not exist');
      break;
  }
  return type;
}

module.exports = {
  check,
  print,
};
//check(path).then(console.log)