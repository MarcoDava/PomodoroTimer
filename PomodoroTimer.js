const startEl = document.getElementById("start");
const restartEl = document.getElementById("restart");
const stopEl = document.getElementById("stop");
const timerEl=document.getElementById("timer");

let interval;
let timerLeft=1500;//25 minutes

function updateTimer(){
    let minutes=Math.floor(timerLeft / 60);
    let seconds=timerLeft % 60;
    let formattedTime=`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;


    timerEl.innerHTML = formattedTime;
}

startEl.addEventListener("click",() =>{
    interval = setInterval(()=>{
        timerLeft--;
        updateTimer();
        if(timerLeft===0){
            clearInterval(interval);
            alert("Times Up!");
            timerLeft=1500;
        }
    },1000);
});
stopEl.addEventListener("click",() =>{
    clearInterval(interval);
});
restartEl.addEventListener("click",() =>{
    clearInterval(interval);
    timerLeft=1500;
    updateTimer();
});

