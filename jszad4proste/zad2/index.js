const fs = require('fs');

const fileName = process.argv[2];
let currentDir = '';
function check(dir) {
  let type = '';
  currentDir = dir;
  if (!fs.existsSync(dir)) {
    type = 'none';
  } else if (fs.lstatSync(dir).isDirectory()) {
    type = 'dir';
  } else if (fs.lstatSync(dir).isFile()) {
    type = 'file';
  }
  return type;
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

const val = check(fileName);
print(val);

module.exports = {
  check,
  print,
};
