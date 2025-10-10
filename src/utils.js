// <--- UTILITY CODE FOR THE PAGES --->

// play a sound when a button is clicked
export function playClickSoundSfx(sound) {
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}