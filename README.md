# 🎮 Jeu sur l'Éthique du Design - Dark Patterns Experience

Une application web interactive éducative qui sensibilise aux "dark patterns" (patterns sombres) couramment utilisés dans les interfaces web.

## 🎯 Objectif

Ce jeu permet aux utilisateurs d'expérimenter 10 dark patterns différents à travers un processus d'inscription frustrant mais éducatif. L'objectif est de :

- Sensibiliser aux pratiques manipulatrices du web
- Apprendre à identifier les dark patterns
- Comprendre l'impact sur l'expérience utilisateur
- Mesurer le temps perdu à cause de ces pratiques

## 🕹️ Comment jouer

1. **Accueil** : Cliquez sur "Commencer l'expérience"
2. **Création de compte** : Entrez votre nom (enregistré en base)
3. **10 étapes** : Traversez chaque étape avec son dark pattern
4. **Score final** : Votre temps total est enregistré

## 🎭 Les 10 Dark Patterns Implémentés

### 1. **Roach Motel** (Piège à cafards)

- Case newsletter pré-cochée
- Désinscription complexe

### 2. **Bait and Switch** (Appât et substitution)

- Bouton qui change de fonction
- "Continuer" devient "S'abonner Premium"

### 3. **Confirmshaming** (Honte de confirmation)

- Options de refus humiliantes
- "Non, je préfère payer plus cher"

### 4. **Hidden Costs** (Coûts cachés)

- Service "gratuit" avec frais cachés
- Frais de traitement, assurance, etc.

### 5. **Forced Continuity** (Continuité forcée)

- Essai gratuit nécessitant une CB
- Reconduction automatique

### 6. **Privacy Zuckering** (Piège à données)

- Paramètres de confidentialité défavorables
- Cases pré-cochées pour partager les données

### 7. **Misdirection** (Détournement d'attention)

- Boutons trompeurs
- Le bouton vert annule, le gris valide

### 8. **Fake Urgency** (Fausse urgence)

- Compte à rebours factice
- Stock limité qui se renouvelle

### 9. **Difficult Cancellation** (Annulation difficile)

- Processus complexe d'annulation
- Justifications obligatoires

### 10. **Captcha Hell** (Enfer du captcha)

- Captcha volontairement difficile
- Échecs répétés, images floues

## 🛠️ Technologies

- **Frontend** : Next.js 15, React, TypeScript, Tailwind CSS
- **Backend** : Next.js API Routes
- **Base de données** : PostgreSQL (Neon)
- **ORM** : Prisma
- **Déploiement** : Vercel (recommandé)

## 🚀 Installation et développement

```bash
# Installation des dépendances
npm install

# Configuration de la base de données
npx prisma migrate dev

# Génération du client Prisma
npx prisma generate

# Lancement en développement
npm run dev
```

## 📊 Base de données

```prisma
model User {
  id     String @id @default(cuid())
  name   String
  score  Score?
}

model Score {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  score     Int      // Temps en secondes
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🎓 Utilisation pédagogique

Cette application peut être utilisée dans :

- Cours de design UX/UI
- Formations sur l'éthique numérique
- Ateliers de sensibilisation
- Études sur l'expérience utilisateur

## 📝 Variables d'environnement

Créez un fichier `.env` :

```env
DB_URL="your_postgresql_connection_string"
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- Ajouter de nouveaux dark patterns
- Améliorer l'interface utilisateur
- Optimiser les performances
- Ajouter des tests

## ⚖️ Éthique

Ce projet est créé dans un but éducatif uniquement. L'objectif est de sensibiliser aux pratiques manipulatrices pour mieux les éviter, pas pour les reproduire dans de vrais projets.

## 📄 Licence

MIT License - Utilisez ce code de manière responsable et éthique.
