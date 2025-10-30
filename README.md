# 🛍️ Plateforme E-Commerce - Artisanat Marocain

Plateforme e-commerce complète dédiée à la vente et promotion de produits artisanaux marocains.

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Visual Studio Code (recommandé)

## 🚀 Installation

### 1. Créer le projet

```bash
# Créer un nouveau projet React
npx create-react-app moroccan-artisan-ecommerce
cd moroccan-artisan-ecommerce
```

### 2. Installer les dépendances

```bash
npm install react-router-dom@6.20.0 axios@1.6.2
```

### 3. Copier les fichiers du projet

Copiez tous les fichiers générés dans votre projet en respectant l'arborescence fournie.

### 4. Configuration de l'environnement

Créez un fichier `.env` à la racine :

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### 5. Lancer le projet

```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
src/
├── components/        # Composants réutilisables
│   ├── common/       # Composants communs (Header, Footer, Button)
│   ├── products/     # Composants liés aux produits
│   ├── cart/         # Composants du panier
│   ├── auth/         # Formulaires d'authentification
│   ├── checkout/     # Processus de commande
│   └── dashboard/    # Tableaux de bord
├── pages/            # Pages de l'application
├── context/          # Contextes React (Auth, Cart, Language)
├── hooks/            # Hooks personnalisés
├── services/         # Services API
├── utils/            # Utilitaires et helpers
├── locales/          # Fichiers de traduction (FR/EN)
├── styles/           # Styles globaux
├── App.js           # Composant principal
├── routes.js        # Configuration des routes
└── index.js         # Point d'entrée
```

## 🎯 Fonctionnalités Implémentées

### ✅ Fonctionnalités Principales

- **Authentification**
  - Inscription / Connexion
  - Gestion de session avec localStorage
  - Rôles utilisateurs (Client, Artisan, Admin)

- **Catalogue de Produits**
  - Affichage des produits avec images
  - Filtres et recherche
  - Catégories (Bijoux, Poterie, Textiles, Maroquinerie)
  - Système de notation

- **Panier d'Achat**
  - Ajout/Suppression de produits
  - Modification des quantités
  - Gestion des variantes
  - Persistance avec localStorage

- **Gestion Multilingue**
  - Support FR/EN
  - Changement de langue dynamique

### 🎨 Design

- Design responsive (Mobile, Tablette, Desktop)
- Palette de couleurs inspirée de l'artisanat marocain
- Animations et transitions fluides
- CSS Modules pour l'isolation des styles

## 🔧 Configuration VS Code

### Extensions Recommandées

- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- Auto Rename Tag
- CSS Modules

### Paramètres workspace (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🌐 API Backend (À implémenter)

Le projet utilise des services API qui nécessitent un backend. Endpoints principaux :

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/products
GET    /api/products/:id
POST   /api/orders
GET    /api/orders/user
POST   /api/products/:id/reviews
```

## 📦 Scripts Disponibles

```bash
npm start          # Lance le serveur de développement
npm run build      # Crée le build de production
npm test           # Lance les tests
npm run eject      # Éjecte la configuration
```

## 🎨 Personnalisation

### Couleurs

Modifiez les variables CSS dans `src/styles/global.css` :

```css
:root {
  --primary-color: #8B4513;
  --secondary-color: #D2691E;
  --accent-color: #F5DEB3;
}
```

### Traductions

Ajoutez ou modifiez les traductions dans :
- `src/locales/fr.json`
- `src/locales/en.json`

## 🔐 Sécurité

- Authentification par JWT (à implémenter côté backend)
- Validation des données utilisateur
- Protection CSRF
- Certificat SSL requis en production

## 📱 Responsive Design

Le site s'adapte automatiquement aux différentes tailles d'écran :
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## 🚀 Déploiement

### Build de Production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `build/`

### Hébergement Recommandé

- Netlify
- Vercel
- AWS Amplify
- Firebase Hosting

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Prochaines Étapes

### À Développer

- [ ] Intégration d'une vraie API backend
- [ ] Système de paiement (Stripe, PayPal, CMI)
- [ ] Upload d'images produits
- [ ] Dashboard administrateur complet
- [ ] Dashboard artisan
- [ ] Système de messagerie
- [ ] Notifications en temps réel
- [ ] Programme de fidélité
- [ ] Export de données (factures, rapports)

### Optimisations

- [ ] Lazy loading des images
- [ ] Code splitting
- [ ] Service Worker pour PWA
- [ ] Optimisation SEO
- [ ] Tests unitaires et E2E

## 👥 Auteurs

Réalisé par : Oussaraf Zainab et El Amri Khadija

## 📄 Licence

Ce projet est développé dans un cadre éducatif.

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

---

**Note**: Ce projet est une base solide pour une plateforme e-commerce. L'intégration avec un backend réel et l'ajout de fonctionnalités avancées nécessiteront un développement supplémentaire.