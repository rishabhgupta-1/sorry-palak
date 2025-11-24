document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const quotes = [
        "I never meant to hurt you... 💔",
        "My heart aches without your smile... 🥺",
        "I was wrong, and I'm so sorry... 🌹",
        "You mean the world to me... 🌍",
        "Please give me a chance to make it right... 🙏",
        "I promise to be better... ✨",
        "I miss you so much... 🦋",
        "You are my everything... 💖"
    ];

    const emojis = ['❤️', '💖', '🌹', '✨', '🥺', '🧸', '🦋', '🌸', '💌', '💝'];

    // --- Elements ---
    const screens = {
        home: document.getElementById('home-screen'),
        loading: document.getElementById('loading-screen'),
        letter: document.getElementById('letter-screen'),
        final: document.getElementById('final-screen')
    };

    const buttons = {
        start: document.getElementById('start-btn'),
        readLetter: document.getElementById('read-letter-btn'),
        yes: document.getElementById('yes-btn'),
        please: document.getElementById('please-btn')
    };

    const elements = {
        quoteText: document.getElementById('quote-text'),
        dialogOverlay: document.getElementById('dialog-overlay'),
        heartsContainer: document.getElementById('hearts-container'),
        music: document.getElementById('background-music')
    };

    // --- State Management ---
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active-screen');
            screen.classList.add('hidden');
            setTimeout(() => {
                if (!screen.classList.contains('active-screen')) {
                    screen.style.display = 'none';
                }
            }, 500);
        });

        const target = screens[screenName];
        target.classList.remove('hidden');
        target.style.display = 'flex';
        void target.offsetWidth;
        target.classList.add('active-screen');
    }

    // --- Enhanced Particle System ---
    function createAtmosphere() {
        const particle = document.createElement('div');
        particle.classList.add('emoji-particle');
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

        particle.style.left = Math.random() * 100 + 'vw';

        const size = Math.random() * 20 + 15;
        particle.style.fontSize = size + 'px';

        const animationType = Math.random();

        if (animationType < 0.4) {
            particle.style.bottom = '-50px';
            particle.style.animation = `floatUp ${Math.random() * 5 + 5}s linear forwards`;
        } else if (animationType < 0.8) {
            particle.style.top = '-50px';
            particle.style.animation = `rainDown ${Math.random() * 5 + 5}s linear forwards`;
        } else {
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.setProperty('--wander-x', (Math.random() * 200 - 100) + 'px');
            particle.style.setProperty('--wander-y', (Math.random() * 200 - 100) + 'px');
            particle.style.setProperty('--wander-r', (Math.random() * 360) + 'deg');
            particle.style.animation = `wander ${Math.random() * 10 + 10}s ease-in-out forwards`;
        }

        elements.heartsContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    setInterval(createAtmosphere, 150);

    // --- Flow Logic ---

    buttons.start.addEventListener('click', () => {
        showScreen('loading');
        startQuotesCycle();
    });

    function startQuotesCycle() {
        let quoteIndex = 0;
        let quoteCount = 0;
        const maxQuotes = 5;

        elements.quoteText.textContent = quotes[0];

        const interval = setInterval(() => {
            elements.quoteText.style.opacity = 0;

            setTimeout(() => {
                quoteIndex = Math.floor(Math.random() * quotes.length);
                elements.quoteText.textContent = quotes[quoteIndex];
                elements.quoteText.style.opacity = 1;
                quoteCount++;

                if (quoteCount >= maxQuotes) {
                    clearInterval(interval);
                    setTimeout(() => {
                        showScreen('letter');
                    }, 2500);
                }
            }, 500);
        }, 3000);
    }

    buttons.readLetter.addEventListener('click', () => {
        elements.dialogOverlay.classList.remove('hidden');
    });

    buttons.yes.addEventListener('click', () => {
        elements.dialogOverlay.classList.add('hidden');
        showScreen('final');
        burstHearts();
        // Play music after 1 second
        setTimeout(() => {
            if (elements.music) {
                elements.music.style.display = 'block';
                elements.music.src = 'https://www.youtube.com/embed/_OkFT3UfULE?autoplay=1&loop=1&playlist=_OkFT3UfULE';
            }
        }, 1000);
    });

    buttons.please.addEventListener('click', () => {
        const btn = buttons.please;
        btn.classList.add('shake');
        btn.textContent = "I promise I'll change! 🥺";

        setTimeout(() => {
            btn.classList.remove('shake');
        }, 500);

        setTimeout(() => {
            elements.dialogOverlay.classList.add('hidden');
            showScreen('final');
            burstHearts();
            // Play music after 1 second
            setTimeout(() => {
                if (elements.music) {
                    elements.music.style.display = 'block';
                    elements.music.src = 'https://www.youtube.com/embed/_OkFT3UfULE?autoplay=1&loop=1&playlist=_OkFT3UfULE';
                }
            }, 1000);
        }, 1500);
    });

    function burstHearts() {
        for (let i = 0; i < 100; i++) {
            setTimeout(createAtmosphere, i * 20);
        }
    }
});
