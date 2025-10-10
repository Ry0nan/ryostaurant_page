console.log("Hello! I am running!")

// <--- IMPORTS --->
// css
import "./css/main.css";
// pages
import loadHomePage from "./home.js";
import loadMenuPage from "./menu.js";
import loadAboutPage from "./about.js";
// music player
import './musicPlayer.js';
// UI Sounds
import clickSfx from './assets/audio/ui-sounds/ui-pop-sound.mp3';
// utils
import { playClickSoundSfx } from './utils.js';

// DOM Selectors
const contentArea = document.querySelector('#content');
const homeButton = document.querySelector('.home');
const menuButton = document.querySelector('.menu');
const aboutButton = document.querySelector('.about');

// sounds
const clickSound = new Audio(clickSfx);

// DOM Button Array
const headerButtonArray = [homeButton, menuButton, aboutButton];

// set button to active when clicked 
function setActiveButton(buttonToActivate) {
    headerButtonArray.forEach(function(headerButton){
        headerButton.classList.remove('active-tab');
    })
    buttonToActivate.classList.add('active-tab')
}

// Button Event Listeners
homeButton.addEventListener('click', () => {

    // play click sound effects
    playClickSoundSfx(clickSound);

    // load pages
    contentArea.innerHTML = '';
    setActiveButton(homeButton);
    loadHomePage();

});

menuButton.addEventListener('click', () => {

    // play click sound effects
    playClickSoundSfx(clickSound);

    // load pages
    contentArea.innerHTML = '';
    setActiveButton(menuButton);
    loadMenuPage();

});

aboutButton.addEventListener('click', () => {

    // play click sound effects
    playClickSoundSfx(clickSound);

    // load pages
    contentArea.innerHTML = '';
    setActiveButton(aboutButton);
    loadAboutPage();
    
});

// Page Startup Load
loadHomePage();
setActiveButton(homeButton);