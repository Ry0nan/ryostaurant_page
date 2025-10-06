console.log("Hello! I am running!")

// IMPORTS
import "./css/main.css";
import loadHomePage from "./home.js";
import loadMenuPage from "./menu.js";
import loadAboutPage from "./about.js";
import './musicPlayer.js';

// DOM Selectors
const contentArea = document.querySelector('#content');
const homeButton = document.querySelector('.home');
const menuButton = document.querySelector('.menu');
const aboutButton = document.querySelector('.about');

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

    contentArea.innerHTML = '';
    setActiveButton(homeButton);
    loadHomePage();

});

menuButton.addEventListener('click', () => {

    contentArea.innerHTML = '';
    setActiveButton(menuButton);
    loadMenuPage();

});

aboutButton.addEventListener('click', () => {

    contentArea.innerHTML = '';
    setActiveButton(aboutButton);
    loadAboutPage();
    
});

// Page Startup Load
loadHomePage();
setActiveButton(homeButton);