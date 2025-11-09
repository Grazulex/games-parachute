// ============================================
// SYSTÈME DE SONS - Sons authentiques Game & Watch 1981
// ============================================

class GameSounds {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.masterVolume = 0.5;
        this.buffers = {};
        this.loading = false;

        // Initialiser l'AudioContext (nécessite interaction utilisateur)
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.loadSounds();
        } catch (e) {
            console.warn('Web Audio API non supportée');
            this.enabled = false;
        }
    }

    // Charger les sons authentiques VOC convertis en WAV
    // Utilise des éléments HTML <audio> pour éviter les problèmes CORS avec file://
    loadSounds() {
        const sounds = ['got', 'miss1', 'miss2', 'miss3', 'tick'];

        sounds.forEach(soundName => {
            const audio = new Audio(`sounds/${soundName}.wav`);
            audio.preload = 'auto';
            audio.volume = this.masterVolume;
            this.buffers[soundName] = audio;
        });

        console.log('✓ Sons authentiques Game & Watch chargés (HTML Audio)');
    }

    // Jouer un son audio HTML
    playBuffer(bufferName, volume = 1.0) {
        if (!this.enabled) return;

        // Si le son n'est pas chargé
        if (!this.buffers[bufferName]) {
            console.warn(`Son ${bufferName} pas chargé`);
            return;
        }

        try {
            // Cloner l'audio pour permettre plusieurs lectures simultanées
            const audio = this.buffers[bufferName].cloneNode();
            audio.volume = this.masterVolume * volume;
            audio.play().catch(e => {
                console.warn('Erreur lecture son:', e);
            });
        } catch (e) {
            console.error('Erreur lecture son:', e);
        }
    }

    // Jouer un beep simple
    beep(frequency, duration, volume = 1.0) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'square'; // Son 8-bit typique

        gainNode.gain.setValueAtTime(this.masterVolume * volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Son : Parachutiste attrapé (succès) - Son authentique
    catch() {
        this.playBuffer('got');
    }

    // Son : Parachutiste raté (échec) - Son authentique avec 3 variantes
    miss() {
        const missVariant = Math.floor(Math.random() * 3) + 1;
        this.playBuffer(`miss${missVariant}`);
    }

    // Son : Déplacement du bateau - Son authentique
    move() {
        this.playBuffer('tick', 0.6);
    }

    // Son : Début du jeu
    gameStart() {
        this.beep(600, 0.1);
        setTimeout(() => this.beep(800, 0.1), 100);
        setTimeout(() => this.beep(1000, 0.15), 200);
    }

    // Son : Game Over
    gameOver() {
        this.beep(400, 0.2);
        setTimeout(() => this.beep(350, 0.2), 200);
        setTimeout(() => this.beep(300, 0.2), 400);
        setTimeout(() => this.beep(250, 0.4), 600);
    }

    // Son : Nouveau high score
    highScore() {
        const melody = [
            { freq: 523, time: 0 },    // Do
            { freq: 659, time: 150 },  // Mi
            { freq: 784, time: 300 },  // Sol
            { freq: 1047, time: 450 }  // Do haut
        ];

        melody.forEach(note => {
            setTimeout(() => this.beep(note.freq, 0.15), note.time);
        });
    }

    // Son : Niveau complété
    levelUp() {
        this.beep(700, 0.1);
        setTimeout(() => this.beep(900, 0.1), 100);
        setTimeout(() => this.beep(1100, 0.2), 200);
    }

    // Son : Achievement débloqué
    achievement() {
        this.beep(1200, 0.1);
        setTimeout(() => this.beep(1400, 0.1), 100);
        setTimeout(() => this.beep(1600, 0.1), 200);
        setTimeout(() => this.beep(1800, 0.2), 300);
    }

    // Activer/désactiver les sons
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Changer le volume
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameSounds;
}
