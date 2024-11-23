const questionList = [
  {
    id: 1,
    question: "What is the output of console.log(2 + '2') in JavaScript?",
    answers: ["22", "4", "NaN", "undefined"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which HTML tag is used for creating a hyperlink?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question:
      "Which part of a computer temporarily stores data for quick access?",
    answers: ["CPU", "GPU", "RAM", "SSD"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Where is the biggest roundabout in the world located?",
    answers: [
      "Tokyo, Japan",
      "Paris, France",
      "Dubai, UAE",
      "Putrajaya, Malaysia",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "Which HTML tag is used to create a drop-down list?",
    answers: ["<dropdown>", "<select>", "<option>", "<list>"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Which CSS property makes text italic?",
    answers: ["font-style", "text-italic", "style-font", "italicize"],
    correctAnswer: 0,
  },
  {
    id: 7,
    question: "Borneo is the ____ largest island in the whole world.",
    answers: ["First", "Second", "Third", "Fourth"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Jupiter", "Saturn", "Neptune"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Which CSS property controls the space between elements?",
    answers: ["border", "padding", "spacing", "margin"],
    correctAnswer: 3,
  },
  {
    id: 10,
    question:
      "Which mountain is the tallest in the world when measured from base to peak?",
    answers: [
      "Mount Everest, Himalayas",
      "Mauna Kea, Hawaii",
      "K2, Pakistan",
      "Kilimanjaro, East Africa",
    ],
    correctAnswer: 1,
  },
];

var currentQID = 0;
var score = 0;
// Array to update answer elements
const answerElements = [
  document.getElementById("answer1"),
  document.getElementById("answer2"),
  document.getElementById("answer3"),
  document.getElementById("answer4"),
];
const feedback = document.getElementById("feedback");
const startButton = document.getElementById("start-quiz");
startButton.onclick = startQuiz;
const nextButton = document.getElementById("next-question");
const quizContainer = document.getElementById("quiz-container");
const finalScoreContainer = document.getElementById("final-score-container");
const finalScore = document.getElementById("final-score");
// const restartButton = document.getElementById("restart-quiz");

function startQuiz() {
  startButton.classList.add("hide");
  quizContainer.classList.remove("hide");
  finalScoreContainer.classList.add("hide");
  currentQID = 0;
  score = 0;
  nextQuestion();
}

function nextQuestion() {
  feedback.innerText = ""; // Clear feedback
  nextButton.classList.add("hide"); // Hide next button
  answerElements.forEach((btn) => (btn.disabled = false)); // Enable all answer buttons
  const currentQuestion = questionList[currentQID]; // Get current questions;
  const { id, question, answers, correctAnswer } = currentQuestion; // Destructure question data

  // Update question number and question
  document.getElementById("question-number").innerText = `Question ${id}`;
  document.getElementById("question").innerText = question;

  answers.forEach((text, index) => {
    if (answerElements[index]) {
      answerElements[index].innerText = text; // set the answer list
    }
  });

  // Add event listeners to answer buttons
  answerElements.forEach((button, index) => {
    button.onclick = () => {
      //disable all buttons after one is clicked
      answerElements.forEach((btn) => (btn.disabled = true));

      checkAnswer(index, correctAnswer, id);
      nextButton.disabled = false; // Enable next button after select an answer
    };
  });

  currentQID++; // move to next question
}

function checkAnswer(index, answer, qid) {
  const currentQuestion = questionList[qid - 1];
  if (index == answer) {
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
    feedback.innerText = "Correct! Well done.";
  } else {
    feedback.innerText = `Wrong! The correct answer is ${currentQuestion.answers[answer]}`;
  }

  displayNextButton();
}

const displayNextButton = () => {
  if (currentQID == questionList.length) {
    nextButton.innerText = "Finish Quiz";
    nextButton.classList.remove("hide");
    nextButton.onclick = displayFinalScoreContainer;
    console.log(currentQID);
  } else {
    nextButton.classList.remove("hide");
  }
};

const displayFinalScoreContainer = () => {
  finalScoreContainer.classList.remove("hide");
  finalScore.innerText = "Score: " + score;
  startButton.innerText = "Restart Quiz";
  startButton.classList.remove("hide");
};

nextButton.addEventListener("click", nextQuestion);
