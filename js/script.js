// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const welcomeModal1 = document.getElementById('welcome-modal-1');
const welcomeModal2 = document.getElementById('welcome-modal-2');
const nextBtn1 = document.getElementById('next-btn-1');
const nextBtn2 = document.getElementById('next-btn-2');
const mainContent = document.getElementById('main-content');
const wishesBtn = document.getElementById('wishes-btn');
const specialWishesBtn = document.getElementById('memories-btn');
const wishesModal = document.getElementById('wishes-modal');
const specialWishesModal = document.getElementById('memories-modal');
const closeWishes = document.getElementById('close-wishes');
const closeSpecialWishes = document.getElementById('close-memories');
const musicToggle = document.getElementById('music-toggle');
const petalsContainer = document.getElementById('petals-container');
const floatingHearts = document.getElementById('floating-hearts');
const quoteContainer = document.getElementById('quote-container');
const carouselDots = document.querySelectorAll('.carousel-dot');
const polaroids = document.querySelectorAll('.polaroid');

// Loading and Welcome Sequence
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        welcomeModal1.classList.add('active');
    }, 2000);
});

nextBtn1.addEventListener('click', () => {
    welcomeModal1.classList.remove('active');
    welcomeModal2.classList.add('active');
});

nextBtn2.addEventListener('click', () => {
    welcomeModal2.classList.remove('active');
    mainContent.classList.add('visible');
    createPetals();
    createFloatingHearts();
});

// Petals Animation
function createPetals() {
    const petalCount = 20;
    const colors = ['#ff758c', '#ffaaa7', '#ffd3b6', '#ffe5d8'];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const size = Math.random() * 20 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 10 + 10}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.opacity = Math.random() * 0.6 + 0.4;
        
        petal.innerHTML = `<i class="fas fa-spa" style="color: ${color}; font-size: ${size}px;"></i>`;
        petalsContainer.appendChild(petal);
    }
}

// Floating Hearts Animation
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        floatingHearts.appendChild(heart);
        
        setTimeout(() => heart.remove(), 10000);
    }, 800);
}

// Modal Controls
wishesBtn.addEventListener('click', () => wishesModal.classList.add('active'));
specialWishesBtn.addEventListener('click', () => specialWishesModal.classList.add('active'));
closeWishes.addEventListener('click', () => wishesModal.classList.remove('active'));
closeSpecialWishes.addEventListener('click', () => specialWishesModal.classList.remove('active'));

window.addEventListener('click', (e) => {
    if (e.target === wishesModal) wishesModal.classList.remove('active');
    if (e.target === specialWishesModal) specialWishesModal.classList.remove('active');
});

// Music Toggle
let isPlaying = false;
let audio;

musicToggle.addEventListener('click', () => {
    if (!audio) {
        audio = new Audio('https://cdnjs.cloudflare.com/ajax/libs/downloadaudio/1.0.0/downloadaudio.min.js');
        audio.loop = true;
    }
    
    if (isPlaying) {
        audio.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        audio.play().catch(e => console.log('Audio playback failed:', e));
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    isPlaying = !isPlaying;
});

// Quote Carousel
let currentQuote = 0;
const quoteCount = document.querySelectorAll('.quote').length;

function showQuote(index) {
    quoteContainer.style.transform = `translateX(-${index * 100}%)`;
    carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentQuote = index;
}

setInterval(() => {
    currentQuote = (currentQuote + 1) % quoteCount;
    showQuote(currentQuote);
}, 5000);

carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showQuote(index);
    });
});

// Polaroid Interaction
polaroids.forEach(polaroid => {
    polaroid.addEventListener('click', () => {
        const wish = polaroid.getAttribute('data-memory');
        alert(wish);
    });
});