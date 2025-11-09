// ============================================
// JEU PARACHUTE - Game & Watch (1981)
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Couleurs LCD Game & Watch
const LCD_DARK = '#1a1a0f';
const LCD_BG = '#c8c3a0';
const LCD_LIGHT = '#a8a390';

// Configuration du jeu
const CONFIG = {
    FPS: 10,
    SPAWN_INTERVAL: 2000, // ms entre chaque parachutiste
    FALL_SPEED: 800,      // ms entre chaque frame d'animation
    SHARK_DURATION: 1500  // durée d'affichage du requin
};

// Positions des colonnes
const COLUMNS = {
    LEFT: { x: 80, frames: 7, sprites: 'parachutists_left' },
    MIDDLE: { x: 200, frames: 6, sprites: 'parachutists_middle' },
    RIGHT: { x: 320, frames: 5, sprites: 'parachutists_right' }
};

// Positions du bateau
const BOAT_POSITIONS = {
    LEFT: { x: 60, sprite: 'lboat' },
    MIDDLE: { x: 180, sprite: 'mboat' },
    RIGHT: { x: 300, sprite: 'rboat' }
};

// État du jeu
let gameState = {
    running: false,
    paused: false,
    score: 0,
    misses: 0,
    boatPosition: 'MIDDLE',
    parachutists: [],
    sharks: [],
    lastSpawnTime: 0,
    gameOver: false
};

// Classe Parachutiste
class Parachutist {
    constructor(column) {
        this.column = column;
        this.columnData = COLUMNS[column];
        this.frame = 1;
        this.maxFrames = this.columnData.frames;
        this.x = this.columnData.x;
        this.y = 20;
        this.lastFrameTime = Date.now();
        this.caught = false;
        this.missed = false;
    }

    update() {
        const now = Date.now();

        if (now - this.lastFrameTime > CONFIG.FALL_SPEED) {
            this.frame++;
            this.lastFrameTime = now;

            // Vérifier si arrivé en bas
            if (this.frame > this.maxFrames) {
                this.checkCatch();
                return true; // Supprimer ce parachutiste
            }
        }

        return false;
    }

    checkCatch() {
        const boatPos = gameState.boatPosition;

        // Vérifier si le bateau est dans la bonne position
        if (
            (this.column === 'LEFT' && boatPos === 'LEFT') ||
            (this.column === 'MIDDLE' && boatPos === 'MIDDLE') ||
            (this.column === 'RIGHT' && boatPos === 'RIGHT')
        ) {
            // Attrapé !
            this.caught = true;
            gameState.score++;
            updateScoreDisplay();
        } else {
            // Raté !
            this.missed = true;
            gameState.misses++;
            updateScoreDisplay();

            // Ajouter un requin
            addShark(this.column);

            // Game over si 3 miss
            if (gameState.misses >= 3) {
                gameOver();
            }
        }
    }

    draw() {
        if (this.frame <= this.maxFrames) {
            const spriteName = `${this.columnData.sprites}.${this.getSpritePrefix()}par${this.frame}`;

            // Calculer la position Y basée sur la frame
            const yPos = 30 + (this.frame - 1) * 30;

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
        this.y = 250;
        this.createdAt = Date.now();
        this.frame = 1;
    }

    shouldRemove() {
        return Date.now() - this.createdAt > CONFIG.SHARK_DURATION;
    }

    draw() {
        // Animer le requin (6 frames)
        const elapsed = Date.now() - this.createdAt;
        this.frame = Math.min(6, Math.floor(elapsed / 100) + 1);

        ParachuteSprites.draw(
            ctx,
            `sharks.shark${this.frame}`,
            this.x - 15,
            this.y,
            2,
            LCD_DARK
        );
    }
}

// Ajouter un requin
function addShark(column) {
    gameState.sharks.push(new Shark(column));
}

// Spawn un parachutiste
function spawnParachutist() {
    const columns = ['LEFT', 'MIDDLE', 'RIGHT'];
    const randomColumn = columns[Math.floor(Math.random() * columns.length)];
    gameState.parachutists.push(new Parachutist(randomColumn));
}

// Déplacer le bateau
function moveBoat(direction) {
    if (!gameState.running || gameState.paused || gameState.gameOver) return;

    const positions = ['LEFT', 'MIDDLE', 'RIGHT'];
    const currentIndex = positions.indexOf(gameState.boatPosition);

    if (direction === 'left' && currentIndex > 0) {
        gameState.boatPosition = positions[currentIndex - 1];
    } else if (direction === 'right' && currentIndex < 2) {
        gameState.boatPosition = positions[currentIndex + 1];
    }
}

// Mettre à jour l'affichage du score
function updateScoreDisplay() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('misses').textContent = gameState.misses;
}

// Game Over
function gameOver() {
    gameState.gameOver = true;
    gameState.running = false;

    // Afficher "GAME OVER" sur le canvas
    ctx.fillStyle = LCD_DARK;
    ctx.font = 'bold 30px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '16px monospace';
    ctx.fillText('Appuyez sur START pour rejouer', canvas.width / 2, canvas.height / 2 + 30);
}

// Démarrer le jeu
function startGame() {
    if (gameState.running && !gameState.paused) {
        // Pause
        gameState.paused = true;
        return;
    }

    if (gameState.paused) {
        // Reprendre
        gameState.paused = false;
        return;
    }

    // Nouveau jeu
    gameState = {
        running: true,
        paused: false,
        score: 0,
        misses: 0,
        boatPosition: 'MIDDLE',
        parachutists: [],
        sharks: [],
        lastSpawnTime: Date.now(),
        gameOver: false
    };

    updateScoreDisplay();
    gameLoop();
}

// Boucle de jeu principale
function gameLoop() {
    if (!gameState.running) return;

    // Effacer le canvas
    ctx.fillStyle = LCD_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState.paused) {
        // Afficher "PAUSE"
        ctx.fillStyle = LCD_DARK;
        ctx.font = 'bold 30px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
        setTimeout(gameLoop, 1000 / CONFIG.FPS);
        return;
    }

    // Spawn de nouveaux parachutistes
    const now = Date.now();
    if (now - gameState.lastSpawnTime > CONFIG.SPAWN_INTERVAL) {
        spawnParachutist();
        gameState.lastSpawnTime = now;
    }

    // Mettre à jour et dessiner les parachutistes
    gameState.parachutists = gameState.parachutists.filter(p => {
        const shouldRemove = p.update();
        if (!shouldRemove) {
            p.draw();
        }
        return !shouldRemove;
    });

    // Mettre à jour et dessiner les requins
    gameState.sharks = gameState.sharks.filter(s => {
        if (!s.shouldRemove()) {
            s.draw();
            return true;
        }
        return false;
    });

    // Dessiner le bateau
    const boatPos = BOAT_POSITIONS[gameState.boatPosition];
    ParachuteSprites.draw(ctx, `boats.${boatPos.sprite}`, boatPos.x, 260, 2, LCD_DARK);

    // Dessiner les arbres (décor)
    ParachuteSprites.draw(ctx, 'trees.treeParL', 10, 240, 2, LCD_DARK);
    ParachuteSprites.draw(ctx, 'trees.treeParR', 360, 240, 2, LCD_DARK);

    // Continuer la boucle
    setTimeout(gameLoop, 1000 / CONFIG.FPS);
}

// Contrôles clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveBoat('left');
    } else if (e.key === 'ArrowRight') {
        moveBoat('right');
    } else if (e.key === ' ' || e.key === 'Enter') {
        startGame();
    }
});

// Contrôles boutons
document.getElementById('btnLeft').addEventListener('click', () => moveBoat('left'));
document.getElementById('btnRight').addEventListener('click', () => moveBoat('right'));
document.getElementById('btnStart').addEventListener('click', startGame);

// Écran d'accueil
function drawStartScreen() {
    ctx.fillStyle = LCD_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = LCD_DARK;
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PARACHUTE', canvas.width / 2, 100);

    ctx.font = '16px monospace';
    ctx.fillText('Nintendo Game & Watch', canvas.width / 2, 130);
    ctx.fillText('(1981)', canvas.width / 2, 150);

    // Dessiner un exemple de parachutiste
    ParachuteSprites.draw(ctx, 'parachutists_middle.mpar3', 180, 170, 3, LCD_DARK);

    ctx.fillText('Appuyez sur START', canvas.width / 2, 250);
    ctx.font = '12px monospace';
    ctx.fillText('ou ESPACE pour commencer', canvas.width / 2, 270);
}

// Initialiser
drawStartScreen();
console.log('🎮 Jeu Parachute chargé !');
console.log('Sprites disponibles:', ParachuteSprites);
