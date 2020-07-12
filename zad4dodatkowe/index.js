const model = require('./model/model.js');
const db = require('./database.js');
var http = require("http");
var url = require("url");
const fs = require('fs');

function getModelFromPathname(path){
    switch(path){
        case "/subjects":
            return model.Subject;
        case "/students":
            return model.Student;
        case "/instructors":
            return model.Instructor;
    }
}
function getStringFromPathname(path){
    switch(path){
        case "/subjects":
            return "Przedmioty:";
        case "/students":
            return "Studenci:";
        case "/instructors":
            return "Prowadzący:";
    }
}
http.createServer((req,res) => {
    if(req.method == 'GET'){
        handleGetRequests(req,res);
    }
    else if(req.method == 'PUT'){
        let urlParts = url.parse(req.url,true);
        if(urlParts.pathname == '/students'){
            let name = urlParts.query["fname"];
            let 
        }        
    }
}).listen(8080);

function createAddStudentForm(){
    return `<form action="/students" method="put">
    <label for="fname">Full Name:</label>
    <input type="text" id="fname" name="fname"><br><br>
    <label for="cardno">Student Card Number:</label>
    <input type="text" id="cardno" name="cardno"><br><br>
    <input type="submit" value="Submit">
  </form>`
}

function handleGetRequests(req, res){
    let urlParts = url.parse(req.url,true);
    console.log(req.url);
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); 
    let splittedUrl = urlParts.pathname.split('/');
    if(req.method == 'GET'){
    if(splittedUrl[1] == ""){
        html = fs.readFileSync('./views/index.html');
        res.write(html);
        res.end();
    }
    else if(splittedUrl[1] != "favicon.ico"){
        if(splittedUrl[2] === undefined){
            res.write(`<h1>${getStringFromPathname(urlParts.pathname)}</h1>`)
            getModelFromPathname(urlParts.pathname)
            .findAll()
            .then(found =>{
                found.forEach(entity => {
                    res.write(
                        `<div><span>${entity.name}</span> <a href="http://localhost:8080${urlParts.pathname}/${entity.name}">Szczególy</a></div>`
                        );
                })
                res.write(createAddStudentForm());
                res.end();
            })
        }
        else if(splittedUrl[1] == "subjects"){
                let param = decodeURIComponent(splittedUrl[2]);
                console.log(param);
                model.Subject.findOne({
                    where:{
                        name: param
                    },
                    include: model.Student
                }).then(subject =>{
                    res.write(`<h1>Lista studentów przedmiotu: ${subject.name}</h1>`)
                    console.log(subject);
                    subject.Students.forEach(student =>{
                        res.write(`<div>${student.name}</div>`);
                    })
                    res.end();
                }
                )
            }
        else if(splittedUrl[1] == "instructors"){
            let param = decodeURIComponent(splittedUrl[2]);
            console.log(param);
            model.Instructor.findOne(
                {where:{name:param}, 
                include: model.SubjectMark
            }).then(ins =>{
                res.write(`<h1>Oceny wystawione przez: ${ins.name}</h1>`)
                ins.SubjectMarks.forEach(mark =>{
                console.log(mark);
                res.write(`<div>Ocena: ${mark.mark}</div>`)

            })
            res.end();
        })
        }
        else if(splittedUrl[1] == "students"){
            let param = decodeURIComponent(splittedUrl[2]);
            console.log(param);
            model.Student.findOne(
                {where:{name:param}, 
                include: model.SubjectMark
            }).then(ins =>{
                res.write(`<h1>Oceny ${ins.name}: </h1>`)
                ins.SubjectMarks.forEach(mark =>{
                console.log(mark);
                res.write(`<div>Ocena: ${mark.mark}</div>`)

            })
            res.end();
        })
        }
        }
    }
}
/*
async function doStuff(){
let ins = await model.Instructor.create({
    name:"Test Testowski"
});

let sub = await model.Subject.create({
    name: "Wstęp do Informatyki"
});

let student = await model.Student.create({
    name: "Wiktor Kamiński",
    studentCardNumber: 123456
});



let submark = await model.SubjectMark.create({
    mark: 4
});
//submark.setMark(mark);
//submark.setSubject(subject);
submark.setSubject(sub);
submark.setStudent(student);
ins.addSubject(sub);
ins.addSubjectMark(submark);
student.addSubject(sub);
sub.addStudent(student);
student.addSubjectMark(submark);
}
doStuff().then(console.log("done"));
*/