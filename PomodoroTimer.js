const startEl = document.getElementById("start");
const restartEl = document.getElementById("restart");
const stopEl = document.getElementById("stop");
const timerEl = document.getElementById("timer");
const dotEl = document.getElementById("dot");

let interval;
let timerLeft = 1500; // 25 minutes

function updateTimer() {
    let minutes = Math.floor(timerLeft / 60);
    let seconds = timerLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timerEl.innerHTML = formattedTime;
}

startEl.addEventListener("click", () => {
    if (!interval) {
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
        dotEl.style.animationPlayState = 'running';
    }
});

stopEl.addEventListener("click", () => {
    clearInterval(interval);
    interval = null; // Clear the reference
    dotEl.style.animationPlayState = 'paused';
});

restartEl.addEventListener("click", () => {
    clearInterval(interval);
    interval = null; // Clear the reference
    dotEl.style.animationPlayState = 'paused';
    timerLeft = 1500;
    updateTimer();
});


