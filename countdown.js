const targetDate = new Date("Mar 24, 2026 00:00:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if(distance < 0){
        clearInterval(countdownInterval);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;
}, 1000);

function reveal(){
    var reveals = document.querySelectorAll(".reveal");
    for(var i = 0; i < reveals.length; i++){
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisibile = 100;

        if(elementTop < windowHeight - elementVisibile){
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal();

// function play music 
let isPlaying = false;
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

function toggleMusic(){
    if(isPlaying){
        bgMusic.pause();
        musicBtn.classList.remove("spin");
        isPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.classList.add("spin");
        isPlaying = true;
    }
}

function revealCard(card) {
    card.classList.add('revealed'); //menambahkan kelas revealed, menghilangkan efek blur dan menampilkan teks   
    card.removeAttribute('onclick'); //menghapus onclick agar fungsi tidak berjalan lagi setelah di buka
}


//Fungsi button hold untuk membuka pesan rahasia
const holdBtn = document.getElementById('hold-btn');
const progressFill = document.getElementById('progress-fill');
const secretMessage = document.getElementById('secret-message');

let progressInterval;
let progress = 0;
let isUnlocked = false;

holdBtn.addEventListener('contextmenu', (e) => e.preventDefault());

const startPress = (e) => {
    if(isUnlocked) return;
    clearInterval(progressInterval);

    progressInterval = setInterval(() => {
        progress += 2;
        progressFill.style.width = `${progress}%`;

        if(progress >= 100){
            unlockMessage();
        }
    }, 50);
};

const endPress = () => {
    if(isUnlocked) return;
    clearInterval(progressInterval);
    progress = 0;
    progressFill.style.width = `0%`;
};

const unlockMessage = () => {
    clearInterval(progressInterval);
    isUnlocked = true;

    holdBtn.innerHTML = "<span>Tahan Untuk Membuka ❤️</span>";
    holdBtn.style.backgroundColor = "var(--brown-light)";

    secretMessage.style.display = "block";
    secretMessage.scrollIntoView({behavior: 'smooth', block: 'nearest'});
};

holdBtn.addEventListener('mousedown', startPress);
holdBtn.addEventListener('mouseup', endPress);
holdBtn.addEventListener('mouseleave', endPress);

holdBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPress();
}, {passive:false});

holdBtn.addEventListener('touchend', endPress);
holdBtn.addEventListener('touchcancel', endPress);

document.body.addEventListener('click', function playAudioOnFirstClick() {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            musicBtn.classList.add("spin");
            isPlaying = true;
            document.body.removeEventListener('click', playAudioOnFirstClick);
        }).catch((e) => console.log("Autoplay diblokir browser"));
    }
}, { once: true });

document.body.addEventListener('touchstart', function playAudioOnFirstTouch() {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            musicBtn.classList.add("spin");
            isPlaying = true;
            document.body.removeEventListener('touchstart', playAudioOnFirstTouch);
        }).catch((e) => console.log("Autoplay diblokir browser"));
    }
}, { once: true });