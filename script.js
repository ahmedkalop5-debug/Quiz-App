const questions = [

{
question:"What does HTML stand for?",
answers:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyper Tool Language",
"Hyper Transfer Language"
],
correct:0
},

{
question:"Which language makes website interactive?",
answers:[
"HTML",
"CSS",
"JavaScript",
"Bootstrap"
],
correct:2
},

{
question:"Which property changes text color?",
answers:[
"font-color",
"text-color",
"color",
"background"
],
correct:2
},

{
question:"Which tag creates a link?",
answers:[
"<img>",
"<a>",
"<p>",
"<div>"
],
correct:1
},

{
question:"Which company created JavaScript?",
answers:[
"Google",
"Microsoft",
"Netscape",
"Apple"
],
correct:2
},

{
question:"Which symbol starts ID selector?",
answers:[
".",
"#",
"*",
"&"
],
correct:1
},

{
question:"Which method prints in console?",
answers:[
"log()",
"console.log()",
"print()",
"show()"
],
correct:1
},

{
question:"Array starts with?",
answers:[
"{}",
"()",
"[]",
"<>"
],
correct:2
},

{
question:"CSS stands for?",
answers:[
"Cascading Style Sheets",
"Computer Style Sheets",
"Creative Style Sheets",
"Color Style Sheets"
],
correct:0
},

{
question:"DOM means?",
answers:[
"Document Object Model",
"Data Object Model",
"Digital Object Model",
"Document Order Model"
],
correct:0
}

];

let currentQuestion = 0;
let score = 0;
let timer = 30;
let interval;

if(document.getElementById("question")){

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const timerEl = document.getElementById("timer");

loadQuestion();

function loadQuestion(){

clearInterval(interval);

timer = 30;

startTimer();

let q = questions[currentQuestion];

questionEl.innerText = q.question;

progressText.innerText =
`Question ${currentQuestion+1} / ${questions.length}`;

progressBar.style.width =
`${((currentQuestion+1)/questions.length)*100}%`;

answersEl.innerHTML="";

q.answers.forEach((answer,index)=>{

const btn=document.createElement("button");

btn.classList.add("answer");

btn.innerText=answer;

btn.onclick=()=>selectAnswer(index);

answersEl.appendChild(btn);

});

}

function selectAnswer(index){

if(index===questions[currentQuestion].correct){
score++;
}

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}else{

localStorage.setItem("score",score);

let best =
localStorage.getItem("bestScore") || 0;

if(score > best){
localStorage.setItem("bestScore",score);
}

window.location="final.html";
}

}

function startTimer(){

timerEl.innerText=timer;

interval=setInterval(()=>{

timer--;

timerEl.innerText=timer;

if(timer===0){

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}else{

localStorage.setItem("score",score);

window.location="final.html";

}

}

},1000);

}

}

if(document.getElementById("finalScore")){

document.getElementById("finalScore").innerText=
`${localStorage.getItem("score")} / 10`;

document.getElementById("bestScore").innerText=
`Best Score : ${localStorage.getItem("bestScore") || 0}`;
}