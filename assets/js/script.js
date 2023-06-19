var startEl = document.querySelector("#start");
var mainEl = document.querySelector(".main");
var timerEl = document.querySelector("#timer");
var questions = ["Q1", "Q2", "Q3", "Q4"];

function firstQ() {
   mainEl.remove();
   setTime();
   

}
startEl.addEventListener("click",firstQ);

var secondsLeft = 40;
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = `${secondsLeft} seconds left`;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
    }, 1000);
  }
  