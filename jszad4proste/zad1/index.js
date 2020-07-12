const Operation = require('./module');

const operation = new Operation(parseInt(process.argv[2], 10), parseInt(process.argv[3], 10));
console.log(operation.sum());
