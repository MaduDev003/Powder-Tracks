
const MAX_TIME = 100; // expand width of music progress bar
let isPlaying = false;
let musicTimer = 0;
let timeEvent = null;

let music = 0;
let musics = [] // current music index


fetch("../musics.json").then(response => response.json()).then(data => {
  musics = data
  TOTAL_MUSICS = data.length
  changeMusic(0)
});

function toggleListLinks() {
    const links = document.querySelector('.links');
    const closeLinks = document.querySelector('.close');
    const listLinks = document.querySelector('.list');

    // Toggle menu mobile
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

function changeIconButtonToPause() {
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
    isPlaying = false;
    musicTimer = 0;
}

function increaseMusicProgress() {
    const musicProgress = document.getElementById('music__progress');
    musicProgress.style.width = `${musicTimer}%`;
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

function changeMusic(direction){
    music += direction;
    if(music < 0) music = musics.length - 1;
    if(music >= musics.length - 1) music = 0;

    musicTimer = 0;
    increaseMusicProgress();
 
    console.log("música atual",musics[music])

    document.querySelector('h2').innerHTML = musics[music].name;
    document.querySelector('.artists').innerHTML = musics[music].artist;
}


/* .music__progress -> nome da classe da barrinha da musica  */
