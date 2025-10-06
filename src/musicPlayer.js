// import musicPlayer css
import "./css/musicPlayer.css";

// get all music assets
const audioContext = require.context('./assets/audio/music', false, /\.(mp3|ogg|wav)$/i);
// get image assets
const imageContext = require.context('./assets/images/music-images', false, /\.(png|jpg|jpeg)$/i); // <-- UPDATED PATH

// build song playlist array
const songPlaylist = audioContext.keys().map(key => {
    // Get the full path to the audio file
    const audioSrc = audioContext(key);

    const fileName = key;
    
    // --- Automatically generate the title ---
    const title = fileName.replace('./', '').replace(/\.(mp3|ogg|wav)$/i, '');

    // --- Automatically find the matching image ---
    const imageKey = `./${title}.png`; // <-- Assumes your images are .png, change if they are .jpg, etc.
    const imageSrc = imageContext(imageKey);

    return {
        src: audioSrc,
        title: title,
        art: imageSrc,
    };
});

// state variable to track the current song
let currentSongIndex = 0;

// <--- CONTAINERS AND CONTROLS FOR THE PLAYER ELEMENTS --->

// container for the player
const playerContainer = document.createElement('div');
playerContainer.className = "uma-music-player-container";
document.body.append(playerContainer);

// NEW: Container for song info (art and title)
const songInfoContainer = document.createElement('div');
songInfoContainer.className = "song-info-container";

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

// Separator for the time display
const timeSeparator = document.createElement('span');
timeSeparator.textContent = ' / ';

// music duration display
const totalDurationDisplay = document.createElement('span');
totalDurationDisplay.textContent = '0:00';
totalDurationDisplay.className = 'time-display';

//handle the audio elements
const audioElement = document.createElement('audio');
playerContainer.append(audioElement); // Append the audio element so it's part of the DOM

// button controls for the player
const playButton = document.createElement('button');
playButton.textContent = '▶️';
playButton.className = 'player-button music-button';

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

const musicVolumeSlider = document.createElement('input');
musicVolumeSlider.type = 'range';
musicVolumeSlider.min = 0;
musicVolumeSlider.max = 1;
musicVolumeSlider.step = 0.01;
musicVolumeSlider.value = 1;
musicVolumeSlider.className = 'music-volume-slider';

const musicVolumeContainer = document.createElement('div');
musicVolumeContainer.className = 'music-volume-container';

const musicVolumeIcon = document.createElement('span'); 
musicVolumeIcon.className = 'music-volume-icon';
musicVolumeIcon.textContent = '🔊'; 

// add images to the player
const musicPlayerAlbumImage = document.createElement('img');
musicPlayerAlbumImage.className = 'uma-album-art';

// add song title to the player
const songTitleElement = document.createElement('p');
songTitleElement.className = 'song-title';

// <--- APPEND ELEMENTS TO THE PAGE --->
// toggle button
document.body.append(musicPlayerToggleButton);

// These elements go inside the main player container in order
playerContainer.append(songInfoContainer); // Add the song info container
playerContainer.append(musicTimeControlsContainer);
playerContainer.append(musicProgressBar);
playerContainer.append(musicControlsContainer);
playerContainer.append(musicPlayerCloseButton);
playerContainer.append(musicVolumeContainer);

// add volume controls
musicVolumeContainer.append(musicVolumeIcon);
musicVolumeContainer.append(musicVolumeSlider);

// add songs info inside the song info container
songInfoContainer.append(musicPlayerAlbumImage);
songInfoContainer.append(songTitleElement);

// inside the music controls container
musicControlsContainer.append(playButton);
musicControlsContainer.append(prevButton);
musicControlsContainer.append(nextButton);

// inside the time display container
musicTimeControlsContainer.append(currentTimeDisplay);
musicTimeControlsContainer.append(timeSeparator);
musicTimeControlsContainer.append(totalDurationDisplay);

// --- loadSong Function ---
function loadSong(index) {
    const song = songPlaylist[index];
    audioElement.src = song.src;
    musicPlayerAlbumImage.src = song.art;
    songTitleElement.textContent = song.title;
    audioElement.play();
    playButton.textContent = '⏸️';
}

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
    if (currentSongIndex >= songPlaylist.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex); // Use the new function
});

// previous button logic
prevButton.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0 ) {
        currentSongIndex = songPlaylist.length - 1;
    }
    loadSong(currentSongIndex); // Use the new function
});

//autoplay logic
audioElement.addEventListener('ended', () => {
    currentSongIndex++;
    if(currentSongIndex >= songPlaylist.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex); // Use the new function
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

musicVolumeIcon.addEventListener('click', () => {
    musicVolumeSlider.classList.toggle('volume-slider-visible');
})

// volume slider logic
musicVolumeSlider.addEventListener('input', () => {
    audioElement.volume = musicVolumeSlider.value;
})

// Initial Load (loads art and title, but doesn't play)
const initialSong = songPlaylist[0];
audioElement.src = initialSong.src;
musicPlayerAlbumImage.src = initialSong.art;
songTitleElement.textContent = initialSong.title;