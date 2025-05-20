const StartBut = document.querySelector(".Start-but");
const PopupInfo = document.querySelector(".popup-info");
const ExitBut = document.querySelector(".exit-but");
const Main = document.querySelector(".main");
const ContinueBut = document.querySelector(".continue-but");
const QuizSection = document.querySelector(".quiz-section");
const QuizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBut = document.querySelector(".tryagain-but");
const goHomeBut = document.querySelector(".gohome-but");

StartBut.onclick = () => {
  PopupInfo.classList.add("active");
  Main.classList.add("active");
};

ExitBut.onclick = () => {
  PopupInfo.classList.remove("active");
  Main.classList.remove("active");
};
ContinueBut.onclick = () => {
  QuizSection.classList.add("active");
  PopupInfo.classList.remove("active");
  Main.classList.remove("active");
  QuizBox.classList.add("active");
  showquestions(0);
  questioncounter(1);
  headerScore();
};
tryAgainBut.onclick = () => {
  QuizBox.classList.add("active");
  nextBut.classList.remove("active");
  resultBox.classList.remove("active");

  questioncount = 0;
  questionNum = 1;
  userScore = 0;
  showquestions(questioncount);
  questioncounter(questionNum);
  headerScore();
};

goHomeBut.onclick = () => {
  QuizSection.classList.remove("active");
  nextBut.classList.remove("active");
  resultBox.classList.remove("active");

  questioncount = 0;
  questionNum = 1;
  userScore = 0;
  showquestions(questioncount);
  questioncounter(questionNum);
};

let questioncount = 0;
let questionNum = 1;
let userScore = 0;

const nextBut = document.querySelector(".next-but");

nextBut.onclick = () => {
  if (questioncount < questions.length - 1) {
    questioncount++;
    showquestions(questioncount);

    questionNum++;
    questioncounter(questionNum);
    nextBut.classList.remove("active");
  } else {
    showResultBox();
  }
};

const optionList = document.querySelector(".option-list");

function showquestions(index) {
  const questiontext = document.querySelector(".question-text");
  questiontext.textContent = `${questions[index].num}. 
  ${questions[index].questions}`;

  let optionTag = `
  <div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>
`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onClick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questioncount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("incorrect");

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBut.classList.add("active");
}

function questioncounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}
function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `score:${userScore}/ ${questions.length}`;
}
function showResultBox() {
  const resultBox = document.querySelector(".result-box");
  const scoreText = document.querySelector(".score-text");
  const circularprogress = document.querySelector(".circular-progress");
  const progressVal = document.querySelector(".progress-val");

  QuizBox.classList.remove("active");
  resultBox.classList.add("active");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  let progressStartVal = -1;
  let progressEndVal = Math.round((userScore / questions.length) * 100);
  let speed = 20;
  let progress = setInterval(() => {
    progressStartVal++;
    progressVal.textContent = `${progressStartVal}%`;
    circularprogress.style.background = `conic-gradient(#c40094 ${
      progressStartVal * 3.6
    }deg, rgb(255, 255, 255, 0.1) 0deg)`;
    if (progressStartVal == progressEndVal) {
      clearInterval(progress);
    }
  }, speed);
}
