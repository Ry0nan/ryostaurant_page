// <--- IMPORTS --->
// css
import "./css/menu.css";
// assets
import carrotIcon from './assets/images/icon-images/carrot-icon.png';
import bushelOfCarrots from './assets/images/icon-images/bushel-of-carrots-icon.png';
import deluxeCarrotHamburgerSteak from './assets/images/icon-images/deluxe-carrot-hamburger-steak-icon.png';
import { playClickSoundSfx } from './utils.js';
import menuClickSfx from './assets/audio/ui-sounds/ui-pop-sound.mp3'; 

/*
    I never expected to use OOP concepts here. But hey it works
    I wanted the menu items to be scalable just in case Oguri wanted more food
*/

// audio
const menuCardSound = new Audio(menuClickSfx);

// menu items 
const umenuItems = [
    {
        name: "Carrot",
        price: "¥100",
        description: "Energy + 20",
        image: carrotIcon
    },
    {
        name: "Bushel of Carrots",
        price: "¥500",
        description: "Energy +20, Mood + 1, All stats +5",
        image: bushelOfCarrots
    },
    {
        name: "Deluxe Carrot Hamburger Steak",
        price: "¥1000",
        description: "Energy + 30, Mood + 2, All Stats + 10",
        image: deluxeCarrotHamburgerSteak
    },
]

// <--- POP UP MODAL --->
const modalOverlay = document.createElement('div');
modalOverlay.className = 'menu-modal-overlay';

// the main pop-up container
const modalContainer = document.createElement('div');
modalContainer.className = 'menu-modal-container';

// the content that goes inside the container
const modalImage = document.createElement('img');
modalImage.className = 'modal-item-image';

const modalName = document.createElement('h3');
modalName.className = 'modal-item-name';

const modalPrice = document.createElement('p');
modalPrice.className = 'modal-item-price';

const modalDescription = document.createElement('p');
modalDescription.className = 'modal-item-description';

const modalCloseButton = document.createElement('button');
modalCloseButton.textContent = 'Close';
modalCloseButton.className = 'modal-close-button';

// assemble the modal
modalContainer.append(modalImage);
modalContainer.append(modalName);
modalContainer.append(modalPrice);
modalContainer.append(modalDescription);
modalContainer.append(modalCloseButton);

// add the container to the overlay and the overlay to the page
modalOverlay.append(modalContainer);
document.body.append(modalOverlay);

// close the modal
modalCloseButton.addEventListener('click', () => {
    modalOverlay.classList.remove('is-visible');
});

modalOverlay.addEventListener('click', (e) => {
    // Only close if the click is on the overlay itself
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('is-visible');
    }
});

// open modal
function openMenuModal(menuItem) {
    modalImage.src = menuItem.image;
    modalName.textContent = menuItem.name;
    modalPrice.textContent = menuItem.price;
    modalDescription.textContent = menuItem.description;

    modalOverlay.classList.add("is-visible");
}


function loadMenuPage(){
    // get the html content area
    const contentArea = document.querySelector('#content');
    contentArea.innerHTML = '';

    // temp heading
    const menuHeading = document.createElement('h2');
    menuHeading.textContent = "This is our Umenu";
    menuHeading.className = "menu-heading";
    contentArea.append(menuHeading);

    // heading description
    const menuDescription = document.createElement('p');
    menuDescription.textContent = "Yes, just a bunch of carrots";
    menuDescription.className = 'menu-description';
    contentArea.append(menuDescription);

    // menu grid
    const umenuGrid = document.createElement('div');
    umenuGrid.className = 'umenu-grid';

    // logic to put each card of the menu
    umenuItems.forEach(function(menuItem){
        const menuCard = document.createElement('div');
        menuCard.className = 'menu-card';

        const menuCardImage = document.createElement('img');
        menuCardImage.src = menuItem.image;

        const menuName = document.createElement('h3');
        menuName.textContent = menuItem.name;

        menuCard.append(menuCardImage);
        menuCard.append(menuName);

        menuCard.addEventListener('click', () => {
            openMenuModal(menuItem);
        })

        menuCard.addEventListener('click', () => {
            playClickSoundSfx(menuCardSound);
            openMenuModal(menuItem);
        });

        umenuGrid.append(menuCard);

    });

    contentArea.append(umenuGrid);

}

// export Menu section
export default loadMenuPage;