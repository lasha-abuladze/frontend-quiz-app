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



let chosenQuizTopic;
let chosenQuiz;

let questionNumber = 1;



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

        console.log(data)

        data.quizzes.forEach(el => {
            if(el.title.toUpperCase() === chosenQuizTopic) {
                chosenQuiz = el
            }
        })

        displayQuestion();
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