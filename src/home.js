// import assets
import SeiunSkyWallpaper from './assets/images/uma_wallpaper.webp';

// function to load the home page 
function loadHomePage() {    
    // get the html content area
    const contentArea = document.querySelector('#content');

    // heading?
    const mainHeading = document.createElement('h1');
    mainHeading.textContent = "Welcome to Umastaurant";
    mainHeading.className = "hero-title";
    contentArea.append(mainHeading);

    //paragraph?
    const subHeading = document.createElement('p');
    subHeading.textContent = "Welcome to our Umamusume themed restaurant!";
    contentArea.append(subHeading)

    //image?
    const mainWallpaper = document.createElement('img');
    mainWallpaper.src = SeiunSkyWallpaper;
    mainWallpaper.alt = "Our Umastaurant Wallpaper";
    contentArea.append(mainWallpaper);
}

// export home page function
export default loadHomePage;