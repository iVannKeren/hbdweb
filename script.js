const btnWish = document.getElementById('btn-wish');
const btnMusic = document.getElementById('btn-music');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const bgMusic = document.getElementById('bg-music');
const dino = document.querySelector('.mascot-wrapper');

// Buka Modal & Efek
btnWish.addEventListener('click', () => {
    modal.classList.remove('hidden');
    fireConfetti();
    mascotJump();
});

// Tutup Modal
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Musik
let isPlaying = false;
btnMusic.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        btnMusic.textContent = "🎵 Play Music";
    } else {
        bgMusic.play().then(() => {
            btnMusic.textContent = "⏸ Pause Music";
        }).catch(() => {
            alert("File musik tidak ditemukan. Pastikan ada file 'lagu-lucu.mp3'.");
        });
    }
    isPlaying = !isPlaying;
});

// Animasi Lompat
function mascotJump() {
    dino.classList.add('jump-anim');
    setTimeout(() => { dino.classList.remove('jump-anim'); }, 500);
}

// Confetti
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const colors = ['#FFB7B2', '#B5EAD7', '#E2F0CB', '#FFDAC1', '#E0BBE4'];

function fireConfetti() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: window.innerWidth / 2, y: window.innerHeight / 2,
            r: Math.random() * 5 + 2,
            dx: Math.random() * 10 - 5, dy: Math.random() * -10 - 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.2
        });
    }
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.x += p.dx; p.y += p.dy; p.dy += p.gravity;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        if (p.y > canvas.height) particles.splice(index, 1);
    });
    requestAnimationFrame(updateConfetti);
}
updateConfetti();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
});