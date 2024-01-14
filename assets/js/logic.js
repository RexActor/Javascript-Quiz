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

var correctAnswerSound = new Audio("../assets/sfx/correct.wav");
var incorrectAnswerSound = new Audio("../assets/sfx/incorrect.wav");

//add eventListener to submit score button
scoreSubmitBtn.addEventListener("click", submitScore);

var timer;
var timeLeft = 75;
var penaltyTime = 15;
var activeQuestionIndex = 0;
var activeQuestion = "";
var activeQuestionAnswer = "";
var activeQuestionChoices = [];
var activeQuestionPoints = 0;
var playerScore = 0;
var allPlayers;
var isPlaying = false;
var player;

startButton.addEventListener("click", function () {
  //when start button is pressed, we are starting timer to countdown down
  startTimer();

  //we are generating question
  getQuestion();

  //hiding "start screen"
  startScreen.setAttribute("class", "hide");

  // removing "hide" class from question block so it's being displayed on screen
  questionsBlock.classList.remove("hide");
  isPlaying = true;
  timerText.textContent = "0";
  playerScore = 0;
  allPlayers = [];
  player = {
    userName: "",
    userScore: playerScore,
  };
});

//timer function
function startTimer() {
  timer = setInterval(function () {
    //reducing timeLeft by 1
    timeLeft--;

    //updating timer on screen

    timerText.textContent = timeLeft;

    //checks if time run out. If so then clearing Timer and calling gameEnd() function
    if (timeLeft <= 0) {
      timerText.textContent = 0;
      gameEnd();
    }
  }, 1000);
}

//function to getQuestion object from question array
function getQuestion() {
  //check if active question index is same as array length
  //if it's same then it means it's last question and game ends
  if (activeQuestionIndex == questions.length && isPlaying) {
    gameEnd();
  }

  //resetting list elements
  questionChoices.textContent = "";
  //setting active question
  activeQuestion = questions[activeQuestionIndex].question;
  //setting active answer
  activeQuestionAnswer = questions[activeQuestionIndex].answer;
  //setting active question answer choices
  activeQuestionChoices = questions[activeQuestionIndex].options;
  //setting activeQuestion points
  activeQuestionPoints = questions[activeQuestionIndex].points;

  //display question and question choices
  questionText.textContent = activeQuestion;
  //generate for each Question answer choice individual button
  //with attached event listener and data-choice attribute set for button value
  for (var i = 0; i < activeQuestionChoices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = activeQuestionChoices[i];
    choiceButton.setAttribute("data-choice", activeQuestionChoices[i]);
    choiceButton.addEventListener("click", function (e) {
      var userChoice = e.target.getAttribute("data-choice");

      //checking if user selected correct answer
      //if so, then we are changing question to next one and increasing player score by question value
      //otherwise user receives time penalty for selecting wrong answer
      if (userChoice === activeQuestionAnswer) {
        playerScore += activeQuestionPoints;
        correctAnswerSound.play();
        getQuestion();
      } else {
        incorrectAnswerSound.play();
        timeLeft -= penaltyTime;
      }
    });
    questionChoices.appendChild(choiceButton);
  }
  //increase activeQuestion index for next question
  activeQuestionIndex++;
}

//function to Start game again
function startAgain() {
  endScreen.setAttribute("class", "hide");
  startScreen.classList.remove("hide");
}

//endGame function
function gameEnd() {
  timerText.textContent = 0;
  isPlaying = false;
  //resetting timer value
  timeLeft = 100;
  clearInterval(timer);
  //hiding questionsBlock
  questionsBlock.setAttribute("class", "hide");
  //displaying endScreen block
  endScreen.classList.remove("hide");
  //displaying player score on screen
  playerScoreText.textContent = playerScore;
  //resetting active questionIndex to beginning
  activeQuestionIndex = 0;
}

function submitScore(event) {
  //gets previous userScores

  getUserScores();
  event.preventDefault();

  //stores userInput and score into object
  //pushing this object into allPlayer array
  //then saving this array into local storage after array is stringified

  player = {
    userName: userInput.value,
    userScore: playerScore,
  };

  allPlayers.push(player);

  localStorage.setItem("userScore", JSON.stringify(allPlayers));

  //displaying start screen
  startAgain();
}
//function to receive previous userScores from localStorage
function getUserScores() {
  //converts stringified object back to array with JSON.Parse() function
  allPlayers = JSON.parse(localStorage.getItem("userScore"));
  //checks if userScores exists. if not set's it to empty array
  if (!allPlayers) {
    allPlayers = [];
  }
}
