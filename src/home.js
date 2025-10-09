// import assets
import SeiunSkyWallpaper from './assets/images/bg-images/uma_wallpaper.webp';
import OguriAndGang from './assets/images/bg-images/oguri_and_gang.png'

// function to load the home page 
function loadHomePage() {    
    // 1. Get and prepare the main content container
    const contentArea = document.querySelector('#content');
    contentArea.innerHTML = ''; 
    contentArea.className = 'scroll-container'; 

    // --- Create Panel One ---
    const panelOne = document.createElement('section');
    panelOne.className = 'home-panel panel-one';
    
    // Set the background image for this panel using JavaScript
    panelOne.style.backgroundImage = `url(${OguriAndGang})`;

    // Create the headline and paragraph (your existing code)
    const mainHeading = document.createElement('h1');
    mainHeading.textContent = "Welcome to Umastaurant";
    mainHeading.className = "hero-title";

    const subHeading = document.createElement('p');
    subHeading.textContent = "Welcome to our Umamusume themed restaurant!";
    
    // Append the text to Panel One
    panelOne.append(mainHeading);
    panelOne.append(subHeading);

    // --- Create Panel Two (Placeholder) ---
    const panelTwo = document.createElement('section');
    panelTwo.className = 'home-panel panel-two';
    
    const panelTwoHeading = document.createElement('h2');
    panelTwoHeading.textContent = "Discover Our Menu";
    panelTwo.append(panelTwoHeading);

    // --- Append the panels to the main container ---
    contentArea.append(panelOne);
    contentArea.append(panelTwo);
}

// export home page function
export default loadHomePage;