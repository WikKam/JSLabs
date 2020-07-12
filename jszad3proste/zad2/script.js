const iterations = 50;
const multiplier = 1000000000;
const pointlessComputationsButton = document.getElementById("pointless-computations");
const radios = document.getElementsByClassName("func")
const container= document.getElementById("container")
let startStopButton = document.getElementById("start-stop")
startStopButton.addEventListener("click",startStop,false)
var started = false
var blocking = 0;
var frames=0;
var worker=0;
var interval=0;
var timeout=0
function startStop() {
  started = !started;
  if (started) {
    container.classList.add("started");
    startStopButton.value = "Stop animations";
  }
  else {
   container.classList.remove("started");
   startStopButton.value = "Start animations";
  }
}

pointlessComputationsButton.addEventListener("click",function(){
  let t0;
  let t1;
  Array.from(radios).forEach(radio => {
    if(radio.checked){
      switch(radio.value){
        case "use-blocking-js":
           t0 = performance.now();
          blocking = doPointlessComputationsWithBlocking(t0);
          t1 = performance.now();
          console.log("blocking took " +(t1-t0)+" miliseconds")
          break;
        case "request-animation-frame":
           t0 = performance.now();
          frames = doPointlessComputationsWithRequestAnimationFrame()
           t1 = performance.now()
          console.log("requestAnimationFrame took " +(t1-t0)+" miliseconds")
          break;
        case "use-worker":
           t0 = performance.now();
           worker = doPointlessComputationsInWorker(t0);
           t1 = performance.now()
          console.log("worker took " +(t1-t0)+" miliseconds")
          break;
        case "interval":
           t0 = performance.now();
          interval = doPointlessComputationsWithSetInterval(t0)
           t1 = performance.now()
          console.log("setinterval took " +(t1-t0)+" miliseconds")
          break;
        case "timeout":
           t0 = performance.now();
         timeout = doPointlessComputationsWithSetTimeout(t0)
           t1 = performance.now()
          console.log("settimeout took " +(t1-t0)+" miliseconds")
      }
    }
  })
},false)
function calculatePrimes(iterations, multiplier) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          isPrime = false;
          break;
       }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  console.log(primes);
  return primes;
}

function doPointlessComputationsWithBlocking(start) {
  var primes = calculatePrimes(iterations, multiplier);
  pointlessComputationsButton.disabled = false;
  console.log(primes);
  let t1 = performance.now();
  return t1-start;
}
function doPointlessComputationsWithRequestAnimationFrame(start) {

    function testCandidate(index) {
      // finishing condition
      if (index == iterations) {
        console.log(primes);
        let t1 = performance.now();
        pointlessComputationsButton.disabled = false;
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          theme: "light1", // "light1", "light2", "dark1", "dark2"
          title:{
            text: "Simple Column Chart with Index Labels"
          },
          data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
                indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: [
              { x: 10, y: t1-start },
            ]
          }]
        });
        return t1-start;
      }
      // test this number
      var candidate = index * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
      // schedule the next
      var testFunction = testCandidate.bind(this, index + 1);
      window.requestAnimationFrame(testFunction);
    }
  
    var primes = [];
    var testFunction = testCandidate.bind(this, 0);
    window.requestAnimationFrame(testFunction);
  }
var worker = new Worker("js/worker.js");

function doPointlessComputationsInWorker(start) {

  function handleWorkerCompletion(message) {
    if (message.data.command == "done") {
      pointlessComputationsButton.disabled = false;
      console.log(message.data.primes);
      worker.removeEventListener("message", handleWorkerCompletion);
      let t1 = performance.now();
      return t1-start;
    }
  }

  worker.addEventListener("message", handleWorkerCompletion, false);

  worker.postMessage({
    "multiplier": multiplier,
    "iterations": iterations
  });
}

function doPointlessComputationsWithSetInterval(start){
  function testCandidate(index) {
    // finishing condition
    if (index == iterations) {
      console.log(primes);
      pointlessComputationsButton.disabled = false;
      let t1 = performance.now();
        return t1-start;
    }
    // test this number
    var candidate = index * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
       }
    }
    if (isPrime) {
      primes.push(candidate);
    }
    // schedule the next
    var testFunction = testCandidate.bind(this, index + 1);
    console.log('tick')
    window.setInterval(testFunction,1);
  }
    var primes = [];
    console.log("in interval")
    var testFunction = testCandidate.bind(this, 0);
    window.setInterval(testFunction,1);
}
function doPointlessComputationsWithSetTimeout(start){
    function testCandidate(index) {
      // finishing condition
      if (index == iterations) {
        console.log(primes);
        pointlessComputationsButton.disabled = false;
        let t1 = performance.now();
        return t1-start;
      }
      // test this number
      var candidate = index * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
      // schedule the next
      var testFunction = testCandidate.bind(this, index + 1);
      console.log('tick')
      window.setTimeout(testFunction,1);
    }
      var primes = [];
      var testFunction = testCandidate.bind(this, 0);
      window.setTimeout(testFunction,1);
  }
  