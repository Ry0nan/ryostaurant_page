// <--- IMPORTS --->
import './css/about.css';

function loadAboutPage(){
    // get the html content area
    const contentArea = document.querySelector('#content');
    contentArea.innerHTML = '';

    // temp heading
    const aboutHeading = document.createElement('h2');
    aboutHeading.textContent = "What is Umastaurant even about?";
    aboutHeading.className = "about-heading";
    contentArea.append(aboutHeading);

    // description content area
    const aboutContainer = document.createElement('div');
    aboutContainer.className = "about-container";

    // sub heading?
    const aboutSubHeading = document.createElement('h4');
    aboutSubHeading.className = 'about-subheading';
    aboutSubHeading.textContent = "This is personal page is a WIP";

    const aboutText = document.createElement('p');
    // spit yo shihhh here Ryo9
    aboutText.textContent = `12/10/25: Hello! Welcome to the first version of my umastaurant page!
    As of this date, this page is a WIP. I am practicing how to design web pages and this is the best 
    I can do for now. There are a lot of things I need
    to polish about UI/UX design. I also want to learn about other JS concepts and I got a lot of
    practice from making this website. It was really fun. Although progress is slow. It took me
    9 days just to set up the music players and the layout for 3 pages! But im getting better.
    On the bright side, I finally found a reason to keep doing this. Making websites and designing
    the UI is fun. Some ideas came naturally while I was doing something else like chores 
    that I just get urges to hop on and continue making this. I am lowkey addicted.
    I hope I can find a career for this in the future.`;
    
    
    aboutContainer.append(aboutSubHeading);
    aboutContainer.append(aboutText);
    contentArea.append(aboutContainer);
}

// export Menu section
export default loadAboutPage;