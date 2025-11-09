# 🎮 Sprites du jeu Parachute (Game & Watch 1981)

Sprites extraits depuis les 68 fichiers PCX originaux du simulateur Nintendo Parachute.

## 📦 Contenu

### Fichiers générés

- **`parachute-sprites.js`** : Module JavaScript avec tous les sprites
- **`sprites_info.json`** : Métadonnées de tous les sprites (dimensions, positions)
- **`png/`** : 68 sprites extraits au format PNG
- **`demo.html`** : Démo interactive des sprites

### Planches de sprites (sprite sheets)

- `sheet_Chiffres.png` : Chiffres 0-9 + affichage digits
- `sheet_Bateaux.png` : 3 positions de bateaux
- `sheet_Parachutistes_L.png` : Animation gauche (7 frames)
- `sheet_Parachutistes_M.png` : Animation milieu (6 frames)
- `sheet_Parachutistes_R.png` : Animation droite (5 frames)
- `sheet_Requins.png` : Animation requins (11 frames)
- `sheet_UI_Boutons.png` : Boutons et éléments d'interface
- `sheet_Arbres.png` : Arbres gauche et droite

## 🎨 Catégories de sprites

### Chiffres (11 sprites)
- **0-9** : Chiffres individuels (8×13px)
- **digits** : Bande complète de chiffres (98×13px)

### Bateaux (6 sprites)
- **lboat** (26×16px) : Bateau position gauche
- **mboat** (27×19px) : Bateau position milieu
- **rboat** (29×16px) : Bateau position droite
- **lboatbgr, mboatbgr, rboatbgr** : Backgrounds/effacement

### Parachutistes (19 sprites)
- **lpar1-7** : Animation chute à gauche (9-20px de large)
- **mpar1-6** : Animation chute au milieu (10-18px)
- **rpar1-5** : Animation chute à droite (8-19px)

### Requins (11 sprites)
- **shark1-6** : Animation requin principal (19-38px)
- **lshark1-5** : Petits requins gauche (7-23px)

### Décor & UI
- **treeParL, treeParR** : Arbres (13×19px)
- Boutons, textes (AM/PM, GAME, MISS, START)
- Écrans (opening, backgrnd)

## 💻 Utilisation

### 1. Charger le module

```html
<script src="sprites/parachute-sprites.js"></script>
```

### 2. Dessiner un sprite

```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dessiner un bateau à la position (100, 150) avec échelle 2
ParachuteSprites.draw(ctx, 'boats.lboat', 100, 150, 2, '#1a1a0f');

// Dessiner un chiffre
ParachuteSprites.draw(ctx, 'digits.five', 50, 20, 3);

// Dessiner un parachutiste
ParachuteSprites.draw(ctx, 'parachutists_left.lpar3', 200, 80, 2);
```

### 3. Animer un parachutiste

```javascript
let frame = 1;
let frameMax = 7;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ParachuteSprites.draw(
    ctx,
    `parachutists_left.lpar${frame}`,
    100,
    50,
    3
  );

  frame = (frame % frameMax) + 1;

  setTimeout(animate, 100); // 10 FPS
}

animate();
```

### 4. Accéder aux données brutes

```javascript
// Obtenir les données d'un sprite
const boatData = ParachuteSprites.boats.lboat;

console.log(`Dimensions: ${boatData.width}×${boatData.height}`);
console.log(`Données:`, boatData.data);

// data est un tableau 2D: data[y][x] = 0 ou 1
```

## 🎨 Style LCD Game & Watch

Pour un rendu authentique type LCD :

```javascript
// Couleurs recommandées
const LCD_DARK = '#1a1a0f';      // Segments LCD sombres
const LCD_BG = '#c8c3a0';        // Fond LCD clair
const CASE_COLOR = '#dcd5b0';    // Boîtier beige

// Canvas avec fond LCD
canvas.style.background = LCD_BG;

// Dessiner avec couleur LCD sombre
ParachuteSprites.draw(ctx, 'boats.mboat', x, y, 2, LCD_DARK);
```

## 📊 Structure du fichier JavaScript

```javascript
ParachuteSprites = {
  digits: {
    zero: { width: 8, height: 13, data: [[...], [...], ...] },
    one: { width: 8, height: 13, data: [...] },
    // ...
  },
  boats: {
    lboat: { width: 26, height: 16, data: [...] },
    mboat: { width: 27, height: 19, data: [...] },
    rboat: { width: 29, height: 16, data: [...] }
  },
  parachutists_left: { lpar1: {...}, lpar2: {...}, ... },
  parachutists_middle: { mpar1: {...}, ... },
  parachutists_right: { rpar1: {...}, ... },
  sharks: { shark1: {...}, shark2: {...}, ... },
  trees: { treeParL: {...}, treeParR: {...} },

  draw: function(ctx, spriteName, x, y, scale, color) { ... }
}
```

## 🚀 Exemple complet

Voir `demo.html` pour un exemple interactif complet affichant tous les sprites.

Pour tester :
```bash
# Ouvrir dans un navigateur
firefox sprites/demo.html
# ou
google-chrome sprites/demo.html
```

## 📝 Notes techniques

- **Format source** : PCX ver. 3.0, 8-bit couleur, compression RLE
- **Résolution source** : 320×200 pixels (standard Game & Watch)
- **Format de sortie** : Tableaux JavaScript binaires (0 = transparent, 1 = pixel)
- **Extraction** : Python PIL (Pillow)
- **Compression** : Aucune (données brutes pour facilité d'utilisation)

## 🎯 Sprites par taille

| Taille | Sprites |
|--------|---------|
| 8×13   | Chiffres 0-9 (10 sprites) |
| 26×16  | lboat |
| 27×19  | mboat |
| 29×16  | rboat |
| 9-20×10-21 | Parachutistes animations |
| 7-38×6-15 | Requins animations |
| 13×19  | Arbres |

---

**Créé depuis les assets originaux du simulateur Nintendo Parachute (1981)**
*Extraction et conversion : 2025*
