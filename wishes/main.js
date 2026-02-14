const contentContainer = document.getElementById('content-container');
const backgroundContainer = document.getElementById('background-elements');

const STRINGS = {
    default: {
        title: "Let's Celebrate!",
        subtitle: "Every moment is worth a party.",
        music: "🎉"
    },
    birthday: {
        template: "Happy Birthday, [Name]!",
        subtitle: "Wishing you a fantastic day filled with joy!",
        music: "🎂"
    },
    anniversary: {
        template: "Happy Wedding Anniversary, [Name]!",
        subtitle: "Celebrating another year of love and happiness.",
        music: "💍"
    }
};

function getRouteData() {
    const hash = window.location.hash;

    const path = hash.slice(1);

    if (path.startsWith('/birthday/')) {
        const namePart = path.replace('/birthday/', '');
        const name = decodeURIComponent(namePart).trim();
        return { type: 'birthday', name: name || 'Friend' };
    }
    else if (path.startsWith('/wedding-anniversary/')) {
        const namePart = path.replace('/wedding-anniversary/', '');
        const name = decodeURIComponent(namePart).trim();
        return { type: 'anniversary', name: name || 'Lovebirds' };
    }

    return { type: 'default', name: '' };
}

function render() {
    const { type, name } = getRouteData();
    let titleHtml = '';
    let subtitleText = '';

    if (type === 'birthday') {
        const titleText = STRINGS.birthday.template.replace('[Name]', `<span class="rainbow-text">${name}</span>`);
        titleHtml = titleText;
        subtitleText = STRINGS.birthday.subtitle;
    } else if (type === 'anniversary') {
        const titleText = STRINGS.anniversary.template.replace('[Name]', `<span class="rainbow-text">${name}</span>`);
        titleHtml = titleText;
        subtitleText = STRINGS.anniversary.subtitle;
    } else {
        titleHtml = STRINGS.default.title;
        subtitleText = STRINGS.default.subtitle;

        const formHtml = `
            <div class="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto animate-fade-in border border-white/20">
                <div class="space-y-4 text-left">
                    <div>
                        <label class="block text-sm font-bold mb-1 text-gold">Celebration Type</label>
                        <select id="typeSelect" class="w-full p-3 rounded-lg bg-black/30 border border-white/30 text-white focus:outline-none focus:border-gold transition-colors">
                            <option value="birthday">Birthday 🎂</option>
                            <option value="wedding-anniversary">Anniversary 💍</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-1 text-gold">Name(s)</label>
                        <input type="text" id="nameInput" placeholder="e.g. Alice" class="w-full p-3 rounded-lg bg-black/30 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors">
                    </div>
                    <button onclick="generateLink()" class="w-full py-3 bg-gradient-to-r from-rosePink to-deepPurple rounded-lg font-bold text-white shadow-lg hover:scale-105 transition-transform">
                        Creates Link ✨
                    </button>
                    
                    <div id="resultArea" class="hidden pt-4 border-t border-white/20 mt-4 space-y-2">
                        <p class="text-xs text-center text-gray-200">Your unique link:</p>
                        <div class="flex gap-2">
                            <input type="text" id="linkOutput" readonly class="w-full p-2 text-sm rounded bg-black/50 text-gray-300 border border-white/10 select-all">
                            <button onclick="copyLink()" class="p-2 bg-gold text-deepPurple rounded font-bold hover:bg-white transition-colors" title="Copy">📋</button>
                            <button onclick="visitLink()" class="p-2 bg-rosePink text-white rounded font-bold hover:bg-white hover:text-rosePink transition-colors" title="Visit">🚀</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.generateLink = () => {
            const type = document.getElementById('typeSelect').value;
            const name = document.getElementById('nameInput').value.trim();
            if (!name) return alert('Please enter a name!');

            const baseUrl = window.location.href.split('#')[0];
            const finalLink = `${baseUrl}#/${type}/${encodeURIComponent(name)}`;

            const resultArea = document.getElementById('resultArea');
            const linkOutput = document.getElementById('linkOutput');

            linkOutput.value = finalLink;
            resultArea.classList.remove('hidden');
        };

        window.copyLink = () => {
            const linkOutput = document.getElementById('linkOutput');
            linkOutput.select();
            navigator.clipboard.writeText(linkOutput.value);
            alert('Link copied to clipboard!');
        };

        window.visitLink = () => {
            const linkOutput = document.getElementById('linkOutput');
            window.location.href = linkOutput.value;
        };

        subtitleText += formHtml;
    }
    contentContainer.innerHTML = `
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold font-pacifico drop-shadow-xl animate-pop-in leading-tight">
            ${titleHtml}
        </h1>
        <p class="text-xl md:text-3xl font-playfair font-light mt-6 opacity-0 animate-fade-in drop-shadow-md">
            ${subtitleText}
        </p>
    `;

    triggerConfetti();
}


function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#e91e63', '#4a148c', '#ffffff']
    });

    const end = Date.now() + 1000;
    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffd700', '#e91e63']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#4a148c', '#00bcd4']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function createFloatingBalloons() {
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const size = Math.random() * 60 + 40;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const color = ['#ffd700', '#e91e63', '#ffffff', '#4a148c'][Math.floor(Math.random() * 4)];
        balloon.innerHTML = `
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="${size}px" height="${size}px" fill="${color}">
                <path d="M239.5,419.5c-89.9-10.4-160-86.8-160-179.3c0-99.4,80.6-180,180-180s180,80.6,180,180
                c0,92.5-70.1,168.9-160,179.3v30.5h10v20h-40v-20h10V419.5z"/>
                <line x1="250" y1="450" x2="250" y2="500" style="stroke:${color};stroke-width:2" />
            </svg>
        `;

        balloon.style.left = `${left}%`;
        balloon.style.animationDelay = `-${delay}s`;
        balloon.style.animationDuration = `${duration}s`;

        backgroundContainer.appendChild(balloon);
    }
}

window.addEventListener('hashchange', render);
window.addEventListener('load', () => {
    createFloatingBalloons();
    render();
});