// --- 1. Custom Cursor ---
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

// --- 2. Matrix Rain Effect ---
const matrix = document.getElementById('matrix');
const ctx = matrix.getContext('2d');

function setupMatrix() {
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
}
setupMatrix();

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 16;
const columns = matrix.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, matrix.width, matrix.height);
    
    ctx.fillStyle = '#fffb00';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// --- 3. Cosmic Particles ---
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 1000 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 1000 + 'px');
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.background = '#ffd700';
        container.appendChild(particle);
    }
}

// --- 4. Navigation System ---
function showPage(pageId) {
    const pages = ['home', 'lesson', 'examples', 'quiz', 'about'];
    
    // Hide all pages
    pages.forEach(p => {
        const el = document.getElementById(p + '-page');
        if (el) el.style.display = 'none';
    });

    // Show target page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Sync Navigation Radio Buttons
    const navItem = document.getElementById('nav-' + pageId);
    if (navItem) navItem.checked = true;

    updateSidebar(pageId);
}

function updateSidebar(page) {
    const items = document.querySelectorAll('.progress-item');
    if (items.length === 0) return;

    items.forEach(item => item.classList.remove('active', 'completed', 'locked'));

    const flow = ['home', 'lesson', 'examples', 'quiz', 'about'];
    const currentIndex = flow.indexOf(page);

    items.forEach((item, index) => {
        if (index < currentIndex) item.classList.add('completed');
        else if (index === currentIndex) item.classList.add('active');
        else item.classList.add('locked');
    });
}

// --- 5. Simulated Python Execution ---
function runCode(codeId, outputId) {
    const code = document.getElementById(codeId).textContent;
    const output = document.getElementById(outputId);
    
    output.innerHTML = '<div style="color: #d8811d; font-weight: bold;">⏳ Executing cosmic code...</div>';
    
    setTimeout(() => {
        try {
            let result = '';
            const variables = {};
            const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

            lines.forEach(line => {
                // Simplified assignment
                if (line.includes('=') && !line.includes('==')) {
                    const [name, val] = line.split('=').map(s => s.trim());
                    variables[name] = val.replace(/['"]/g, '');
                }
                // Simplified print
                if (line.startsWith('print(')) {
                    let content = line.match(/\((.*)\)/)[1];
                    // Replace variables in output
                    Object.keys(variables).forEach(v => {
                        content = content.replace(new RegExp(v, 'g'), variables[v]);
                    });
                    result += content.replace(/['"]/g, '') + '<br>';
                }
            });

            output.innerHTML = '<div style="color: #5dab0e; font-weight: bold;">✨ Success!</div><br>' + (result || 'Process finished with no output.');
        } catch (err) {
            output.innerHTML = '<div style="color: #ff5f56; font-weight: bold;">⚠️ Cosmic Error: ' + err.message + '</div>';
        }
    }, 800);
}

// --- 6. Quiz & Rewards ---
function checkQuiz() {
    let score = 0;
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;
    const q3 = document.querySelector('input[name="q3"]:checked')?.value;

    if (q1 === 'correct') score++;
    if (q2 === 'correct') score++;
    if (q3 === 'correct') score++;

    const resultDiv = document.getElementById('quiz-result');
    resultDiv.style.display = 'block';
    
    if (score === 3) {
        resultDiv.innerHTML = `<h3>🏆 Score: 3/3 - Legendary!</h3><p>You've mastered the Python stars!</p>`;
        createFireworks();
    } else {
        resultDiv.innerHTML = `<h3>🌟 Score: ${score}/3</h3><p>Keep training, space traveler!</p>`;
    }
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function createFireworks() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const fw = document.createElement('div');
            fw.className = 'firework-particle'; // Define CSS for this or use inline
            Object.assign(fw.style, {
                position: 'fixed',
                width: '10px',
                height: '10px',
                backgroundColor: ['#ffd700', '#00ffff', '#ff1493'][Math.floor(Math.random() * 3)],
                borderRadius: '50%',
                left: Math.random() * 100 + 'vw',
                top: '100vh',
                zIndex: '9999'
            });
            document.body.appendChild(fw);
            
            fw.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: `translate(${(Math.random() - 0.5) * 400}px, -${Math.random() * 80}vh)`, opacity: 0 }
            ], { duration: 1500, easing: 'ease-out' });

            setTimeout(() => fw.remove(), 1500);
        }, i * 100);
    }
}

// --- 7. Event Listeners & Init ---
window.addEventListener('resize', setupMatrix);

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && !isNaN(e.key)) {
        const pages = ['home', 'lesson', 'examples', 'quiz', 'about'];
        if (pages[e.key - 1]) {
            e.preventDefault();
            showPage(pages[e.key - 1]);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    showPage('home');
    console.log('🌌 PySnaky: Cosmic System Online.');
});