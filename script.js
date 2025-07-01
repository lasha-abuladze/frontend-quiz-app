`use strict`;

const body = document.querySelector(`body`);
const themeSwitcherBtn = document.querySelector(`.div--theme-switcher`);
const themeSwitcherIcons = document.querySelectorAll(`.theme-switcher--icon`);


let subTittle = document.querySelector(`.subtittle`);
const listCell = document.querySelectorAll(`.quiz-list--li`);


const themeSwitcherBtnCircle = document.querySelector(`.theme-switcher--circle`);
const answersLine = document.querySelector(`.line--`);

const labelsList = document.querySelectorAll(`.answer-label`);






themeSwitcherBtn.addEventListener(`click`, () => switchTheme());


function switchTheme() {
    body.classList.toggle(`body-dark`);
    themeSwitcherIcons.forEach(el => el.classList.toggle(`display-none`));
    subTittle.classList.toggle(`subtittle-dark`);
    listCell.forEach(el => el.classList.toggle(`listcell-dark`));
    themeSwitcherBtnCircle.classList.toggle(`theme-switcher--circle-dark`);
    answersLine.classList.toggle(`line--dark`);
    labelsList.forEach(el => el.classList.toggle(`answer-label--dark`));
}