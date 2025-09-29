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

const MAX_TIME = 100; // 4 minutes in seconds
let isPlaying = false;
let musicTimer = 0;
let timeEvent = null;

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

function playMusic() {
    isPlaying = !isPlaying;
    changeIconButtonToPlay();

    if (isPlaying) {
        const musicProgress = document.getElementById('music__progress');
        timeEvent = setInterval(() => {
            if (musicTimer >= MAX_TIME) {
              resetMusic();
            }
            
            musicTimer++
            musicProgress.style.width = `${musicTimer}%`;
        }, 500);
    } else {
        clearInterval(timeEvent);
    }
}


/* .music__progress -> nome da classe da barrinha da musica  */
