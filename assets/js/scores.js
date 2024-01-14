var highScores = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");

var scoreList;

clearBtn.addEventListener("click", function () {
  //clearing local storage and removing stored data
  localStorage.clear();

  //resetting ol list and removing child elements
  highScores.textContent = "";
  //calling getScores function to reset scoreList array
  getScores();
});

function getScores() {
  scoreList = JSON.parse(localStorage.getItem("userScore"));
  //checking if scoreList have any values. if not then returns early from function
  if (!scoreList) {
    return;
  }
  //if scoreList have items, then it's looping though each array element and creating
  //"li" element with username and scores and adding as child to "ol" element
  for (var i = 0; i < scoreList.length; i++) {
    console.log(scoreList[i].userName);
    var li = document.createElement("li");
    li.textContent = `${scoreList[i].userName} - ${scoreList[i].userScore}`;
    highScores.appendChild(li);
  }
}
getScores();
