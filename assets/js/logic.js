var startButton = document.querySelector("#start");
var timerText = document.querySelector("#time");
var questionsBlock = document.querySelector("#questions");
var questionText = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var startScreen = document.querySelector(".start");
var endScreen = document.querySelector("#end-screen");
var playerScoreText = document.querySelector("#final-score");

var timer;
var timeLeft = 100;
var activeQuestionIndex = 0;
var activeQuestion = "";
var activeQuestionAnswer = "";
var activeQuestionChoices = [];
var activeQuestionPoints = 0;
var playerScore = 0;
startButton.addEventListener("click", function () {
  //when start button is pressed, we are starting timer to countdown down

  startTimer();
  //we are taking question
  getQuestion();
  startScreen.setAttribute("class", "hide");
  questionsBlock.classList.remove("hide");
});

function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    timerText.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function getQuestion() {
  if (activeQuestionIndex == questions.length) {
    questionsBlock.setAttribute("class", "hide");
    endScreen.classList.remove("hide");
    playerScoreText.textContent = playerScore;
    activeQuestionIndex = 0;
  }

  questionChoices.textContent = "";
  activeQuestion = questions[activeQuestionIndex].question;
  activeQuestionAnswer = questions[activeQuestionIndex].answer;
  activeQuestionChoices = questions[activeQuestionIndex].options;
  activeQuestionPoints = questions[activeQuestionIndex].points;
  //display question and question choices
  questionText.textContent = activeQuestion;
  for (var i = 0; i < activeQuestionChoices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = activeQuestionChoices[i];
    choiceButton.setAttribute("data-choice", activeQuestionChoices[i]);
    choiceButton.addEventListener("click", function (e) {
      var userChoice = e.target.getAttribute("data-choice");
      console.log(userChoice);
      if (userChoice === activeQuestionAnswer) {
        getQuestion();
        playerScore += activeQuestionPoints;
      } else {
        timeLeft -= 20;
      }
    });
    questionChoices.appendChild(choiceButton);
  }

  activeQuestionIndex++;
}
