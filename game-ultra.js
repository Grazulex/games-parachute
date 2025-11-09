// ============================================
// JEU PARACHUTE ULTRA - Game & Watch (1981)
// Version complète avec toutes les fonctionnalités
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Couleurs LCD
const LCD_DARK = '#1a1a0f';
const LCD_BG = '#c8c3a0';
const LCD_LIGHT = '#a8a390';

// Charger le background de la zone de jeu (PURE - sans cadre)
const backgroundImage = new Image();
backgroundImage.src = 'sprites/perfect-bg.png';
let backgroundLoaded = false;

backgroundImage.onload = () => {
    backgroundLoaded = true;
    console.log('✅ Background chargé:', backgroundImage.width, 'x', backgroundImage.height);
    if (!gameState.running) {
        drawStartScreen();
    }
};

// Système de sons
const sounds = new GameSounds();

// Configuration
const CONFIG = {
    GAME_A: {
        FPS: 10,
        SPAWN_INTERVAL: 2500,
        FALL_SPEED: 900,
        SHARK_DURATION: 1500
    },
    GAME_B: {
        FPS: 12,
        SPAWN_INTERVAL: 2000,
        FALL_SPEED: 700,
        SHARK_DURATION: 1200
    }
};

// Positions des colonnes (ajustées pour canvas 450×230)
const COLUMNS = {
    LEFT: { x: 100, frames: 7, sprites: 'parachutists_left' },
    MIDDLE: { x: 225, frames: 6, sprites: 'parachutists_middle' },
    RIGHT: { x: 350, frames: 5, sprites: 'parachutists_right' }
};

// Positions du bateau (ajustées pour nouvelle hauteur)
const BOAT_POSITIONS = {
    LEFT: { x: 80, y: 195, sprite: 'lboat' },
    MIDDLE: { x: 205, y: 195, sprite: 'mboat' },
    RIGHT: { x: 330, y: 195, sprite: 'rboat' }
};

// Achievements
const ACHIEVEMENTS = [
    { id: 'first', title: 'Premier sauvetage', desc: 'Sauver 1 parachutiste', target: 1, icon: '🪂' },
    { id: 'bronze', title: 'Bronze', desc: 'Sauver 10 parachutistes', target: 10, icon: '🥉' },
    { id: 'silver', title: 'Argent', desc: 'Sauver 25 parachutistes', target: 25, icon: '🥈' },
    { id: 'gold', title: 'Or', desc: 'Sauver 50 parachutistes', target: 50, icon: '🥇' },
    { id: 'master', title: 'Maître', desc: 'Sauver 100 parachutistes', target: 100, icon: '👑' },
    { id: 'combo5', title: 'Combo x5', desc: '5 sauvetages consécutifs', target: 5, icon: '🔥' },
    { id: 'combo10', title: 'Combo x10', desc: '10 sauvetages consécutifs', target: 10, icon: '⚡' },
    { id: 'perfectGame', title: 'Partie parfaite', desc: 'Score 20+ sans miss', target: 20, icon: '💎' },
    { id: 'speedster', title: 'Vitesse', desc: 'Atteindre le niveau 10', target: 10, icon: '🚀' }
];

// État du jeu
let gameState = {
    running: false,
    paused: false,
        sharkFins: [],
        lastFinSpawn: Date.now(),
    score: 0,
    misses: 0,
    highScore: 0,
    level: 1,
    boatPosition: 'MIDDLE',
    parachutists: [],
    sharks: [],
    helicopters: ['LEFT', 'MIDDLE', 'RIGHT'],
    lastSpawnTime: 0,
    gameOver: false,
    sharkFins: [],
    lastFinSpawn: Date.now(),
    gameMode: 'A',
    combo: 0,
    bestCombo: 0,
    stats: {
        gamesPlayed: 0,
        totalSaved: 0,
        totalMissed: 0,
        bestCombo: 0
    },
    achievements: {},
    lastMoveTime: 0
};

// Charger les données sauvegardées
function loadSavedData() {
    try {
        const saved = localStorage.getItem('parachute_save');
        if (saved) {
            const data = JSON.parse(saved);
            gameState.highScore = data.highScore || 0;
            gameState.stats = data.stats || gameState.stats;
            gameState.achievements = data.achievements || {};
            gameState.gameMode = data.gameMode || 'A';

            updateDisplay();
            updateStatsDisplay();
        }
    } catch (e) {
        console.warn('Erreur de chargement des données:', e);
    }
}

// Sauvegarder les données
function saveData() {
    try {
        const data = {
            highScore: gameState.highScore,
            stats: gameState.stats,
            achievements: gameState.achievements,
            gameMode: gameState.gameMode
        };
        localStorage.setItem('parachute_save', JSON.stringify(data));
    } catch (e) {
        console.warn('Erreur de sauvegarde:', e);
    }
}

// Classe Parachutiste
class Parachutist {
    constructor(column) {
        this.column = column;
        this.columnData = COLUMNS[column];
        this.frame = 1;
        this.maxFrames = this.columnData.frames;
        this.x = this.columnData.x;
        this.y = 30;
        this.lastFrameTime = Date.now();
        this.caught = false;
        this.missed = false;
    }

    update() {
        const config = CONFIG['GAME_' + gameState.gameMode];
        const fallSpeed = Math.max(400, config.FALL_SPEED - (gameState.level - 1) * 50);
        const now = Date.now();

        if (now - this.lastFrameTime > fallSpeed) {
            this.frame++;
            this.lastFrameTime = now;

            if (this.frame > this.maxFrames) {
                this.checkCatch();
                return true;
            }
        }

        return false;
    }

    checkCatch() {
        const boatPos = gameState.boatPosition;

        if (
            (this.column === 'LEFT' && boatPos === 'LEFT') ||
            (this.column === 'MIDDLE' && boatPos === 'MIDDLE') ||
            (this.column === 'RIGHT' && boatPos === 'RIGHT')
        ) {
            this.caught = true;
            gameState.score++;
            gameState.combo++;
            gameState.stats.totalSaved++;

            if (gameState.combo > gameState.bestCombo) {
                gameState.bestCombo = gameState.combo;
            }
            if (gameState.combo > gameState.stats.bestCombo) {
                gameState.stats.bestCombo = gameState.combo;
            }

            sounds.catch();
            checkLevelUp();
            checkAchievements();
            updateDisplay();

            // Animation du score
            document.getElementById('scorePanel').classList.add('highlight');
            setTimeout(() => {
                document.getElementById('scorePanel').classList.remove('highlight');
            }, 500);

        } else {
            this.missed = true;
            gameState.misses++;
            gameState.combo = 0;
            gameState.stats.totalMissed++;

            sounds.miss();
            addShark(this.column);
            updateDisplay();

            if (gameState.misses >= 3) {
                gameOver();
            }
        }
    }

    draw() {
        if (this.frame <= this.maxFrames) {
            const spriteName = `${this.columnData.sprites}.${this.getSpritePrefix()}par${this.frame}`;
            // Ajusté pour canvas 450×230 (25 + frame*25 au lieu de 40 + frame*35)
            const yPos = 25 + (this.frame - 1) * 25;
            ParachuteSprites.draw(ctx, spriteName, this.x - 10, yPos, 2, LCD_DARK);
        }
    }

    getSpritePrefix() {
        if (this.column === 'LEFT') return 'l';
        if (this.column === 'MIDDLE') return 'm';
        if (this.column === 'RIGHT') return 'r';
    }
}

// Classe Requin
class Shark {
    constructor(column) {
        this.column = column;
        this.x = COLUMNS[column].x;
        this.y = 184;  // Ajusté pour canvas 450×215 pour canvas 450×230
        this.createdAt = Date.now();
        this.frame = 1;
    }

    shouldRemove() {
        const config = CONFIG['GAME_' + gameState.gameMode];
        return Date.now() - this.createdAt > config.SHARK_DURATION;
    }

    draw() {
        const elapsed = Date.now() - this.createdAt;
        this.frame = Math.min(6, Math.floor(elapsed / 100) + 1);
        ParachuteSprites.draw(ctx, `sharks.shark${this.frame}`, this.x - 15, this.y, 2, LCD_DARK);
    }
}

// Ajouter un requin
function addShark(column) {
    gameState.sharks.push(new Shark(column));
}

// Spawn parachutiste
function spawnParachutist() {
    const columns = Object.keys(COLUMNS);
    const randomColumn = columns[Math.floor(Math.random() * columns.length)];
    gameState.parachutists.push(new Parachutist(randomColumn));
}

// Déplacer le bateau
function moveBoat(direction) {
    if (!gameState.running || gameState.paused || gameState.gameOver) return;

    const now = Date.now();
    if (now - gameState.lastMoveTime < 100) return; // Anti-spam
    gameState.lastMoveTime = now;

    const positions = ['LEFT', 'MIDDLE', 'RIGHT'];
    const currentIndex = positions.indexOf(gameState.boatPosition);

    if (direction === 'left' && currentIndex > 0) {
        gameState.boatPosition = positions[currentIndex - 1];
        sounds.move();
    } else if (direction === 'right' && currentIndex < 2) {
        gameState.boatPosition = positions[currentIndex + 1];
        sounds.move();
    }
}

// Vérifier level up
function checkLevelUp() {
    const newLevel = Math.floor(gameState.score / 10) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        sounds.levelUp();
        showNotification(`Niveau ${newLevel} !`);
    }
}

// Vérifier achievements
function checkAchievements() {
    ACHIEVEMENTS.forEach(achievement => {
        if (gameState.achievements[achievement.id]) return;

        let unlocked = false;

        switch (achievement.id) {
            case 'first':
            case 'bronze':
            case 'silver':
            case 'gold':
            case 'master':
                unlocked = gameState.stats.totalSaved >= achievement.target;
                break;
            case 'combo5':
            case 'combo10':
                unlocked = gameState.combo >= achievement.target;
                break;
            case 'perfectGame':
                unlocked = gameState.score >= achievement.target && gameState.misses === 0;
                break;
            case 'speedster':
                unlocked = gameState.level >= achievement.target;
                break;
        }

        if (unlocked) {
            gameState.achievements[achievement.id] = true;
            sounds.achievement();
            showNotification(`🏆 ${achievement.title} débloqué !`);
            saveData();
            renderAchievements();
        }
    });
}

// Game Over
function gameOver() {
    gameState.gameOver = true;
    gameState.running = false;
    gameState.stats.gamesPlayed++;

    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        sounds.highScore();
        showNotification('🎉 Nouveau High Score !');
        document.getElementById('highScorePanel').classList.add('highlight');
        setTimeout(() => {
            document.getElementById('highScorePanel').classList.remove('highlight');
        }, 1000);
    } else {
        sounds.gameOver();
    }

    checkAchievements();
    saveData();
    updateStatsDisplay();

    setTimeout(() => {
        ctx.fillStyle = LCD_DARK;
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '18px monospace';
        ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.font = '14px monospace';
        ctx.fillText('Appuyez sur START', canvas.width / 2, canvas.height / 2 + 50);
    }, 100);
}

// Démarrer le jeu
function startGame() {
    if (gameState.running && !gameState.paused) {
        gameState.paused = true;
        return;
    }

    if (gameState.paused) {
        gameState.paused = false;
        return;
    }

    // Nouveau jeu
    gameState = {
        ...gameState,
        running: true,
        paused: false,
        sharkFins: [],
        lastFinSpawn: Date.now(),
        score: 0,
        misses: 0,
        level: 1,
        boatPosition: 'MIDDLE',
        parachutists: [],
        sharks: [],
        lastSpawnTime: Date.now(),
        gameOver: false,
    sharkFins: [],
    lastFinSpawn: Date.now(),
        combo: 0,
        bestCombo: 0
    };

    sounds.gameStart();
    updateDisplay();
    gameLoop();
}

// Changer de mode
function toggleGameMode() {
    gameState.gameMode = gameState.gameMode === 'A' ? 'B' : 'A';
    document.getElementById('gameModeDisplay').textContent = `GAME ${gameState.gameMode}`;
    saveData();
    showNotification(`Mode GAME ${gameState.gameMode}`);
}

// Dessiner le background avec couleurs authentiques
function drawBackground() {
    if (backgroundLoaded) {
        // Étirer PLUS pour éliminer complètement les bandes brunes
        // On étire 110% de la largeur pour bien couvrir
        const drawWidth = canvas.width * 1.1;  // 10% plus large
        const bgRatio = backgroundImage.width / backgroundImage.height;
        const drawHeight = drawWidth / bgRatio;
        
        // Centrer horizontalement et verticalement
        const offsetX = -(drawWidth - canvas.width) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;
        
        // Fond LCD de base
        ctx.fillStyle = LCD_BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner le background étiré et centré
        ctx.drawImage(backgroundImage, offsetX, offsetY, drawWidth, drawHeight);
        
        // Léger overlay LCD pour l'authenticité
        ctx.fillStyle = 'rgba(200, 195, 160, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        // Fallback : fond LCD simple
        ctx.fillStyle = LCD_BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Simuler les zones de couleur (ajustées pour canvas 450×233)
        // Ciel
        ctx.fillStyle = 'rgba(200, 220, 240, 0.15)';
        ctx.fillRect(0, 0, canvas.width, 140);

        // Arbres
        ctx.fillStyle = 'rgba(100, 180, 100, 0.15)';
        ctx.beginPath();
        ctx.ellipse(40, 180, 30, 35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(410, 180, 30, 35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eau
        ctx.fillStyle = 'rgba(100, 150, 200, 0.12)';
        ctx.fillRect(0, 182, canvas.width, 51);
    }
}


// Boucle de jeu
function gameLoop() {
    if (!gameState.running) return;

    const config = CONFIG['GAME_' + gameState.gameMode];

    // Dessiner le background
    drawBackground();

    // Dessiner le score avec chiffres LCD en haut
    drawLCDScore();

    if (gameState.paused) {
        ctx.fillStyle = LCD_DARK;
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
        setTimeout(gameLoop, 1000 / config.FPS);
        return;
    }

    // Spawn
    const now = Date.now();
    const spawnInterval = Math.max(1000, config.SPAWN_INTERVAL - (gameState.level - 1) * 100);
    if (now - gameState.lastSpawnTime > spawnInterval) {
        spawnParachutist();
        gameState.lastSpawnTime = now;
    }

    // Dessiner hélicoptères
    drawHelicopter();

    // Update et dessiner parachutistes
    gameState.parachutists = gameState.parachutists.filter(p => {
        const shouldRemove = p.update();
        if (!shouldRemove) p.draw();
        return !shouldRemove;
    });

    // Spawn nageoires aléatoires (toutes les 4-8 secondes)
    const finSpawnInterval = 4000 + Math.random() * 4000;
    if (now - gameState.lastFinSpawn > finSpawnInterval) {
        spawnSharkFin();
        gameState.lastFinSpawn = now;
    }

    // Update et dessiner nageoires
    gameState.sharkFins = gameState.sharkFins.filter(fin => {
        if (!fin.shouldRemove()) {
            fin.draw();
            return true;
        }
        return false;
    });

    // Update et dessiner requins
    gameState.sharks = gameState.sharks.filter(s => {
        if (!s.shouldRemove()) {
            s.draw();
            return true;
        }
        return false;
    });

    // Dessiner bateau (utilise la position Y définie)
    const boatPos = BOAT_POSITIONS[gameState.boatPosition];
    ParachuteSprites.draw(ctx, `boats.${boatPos.sprite}`, boatPos.x, boatPos.y, 2, LCD_DARK);

    // Dessiner arbres (ajustés pour canvas 450×230)

    // Dessiner combo
    if (gameState.combo >= 3) {
        ctx.fillStyle = LCD_DARK;
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`COMBO ×${gameState.combo}`, 20, 20);
    }

    // Continuer
    setTimeout(gameLoop, 1000 / config.FPS);
}

// Dessiner UN SEUL hélicoptère (en haut à droite comme dans l'original)
function drawHelicopter() {
    const time = Date.now() / 100;
    const heliX = 390;  // Position à droite
    const heliY = 10;

    // Corps de l'hélico
    ctx.fillStyle = LCD_DARK;
    ctx.fillRect(heliX - 10, heliY, 20, 8);
    ctx.fillRect(heliX - 5, heliY - 3, 10, 3);

    // Hélice tournante
    const angle = time % (Math.PI * 2);
    ctx.save();
    ctx.translate(heliX, heliY - 3);
    ctx.rotate(angle);
    ctx.fillRect(-15, -1, 30, 2);
    ctx.restore();
}

// Mettre à jour l'affichage
function updateDisplay() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('highScore').textContent = gameState.highScore;
    document.getElementById('misses').textContent = gameState.misses;
    document.getElementById('level').textContent = gameState.level;
}

// Mettre à jour les stats
function updateStatsDisplay() {
    document.getElementById('gamesPlayed').textContent = gameState.stats.gamesPlayed;
    document.getElementById('totalSaved').textContent = gameState.stats.totalSaved;
    document.getElementById('bestCombo').textContent = gameState.stats.bestCombo;

    const total = gameState.stats.totalSaved + gameState.stats.totalMissed;
    const rate = total > 0 ? Math.round((gameState.stats.totalSaved / total) * 100) : 0;
    document.getElementById('successRate').textContent = rate + '%';
}

// Afficher achievements
function renderAchievements() {
    const container = document.getElementById('achievementsList');
    container.innerHTML = '';

    ACHIEVEMENTS.forEach(achievement => {
        const unlocked = gameState.achievements[achievement.id];
        const div = document.createElement('div');
        div.className = 'achievement' + (unlocked ? '' : ' locked');
        div.innerHTML = `
            <div class="achievement-icon">${unlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-text">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Afficher notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// Écran d'accueil
function drawStartScreen() {
    // Dessiner le background
    drawBackground();

    ctx.fillStyle = LCD_DARK;
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PARACHUTE', canvas.width / 2, 60);

    ctx.font = '16px monospace';
    ctx.fillText('Nintendo Game & Watch', canvas.width / 2, 85);
    ctx.fillText('(1981)', canvas.width / 2, 105);

    // Parachutiste démo (ajusté pour canvas 450×230)
    ParachuteSprites.draw(ctx, 'parachutists_middle.mpar4', 205, 120, 2.5, LCD_DARK);

    ctx.font = '16px monospace';
    ctx.fillText('Appuyez sur START', canvas.width / 2, 190);
    ctx.font = '13px monospace';
    ctx.fillText(`Mode: GAME ${gameState.gameMode}`, canvas.width / 2, 210);
}

// Contrôles clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveBoat('left');
    else if (e.key === 'ArrowRight') moveBoat('right');
    else if (e.key === ' ' || e.key === 'Enter') startGame();
    else if (e.key === 'm' || e.key === 'M') toggleGameMode();
    else if (e.key === 's' || e.key === 'S') {
        const enabled = sounds.toggle();
        showNotification(enabled ? '🔊 Son activé' : '🔇 Son désactivé');
    }
    else if (e.key === 'r' || e.key === 'R') {
        if (!gameState.running) startGame();
    }
});

// Boutons
document.getElementById('btnLeft').addEventListener('click', () => moveBoat('left'));
document.getElementById('btnRight').addEventListener('click', () => moveBoat('right'));
document.getElementById('btnStart').addEventListener('click', startGame);
document.getElementById('btnGameMode').addEventListener('click', toggleGameMode);
document.getElementById('btnSound').addEventListener('click', () => {
    const enabled = sounds.toggle();
    showNotification(enabled ? '🔊 Son activé' : '🔇 Son désactivé');
});
document.getElementById('btnReset').addEventListener('click', () => {
    if (confirm('Reset le jeu ? (les stats et achievements seront conservés)')) {
        if (gameState.running) {
            gameState.running = false;
        }
        drawStartScreen();
    }
});

document.getElementById('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.getElementById('btnResetStats').addEventListener('click', () => {
    if (confirm('Effacer toutes les stats et achievements ?')) {
        gameState.stats = {
            gamesPlayed: 0,
            totalSaved: 0,
            totalMissed: 0,
            bestCombo: 0
        };
        gameState.achievements = {};
        gameState.highScore = 0;
        saveData();
        updateDisplay();
        updateStatsDisplay();
        renderAchievements();
        showNotification('Stats effacées');
    }
});

// Initialiser
loadSavedData();
renderAchievements();

// Afficher écran de chargement
ctx.fillStyle = LCD_BG;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = LCD_DARK;
ctx.font = '18px monospace';
ctx.textAlign = 'center';
ctx.fillText('Chargement...', canvas.width / 2, canvas.height / 2);

// Attendre que le background soit chargé
setTimeout(() => {
    drawStartScreen();
}, 100);

console.log('🎮 Jeu Parachute ULTRA chargé !');
console.log('🎨 Background avec couleurs authentiques');
console.log('Mode:', gameState.gameMode);
console.log('High Score:', gameState.highScore);

// ============================================
// SYSTÈME DE NAGEOIRES ALÉATOIRES
// ============================================

class SharkFin {
    constructor() {
        this.x = Math.random() * (canvas.width - 50) + 25;
        this.y = 195 + Math.random() * 20; // Zone d'eau
        this.type = Math.random() < 0.85 ? 
            Math.floor(Math.random() * 4) + 1 : // lshark1-4 (nageoires)
            5; // lshark5 (tête qui sort)
        this.createdAt = Date.now();
        this.duration = 2000 + Math.random() * 2000; // 2-4 secondes
        this.alpha = 0;
        this.fadeInDuration = 500;
        this.fadeOutStart = this.duration - 500;
    }

    shouldRemove() {
        return Date.now() - this.createdAt > this.duration;
    }

    draw() {
        const elapsed = Date.now() - this.createdAt;
        
        // Fade in/out
        if (elapsed < this.fadeInDuration) {
            this.alpha = elapsed / this.fadeInDuration;
        } else if (elapsed > this.fadeOutStart) {
            this.alpha = 1 - ((elapsed - this.fadeOutStart) / 500);
        } else {
            this.alpha = 1;
        }

        if (this.alpha > 0) {
            ctx.globalAlpha = this.alpha;
            ParachuteSprites.draw(
                ctx, 
                `shark_fins.lshark${this.type}`, 
                this.x, 
                this.y, 
                2, 
                LCD_DARK
            );
            ctx.globalAlpha = 1;
        }
    }
}

// Liste des nageoires actives
gameState.sharkFins = [];
gameState.lastFinSpawn = Date.now();

// Fonction pour spawn une nageoire
function spawnSharkFin() {
    // Limiter à 2-3 nageoires simultanées
    if (gameState.sharkFins.length < 3) {
        gameState.sharkFins.push(new SharkFin());
    }
}


// ============================================
// AFFICHAGE DU SCORE AVEC CHIFFRES LCD
// ============================================

function drawLCDScore() {
    const scoreStr = gameState.score.toString().padStart(3, '0'); // Format 000
    const digitWidth = 8;
    const digitScale = 2;
    const spacing = 2;
    const totalWidth = (scoreStr.length * digitWidth * digitScale) + ((scoreStr.length - 1) * spacing);
    
    // Position centrée en haut
    let x = (canvas.width / 2) - (totalWidth / 2);
    const y = 8;
    
    // Dessiner chaque chiffre
    for (let i = 0; i < scoreStr.length; i++) {
        const digit = scoreStr[i];
        const digitNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        
        ParachuteSprites.draw(
            ctx,
            `digits.${digitNames[parseInt(digit)]}`,
            x,
            y,
            digitScale,
            LCD_DARK
        );
        
        x += (digitWidth * digitScale) + spacing;
    }
}
