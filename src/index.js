console.log("Hello! I am running!")

// IMPORTS
import   "./styles.css";
import loadHomePage from "./home.js";
import loadMenuPage from "./menu.js";
import loadAboutPage from "./about.js";

// DOM Selectors
const contentArea = document.querySelector('#content');
const homeButton = document.querySelector('.home');
const menuButton = document.querySelector('.menu');
const aboutButton = document.querySelector('.about');

// Button Event Listeners
homeButton.addEventListener('click', () => {
    // Clear the active class from all buttons
    homeButton.classList.remove('active-tab');
    menuButton.classList.remove('active-tab');
    aboutButton.classList.remove('active-tab');
    
    // Add the active class to the clicked button
    homeButton.classList.add('active-tab');

    // Load the page content
    contentArea.innerHTML = '';
    loadHomePage();
});

menuButton.addEventListener('click', () => {
    // Clear the active class from all buttons
    homeButton.classList.remove('active-tab');
    menuButton.classList.remove('active-tab');
    aboutButton.classList.remove('active-tab');

    // Add the active class to the clicked button
    menuButton.classList.add('active-tab');

    // Load the page content
    contentArea.innerHTML = '';
    loadMenuPage();
});

aboutButton.addEventListener('click', () => {
    // Clear the active class from all buttons
    homeButton.classList.remove('active-tab');
    menuButton.classList.remove('active-tab');
    aboutButton.classList.remove('active-tab');

    // Add the active class to the clicked button
    aboutButton.classList.add('active-tab');

    // Load the page content
    contentArea.innerHTML = '';
    loadAboutPage();
});

// Page Startup Load
loadHomePage();
homeButton.classList.add('active-tab');