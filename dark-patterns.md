# Dark Patterns Implémentés - Jeu sur l'Éthique du Design

## 📋 Liste des 10 Dark Patterns

### Étape 1 : **Roach Motel** (Piège à cafards)

- **Pattern** : Case pré-cochée pour s'abonner à la newsletter
- **Description** : Il est facile de s'abonner mais difficile de se désabonner
- **Implémentation** : Case cochée par défaut, texte en petit, formulaire de désinscription caché

### Étape 2 : **Bait and Switch** (Appât et substitution)

- **Pattern** : Bouton qui change de fonction au dernier moment
- **Description** : Le bouton "Continuer" devient "S'abonner au service premium"
- **Implémentation** : JavaScript qui change le texte du bouton après 3 secondes

### Étape 3 : **Confirmshaming** (Honte de confirmation)

- **Pattern** : Options de refus humiliantes
- **Description** : "Oui, je veux des offres" vs "Non, je préfère payer plus cher"
- **Implémentation** : Texte culpabilisant pour l'option de refus

### Étape 4 : **Hidden Costs** (Coûts cachés)

- **Pattern** : Frais supplémentaires révélés à la fin
- **Description** : Frais de traitement, assurance, etc. ajoutés au dernier moment
- **Implémentation** : Simulation d'un panier avec frais cachés

### Étape 5 : **Forced Continuity** (Continuité forcée)

- **Pattern** : Essai gratuit qui devient payant automatiquement
- **Description** : Demande de carte bancaire pour un "essai gratuit"
- **Implémentation** : Formulaire de CB obligatoire avec texte trompeur

### Étape 6 : **Privacy Zuckering** (Piège à données)

- **Pattern** : Partage de données personnelles par défaut
- **Description** : Paramètres de confidentialité défavorables pré-sélectionnés
- **Implémentation** : Nombreuses cases pré-cochées pour partager les données

### Étape 7 : **Misdirection** (Détournement d'attention)

- **Pattern** : Bouton principal trompeur
- **Description** : Le bouton coloré ne fait pas ce qu'on attend
- **Implémentation** : Bouton vert "Continuer" qui en fait annule, bouton gris qui valide

### Étape 8 : **Fake Urgency** (Fausse urgence)

- **Pattern** : Compte à rebours et stock limité fictifs
- **Description** : "Plus que 2 places disponibles ! Offre expire dans 5 minutes !"
- **Implémentation** : Timer qui redémarre, compteur de stock factice

### Étape 9 : **Difficult Cancellation** (Annulation difficile)

- **Pattern** : Processus d'annulation complexe
- **Description** : Multiples étapes, numéro de téléphone obligatoire
- **Implémentation** : Formulaire qui bug, demande de justification

### Étape 10 : **Captcha Hell** (Enfer du captcha)

- **Pattern** : Captcha volontairement difficile
- **Description** : Images floues, questions piège, échecs répétés
- **Implémentation** : Captcha qui échoue plusieurs fois avant d'accepter

## 🎯 Objectif Pédagogique

Chaque pattern est conçu pour :

- Faire perdre du temps à l'utilisateur (augmenter le score)
- Sensibiliser aux pratiques douteuses du web
- Permettre l'identification des techniques manipulatrices
- Créer une expérience frustrante mais éducative

## 📊 Système de Score

Le score final correspond au temps total passé sur les 10 étapes, encourageant la réflexion sur :

- La rapidité vs la prudence
- L'importance de lire les conditions
- La vigilance face aux interfaces trompeuses
