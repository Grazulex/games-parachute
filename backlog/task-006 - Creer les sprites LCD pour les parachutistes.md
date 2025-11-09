---
id: 6
title: Créer les sprites LCD pour les parachutistes
status: Done
priority: medium
assignees: []
labels:
  - sprites
  - lcd
  - parachutiste
subtasks: []
dependencies: []
blocked_by: []
created_date: '2025-11-08T21:40:52.080Z'
updated_date: '2025-11-08T21:56:51.007Z'
closed_date: '2025-11-08T21:56:51.007Z'
changelog:
  - timestamp: '2025-11-08T21:40:52.080Z'
    action: created
    details: Task created
    user: system
  - timestamp: '2025-11-08T21:55:26.856Z'
    action: updated
    details: 'status: To Do → In Progress'
    user: system
  - timestamp: '2025-11-08T21:56:50.360Z'
    action: modified
    details: Task updated
    user: AI
  - timestamp: '2025-11-08T21:56:51.007Z'
    action: updated
    details: 'status: In Progress → Done'
    user: system
acceptance_criteria: []
ai_notes: |
  **2025-11-08T21:56:50.359Z** - ## Sprites LCD Parachutistes Créés

  Création dynamique des parachutistes en SVG via JavaScript :
  - Parachute (canopy) en forme de dôme
  - 2 cordes reliant le parachute à la personne
  - Tête (cercle)
  - Corps (rectangle)
  - 2 jambes (rectangles)
  - Taille: 30x35px
  - Les sprites sont créés dynamiquement avec `createElementNS`

  Animation par segments LCD - plus de changement d'emoji !
---
Créer les sprites des parachutistes:
- Positions fixes sur la grille LCD
- Animation par segments (parachute ouvert/fermé)
- Bonhomme stylisé façon LCD
- Différentes positions de chute
