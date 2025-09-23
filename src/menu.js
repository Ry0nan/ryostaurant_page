//import if needed

function loadMenuPage(){
    // get the html content area
    const contentArea = document.querySelector('#content');

    // temp heading
    const menuHeading = document.createElement('h1');
    menuHeading.textContent = "This is our Umenu";
    menuHeading.className = "menu-heading";
    contentArea.append(menuHeading);
}

// export Menu section
export default loadMenuPage;