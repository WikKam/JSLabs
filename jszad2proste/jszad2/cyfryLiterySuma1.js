"use strict";
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
let sumOfDigits;
let numberOfLetters;
let sum = 0;
let results = document.getElementById('results');
let flag = true;
while(flag){
let napis = window.prompt("abcd");
if(typeof(napis)=="object"){
    flag = false;
}else{
sumOfDigits = cyfry(napis);
numberOfLetters = litery(napis);
sum += suma(napis);
let div = document.createElement('div');
let span1 = document.createElement('span');
let span2 = document.createElement('span');
let span3 = document.createElement('span');
span1.style.color = "red";
span2.style.color = "green";
span3.style.color = "blue";
span1.innerHTML = sumOfDigits + " ";
span2.innerHTML = numberOfLetters + " ";
span3.innerHTML = sum + " ";
div.appendChild(span1);
div.appendChild(span2);
div.appendChild(span3);
results.appendChild(div);
console.log(sumOfDigits + " " + numberOfLetters + " " + sum);
}
}

