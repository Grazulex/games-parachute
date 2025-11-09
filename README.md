# 🎮 Parachute - Game & Watch (1981)

Recréation **ULTRA-COMPLÈTE** du jeu **Parachute** de Nintendo Game & Watch sorti en 1981.

![Game & Watch Parachute](https://via.placeholder.com/400x300/c8c3a0/1a1a0f?text=PARACHUTE)

## 🚁 À propos

Ce projet est une recréation fidèle et **AMÉLIORÉE** du jeu original Parachute, l'un des premiers jeux Game & Watch de Nintendo. Tous les sprites ont été extraits depuis les 68 fichiers PCX originaux du simulateur.

## ✨ Nouveautés - Version ULTRA

🎯 **Gameplay enrichi**
- Mode Game A et Game B (difficulté différente)
- Système de niveaux avec difficulté progressive
- Système de combo (enchainements)
- High Score sauvegardé automatiquement

🎨 **Éléments visuels**
- **Background coloré authentique** - Ciel, arbres verts, eau bleue
- Hélicoptères animés avec hélices tournantes
- Sprites LCD authentiques (68 sprites extraits)
- Interface Game & Watch fidèle
- Effets LCD overlay

🔊 **Sons 8-bit rétro**
- Beeps pour chaque action
- Sons de succès/échec
- Mélodies pour achievements
- Contrôle du volume

🏆 **Achievements & Stats**
- 9 achievements à débloquer
- Statistiques détaillées (parties, taux de réussite)
- Meilleur combo sauvegardé
- Panneau latéral avec progression

⚙️ **Options avancées**
- Sauvegarde automatique (localStorage)
- Mode plein écran
- Reset des stats
- Son On/Off

## 🎯 Objectif du jeu

Des parachutistes sautent d'hélicoptères situés à trois positions (gauche, milieu, droite). Votre mission est de les attraper avec votre bateau en vous déplaçant rapidement sous eux. Si vous manquez un parachutiste, il tombe à l'eau et se fait dévorer par un requin !

**Attention** : 3 parachutistes manqués = Game Over !

## 🕹️ Comment jouer

### Démarrer le jeu
Ouvrez simplement le fichier `index.html` dans un navigateur web moderne.

```bash
# Avec Firefox
firefox index.html

# Avec Chrome
google-chrome index.html

# Ou double-cliquez sur index.html
```

### Contrôles

**Clavier :**
- `←` (Flèche gauche) : Déplacer le bateau à gauche
- `→` (Flèche droite) : Déplacer le bateau à droite
- `ESPACE` ou `ENTRÉE` : Démarrer / Pause
- `M` : Changer de mode (Game A/B)
- `S` : Activer/Désactiver le son
- `R` : Recommencer

**Boutons à l'écran :**
- `←` : Déplacer à gauche
- `A/B` : Changer de mode
- `→` : Déplacer à droite
- `♪` : Son On/Off
- `▶` : Démarrer / Pause
- `↻` : Reset

## 🎨 Caractéristiques

✅ **Sprites authentiques** - 68 sprites extraits des fichiers PCX originaux
✅ **Style LCD** - Affichage style Game & Watch avec couleurs LCD
✅ **Animations fluides** - 7 frames d'animation pour les parachutistes
✅ **Gameplay fidèle** - Mécanique identique au jeu original
✅ **Score et statistiques** - Suivi du score et des miss
✅ **Requins animés** - 6 frames d'animation pour les requins
✅ **Design authentique** - Boîtier beige style Game & Watch des années 80

## 🏆 Achievements

Débloquez 9 achievements en jouant :

| Achievement | Description | Objectif |
|-------------|-------------|----------|
| 🪂 Premier sauvetage | Sauver 1 parachutiste | 1 |
| 🥉 Bronze | Sauver 10 parachutistes | 10 |
| 🥈 Argent | Sauver 25 parachutistes | 25 |
| 🥇 Or | Sauver 50 parachutistes | 50 |
| 👑 Maître | Sauver 100 parachutistes | 100 |
| 🔥 Combo x5 | 5 sauvetages consécutifs | 5 |
| ⚡ Combo x10 | 10 sauvetages consécutifs | 10 |
| 💎 Partie parfaite | Score 20+ sans miss | 20 |
| 🚀 Vitesse | Atteindre le niveau 10 | 10 |

## 📦 Structure du projet

```
Parachut/
├── index.html         # Jeu ULTRA complet (NOUVEAU)
├── game-ultra.js      # Moteur ultra avec toutes les fonctionnalités
├── sounds.js          # Système de sons 8-bit
├── game.html          # Version simple du jeu
├── game.js            # Logique version simple
├── sprites/
│   ├── parachute-sprites.js   # Module des sprites (39 sprites)
│   ├── png/                    # 68 sprites PNG
│   ├── demo.html               # Démo des sprites
│   └── README.md               # Documentation sprites
├── Par/               # Fichiers PCX originaux (68 .dat)
├── archive/           # Fichiers temporaires archivés
└── README.md          # Ce fichier
```

## 🎮 Gameplay

### Règles

1. Les parachutistes apparaissent aléatoirement depuis 3 positions
2. Ils tombent en 5-7 étapes d'animation
3. Positionnez votre bateau sous le parachutiste avant qu'il touche l'eau
4. +1 point par parachutiste sauvé
5. +1 miss par parachutiste raté
6. Game Over à 3 miss

### Positions du bateau

Le bateau peut se déplacer sur **3 positions** :
- **Gauche** : Pour attraper les parachutistes de l'hélicoptère gauche
- **Milieu** : Pour attraper les parachutistes de l'hélicoptère central
- **Droite** : Pour attraper les parachutistes de l'hélicoptère droit

### Difficulté

Le jeu devient progressivement plus difficile :
- Les parachutistes apparaissent plus fréquemment
- Vous devez anticiper leur trajectoire
- Gérer plusieurs parachutistes simultanément

## 🛠️ Technologies utilisées

- **HTML5 Canvas** : Rendu graphique
- **JavaScript ES6** : Logique du jeu
- **CSS3** : Style et design
- **Python PIL** : Extraction des sprites PCX

## 📊 Sprites extraits

Le jeu utilise **39 sprites principaux** :

| Catégorie | Sprites | Usage |
|-----------|---------|-------|
| Chiffres | 10 | Affichage du score (7-segments) |
| Bateaux | 3 | Bateau aux 3 positions |
| Parachutistes | 18 | Animations de chute (3 colonnes) |
| Requins | 6 | Animation des requins |
| Arbres | 2 | Décor (palmiers) |

Voir `sprites/README.md` pour plus de détails.

## 🎯 Score

- **Débutant** : 0-10 points
- **Amateur** : 11-25 points
- **Expert** : 26-50 points
- **Maître** : 51-100 points
- **Légende** : 100+ points

## 🐛 Développement

### Modifier le jeu

Éditez `game.js` pour modifier :
- `CONFIG.FPS` : Vitesse du jeu (défaut: 10)
- `CONFIG.SPAWN_INTERVAL` : Fréquence d'apparition (défaut: 2000ms)
- `CONFIG.FALL_SPEED` : Vitesse de chute (défaut: 800ms)

### Ajouter des sprites

Les sprites sont dans `sprites/parachute-sprites.js`. Pour en ajouter :

```javascript
// Utilisation
ParachuteSprites.draw(ctx, 'boats.lboat', x, y, scale, color);
```

## 🎨 Design authentique

Le jeu reproduit fidèlement l'esthétique Game & Watch :
- Boîtier beige avec bordures arrondies
- Écran LCD avec fond vert-beige (#c8c3a0)
- Segments LCD noirs (#1a1a0f)
- Boutons circulaires style années 80

## 📝 Historique

**1981** - Sortie du Game & Watch Parachute original par Nintendo
**2020** - Création du simulateur avec fichiers PCX
**2025** - Recréation web avec extraction des sprites originaux

## 🏆 Records

Essayez de battre ces scores :

- ⭐ **10 points** : Premier succès
- ⭐⭐ **25 points** : Expert
- ⭐⭐⭐ **50 points** : Maître
- 🏆 **100 points** : Légende du Parachute !

## 📄 Licence

Projet éducatif basé sur le Game & Watch Parachute de Nintendo (1981).
Sprites extraits depuis le simulateur open-source.

---

**Bon jeu ! 🎮🪂**

*Nintendo Game & Watch - Parachute © 1981 Nintendo*
