// import musicPlayer css
import "./css/musicPlayer.css";

/* 
I spend an ungodly amount of time making this part of the website
Most of these was figured out by AI, I suck at logic lol
But atleast I learned got comfortable at making HTML elements using JS, 
file management, and using event listeners
I still have a long way to go when it comes to putting functions together though
*/

// --- ASSET IMPORTS ---
const audioContext = require.context('./assets/audio/music', false, /\.(mp3|ogg|wav)$/i);
const imageContext = require.context('./assets/images/music-images', false, /\.(png|jpg|jpeg)$/i);

const songPlaylist = audioContext.keys().map(key => {
    const audioSrc = audioContext(key);
    const fileName = key;
    const title = fileName.replace('./', '').replace(/\.(mp3|ogg|wav)$/i, '');
    const imageKey = `./${title}.png`;
    const imageSrc = imageContext(imageKey);
    return { src: audioSrc, title: title, art: imageSrc };
});

// --- STATE VARIABLES ---
let currentSongIndex = 0;
let isShuffled = false;
let shuffledPlaylist = [];

// --- ELEMENT CREATION ---
const playerContainer = document.createElement('div');
playerContainer.className = "uma-music-player-container";

const songInfoContainer = document.createElement('div');
songInfoContainer.className = "song-info-container";

const musicControlsContainer = document.createElement('div');
musicControlsContainer.className = "music-controls-container";

const musicTimeControlsContainer = document.createElement('div');
musicTimeControlsContainer.className = "music-time-controls-container";

const currentTimeDisplay = document.createElement('span');
currentTimeDisplay.textContent = '0:00';

const timeSeparator = document.createElement('span');
timeSeparator.textContent = ' / ';

const totalDurationDisplay = document.createElement('span');
totalDurationDisplay.textContent = '0:00';

const audioElement = document.createElement('audio');

const playButton = document.createElement('button');
playButton.innerHTML = '<i class="fas fa-play"></i>';
playButton.className = 'player-button music-button';

const prevButton = document.createElement('button');
prevButton.innerHTML = '<i class="fas fa-backward-step"></i>';
prevButton.className = 'previous-button music-button';

const nextButton = document.createElement('button');
nextButton.innerHTML = '<i class="fas fa-forward-step"></i>';
nextButton.className = 'next-button music-button';

const shuffleButton = document.createElement('button');
shuffleButton.innerHTML = '<i class="fas fa-shuffle"></i>';
shuffleButton.className = 'shuffle-button music-button';

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
musicVolumeIcon.innerHTML = '<i class="fas fa-volume-high"></i>';
musicVolumeIcon.className = 'music-volume-icon';

const musicPlayerAlbumImage = document.createElement('img');
musicPlayerAlbumImage.className = 'uma-album-art';

const songTitleElement = document.createElement('p');
songTitleElement.className = 'song-title';

const playlistOverlay = document.createElement('div');
playlistOverlay.className = 'playlist-overlay';

const playlistContainer = document.createElement('div');
playlistContainer.className = 'playlist-container';

const playlistCloseButton = document.createElement('button');
playlistCloseButton.textContent = '🗙';
playlistCloseButton.className = 'playlist-close-button';

const songList = document.createElement('ul');
songList.className = 'song-list';

const showPlaylistButton = document.createElement('button');
showPlaylistButton.innerHTML = '<i class="fas fa-list-ul"></i>';
showPlaylistButton.className = 'show-playlist-button music-button';

// --- DOM STRUCTURE & APPENDING ---
document.body.append(playerContainer);
document.body.append(musicPlayerToggleButton);

playerContainer.append(songInfoContainer);
playerContainer.append(musicTimeControlsContainer);
playerContainer.append(musicProgressBar);
playerContainer.append(musicControlsContainer);
playerContainer.append(musicVolumeContainer);
playerContainer.append(musicPlayerCloseButton);
playerContainer.append(audioElement);

musicVolumeContainer.append(musicVolumeIcon);
musicVolumeContainer.append(musicVolumeSlider);

songInfoContainer.append(musicPlayerAlbumImage);
songInfoContainer.append(songTitleElement);

musicControlsContainer.append(prevButton);
musicControlsContainer.append(playButton);
musicControlsContainer.append(nextButton);
musicControlsContainer.append(shuffleButton);
musicControlsContainer.append(showPlaylistButton);

musicTimeControlsContainer.append(currentTimeDisplay);
musicTimeControlsContainer.append(timeSeparator);
musicTimeControlsContainer.append(totalDurationDisplay);

playlistContainer.append(playlistCloseButton);
playlistContainer.append(songList);
playlistOverlay.append(playlistContainer);
document.body.append(playlistOverlay);

// --- CORE FUNCTIONS ---
function loadSong(index) {
    const currentPlaylist = isShuffled ? shuffledPlaylist : songPlaylist;
    const song = currentPlaylist[index];
    if (song) {
        audioElement.src = song.src;
        musicPlayerAlbumImage.src = song.art;
        songTitleElement.textContent = song.title;
        audioElement.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>'; 
    }
    if (playlistOverlay.classList.contains('is-visible')) {
        renderPlaylist();
    }
}

function playNextSong() {
    const currentPlaylist = isShuffled ? shuffledPlaylist : songPlaylist;
    currentSongIndex++;
    if (currentSongIndex >= currentPlaylist.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
}

function playPrevSong() {
    const currentPlaylist = isShuffled ? shuffledPlaylist : songPlaylist;
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = currentPlaylist.length - 1;
    }
    loadSong(currentSongIndex);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedSecs = secs.toString().padStart(2, '0');
    return `${minutes}:${formattedSecs}`;
}

function shuffle(playlist) {
    let shuffled = [...playlist];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderPlaylist() {
    songList.innerHTML = '';
    songPlaylist.forEach((song, index) => {
        const songItem = document.createElement('li');
        songItem.className = 'song-item';
        
        const isCurrentlyPlaying = isShuffled ? (audioElement.src === song.src) : (index === currentSongIndex);
        if (isCurrentlyPlaying) {
            songItem.classList.add('now-playing');
        }

        songItem.innerHTML = `
            <img src="${song.art}" alt="${song.title}" class="playlist-album-art">
            <div class="playlist-song-info">
                <p class="playlist-song-title">${song.title}</p>
            </div>
        `;

        songItem.addEventListener('click', () => {
            isShuffled = false;
            shuffleButton.classList.remove('shuffle-active');
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playlistOverlay.classList.remove('is-visible');
        });
        songList.append(songItem);
    });
}

// --- EVENT LISTENERS ---
playButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>'; 
    } else {
        audioElement.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>'; 
    }
});

nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);
audioElement.addEventListener('ended', playNextSong);

shuffleButton.addEventListener('click', () => {
    isShuffled = !isShuffled;
    shuffleButton.classList.toggle('shuffle-active', isShuffled);
    if (isShuffled) {
        shuffledPlaylist = shuffle(songPlaylist);
        const currentSrc = audioElement.src;
        const newIndex = shuffledPlaylist.findIndex(song => song.src === currentSrc);
        currentSongIndex = (newIndex !== -1) ? newIndex : 0;
    } else {
        const currentSrc = audioElement.src;
        const newIndex = songPlaylist.findIndex(song => song.src === currentSrc);
        currentSongIndex = (newIndex !== -1) ? newIndex : 0;
    }
});

musicPlayerToggleButton.addEventListener('click', () => {
    playerContainer.classList.toggle('is-visible');
});

musicPlayerCloseButton.addEventListener('click', () => {
    playerContainer.classList.remove('is-visible');
});

audioElement.addEventListener('timeupdate', () => {
    const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
    if (!isNaN(progressPercent)) {
        musicProgressBar.value = progressPercent;
    }
    currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
});

audioElement.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audioElement.duration);
});

musicProgressBar.addEventListener('input', () => {
    const seekTime = (musicProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

musicVolumeIcon.addEventListener('click', () => {
    musicVolumeSlider.classList.toggle('volume-slider-visible');
});

musicVolumeSlider.addEventListener('input', () => {
    audioElement.volume = musicVolumeSlider.value;
});

showPlaylistButton.addEventListener('click', () => {
    renderPlaylist();
    playlistOverlay.classList.add('is-visible');
});

playlistCloseButton.addEventListener('click', () => {
    playlistOverlay.classList.remove('is-visible');
});

playlistOverlay.addEventListener('click', (e) => {
    if (e.target === playlistOverlay) {
        playlistOverlay.classList.remove('is-visible');
    }
});

// --- INITIAL LOAD ---
const initialSong = songPlaylist[0];
if (initialSong) {
    audioElement.src = initialSong.src;
    musicPlayerAlbumImage.src = initialSong.art;
    songTitleElement.textContent = initialSong.title;
}