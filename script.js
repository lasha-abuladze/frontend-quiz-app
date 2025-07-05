`use strict`;

const body = document.querySelector(`body`);
const themeSwitcherBtn = document.querySelector(`.div--theme-switcher`);
const themeSwitcherIcons = document.querySelectorAll(`.theme-switcher--icon`);

let subTittle = document.querySelector(`.subtittle`);
const listCell = document.querySelectorAll(`.quiz-list--li`);


const themeSwitcherBtnCircle = document.querySelector(`.theme-switcher--circle`);
const answersLine = document.querySelector(`.line--`);

const labelsList = document.querySelectorAll(`.answer-label`);

const sections = document.querySelectorAll(`.section`);
const quizList = document.querySelector(`.quiz-list`);

const quizHeader = document.querySelector(`.section--quiz-header`);
const answersList = document.querySelector(`.ul--answers-list`);
let answersIcons;

const submitAnswer = document.querySelector(`.submit-answer--btn`);
const nextQuestionBtn = document.querySelector(`.next-question--btn`);
const formBtns = document.querySelectorAll(`.submit-btn`);
const selectAnswerT = document.querySelector(`.select-answer`);
const finalScoreDiv = document.querySelector(`.final-score`);

let inputs;

let chosenQuizTopic;
let chosenQuiz;

let questionNumber = 1;
let totalScore = 0;
let answerOrder;


let chosenAnswerLabel;
let chosenAnswer;
let correctAnswer;



themeSwitcherBtn.addEventListener(`click`, switchTheme);

chooseQuiz();


function switchTheme() {
    body.classList.toggle(`body-dark`);
    themeSwitcherIcons.forEach(el => el.classList.toggle(`display-none`));
    subTittle.classList.toggle(`subtittle-dark`);
    listCell.forEach(el => el.classList.toggle(`listcell-dark`));
    themeSwitcherBtnCircle.classList.toggle(`theme-switcher--circle-dark`);
    answersLine.classList.toggle(`line--dark`);
    labelsList.forEach(el => el.classList.toggle(`answer-label--dark`));
}


function chooseQuiz() {

    quizList.addEventListener(`click`, (e) => {

        if(!e.target.closest(`.quiz-list--li`)) return;

        chosenQuizTopic = e.target.closest(`.quiz-list--li`)
                            .querySelector(`.quiz-name`).textContent
                            .toUpperCase()
        ;
        
        displayQuiz();

        
    })

}

function displayQuiz() {

    fetch(`./data.json`).then(res => res.json()).then(data => {

        sections.forEach(el => {
            if(!el.classList.contains(`display-none`)) {
                el.classList.add(`display-none`)
            } else if (el.classList.contains(`section--quiz`)) {
                el.classList.remove(`display-none`);
            }
        });

        data.quizzes.forEach(el => {
            if(el.title.toUpperCase() === chosenQuizTopic) {
                chosenQuiz = el
            }
        })

        displayQuestion();
        displayAnswers();
    })

}


function displayQuestion() {
    
    quizHeader.textContent = ``;
    
    const questionHTML = `
        <p class="subtittle">Question
            <span class="question-number">${questionNumber}</span> of 
            <span class="quiz-length">${chosenQuiz.questions.length}</span>
        </p>

        <p class="question">
            ${chosenQuiz.questions[questionNumber - 1].question}
        </p>
    `

    quizHeader.insertAdjacentHTML(`afterbegin`, questionHTML);
}


function displayAnswers() {

    answersList.textContent = ``;

    chosenQuiz.questions[questionNumber -1].options.forEach((el,i) => {

        displayAnsersOrder(i);

        function escapeHTML(str) {
            return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
        } 


        const answersHTML = `
            <li class="answers-list--li">
                <input class="input" type="radio" name="answer" id="${i}">
                <label class="answer-label" for="${i}">
                    <p>
                        <span class="questions-order">${answerOrder}</span>
                        <span class="answer">${escapeHTML(el)}</span>
                    </p>
    
                    <img class="answer-icon" src="./assets/images/icon-error.svg" alt="error_icon">
                    <img class="answer-icon display-none" src="./assets/images/icon-correct.svg" alt="correct_icon">
                </label>
            </li>
        `

        answersList.insertAdjacentHTML(`afterbegin`, answersHTML);
    })

    correctAnswer = chosenQuiz.questions[questionNumber -1].answer;

    inputs = document.querySelectorAll(`.input`);

    chooseAnswer();
}


function displayAnsersOrder(i) {
    if(i === 0) {
        answerOrder = `d`
    } else if (i === 1) {
        answerOrder = `c`
    } else if (i === 2) {
        answerOrder = `b`
    } else if (i === 3) {
        answerOrder = `a`
    }
}

function chooseAnswer() {

    answersList.addEventListener(`click`, (e) => {
        const answerLabel = e.target.closest(`.answer-label`);

        if(!answerLabel) return;

        answersIcons = answerLabel.querySelectorAll(`.answer-icon`);
        chosenAnswer =  answerLabel?.querySelector(`.answer`).textContent;

        chosenAnswerLabel = answerLabel;
    })
}


function displayScorSection() {

    finalScoreDiv.textContent = ``;
    
    sections.forEach(el => {
        if(el.classList.contains(`section--quiz-completed`)) {
            el.classList.remove(`display-none`)
        } else {
            el.classList.add(`display-none`)
        }
    })

    const finalScoreHTML = `
        <figure class="figure--quiz-logo">
            <img src="./assets/images/icon-html.svg" alt="html_icon">
            <figcaption>HTML</figcaption>
        </figure>
        <p>
            <b>${totalScore}</b>
            <span class="subtittle">out of 10</span>
        </p>        
    `
    finalScoreDiv.insertAdjacentHTML(`afterbegin`, finalScoreHTML);
}



submitAnswer.addEventListener(`click`, (e) => {
    e.preventDefault();
    questionNumber++;
    
    if (!chosenAnswer) {
        selectAnswerT.classList.remove(`display-none`);

    } else if (chosenAnswer === correctAnswer) {
        totalScore++;

        chosenAnswerLabel?.classList.add(`correct-answer`);
        answersIcons?.forEach(el => {
            el.classList.toggle(`display-none`);
            el.style.visibility = `visible`
        });

        formBtns.forEach(el => el.classList.toggle(`display-none`));
        selectAnswerT.classList.contains(`display-none`) ? null : selectAnswerT.classList.add(`display-none`);
        inputs.forEach(el => el.remove());

    } else if (chosenAnswer !== correctAnswer) {

        chosenAnswerLabel?.classList.add(`wrong-answer`);
        answersIcons?.forEach(el => el.style.visibility = `visible`);
        formBtns.forEach(el => el.classList.toggle(`display-none`));
        selectAnswerT.classList.contains(`display-none`) ? null : selectAnswerT.classList.add(`display-none`);
        inputs.forEach(el => el.remove());
    }

});


nextQuestionBtn.addEventListener(`click`, (e) => {
    e.preventDefault();

    if(questionNumber < 11) {

        chosenAnswer = ``;
        formBtns.forEach(el => el.classList.toggle(`display-none`));
    
        fetch(`./data.json`).then(res => res.json()).then(data => {
    
            displayQuestion();
            displayAnswers();
        })
    } else {
        displayScorSection();
    }

})



