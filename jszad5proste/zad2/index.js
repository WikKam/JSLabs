const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/', (req, res) => {
    let file = parseJson();
    let results = getResults(file.arguments,parseOperation(file.operations));
    res.setHeader("Content-Type", "html");
    for(let i = 0; i< results.length;i++){
        res.write(
        `<div>${file.arguments[i].x} ${file.operations[i]} ${file.arguments[i].y} = ${results[i]}</div>`)
    }
    res.end();
});

app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

function parseJson(){
    let file = fs.readFileSync('test.json');
    let ret = JSON.parse(file);
    return ret;
}
function parseOperation(operations){
    console.log(operations);
    return operations.map(operation =>{
        switch(operation){
            case "/":
                return (a,b) => a/b;
            case "*":
                return (a,b) => a*b;
            case "+":
                return (a,b) => a+b;
            case "-": return (a,b) => a-b;
        }
    })
}
function getResults(arguments, operations){
    let ret = [];
    for(let i = 0; i<arguments.length;i++){
        ret.push(operations[i](arguments[i].x,arguments[i].y));
    }
    return ret;
}
res = parseJson();
console.log(getResults(res.arguments,parseOperation(res.operations)));