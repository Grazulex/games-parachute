---
id: 2
title: Rechercher et analyser le design original du Game & Watch Parachute (1981)
status: Done
priority: high
assignees: []
labels:
  - recherche
  - design
subtasks: []
dependencies: []
blocked_by: []
created_date: '2025-11-08T21:40:50.720Z'
updated_date: '2025-11-08T21:44:28.294Z'
closed_date: '2025-11-08T21:44:28.294Z'
changelog:
  - timestamp: '2025-11-08T21:40:50.720Z'
    action: created
    details: Task created
    user: system
  - timestamp: '2025-11-08T21:41:32.017Z'
    action: updated
    details: 'status: To Do → In Progress'
    user: system
  - timestamp: '2025-11-08T21:43:38.041Z'
    action: modified
    details: Task updated
    user: AI
  - timestamp: '2025-11-08T21:44:28.099Z'
    action: modified
    details: Task updated
    user: AI
  - timestamp: '2025-11-08T21:44:28.294Z'
    action: updated
    details: 'status: In Progress → Done'
    user: system
acceptance_criteria: []
ai_notes: >
  **2025-11-08T21:43:38.041Z** - ## Recherche Design Original - Findings


  ### Informations Techniques de Base

  - **Modèle**: Game & Watch Parachute PR-21

  - **Date de sortie**: 19 juin 1981

  - **Série**: Wide Screen (premier jeu de cette série)

  - **Créateur**: Gunpei Yokoi


  ### Design du Boîtier

  - **Couleur**: Brown/Beige (boîtier brun)

  - **Dimensions approximatives**: ~4.5" x 2.5" x 0.375" (similaire aux autres
  Wide Screen)

  - **Form factor**: Rectangulaire arrondi, format calculatrice de poche

  - **Matériau**: Plastique avec kickstand au dos

  - **Alimentation**: Piles bouton LR44


  ### Technologie LCD

  - **Type**: Écran LCD segmenté (comme les calculatrices)

  - **Taille**: 30% plus grand que les séries Silver/Gold précédentes

  - **Caractéristique unique**: Les segments LCD sont PHYSIQUES et pré-définis
  dans l'écran

  - **Fonctionnement**: Les segments allumés deviennent TRANSPARENTS (pas
  lumineux)

  - **Couches**: Multiples couches avec polariseur créant l'effet visuel
  distinctif


  ### Sprites et Positions

  - Les "sprites" sont en fait des **segments LCD fixes** intégrés dans le
  hardware

  - Positions prédéfinies pour chaque élément (hélicoptère, parachutistes,
  bateau)

  - Animation par activation/désactivation de segments adjacents

  - Pas de rendu dynamique - tout est en positions fixes


  ### Gameplay

  - 3 lanes (gauche, centre, droite)

  - Hélicoptère en haut qui lâche des parachutistes

  - Bateau de sauvetage contrôlé par le joueur

  - Mode Game A et Game B (B plus rapide)

  - Affichage digital du score


  ### Points à implémenter

  1. Effet LCD avec segments transparents (pas lumineux)

  2. Positions fixes pour tous les sprites

  3. Couleur beige/brun pour le boîtier

  4. Écran LCD vert/gris caractéristique

  5. Segments LCD visibles même quand inactifs (ombres)

  **2025-11-08T21:44:28.099Z** - ## DIMENSIONS EXACTES TROUVÉES !


  ### Dimensions Physiques

  - **Boîtier**: 112mm x 67mm x 12mm

  - **Écran LCD**: 54mm x 35mm

  - **Rapport d'aspect écran**: ~1.54:1 (plus large que haut)


  ### Éléments du Gameplay LCD

  1. **Hélicoptère** - En haut de l'écran, lâche les parachutistes

  2. **Parachutistes** - Descendent en 3 colonnes (gauche, centre, droite)

  3. **Bateau** - En bas, se déplace horizontalement sur 3 positions

  4. **Requin** - Apparaît dans l'eau quand on rate un parachutiste

  5. **Palmier** - Sur le côté droit (mode Game B) où les parachutistes peuvent
  se coincer

  6. **Zone d'eau** - Partie inférieure de l'écran


  ### Affichage et Score

  - **Score maximum**: 999 points (affichage 3 chiffres)

  - **Affichage numérique**: Format LCD 7-segments

  - **Misses**: 3 vies, réinitialisées à 200 et 500 points


  ### Spécifications Techniques

  - **Piles**: LR43 (pas LR44 comme trouvé avant)

  - **Modèle**: PR-21

  - **Série**: Wide Screen Series

  - **Date**: 19 juin 1981


  ### Game Modes

  - **Game A**: Vitesse normale

  - **Game B**: Plus rapide + palmier comme obstacle supplémentaire


  ### Points Clés pour l'Implémentation

  - Ratio d'écran ~1.54:1 à respecter

  - 3 colonnes verticales fixes

  - Affichage 7-segments pour le score

  - Segments LCD visibles même inactifs (ombres)
---
Collecter des références visuelles et analyser le design original pour comprendre:
- Les dimensions et proportions du boîtier
- La palette de couleurs exacte (beige, LCD vert/gris)
- La disposition des éléments
- Les sprites LCD et leur style
- Les détails de sérigraphie
