const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')




const marks = ['2.0','3.0', '3.5', '4.0', '4.5', '5.0'];
const subjects = ['Wstęp do Informatyki',
 'Analiza Matematyczna',
  'Systemy Operacyjne',
'Projektowanie Obiektowe',
'Programowanie Funkcyjne',
'Fizyka'];

const getRandomStuffFromArray = (amount, array) => {
    let ret = [];
    let set = new Set();
    while(ret.length < amount){
        let index = Math.floor(Math.random() * array.length);
        if(array === subjects){
            if(set.has(index)) continue;
            else {
                set.add(index);
                ret.push(array[index]);
            }
        }
        else{
        ret.push(array[index]);
        }
    }
    return ret;
}

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/submit', (req, res) => {
    console.log(req.body);
    let numberOfSubject = req.body.numberOfSubjects;
    let numberOfMarks = req.body.numberOfMarks;
    let sub = getRandomStuffFromArray(numberOfSubject,subjects);
    sub = sub.map(subject => {
        return {
            subject: subject,
            marks: getRandomStuffFromArray(numberOfMarks,marks),
        };
    })
    res.setHeader('Content-Type', 'application/json');
    console.log(sub);
    res.send(JSON.stringify(sub));
});

app.listen(port, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.