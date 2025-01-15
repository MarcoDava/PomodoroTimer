const startEl = document.getElementById("start");
const restartEl = document.getElementById("restart");
const stopEl = document.getElementById("stop");
const timerEl = document.getElementById("timer");
const dotEl = document.getElementById("dot");

const inputField = document.querySelector('#numbers-only');
const hourField = document.getElementById("num-of-hours");
const minField = document.getElementById("num-of-mins");

let hours = 0;
let mins = 0;
let interval;
let timerLeft = 0;
let started=false;

function validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validateInput(){
    if(hourField.value === "" || minField.value === ""){
        alert("Please enter a valid number");//need to change this to a more intuitive design instead of an alert
        return false;
    }
    if(hourField.value > 99 || minField.value > 59 || minField.value === 0){
        alert("Please enter a valid number");
        return false;
    }
    return true;
}

function takeInput(){
    if(validateInput()){
        if(!started){
            hoursInput = parseInt(hourField.value);
            minsInput = parseInt(minField.value);
            started = true;
        }
    }
    timerLeft = hours * 3600 + mins * 60;
}

function displayInput() {
    minField.remove();
    hourField.remove();
    timerEl.add();
}

function displayTimer(){
    //if user presses start, it will remove the textboxes after taking in their values and display the timer.
}


function updateTimer() {
    let hours = Math.floor(timerLeft / 3600);
    let minutes = Math.floor(timerLeft / 60);
    let seconds = timerLeft % 60;
    let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    //if hours is equal to 0, no longer display it. add some type of animation when removed.
    timerEl.innerHTML = formattedTime;
    //may need to change the way the timer is displayed, try and make an html for hours, minutes and seconds, 
    // or just simply change the formatted time to stop printing hours when there are no more hours
}

startEl.addEventListener("click", () => {
    if (!interval) {
        displayInput();
        clearInterval(interval);
        interval = setInterval(() => {
            timerLeft--;
            updateTimer();
            if (timerLeft === 0) {
                clearInterval(interval);
                interval = null; // Clear the reference
                alert("Time's Up!");
                timerLeft = 1500;
            }
        }, 1000);
        dotEl.classList.remove('reset');
    }
});

stopEl.addEventListener("click", () => {
    clearInterval(interval);
    interval = null; // Clear the reference
    dotEl.classList.add('paused');
});

restartEl.addEventListener("click", () => {
    clearInterval(interval);
    interval = null; // Clear the reference
    displayInput();
    started = false;
    updateTimer();
    dotEl.classList.add('paused');
});


