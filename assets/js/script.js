var wrapperEl = document.querySelector("#wrapper");
var startEl = document.querySelector("#start");
var mainEl = document.querySelector(".main");
var timerEl = document.querySelector("#timer");
var buttonEl = document.querySelector("#button-container");
var quesEl = document.querySelector("#ques");
var chOneEl =document.querySelector("#choice-one");
var chTwoEl = document.querySelector("#choice-two");
var chThreeEl = document.querySelector("#choice-three");
var chFourEl = document.querySelector("#choice-four");
var alertEl = document.querySelector("#alert");
var doneEl = document.querySelector("#done-page");
var scoreEl = document.querySelector("#user-score");
var submitEl = document.querySelector("#submit");
var addScoreEl = document.querySelector("#add-score");
var backBtnEl = document.querySelector("#back-btn");
var clearBtnEl = document.querySelector("#clear-btn");
var styleEl = document.querySelector(".style");


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
    buttonEl.setAttribute("style", "display: block;")
    quesEl.textContent = `${number+1} ) ${questions[number].question}`;
    quesEl.setAttribute("style", "display: inline-block;text-align: center; margin-top:15%; margin-left: 25%;");
    chOneEl.textContent = `A) ${questions[number].tests[0]}`;
    chTwoEl.textContent = `B) ${questions[number].tests[1]}`;
    chThreeEl.textContent = `C) ${questions[number].tests[2]}`;
    chFourEl.textContent = `D) ${questions[number].tests[3]}`;
}

buttonEl.addEventListener("click", (event)=> {
    var answerChoice = event.target;
    if (answerChoice.matches("button")) {
        console.log(answerChoice);
    }else {
        return;
    }
        
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
    alertTimerC();
    score += 5;
    nextQuestion();
    return score;
}

function alertTimerC() {
    alertEl.textContent = "Correct";
    alertEl.setAttribute("style", "color: green;");
    setTimeout(function() {
        alertEl.setAttribute("style", "display: none;");
      }, 1000);
}

function incorrectAnswer() {
    alertTimerI();
    var penaltyTime = 15;
    secondsLeft -= penaltyTime;
    nextQuestion();
    updateTimer();
}

function alertTimerI() {
    alertEl.textContent = "Incorrect"
    alertEl.setAttribute("style", "color: red;");
    setTimeout(function() {
        alertEl.setAttribute("style", "display: none;");
      }, 1000);
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
    if (num > questions.length-1){
        endOfQuiz();
    }else{
        makeQuestions(num);
    }
}

function endOfQuiz() {
    buttonEl.setAttribute("style", "display: none;");
    doneEl.setAttribute("style", "display: inline-block;");
    scoreEl.textContent= `Your final score is: ${score}.`;
}

function saveResult(userInitial,userScore) {
    var existingValues = JSON.parse(localStorage.getItem('allScores')) || [];
    existingValues.push({userInitial,userScore});
    existingValues.sort((a, b) => b.userScore - a.userScore);
    console.log(existingValues);
    localStorage.setItem('allScores', JSON.stringify(existingValues));

}

function fiveHighScores(userInitial,userScore){
    var fiveLastHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
    fiveLastHighScores.push({userInitial,userScore});
    fiveLastHighScores.sort((a, b) => b.userScore - a.userScore);
    if (fiveLastHighScores.length>5) {
    var slicedHigh= fiveLastHighScores.slice(0 , 5);

    localStorage.setItem('highScores', JSON.stringify(slicedHigh));
    console.log(slicedHigh);

    for (i=0; i<5; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = slicedHigh[i].userInitial +" : "+ slicedHigh[i].userScore;
        addScoreEl.appendChild(liEl);
    }
    }else{
        localStorage.setItem('highScores', JSON.stringify(fiveLastHighScores));

        for (i=0; i<fiveLastHighScores.length; i++){
            var liEl = document.createElement("li");
            liEl.textContent = fiveLastHighScores[i].userInitial +" : "+ fiveLastHighScores[i].userScore;
            addScoreEl.appendChild(liEl);
        }
    }
   
}

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = `${secondsLeft} seconds left`;
      timerEl.setAttribute("style", "float: right;");

      if(secondsLeft === 0 || num > questions.length-1) {
        endOfQuiz();
        clearInterval(timerInterval);
      }
    }, 1000);
}


submitEl.addEventListener("click", function(event) {
    event.preventDefault();


    var quizResult=
    {
        userInitial: document.querySelector("#user-initial").value,
        userScore: score
    }
    
  
    if (quizResult.userInitial === "") {
      window.alert("Please enter initials before submit.");
    } else {
       saveResult(quizResult.userInitial,quizResult.userScore);
       fiveHighScores(quizResult.userInitial,quizResult.userScore);
    }
    highScoresPage();
});

function highScoresPage() {
    wrapperEl.setAttribute("style", "display: none;");
    doneEl.setAttribute("style", "display: none;");
    styleEl.setAttribute("style", "display: block;");
}


startEl.addEventListener("click",firstQ);