const questions = [

{
question: "What does HTML stand for?",
answers: [
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyper Transfer Markup Language",
"Hyper Main Language"
],
correct: 0
},

{
question: "Which language makes websites interactive?",
answers: [
"HTML",
"CSS",
"JavaScript",
"Bootstrap"
],
correct: 2
},

{
question: "Which property changes text color?",
answers: [
"font-color",
"text-color",
"color",
"background"
],
correct: 2
},

{
question: "Which symbol is used for ID selector?",
answers: [
".",
"#",
"&",
"*"
],
correct: 1
},

{
question: "Which company created JavaScript?",
answers: [
"Apple",
"Netscape",
"Google",
"Microsoft"
],
correct: 1
},

{
question: "What does CSS stand for?",
answers: [
"Creative Style Sheets",
"Color Style Sheets",
"Cascading Style Sheets",
"Computer Style Sheets"
],
correct: 2
},

{
question: "Which tag creates a hyperlink?",
answers: [
"<img>",
"<div>",
"<a>",
"<p>"
],
correct: 2
},

{
question: "What does DOM mean?",
answers: [
"Document Object Model",
"Data Object Model",
"Digital Object Model",
"Desktop Object Model"
],
correct: 0
},

{
question: "Which method prints to console?",
answers: [
"console.print()",
"print()",
"console.log()",
"show()"
],
correct: 2
},

{
question: "Which brackets are used for arrays?",
answers: [
"{}",
"()",
"[]",
"<>"
],
correct: 2
}

];

// Random Questions

questions.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionText =
document.getElementById("questionText");

const answersContainer =
document.getElementById("answersContainer");

const questionNumber =
document.getElementById("questionNumber");

const progressBar =
document.getElementById("progressBar");

const nextBtn =
document.getElementById("nextBtn");

const timerBox =
document.getElementById("timerBox");

let timeLeft = 100;
let timer;

// ==========================
// QUESTION PAGE
// ==========================

if(questionText){

loadQuestion();

startTimer();

nextBtn.addEventListener("click", nextQuestion);

}

// ==========================
// LOAD QUESTION
// ==========================

function loadQuestion(){

selectedAnswer = null;

const q = questions[currentQuestion];

questionText.textContent = q.question;

questionNumber.textContent =
`Question ${currentQuestion + 1} / ${questions.length}`;

progressBar.style.width =
`${((currentQuestion + 1) / questions.length) * 100}%`;

answersContainer.innerHTML = "";

q.answers.forEach((answer,index)=>{

const button =
document.createElement("button");

button.classList.add("answer-btn");

button.textContent = answer;

button.addEventListener("click",()=>{

document
.querySelectorAll(".answer-btn")
.forEach(btn => {

btn.style.pointerEvents = "none";

});

selectedAnswer = index;

if(index === q.correct){

button.classList.add("correct");

score++;

}else{

button.classList.add("wrong");

document
.querySelectorAll(".answer-btn")
[q.correct]
.classList.add("correct");

}

});

answersContainer.appendChild(button);

});

}

// ==========================
// NEXT QUESTION
// ==========================

function nextQuestion(){

if(selectedAnswer === null){
return;
}

currentQuestion++;

if(currentQuestion < questions.length){

loadQuestion();

}else{

finishQuiz();

}

}

// ==========================
// TIMER
// ==========================

function startTimer(){

timer = setInterval(()=>{

timeLeft--;

timerBox.textContent =
`⏱ ${timeLeft}`;

if(timeLeft <= 0){

clearInterval(timer);

finishQuiz();

}

},1000);

}

// ==========================
// FINISH QUIZ
// ==========================

function finishQuiz(){

localStorage.setItem(
"quizScore",
score
);

let bestScore =
localStorage.getItem("bestScore") || 0;

if(score > bestScore){

localStorage.setItem(
"bestScore",
score
);

}

window.location.href =
"final.html";

}

// ==========================
// FINAL PAGE
// ==========================

const finalScore =
document.getElementById("finalScore");

if(finalScore){

const score =
Number(
localStorage.getItem("quizScore")
);

const bestScore =
localStorage.getItem("bestScore");

const percentage =
Math.round(
(score / questions.length) * 100
);

document.getElementById(
"finalScore"
).textContent =
`${score} / ${questions.length}`;

document.getElementById(
"percentage"
).textContent =
`${percentage}%`;

document.getElementById(
"bestScore"
).textContent =
bestScore;

}