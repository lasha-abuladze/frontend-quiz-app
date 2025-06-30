`use strict`;

const body = document.querySelector(`body`);
const themeSwitcherBtn = document.querySelector(`.div--theme-switcher`);
const themeSwitcherIcons = document.querySelectorAll(`.theme-switcher--icon`);
let subTittle = document.querySelector(`.subtittle`);
let listCell = document.querySelectorAll(`.quiz-list--li`);
const xx = document.querySelector(`.theme-switcher--circle`);



// Toggle between light and dark themes when the themeSwitcher button is clicked.
// - Toggles 'body-dark' class on the body element
// - Shows/hides theme switcher icons by toggling 'display-none' class
// - Changes subtitle style by toggling 'subtittle-dark' class
// - Updates each list cell's style by toggling 'listcell-dark' class

themeSwitcherBtn.addEventListener(`click`, () => switchTheme());


function switchTheme() {
    body.classList.toggle(`body-dark`);
    themeSwitcherIcons.forEach(el => el.classList.toggle(`display-none`));
    subTittle.classList.toggle(`subtittle-dark`);
    listCell.forEach(el => el.classList.toggle(`listcell-dark`));
    xx.classList.toggle(`theme-switcher--circle-dark`)
}