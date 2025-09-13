# Matchmaking Tuteurs-Élèves

Une app simple pour connecter des tuteurs et des élèves selon leurs matières, niveaux et disponibilités.

## C'est quoi ce projet ?

J'ai développé cette app pour un test technique. L'idée c'est de pouvoir ajouter des tuteurs et des élèves, puis de voir automatiquement quels tuteurs correspondent le mieux à chaque élève.

L'app prend en compte :
- Les matières que le tuteur enseigne vs celles que l'élève veut
- Le niveau scolaire (collège, lycée, etc.)
- Les créneaux horaires où ils sont tous les deux disponibles

## Comment ça marche ?

### Ajouter des données
Tu peux ajouter des tuteurs et des élèves via les formulaires. Pour chaque personne, tu renseignes :
- Le nom
- Les matières (maths, physique, français...)
- Le niveau (collège, lycée, terminale...)
- Les créneaux de disponibilité

### Voir les matches
L'app calcule automatiquement un score de compatibilité entre chaque élève et tous les tuteurs. Plus le score est élevé, mieux c'est.

Le scoring fonctionne comme ça :
- 50 points si les matières correspondent
- 30 points si le niveau correspond  
- 20 points pour les disponibilités communes
- Bonus si le tuteur a de l'expérience ou une bonne note

### Interface
L'app a 3 onglets :
- **Résultats** : Voir les matches avec des filtres
- **Listes** : Voir tous les tuteurs et élèves ajoutés
- **Ajouter** : Ajouter de nouveaux tuteurs/élèves

## Installation

```bash
# Cloner le repo
git clone <url>
cd test

# Installer les dépendances
npm install

# Lancer l'app
npm run dev
```

Puis va sur http://localhost:3000

## Technologies utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Pour éviter les erreurs
- **Tailwind CSS** - Pour le style
- **react-hot-toast** - Pour les notifications

## Structure du code

```
app/
├── page.tsx              # Page principale
├── layout.tsx            # Layout global
└── globals.css           # Styles

components/
├── CreneauInput.tsx      # Gestion des horaires
├── FormulaireTuteur.tsx  # Formulaire tuteur
├── FormulaireEleve.tsx   # Formulaire élève
├── ResultatsMatchmaking.tsx # Affichage des résultats
├── ListeTuteurs.tsx      # Liste des tuteurs
└── ListeEleves.tsx       # Liste des élèves

lib/
└── matchmaking.ts        # Logique de matching

types/
└── index.ts             # Types TypeScript

public/
└── data/
    └── exemple.json     # Données d'exemple
```

## Exemple de données

L'app vient avec des données d'exemple :

**Tuteurs :**
- Ahmed : Maths, Lycée, disponible lundi 18h-20h, mercredi 16h-20h, samedi 10h-19h
- Sarah : Physique, Collège & Lycée, disponible mercredi 14h-16h, samedi 10h-22h
- Karim : Français, Terminale, disponible lundi 18h-20h

**Élèves :**
- Ali : veut des cours de Maths, niveau Lycée, disponible lundi 18h-20h
- Yasmine : veut des cours de Physique, niveau Collège, disponible mercredi 14h-16h

**Résultats attendus :**
- Ali → Ahmed (match parfait : même matière, même niveau, même créneau)
- Yasmine → Sarah (match parfait : même matière, même niveau, même créneau)

## Fonctionnalités

- Ajout de tuteurs et d'élèves
- Calcul automatique des matches
- Filtres par matière et niveau
- Affichage des listes
- Notifications quand on ajoute des données
- Interface responsive

## Ce qui pourrait être amélioré

- Ajouter une vraie base de données
- Système d'authentification
- Chat entre tuteurs et élèves
- Calendrier pour réserver des cours
- Tests unitaires
- Déploiement en production

## Scripts

```bash
npm run dev    # Développement
npm run build  # Build production
npm run start  # Production
```

---

Fait avec Next.js, TypeScript et Tailwind CSS
