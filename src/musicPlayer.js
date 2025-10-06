// get all music assets
const audioContext = require.context('./assets/audio/music', false, /\.(mp3|ogg|wav)$/i);
const playlist = audioContext.keys().map(audioContext);
console.log(playlist); // For debugging, you can remove this later

// state variable to track the current song
let currentSongIndex = 0;

// <--- CONTAINERS AND CONTROLS FOR THE PLAYER ELEMENTS --->
// container for the player
const playerContainer = document.createElement('div');
playerContainer.className = "uma-music-player-container";
document.body.append(playerContainer);

// music controls button
const musicControlsContainer = document.createElement('div');
musicControlsContainer.className = "music-controls-container";

// music time controls
const musicTimeControlsContainer = document.createElement('div');
musicTimeControlsContainer.className = "music-time-controls-container";

// music time display
const currentTimeDisplay = document.createElement('span');
currentTimeDisplay.textContent = '0:00';
currentTimeDisplay.className = 'time-display';

// NEW: Separator for the time display
const timeSeparator = document.createElement('span');
timeSeparator.textContent = ' / ';

// music duration display
const totalDurationDisplay = document.createElement('span');
totalDurationDisplay.textContent = '0:00';
totalDurationDisplay.className = 'time-display';

//handle the audio elements
const audioElement = document.createElement('audio');
audioElement.src = playlist[0];
playerContainer.append(audioElement);
console.log(audioElement); // For debugging, you can remove this later

// button controls for the player
const playButton = document.createElement('button');
playButton.textContent = '▶️';
playButton.className = 'player-button music-button';

// discontinued?
// const pauseButton = document.createElement('button');
// pauseButton.textContent = 'Pause';
// pauseButton.className = 'pause-button';
// playerContainer.append(pauseButton);

const prevButton = document.createElement('button');
prevButton.textContent = '⏮️';
prevButton.className = 'previous-button music-button';

const nextButton = document.createElement('button');
nextButton.textContent = '⏭️';
nextButton.className = 'next-button music-button'

const musicPlayerToggleButton = document.createElement('button');
musicPlayerToggleButton.textContent = '🎵';
musicPlayerToggleButton.className = "music-player-toggle-button";

const musicPlayerCloseButton = document.createElement('button');
musicPlayerCloseButton.textContent = '🗙';
musicPlayerCloseButton.className = 'music-player-close-button';

const musicProgressBar = document.createElement('input');
musicProgressBar.type = 'range';
musicProgressBar.min = 0;
musicProgressBar.max = 100;
musicProgressBar.value = 0;
musicProgressBar.className = 'music-progress-bar';

// <--- APPEND ELEMENTS TO THE PAGE --->
// toggle button
document.body.append(musicPlayerToggleButton);

// These elements go inside the main player container in order
playerContainer.append(musicTimeControlsContainer);
playerContainer.append(musicProgressBar);
playerContainer.append(musicControlsContainer);
playerContainer.append(musicPlayerCloseButton);

// inside the music controls container
musicControlsContainer.append(playButton);
musicControlsContainer.append(prevButton);
musicControlsContainer.append(nextButton);

// inside the time display container
musicTimeControlsContainer.append(currentTimeDisplay);
musicTimeControlsContainer.append(timeSeparator); // NEW: Add the separator here
musicTimeControlsContainer.append(totalDurationDisplay);


// play / pause button logic
playButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playButton.textContent = '⏸️';
    } else {
        audioElement.pause();
        playButton.textContent = '▶️';
    }
});

// next button logic
nextButton.addEventListener('click', () => {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }
    audioElement.src = playlist[currentSongIndex];
    audioElement.play();
    playButton.textContent = '⏸️';
});

// previous button logic
prevButton.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0 ) {
        currentSongIndex = playlist.length - 1;
    }
    audioElement.src = playlist[currentSongIndex];
    audioElement.play();
    playButton.textContent = '⏸️';
});

//autoplay logic
audioElement.addEventListener('ended', () => {
    currentSongIndex++;
    if(currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }
    audioElement.src = playlist[currentSongIndex];
    audioElement.play();
});

// toggle button logic
musicPlayerToggleButton.addEventListener('click', () => {
    playerContainer.classList.toggle('is-visible');
})

// close button logic
musicPlayerCloseButton.addEventListener('click', () => {
    playerContainer.classList.remove('is-visible');
})

// update slider and time as new music plays
audioElement.addEventListener('timeupdate', () => {
    const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;

    if (!isNaN(progressPercent)) {
        musicProgressBar.value = progressPercent;
    }

    currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
})

// set the total duration event logic
audioElement.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audioElement.duration);
})

// progress bar logic
musicProgressBar.addEventListener('input', () => {
    const seekTime = (musicProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
})

// time control logic
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedSecs = secs.toString().padStart(2, '0');
    return `${minutes}:${formattedSecs}`;
}