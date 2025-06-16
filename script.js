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

const submitBtn = document.querySelector(`.submit-btn`);
const selectAnswer = document.querySelector(`.select-answer`);


let questionNumber = 0;
let answerIndex = ``;

let quizTopic = ``;
let quiz;

let label;
let chosenAnswer = ``;
let correcrAnswer = ``;

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

    correcrAnswer = quiz[questionNumber - 1].answer;
    // console.log(correcrAnswer);
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
                        <span class="span-answer">${el}</span>
                    </p>
                    <div class="div--correct-wrong--icons">
                        <img class="correct-icon display-none" src="./assets/images/icon-correct.svg" alt="correct icon">
                        <img class="error-icon display-none" src="./assets/images/icon-error.svg" alt="error icon">
                    </div>
                </label>
            </li>
            
        `

        answersList.insertAdjacentHTML(`afterbegin`, answerHTML);

    })

}



answersList.addEventListener(`click`, (e) => {

    const clickedLabel = e.target.closest(`.answers-list--label`);
    if(!clickedLabel) return;

    chosenAnswer = clickedLabel.querySelector(`.span-answer`).textContent;
    label = clickedLabel;
})



submitBtn.addEventListener(`click`, (e) => {

    e.preventDefault();

    if(chosenAnswer === ``) {
        console.log(`choose answer`)
        selectAnswer.classList.remove(`display-none`)

    } else if(chosenAnswer !== `` && chosenAnswer !== correcrAnswer) {
        console.log(`wrong answer`)
        console.log(chosenAnswer);
        console.log(correcrAnswer);

        if(!selectAnswer.classList.contains(`display-none`)) {
            selectAnswer.classList.add(`display-none`)
        }

        document.querySelectorAll(`.answers-list--label`)
        .forEach(el => {
            if(el.classList.contains(`wrong-answer--label`)) {
                el.classList.remove(`wrong-answer--label`)
            }
        })

        label.classList.add(`wrong-answer--label`);



    } else if (chosenAnswer !== `` && chosenAnswer === correcrAnswer) {
        console.log(`hiiiii`);

        if(!selectAnswer.classList.contains(`display-none`)) {
            selectAnswer.classList.add(`display-none`)
        }

        document.querySelectorAll(`.answers-list--label`)
        .forEach(el => {
            if(el.classList.contains(`wrong-answer--label`)) {
                el.classList.remove(`wrong-answer--label`)
            }
        })
        
        label.classList.add(`correct-answer--label`);
        
    }

})

