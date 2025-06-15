`use strict`;

const body = document.querySelector(`body`);
const switcherIcon = document.querySelector(`.switcher-icon`);
const switcherCircle = document.querySelector(`.switcher-circle`);
const themeSwitcherIcons = document.querySelectorAll(`.theme-switcher--icon`);
const themeSwitchers = document.querySelectorAll(`.switch-theme`);

const quizzesList = document.querySelectorAll(`.quiz-topics-list--li`);
const ind = document.querySelectorAll(`.ind`);


const sections = document.querySelectorAll(`.section`);
const quizTopicsListBtn = document.querySelectorAll(`.quiz-topics-list--li`);

const quizHeader = document.querySelector(`.quiz-header`);
const answersList = document.querySelector(`.answers-list`);


let questionNumber = 0;
let answerIndex = ``;

let quizTopic = ``;
let quiz;

themeSwitchers.forEach(switchTheme);

quizTopicsListBtn.forEach(chooseQuiz);



/// switchTheme function switchs theme from light to dark and vice verca;
function switchTheme (el) {
    el.addEventListener(`click`, () => {
        switcherCircle.classList.toggle(`dark-switcher`);
        themeSwitcherIcons.forEach(el => {
            el.classList.toggle(`display-none`)
        })
        body.classList.toggle(`body-dark`);
        quizzesList.forEach(el => el.classList.toggle(`list--dark`));
        ind.forEach(el => el.classList.toggle(`dark-p`));
    })
}

/// shooseQuiz functions changes sections and displaies chosen quiz
function chooseQuiz (el) {

    el.addEventListener(`click`, () => {
        questionNumber++;
        quizTopic = el.querySelector(`.quiz-topic`).textContent.toUpperCase();
        sections.forEach(el => el.classList.toggle(`display-none`))
        displayQuiz();
    })
}




function displayQuiz () {

    fetch(`./data.json`).then(res => res.json()).then(data => {

        data.quizzes.forEach((el, i) => {            
            if(quizTopic === el.title.toUpperCase()) {
                quiz = data.quizzes[i].questions;
            }
        })

        displayQuestion(quiz);
        displayAnswers(quiz);

    })

}



function displayQuestion(quiz) {

    quizHeader.textContent = ``;
    
    const quizQuestionHTML = `
                <p class="question-number">
                    Question ${questionNumber} of ${quiz.length}
                </p>
                
                <p class="question">
                    ${quiz[questionNumber-1].question}
                </p>
    `

    quizHeader.insertAdjacentHTML(`afterbegin`, quizQuestionHTML);
}



function displayAnswers(quiz) {
    answersList.textContent = ``;

    quiz[questionNumber-1].options.forEach((el, i)=> {
        
        if (i===0) {
            answerIndex = `d`
        } else if (i===1) {
            answerIndex = `c`
        } else if (i===2) {
            answerIndex = `b`
        } else if (i===3) {
            answerIndex = `a`
        }

        const answerHTML = `
            <li class="answers-list--li">
                <input type="radio" id="${i}" name="answer">
                <label class="answers-list--label" for="${i}">
                    <p>
                        <b class="answer-number">
                            ${answerIndex}
                        </b>
                        ${el}
                    </p>
                </label>
            </li>    
        `

        answersList.insertAdjacentHTML(`afterbegin`, answerHTML);

    })

}



