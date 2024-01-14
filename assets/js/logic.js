var startButton = document.querySelector("#start");
var timerText = document.querySelector("#time");
var questionsBlock = document.querySelector("#questions");
var questionText = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var startScreen = document.querySelector(".start");
var endScreen = document.querySelector("#end-screen");
var playerScoreText = document.querySelector("#final-score");
var scoreSubmitBtn = document.querySelector("#submit");
var userInput = document.querySelector("#initials");

var timer;
var timeLeft = 100;
var activeQuestionIndex = 0;
var activeQuestion = "";
var activeQuestionAnswer = "";
var activeQuestionChoices = [];
var activeQuestionPoints = 0;
var playerScore = 0;
var allPlayers;
var player;
getUserScores();
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
      gameEnd();
      timeLeft = 100;
    }
  }, 1000);
}

function getQuestion() {
  if (activeQuestionIndex == questions.length) {
    gameEnd();
    clearInterval(timer);
    timeLeft = 100;
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

      if (userChoice === activeQuestionAnswer) {
        playerScore += activeQuestionPoints;
        getQuestion();
      } else {
        timeLeft -= 20;
      }
    });
    questionChoices.appendChild(choiceButton);
  }

  activeQuestionIndex++;
}

function startAgain() {
  endScreen.setAttribute("class", "hide");
  startScreen.classList.remove("hide");
  timerText.textContent = "0";
}

function gameEnd() {
  questionsBlock.setAttribute("class", "hide");
  endScreen.classList.remove("hide");
  playerScoreText.textContent = playerScore;
  activeQuestionIndex = 0;
  console.log(allPlayers);
  scoreSubmitBtn.addEventListener("click", function () {
    player = {
      userName: userInput.value,
      userScore: playerScore,
    };

    allPlayers.push(player);
    localStorage.setItem("userScore", JSON.stringify(allPlayers));
    console.log(allPlayers);
    startAgain();
  });
}

function getUserScores() {
  allPlayers = JSON.parse(localStorage.getItem("userScore"));
  if (!allPlayers) {
    allPlayers = [];
  }
}
