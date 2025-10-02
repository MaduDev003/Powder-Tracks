
const MAX_TIME = 100; 
let isPlaying = false;
let musicTimer = 0;
let timeEvent = null;

let music = 0;
let musics = [] 

function increaseMusicProgress() {
    const musicProgress = document.getElementById('music__progress');
    musicProgress.style.width = `${musicTimer}%`;
}

function changeMusic(direction) {
    music += direction;
   
    if (music < 0) {
        music = musics.length - 1; 
    }
    if (music >= musics.length) {
        music = 0; 
    }

    musicTimer = 0;
    increaseMusicProgress();


    const musicCounter = document.getElementById('music__counter');
    musicCounter.innerHTML = `${music + 1} / ${musics.length}`; /*  arrumar para tirar o music */

    document.querySelector('h2').innerHTML = musics[music].name;
    document.querySelector('.artists').innerHTML = musics[music].artist;
    document.querySelector('h3').innerHTML = musics[music].name;
    document.querySelector('.music__details p').innerHTML = musics[music].artist;

    const heart = document.getElementById('heart');
    if (musics[music].liked) {
        heart.classList.add('liked');
    } else {
        heart.classList.remove('liked');
    }

}

fetch("../musics.json").then(response => response.json()).then(data => {
    musics = data
    TOTAL_MUSICS = data.length
    changeMusic(0)
});

function toggleListLinks() {
    const links = document.querySelector('.links');
    const closeLinks = document.querySelector('.close');
    const listLinks = document.querySelector('.list');

    closeLinks.classList.toggle('active');
    listLinks.classList.toggle('active');
    links.classList.toggle('active');

}


function choosePage(event) {
    let clickedLi = event.target.closest('li.link');
    if (!clickedLi) return;

    const allLinks = document.querySelectorAll('.links .link');
    allLinks.forEach(link => link.classList.remove('active'));
    clickedLi.classList.add('active');
}


function changeIconButtonToPlay() {
    const musicPlayer = document.querySelector('.music__players');
    if (isPlaying) {
        musicPlayer.classList.remove('play')
        musicPlayer.classList.add('pause')
    } else {
        musicPlayer.classList.remove('pause')
        musicPlayer.classList.add('play')
    }
}

function resetMusic() {
    clearInterval(timeEvent);
    changeIconButtonToPlay();
    changeMusic(1);
    isPlaying = false;
    musicTimer = 0;
}

function playMusic() {
    isPlaying = !isPlaying;   
    changeIconButtonToPlay();


    if (isPlaying) {

        timeEvent = setInterval(() => {
            if (musicTimer >= MAX_TIME) {
                resetMusic();
            }

            musicTimer++
            increaseMusicProgress();
        }, 500);
    } else {
        clearInterval(timeEvent);
    }
}

function likeMusic() {
    musics[music].liked = !musics[music].liked;

    const heart = document.getElementById('heart');

    if (musics[music].liked) {
        heart.classList.add('liked');
    } else {
        heart.classList.remove('liked');
    }
}


const eventsCode = {
    Space: () => playMusic(),
    ArrowRight: () =>  changeMusic(1),
    ArrowLeft: () => changeMusic(-1)
}


document.addEventListener('keydown', (event) => {
    const { code } = event;
    eventsCode[code]();
});



function repeatMusic(){
    musicTimer = 0;       
    increaseMusicProgress();
    playMusic();      
}
