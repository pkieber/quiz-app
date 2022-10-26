// HTML-Questions (first quiz).
let questions = [
    {
        "questionQuiz": "Who invented HTML?",
        "answer_1": "Bill Gates",
        "answer_2": "Lucy Liu",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Sergey Brin",
        "rightAnswer": 3
    },
    {
        "questionQuiz": "Which tags are examples of 'value' attributes?",
        "answer_1": "'li', 'input', 'option'",
        "answer_2": "'input', 'option', 'textarea'",
        "answer_3": "'input', 'label', 'meter'",
        "answer_4": "'button', 'input', 'form'",
        "rightAnswer": 1
    },
    {
        "questionQuiz": "The best examples of void elements?",
        "answer_1": "'iframe', 'frame', and 'frameset'",
        "answer_2": "'frame'",
        "answer_3": "'frame' and 'frameset'",
        "answer_4": "'iframe'",
        "rightAnswer": 4
    },
    {
        "questionQuiz": "The best way to apply bold styling to text?",
        "answer_1": "'strong'",
        "answer_2": "Use CSS",
        "answer_3": "'b'",
        "answer_4": "'bold'",
        "rightAnswer": 1
    },
    {
        "questionQuiz": "What is NOT a valid attribute for the 'textarea'?",
        "answer_1": "'readonly'",
        "answer_2": "'max'",
        "answer_3": "'form'",
        "answer_4": "'spellcheck'",
        "rightAnswer": 2
    }
];


// Auxiliary variables (initial value of 0).
let rightQuestions = 0;
let currentQuestion = 0;


// Clicking sounds.
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/wrong.mp3');
let AUDIO_FINISH = new Audio('audio/applause.mp3');


// Initialize when page is loaded.
function init() {
    document.getElementById('allQuestions').innerHTML = questions.length; // Defines the number of the questions.
    showQuestion(); // Shows the questions. 
}


// Show current question or endscreen.
function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateToNextQuestion();
    }
}


function gameIsOver(){
    return currentQuestion >= questions.length;
}


function showEndscreen(){
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('amountOfQuestions').innerHTML = questions.length; // Total number of questions.
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions; // For every correct answer: +1. 
}


function updateProgressBar(){
    let percent = (currentQuestion +1) / questions.length; // Used for progress bar.
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}


// Reset progress bar values when starting/restarting game.
function resetProgressBar(){
    let percent = (currentQuestion) / questions.length; // Used for progress bar.
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}


function updateToNextQuestion(){
    let question = questions[currentQuestion]; 
    document.getElementById('questionNumber').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question['questionQuiz'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


// Check if answer is correct (selection vs. right answer) + play sound + change button-color.
function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1); // Get last character (e.g. 1) from string (e.g answer_1) - as ID.
    let idOfRightAnswer = `answer_${question['rightAnswer']}`;
    if (rightAnswerSelected(question, selectedQuestionNumber)) {
        rightAnswerSetting(selection);
    } else {
        wrongAnswerSetting(selection, idOfRightAnswer);
    }
    document.getElementById('nextButton').disabled = false; // Button only clickable when answer is selected.
}


function rightAnswerSelected(question, selectedQuestionNumber){
    return selectedQuestionNumber == question['rightAnswer'];
}


function rightAnswerSetting(selection){
    document.getElementById(selection).parentNode.classList.add('bg-success');
    document.getElementById('quizQuestions').classList.add(('quiz-questions-lock'));
    AUDIO_SUCCESS.play();
    rightQuestions++;
}


function wrongAnswerSetting(selection, idOfRightAnswer){
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById('quizQuestions').classList.add(('quiz-questions-lock'));
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
}


// Button to move to previous question.
function nextQuestion() {
    updateProgressBar();
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButtons();
    document.getElementById('quizQuestions').classList.remove(('quiz-questions-lock'));
    showQuestion();
}


// Button-color change to presetting.
function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


// Restart game (see button on endscreen).
function restartGame() {
    resetProgressBar();
    document.getElementById('startScreen').style= '';
    document.getElementById('endScreen').style = 'display: none'; // Disable endscreen again. 
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}


// Start game (see button on startscreen).
function startGame() {
    resetProgressBar();
    document.getElementById('startScreen').style = 'display: none'; // Disable endscreen again.
    document.getElementById('questionBody').style = ''; // Enable 'questionbody' again. 
    rightQuestions = 0; // Change to presetting.
    currentQuestion = 0;
    init();
}


function startHtmlQuiz(){
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('quizQuestions').classList.remove(('quiz-questions-lock'));
    rightQuestions = 0;
    currentQuestion = 0;
    resetAnswerButtons();
    startGame();
}