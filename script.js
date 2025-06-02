`use strict`;

const body = document.querySelector(`body`);
const switcherIcon = document.querySelector(`.switcher-icon`);
const switcherCircle = document.querySelector(`.switcher-circle`);
const themeSwitcherIcons = document.querySelectorAll(`.theme-switcher--icon`);
const themeSwitchers = document.querySelectorAll(`.switch-theme`);

const quizzesList = document.querySelectorAll(`.quiz-topics-list--li`);
const ind = document.querySelectorAll(`.ind`);


themeSwitchers.forEach(switchTheme);


/// switchTheme function swotchs theme from light to dark and vice verca;
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

