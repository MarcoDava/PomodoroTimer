const startEl = document.getElementById("start");
const restartEl = document.getElementById("restart");
const stopEl = document.getElementById("stop");
const dotEl = document.getElementById("dot");
const userPromptText=document.getElementById("user-prompt-text");
const userQuestionText=document.getElementById("user-question-text");

const hourField = document.getElementById("num-of-hours");
const minField = document.getElementById("num-of-mins");
const inputDisplay = document.getElementById("input-display");

let hours = 0;
let mins = 0;
let interval;
let timerLeft = 0;
let started = false;

let timerEl = document.createElement("p");
timerEl.setAttribute("class", "timer");
timerEl.setAttribute("id", "timer");
dotEl.classList.add('paused');

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
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validateInput() {
    if (hourField.value === "" && minField.value === "") {
        userPromptText.textContent="Please enter a valid number";
        return false;
    }
    if (parseInt(hourField.value) > 99 || parseInt(minField.value) > 59) {
        userPromptText.textContent="Please enter a valid number";
        return false;
    }
    return true;
}

function takeInput() {
    let hoursInput = 0;
    let minsInput = 0;
    console.log("takeInput");
    if (validateInput()) {
        console.log("validateInput");
        if (!started) {
            hoursInput = parseInt(hourField.value)||0;
            minsInput = parseInt(minField.value)||0;
            started = true;
            timerLeft = hoursInput * 3600 + minsInput * 60;
            document.querySelector(".circle-container").appendChild(timerEl);
            timerEl.setAttribute("class", "timer");
            timerEl.setAttribute("id", "timer");
            updateTimer();
            hourField.style.display="none";//maybe have it so before the timer starts, restart and stop buttons are disabled and when we press start, there is an animation when the come in
            minField.style.display="none";
            inputDisplay.style.display="none";
            return true;
        }
    }
    else{
        return false;
    }
}

function displayTimer() {
    userQuestionText.display="none";
}

function displayInput() {
    if (timerEl) {
        timerEl.remove();
    }
    userQuestionText.innerHTML="How long would you like to set the timer for?";
    hourField.style.display = "inline"; // Show input fields
    minField.style.display = "inline";
    hourField.textContent="";
    minField.textContent="";
}

function updateTimer() {
    let hours = Math.floor(timerLeft / 3600);
    let minutes = Math.floor(timerLeft % 3600 / 60);
    let seconds = timerLeft % 60;
    let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    //if hours is equal to 0, no longer display it. add some type of animation when removed.
    timerEl.innerHTML = formattedTime;
    //may need to change the way the timer is displayed, try and make an html for hours, minutes and seconds, 
    // or just simply change the formatted time to stop printing hours when there are no more hours
}

startEl.addEventListener("click", () => {
    if(takeInput()){
        displayTimer();
        console.log("got to here");
        //possibly add a countdown, so whenever start is pressed, it counts down from 3?
        if (!interval) {
            console.log("Got to here as well"); 
            clearInterval(interval);
            interval = setInterval(() => {
                timerLeft--;
                updateTimer();
                if (timerLeft === 0) {
                    clearInterval(interval);
                    interval = null; // Clear the reference
                    alert("Time's Up!");
                    displayInput();
                }
            }, 1000);
            dotEl.classList.remove('reset');
            dotEl.classList.remove('paused');
        }   
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

