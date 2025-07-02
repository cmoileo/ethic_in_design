# 📊 Dashboard - Guide d'utilisation

## Vue d'ensemble

Le dashboard offre une vue en temps réel de tous les participants au jeu sur l'éthique du design. Il se met à jour automatiquement toutes les secondes pour afficher les derniers résultats.

## 🔄 Fonctionnalités temps réel

### Actualisation automatique

- **Fréquence** : Toutes les secondes
- **Indicateur** : Point vert clignotant "Live"
- **Données** : Scores, statistiques, participants en cours

### Polling intelligent

- Utilise `fetch()` avec `cache: 'no-store'`
- Gestion d'erreur avec retry automatique
- Maintien de l'état lors des mises à jour

## 📈 Sections du dashboard

### 1. Statistiques en temps réel

- **Participants** : Nombre total d'utilisateurs inscrits
- **Terminé** : Nombre et pourcentage de completions
- **Temps moyen** : Moyenne de tous les scores
- **Meilleur temps** : Record actuel

### 2. Activité récente

- Les 3 derniers participants ayant terminé
- Horodatage et emoji selon performance
- Mise à jour en continu

### 3. Classement complet

- Tableau trié par temps (meilleur en premier)
- Médailles pour le podium (🥇🥈🥉)
- Code couleur selon performance
- Historique complet avec dates

### 4. Participants en cours

- Liste des utilisateurs ayant commencé mais pas terminé
- Indicateur "En jeu" avec animation
- Utile pour le suivi en temps réel

## 🎨 Codes couleur des performances

| Couleur   | Emoji | Temps   | Signification |
| --------- | ----- | ------- | ------------- |
| 🟢 Vert   | 🚀    | < 3min  | Excellent     |
| 🔵 Bleu   | ⚡    | < 5min  | Très bien     |
| 🟡 Jaune  | 👍    | < 7min  | Bien          |
| 🟠 Orange | 🤔    | < 10min | Moyen         |
| 🔴 Rouge  | 😅    | > 10min | Lent          |

## 🚀 Utilisation recommandée

### Pour les formateurs

1. **Avant la session** : Ouvrir le dashboard en mode plein écran
2. **Pendant la session** : Suivre les progressions en temps réel
3. **Après chaque completion** : Analyser les temps avec le groupe
4. **Débriefing** : Utiliser les statistiques pour la discussion

### Pour les facilitateurs

- Identifier qui a besoin d'aide (participants "en cours" depuis longtemps)
- Célébrer les records en temps réel
- Adapter le rythme selon les performances globales
- Utiliser les données pour enrichir les discussions

### Pour les participants

- Consulter leur position dans le classement
- Comprendre leur performance relative
- Motivation par la gamification (médailles, emojis)

## 🔧 Fonctionnalités techniques

### Performance

- Requêtes optimisées avec Prisma
- Mise à jour différentielle (seules les nouvelles données)
- Interface responsive pour tous les écrans

### Robustesse

- Gestion d'erreur avec affichage de statut
- Retry automatique en cas d'échec
- Fallback en cas de problème réseau

### Accessibilité

- Contrastes respectés pour tous les codes couleur
- Navigation au clavier possible
- Textes alternatifs pour les éléments visuels

## 📱 Responsive Design

- **Desktop** : Vue complète avec sidebar
- **Tablet** : Colonnes adaptatives
- **Mobile** : Vue empilée optimisée

## 🔗 Navigation

- **Accueil** : Retour à la page principale
- **Nouveau participant** : Lancer une nouvelle session
- **Actualisation manuelle** : Forcer une mise à jour

## 💡 Conseils d'utilisation

### En formation

- Projeter le dashboard pendant les sessions
- Commenter les résultats en temps réel
- Utiliser les statistiques pour ajuster le contenu

### En démonstration

- Montrer l'aspect "live" pour l'engagement
- Utiliser les codes couleur pour expliquer les performances
- Comparer les temps pour illustrer l'impact des dark patterns

### En analyse

- Exporter les données via l'API `/api/scores`
- Analyser les tendances sur plusieurs sessions
- Identifier les patterns les plus impactants

---

**🎯 Objectif** : Offrir une vue claire et engageante de l'impact des dark patterns sur les utilisateurs, en temps réel.
