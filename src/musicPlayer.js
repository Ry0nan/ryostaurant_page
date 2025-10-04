// get all music assets
const audioContext = require.context('./assets/audio/music', false, /\.(mp3|ogg|wav)$/i);
const playlist = audioContext.keys().map(audioContext);
console.log(playlist); // For debugging, you can remove this later

// state variable to track the current song
let currentSongIndex = 0;

// container for the player
const playerContainer = document.createElement('div');
playerContainer.className = "uma-music-player-container";
document.body.append(playerContainer);

//handle the audio elements
const audioElement = document.createElement('audio');
audioElement.src = playlist[0];
playerContainer.append(audioElement);
console.log(audioElement); // For debugging, you can remove this later

// button controls for the player
const playButton = document.createElement('button');
playButton.textContent = 'Play';
playButton.className = 'player-button';

// discontinued?
// const pauseButton = document.createElement('button');
// pauseButton.textContent = 'Pause';
// pauseButton.className = 'pause-button';
// playerContainer.append(pauseButton);

const prevButton = document.createElement('button');
prevButton.textContent = 'Prev';
prevButton.className = 'previous-button';

const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.className = 'next-button'

playerContainer.append(playButton);
playerContainer.append(prevButton);
playerContainer.append(nextButton);

// play / pause button logic
playButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playButton.textContent = 'Pause';
    } else {
        audioElement.pause();
        playButton.textContent = 'Play';
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
    playButton.textContent = 'Pause';
});

// previous button logic
prevButton.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0 ) {
        currentSongIndex = playlist.length - 1;
    }
    audioElement.src = playlist[currentSongIndex];
    audioElement.play();
    playButton.textContent = 'Pause';
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