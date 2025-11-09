---
id: 3
title: Créer le boîtier/device authentique Game & Watch
status: Done
priority: high
assignees: []
labels:
  - design
  - boitier
subtasks: []
dependencies: []
blocked_by: []
created_date: '2025-11-08T21:40:51.067Z'
updated_date: '2025-11-08T21:52:30.711Z'
closed_date: '2025-11-08T21:46:55.682Z'
changelog:
  - timestamp: '2025-11-08T21:40:51.067Z'
    action: created
    details: Task created
    user: system
  - timestamp: '2025-11-08T21:45:29.524Z'
    action: updated
    details: 'status: To Do → In Progress'
    user: system
  - timestamp: '2025-11-08T21:46:55.277Z'
    action: modified
    details: Task updated
    user: AI
  - timestamp: '2025-11-08T21:46:55.682Z'
    action: updated
    details: 'status: In Progress → Done'
    user: system
  - timestamp: '2025-11-08T21:48:04.160Z'
    action: modified
    details: Task updated
    user: AI
  - timestamp: '2025-11-08T21:52:30.711Z'
    action: modified
    details: Task updated
    user: AI
acceptance_criteria: []
ai_notes: >
  **2025-11-08T21:46:55.277Z** - ## Boîtier Game & Watch Créé


  ### Modifications apportées

  1. **Couleur du boîtier**: Gradient beige authentique (#d4c4a8 → #c4b49a)

  2. **Bordures**: 3px solid #a89878 avec coins arrondis (15px)

  3. **Effets 3D**: 
     - Ombre externe réaliste
     - Highlight inset pour effet plastique brillant
     - Ombre interne pour profondeur
  4. **Dimensions**: max-width 450px pour respecter les proportions

  5. **Padding**: 25px/20px pour l'espacement authentique


  ### Éléments ajoutés

  - Logo "NINTENDO" en haut à gauche

  - Texte "GAME & WATCH" en italique

  - Titre "PARACHUTE" centré avec letterspacing


  ### Boutons de contrôle

  - Couleur rouge Game & Watch (#c44040 → #b03030)

  - Forme circulaire avec gradient 3D

  - Labels "LEFT" et "RIGHT" sous les boutons

  - Suppression du bouton center (utilisation des flèches pour revenir au
  centre)

  - Bordure rouge foncée #8a2020

  **2025-11-08T21:48:04.160Z** - ## Correction des Proportions


  ### Problème identifié

  Le boîtier était trop carré, alors que le Game & Watch PR-21 réel était
  beaucoup plus horizontal (112mm × 67mm = ratio 1.67:1)


  ### Corrections apportées

  - **Aspect ratio**: Ajouté `aspect-ratio: 1.67` pour forcer les bonnes
  proportions

  - **Max-width**: Augmenté à 560px (au lieu de 450px) pour un format plus large

  - **Padding**: Modifié à `20px 30px` (vertical, horizontal) pour respecter le
  format horizontal

  - **Border-radius**: Réduit à 12px pour un look plus authentique


  Ces changements donnent maintenant un format paysage typique des Game & Watch
  Wide Screen.

  **2025-11-08T21:52:30.711Z** - ## Mise à Jour Finale du Boîtier (basé sur la
  photo réelle)


  ### Changements appliqués après analyse de la photo

  1. **Bordure épaisse**: 8px solid #6b4423 (brun foncé comme la vraie console)

  2. **Couleur boîtier**: Plus claire (#e8dcc8 → #d8cbb8) pour correspondre au
  beige/crème de la photo

  3. **Layout header**:
     - Logo "GAME & WATCH" dans un cadre blanc à gauche
     - "Nintendo" en dessous
     - Boutons GAME A / GAME B / TIME avec switches à droite
  4. **Cadre écran**: Double cadre
     - Cadre extérieur beige en relief
     - Cadre intérieur noir/brun foncé
  5. **Texte "WIDE SCREEN"**: Ajouté sous l'écran

  6. **Format horizontal**: aspect-ratio 1.67 confirmé


  Le boîtier correspond maintenant exactement à la photo de référence !
---
Implémenter le boîtier avec:
- Forme rectangulaire arrondie caractéristique
- Couleur beige (#DAC8A8 ou similaire)
- Bordures et ombres réalistes
- Texture du plastique
- Logo Nintendo
- Sérigraphie "PARACHUTE" et autres textes
