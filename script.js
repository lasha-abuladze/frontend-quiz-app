`use strict`;

const body = document.querySelector(`body`);
const switcherIcon = document.querySelector(`.switcher-icon`);
const switcherCircle = document.querySelector(`.switcher-circle`);
const themeSwitcherIcons = document.querySelectorAll(`.theme-switcher--icon`);
const themeSwitchers = document.querySelectorAll(`.switch-theme`);



themeSwitchers.forEach(switchTheme);


/// switchTheme function swotchs theme from light to dark and vice verca;
function switchTheme (el) {
    el.addEventListener(`click`, () => {
        switcherCircle.classList.toggle(`dark-switcher`);
        themeSwitcherIcons.forEach(el => {
            el.classList.toggle(`display-none`)
        })
        body.classList.toggle(`body-dark`)
    })
}

