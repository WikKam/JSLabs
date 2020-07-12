

var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40:
        case 32: e.preventDefault(); break; 
        default: break; 
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);



class Square{
    constructor(x,y,counter, lifetime){
        this.x = x;
        this.y = y;
        this.counter = counter;
        this.lifetime = lifetime;
    }
}



class GamePanel extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback(){
        this.initAll();
    }
    initAll(){
        this.initGame();
        this.initCanvas();
        this.initButtons();
        this.initBall();
        this.initSquares();
      }
    reInit(){
        this.initGame();
        this.initButtons();
        this.initBall();
        this.initSquares();
        this.draw();
      }
    initGame(){
         this.maxTime = parseInt(this.getAttribute('time'));
         this.currentStage = 1;
         this.maxStageTime = Math.floor(this.maxTime/3);
         this.stageTime = this.maxStageTime;
      }
    updateStage(){
        this.stageTime--;
        if(this.stageTime==0){
            this.stageTime = this.maxStageTime;
            this.currentStage++;
            this.dx++;
            this.dy++;
            if(this.currentStage == 3)this.stageTime = this.maxStageTime + 1;
            if(this.currentStage > 3){
                let e = new CustomEvent('game-over',{
                    bubbles:true,
                    composed:true,
                })
                this.dispatchEvent(e);
                return;
            }
        }
        let event = new CustomEvent('second-passed',{
            bubbles:true,
            composed:true
        });
        this.dispatchEvent(event)
        
      }
    initSquares(){
          this.squares = [];
          this.maxSquareAmount=parseInt(this.getAttribute("squaresAmount"));
          this.squareSide = 50;
          this.lifetime = Math.floor(this.maxStageTime/3);
          console.log(this.maxStageTime)
          this.counterMaxValue = 20;
          this.counterMinValue = 5;
      }
    initButtons(){
        this.rightPressed = true;
        this.leftPressed = false;
        this.upPressed = true;
        this.downPressed = false;
      }
    initBall(){
        this.x = this.canvas.width/2;
        this.y = this.canvas.height-30;
        this.dx = parseFloat(this.getAttribute("speed"));
        this.dy = parseFloat(this.getAttribute("speed"));
        this.ballRadius = 10;
      }
    initCanvas(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.canvas.style.backgroundColor = "black";
        this.shadow.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
      }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSquares();
        this.drawBall();
        this.checkDirection();
        this.checkPermeation();
        this.detectCollisions();
    }
    checkPermeation(){
        if(this.x+this.dx > this.canvas.width + this.ballRadius) this.x = 0;
        else if(this.x - this.dx < 0 - this.ballRadius) this.x = this.canvas.width
        if(this.y+this.dy > this.canvas.height + this.ballRadius) this.y = 0;
        else if(this.y - this.dy < 0 - this.ballRadius) this.y = this.canvas.height;
    }
    checkDirection(){
        if(this.rightPressed){
            this.x += this.dx;
        }
        else if(this.leftPressed){
            this.x -=this.dx;
        }
        if(this.downPressed){
            this.y+= this.dy;
        }
        else if(this.upPressed){
            this.y-=this.dy
        }
    }
    drawBall(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
    isCorrectSquare(coords){
        let ret = true
        this.squares.forEach(square => {
            if(Math.abs(coords[0]-square.x) <= this.squareSide 
            || Math.abs(coords[1]-square.y) <= this.squareSide) 
            ret = false;
        })
        return ret;
    }
    getRandomCoords(){
        let width = this.canvas.width;
        let height = this.canvas.height;
        let x;
        let y;
        let flag = true
        while(flag){
            x = Math.floor(Math.random()*(width - this.squareSide));
            y = Math.floor(Math.random()*(height - this.squareSide));
            if (this.isCorrectSquare([x,y]))flag = false;
        }
        return [x,y];
    }
    drawSquares(){
        while(this.squares.length < this.maxSquareAmount){
            let coords =  this.getRandomCoords();
            let square = new Square(coords[0],coords[1],this.getCounterValue(),this.lifetime);
            this.squares.push(square);
        }
            this.squares.forEach(square => {
            this.ctx.beginPath();
            this.ctx.rect(square.x,square.y,this.squareSide,this.squareSide);
            if(square.counter > 0){
                this.ctx.fillStyle = "green";
            }
            else this.ctx.fillStyle = "red";
            this.ctx.fill();
            this.ctx.fillStyle ="black";
            this.ctx.font = "20px Arial MS";
            this.ctx.fillText(square.counter,
                square.x + this.squareSide/3,square.y + this.squareSide/2)
            this.ctx.closePath;
            })
        }
    getCounterValue(){
        return Math.floor(Math.random()*(this.counterMaxValue - this.counterMinValue + 1)) + this.counterMinValue;
    }
    decreaseCounters(){
        this.squares.forEach(square => {
            square.counter--;           
        })
    }
    decreaseLifetime(){
        this.squares.forEach(square => {
            square.lifetime--;
        })
        this.squares = this.squares.filter(square => square.lifetime > 0);
    }
    detectCollisions(){
        this.squares = this.squares.filter(square => {
            let len = this.ballRadius;
            len += this.isBallOnDiagonal([square.x,square.y],[this.x,this.y]) 
            ? this.squareSide * Math.sqrt(2)/2 
            : this.squareSide/2; 
            if(!(this.getDistanceBetweenPoints(
                [square.x + this.squareSide/2,square.y + this.squareSide/2],
                [this.x,this.y]) >= len)){
                    let collisionEvent = new CustomEvent('collision-event',{
                        bubbles:true,
                        composed:true,
                        detail: {
                            value: square.counter
                        }
                    })
                    this.dispatchEvent(collisionEvent);
                    return false;
            }
            return true;
        })
    }
    getDistanceBetweenPoints(point1, point2){
        return(Math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)); 
    }
    isBallOnDiagonal(square, ball){
        if(Math.abs(square[0] - square[1]) == Math.abs(ball[0] - ball[1])) return true;
        if(Math.abs(square[0] + this.squareSide - square[1]) == Math.abs(ball[0] - ball[1]))return true;
        return false;
    }
}
class CurrentCounter extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    static get observedAttributes(){
        return['time','points'];
    }
    
    connectedCallback(){
        this.render();
    }
    get time(){
        return this.getAttribute("time");
    }
    
    get points(){
        return this.getAttribute("points");
    }
    set points(points){
        this.setAttribute('points', points);
    }
    set time(time){
        this.setAttribute('time',time);
    }
    attributeChangedCallback(prop, o, n){
        if(prop =='time' || prop == 'points'){
            this.render();
        }
    }
    decreaseTime(){
        let curr = parseInt(this.getAttribute('time'));
        this.setAttribute('time',curr-1);
    }
    render(){
        this.shadow.innerHTML = 
        `<table>
            <tr>
                <th>Time: ${this.time}</th>
                <th>Points: ${this.points}</th>
            </tr>
        </table>`
    }
}





class GameResult extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    static get observedAttributes(){
        return['player1','result1','player2','result2','player3','result3'];
    }
    set player1(playerName){
        this.setAttribute('player1', playerName);
    }
    set player2(playerName){
        this.setAttribute('player2', playerName);
    }
    set player3(playerName){
        this.setAttribute('player3', playerName);
    }
    set result1(results){
        this.setAttribute('result1',results);
    }
    set result2(results){
        this.setAttribute('result2',results);
    }
    set result3(results){
        this.setAttribute('result3',results);
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(prop, o, n){
        if(prop.includes('results') || prop.includes('playerName')){
            this.render();
        }
    }
    get player1(){
        return this.getAttribute('player1');
    }
    get player2(){
        return this.getAttribute('player2');
    }
    get player3(){
        return this.getAttribute('player3');
    }
    get result1(){
        return this.getAttribute('result1');
    }
    get result2(){
        return this.getAttribute('result2');
    }
    get result3(){
        return this.getAttribute('result3');
    }
    render(){
        this.shadow.innerHTML = 
        `<table>
        <tr>
            <th>Player Name</th>
            <th>Points</th>
        </tr>
        <tr id = firstPlace>
            <td>${this.player1}</td>
            <td>${this.result1}</td>
        </tr>
        <tr id = secPlace>
            <td>${this.player2}</td>
            <td>${this.result2}</td>
        </tr>
        <tr id = lastPlace>
            <td>${this.player3}</td>
            <td>${this.result3}</td>
        </tr>
    </table>`
    }
    getPlayerFromString(s){
        switch(s){
            case 'player1':
                return this.player1;
            case 'player2':
                return this.player2;
            case 'player3':
                return this.player3;
        }
    }
    getResultsFromString(s){
        switch(s){
            case 'result1':
                return this.result1;
            case 'result2':
                return this.result2;
            case 'result3':
                return this.result3;
        }
    }
    updateResults(points, playerName, currentDepth){
            console.log("przetwarzane imie: " + playerName)
            if(currentDepth >= 4){ 
                this.render();    
                return
            };
            let res = 'result' + currentDepth;
            let player = 'player' + currentDepth;
            if(points >= this.getResultsFromString(res)){
                let pointsToMove = this.getAttribute(res);
                let nameToMove = this.getAttribute(player);
                //console.log(nameToMove);
                this.setAttribute(res,points);
                this.setAttribute(player,playerName);
                this.updateResults(pointsToMove,nameToMove,currentDepth + 1);
            }
            else{
                this.updateResults(points,playerName,currentDepth + 1)
            }
    }
}


customElements.define("game-result", GameResult);
customElements.define("current-counter", CurrentCounter);
customElements.define("game-panel", GamePanel);


let game = document.getElementsByTagName("game-panel")[0];
let currentStats = document.getElementsByTagName("current-counter")[0];
let ranking = document.getElementsByTagName("game-result")[0]
let body = document.getElementsByTagName("body")[0];
let time = currentStats.getAttribute('time');
let currentPlayerName;
let basetime = 1000;


function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight") {
        game.rightPressed = true;
        game.leftPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        game.leftPressed = true;
        game.rightPressed = false;
    }
    if(e.key == "Up" || e.key == "ArrowUp"){
        game.upPressed = true;
        game.downPressed = false;
    }
    else if(e.key =="Down" || e.key == "ArrowDown"){
        game.downPressed = true;
        game.upPressed = false;
    }
}


body.addEventListener("collision-event",function(e){
    let curr = parseInt(currentStats.getAttribute("points"));
    currentStats.setAttribute("points",curr + event.detail.value);
})



body.addEventListener("game-over",function(){
    isGameEnded = true;
    wasGamePlayed = true;
    let points = currentStats.getAttribute('points');
    let name = currentPlayerName;
    ranking.updateResults(points, name, 1);
})


body.addEventListener("second-passed",function(){
    currentStats.decreaseTime();
})


document.addEventListener("keydown",keyDownHandler);


let isGameEnded = false;
let countersControl;
let lifetimeControl;


function play(){
    if(!isGameEnded){
    game.draw();
    requestAnimationFrame(play);
    }
    else {
        return
    };
}


function counters(){
    if(!isGameEnded){
    game.decreaseCounters();
    countersControl = setTimeout(counters,basetime*(1/game.currentStage));
    }
    else {
        return
    };
}


function lifetime(){
    if(!isGameEnded){
    game.decreaseLifetime();
    game.updateStage();
    lifetimeControl = setTimeout(lifetime,1000);
    }
    else {
        return
    };
}

let wasGamePlayed = false;
function startGame(){
    currentPlayerName = prompt("Wprowadź imie");
    let ballspeed = parseInt(document.getElementById("bspeed").value);
    let counterSpeed = document.getElementById("cspeed").value;
    let squareAmount = document.getElementById("squares").value;
    console.log(squareAmount);
    basetime = counterSpeed;
    game.maxSquareAmount = squareAmount;
    console.log("bspeed " + ballspeed )
    isGameEnded = false;
    if(wasGamePlayed){
        currentStats.setAttribute('time',time);
        currentStats.setAttribute('points',0);
        game.reInit();
    }
    isGameEnded = false;
    console.log(typeof ballspeed);
    game.dx = ballspeed;
    game.dy = ballspeed;
    console.log("x: " + game.x);
    console.log("y: " + game.y);
    play();
    counters();
    lifetime();
    console.log("x: " + game.x);
    console.log("y: " + game.y);
}

let start = document.getElementById("confirm");
start.addEventListener("click",startGame);