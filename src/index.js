console.log("Hello! I am running!")

import   "./styles.css";

// get the html content area
const contentArea = document.querySelector('#content');

// heading?
const mainHeading = document.createElement('h1');
mainHeading.textContent = "Welcome to Umastaurant";
mainHeading.className = "hero-title";
contentArea.append(mainHeading);

//paragraph?
const subHeading = doocument.createElement('p');
subHeading = "Welcome to our Umamusume themed restaurant!";
contentArea.append(subHeading)