console.log("Hello! I am running!")

// import css
import   "./styles.css";

// import functions
import loadHomePage from "./home.js";
import loadMenuPage from "./menu.js";
import loadAboutPage from "./about.js";

// get content area
const contentArea = document.querySelector('#content');

// get buttons
const homeButton = document.querySelector('.home');
const menuButton = document.querySelector('.menu');
const aboutButton = document.querySelector('.about');

// add event listeners to the buttons
homeButton.addEventListener('click', ()=> {
    contentArea.innerHTML= '';
    loadHomePage();
})

menuButton.addEventListener('click', () => {
    contentArea.innerHTML = '';
    loadMenuPage();
})

aboutButton.addEventListener('click', () => {
    contentArea.innerHTML = '';
    loadAboutPage();
})

// load the home page when opening the site
loadHomePage();