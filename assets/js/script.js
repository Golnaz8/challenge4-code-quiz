var startEl = document.querySelector("#start");
var mainEl = document.querySelector(".main");
var timerEl = document.querySelector("#timer");
var askQuestionEl = document.querySelector(".askQuestion");
var buttonEl = document.querySelector("#button-container");
var quesEl = document.querySelector("#ques");
var chOneEl =document.querySelector("#choice-one");
var chTwoEl = document.querySelector("#choice-two");
var chThreeEl = document.querySelector("#choice-three");
var chFourEl = document.querySelector("#choice-four");
var alertEl = document.querySelector("#alert");


var score = 0;
var secondsLeft = 75;
var num = 0;


var questions = [
    {
        question: "Which of the following is NOT a valid CSS selector?",
        tests: [".class-selector", "#id-selector", "<element>-selector", "[attribute]-selector"],
        answer: chFourEl
    },
    {
        question: "Which CSS property is used to make a background image fixed so that it doesn't scroll with the rest of the page?",
        tests: ["background-attachment", "background-image", "background-position", "background-repeat"],
        answer: chOneEl
    },
    {
        question: "In HTML, which tag is used to define a hyperlink?",
        tests: ["<a>", "<p>", "<div>", "<h1>"],
        answer: chOneEl
    },
    {
        question: "Which CSS property is used to control the spacing between the content and the border of an element?",
        tests: ["margin", "padding", "border-spacing", "outline"],
        answer: chTwoEl
    },
    {
        question: "Which of the following is NOT a valid JavaScript comparison operator?",
        tests: ["===", "==", "><", "<"],
        answer: chThreeEl 
    }

]

function makeQuestions(number) {
    askQuestionEl.setAttribute("style", "display: block;")
    quesEl.textContent = `${number+1} ) ${questions[number].question}`;
    quesEl.setAttribute("style", "display: inline-block;text-align: center; margin-top:15%; margin-left: 25%;");
    chOneEl.textContent = `A) ${questions[number].tests[0]}`;
    chTwoEl.textContent = `B) ${questions[number].tests[1]}`;
    chThreeEl.textContent = `C) ${questions[number].tests[2]}`;
    chFourEl.textContent = `D) ${questions[number].tests[3]}`;
}

buttonEl.addEventListener("click", (event)=> {
    var answerChoice = event.target;
    console.log(answerChoice);
        
    if (answerChoice === questions[num].answer){
        correctAnswer();
        return;
    }
    if (answerChoice !== questions[num].answer ){
        incorrectAnswer();
        return;
    }
});
 
function correctAnswer() {
    alertEl.textContent = "Correct"
    alertEl.setAttribute("style", "color: green;");
    score += 1;
    nextQuestion();
    return score;
}

function incorrectAnswer() {
    alertEl.textContent = "Incorrect"
    alertEl.setAttribute("style", "color: red;");
    var penaltyTime = 5;
    secondsLeft -= penaltyTime;
    updateTimer();
    nextQuestion();
}
function updateTimer() {
    var timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = `${secondsLeft} seconds left`;
}

function firstQ(){
    mainEl.setAttribute("style", "display: none;");
    setTime();
    makeQuestions(num);
}

function nextQuestion() {
    num = num +1;
    makeQuestions(num);
}
 
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = `${secondsLeft} seconds left`;
      timerEl.setAttribute("style", "float: right;");

      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
}
  
startEl.addEventListener("click",firstQ);