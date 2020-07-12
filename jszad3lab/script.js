const points = document.getElementById("points");
var body = document.getElementsByTagName("body")[0];
let pcount = 0;
updateHs()
function addParagraph(index){
    let para = document.createElement("p");
    para.innerText = "Akapit"
    para.addEventListener("click",function(e){
        body.removeChild(e.target);
        e.stopPropagation();
        points.innerText = parseInt(points.innerText) - 1;
        pcount--;
    })
    body.insertBefore(para,index);
    pcount++;
}
function getRandomNode(){
    let h;
    h = numToH(getRandomH());
    while(h.length<=0){
        h = numToH(getRandomH());
    }
    let index = Math.floor(Math.random() * (h.length - 1));
    if(h[index].isEqualNode(body.childNodes[4])) return getRandomNode();
    return h[index];
}
function numToH(index){
    switch(index){
        case 1:
            return document.getElementsByTagName("h1");;
        case 2:
            return document.getElementsByTagName("h2");;
        case 3:
            return document.getElementsByTagName("h3");;
        case 4:
            return document.getElementsByTagName("h4");;
        case 5:
            return document.getElementsByTagName("h5");;
        case 6:
            return document.getElementsByTagName("h6");;
    }
}
function numToString(index){
    switch(index){
        case 1:
            return "h1";
        case 2:
            return "h2";
        case 3:
            return "h3";
        case 4:
            return "h4";
        case 5:
            return "h5";
        case 6:
            return "h6";
    }
}
function getRandomH(){
    return Math.floor((Math.random() * 6) + 1);
}
function changeRandomH(){
    
    let from; 
    let to;
    let hfrom
    while(true){
        from = getRandomH()
        to = getRandomH()
        hfrom = numToH(from);
        if(hfrom && hfrom.length > 0 && from!=to)break;
    }
    let htoHTML = document.createElement(numToString(to));
    htoHTML.innerText = `Nagłówek poziomu ${to}`;
    htoHTML.addEventListener("click",function(){
        points.innerText = parseInt(points.innerText) + to;
    })
    let index = Math.floor(Math.random() * (hfrom.length - 1));
    body.insertBefore(htoHTML,hfrom[index]);
    body.removeChild(hfrom[index]);
}
function updateHs(){
     h6 = document.getElementsByTagName("h6");
     h5 = document.getElementsByTagName("h5");
     h4 = document.getElementsByTagName("h4");
     h3 = document.getElementsByTagName("h3");
     h2 = document.getElementsByTagName("h2");
     h1 = document.getElementsByTagName("h1");
     Array.from(h1).forEach(elem => {
        elem.addEventListener("click",function(){
            points.innerText = parseInt(points.innerText) + 1;
        })
    })
    Array.from(h2).forEach(elem => {
        elem.addEventListener("click",function(){
            points.innerText = parseInt(points.innerText) + 2;
        })
    })
    Array.from(h3).forEach(elem => {
        elem.addEventListener("click",function(){
            points.innerText = parseInt(points.innerText) + 3;
        })
    })
    Array.from(h4).forEach(elem => {
        elem.addEventListener("click",function(){
            points.innerText = parseInt(points.innerText) + 4;
        })
    })
    Array.from(h5).forEach(elem => {
        elem.addEventListener("click",function(){
            points.innerText = parseInt(points.innerText) + 5;
        })
    })
    Array.from(h6).forEach(elem => {
        elem.addEventListener("click",function(){
            points.innerText = parseInt(points.innerText) + 6;
        })
    })
}
function wrapActions(){
    let time = Math.floor(Math.random() * 5)+1;
    if(time%2 == 1){
        changeRandomH()
    }
    else{
        addParagraph(getRandomNode());
        if (pcount == 5){
            window.setTimeout(function(){
                let p = window.confirm(`Wynik: ${points.innerText}\nChcesz zagrać ponownie?`)
            if(p){
                restart();
            }
            },50)
            return;
        }
    }
    window.setTimeout(wrapActions,time*1000);
}
function restart(){
    pcount = 0;
    points.innerText = 0;
    let p = document.getElementsByTagName("p");
    Array.from(p).forEach(elem => {
        body.removeChild(elem);
    })
    wrapActions();
}
wrapActions()
