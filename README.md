# ChâTop - Portail de Location Saisonnière

Application full-stack TypeScript pour mettre en relation locataires et propriétaires dans une zone touristique.

## 📋 Contexte du projet

Ce repository contient le **front-end React** de l'application ChâTop ainsi que les **ressources nécessaires** pour développer le back-end NestJS.

Votre mission : **Implémenter l'API REST avec NestJS** qui remplacera l'API mockée fournie.

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** 22 LTS ou supérieur
- **npm** (inclus avec Node.js)
- **MySQL** 8.0+ (ou MariaDB 10.5+)
- **Mockoon** Desktop (pour simuler l'API durant le développement front-end)

### Installation

#### 1. Cloner le repository

```bash
git clone <url-du-repo>
cd p3-dfsjs-starter
```

#### 2. Installer et lancer le front-end React

```bash
cd frontend
npm install
npm run dev
```

L'application front-end sera accessible sur [http://localhost:5173](http://localhost:5173)

#### 3. Configurer Mockoon

1. Télécharger et installer Mockoon : https://mockoon.com/download/
2. Ouvrir Mockoon
3. Importer l'environnement : `File > Open environment`
4. Sélectionner le fichier : `ressources/mockoon/chatop-api.json`
5. Démarrer le serveur Mock (clic sur le bouton Play)

L'API mockée sera accessible sur [http://localhost:3001](http://localhost:3001)

#### 4. Créer la base de données MySQL

```bash
mysql -u root -p < ressources/sql/schema.sql
```

Ou via MySQL Workbench / DBeaver :
1. Ouvrir le fichier `ressources/sql/schema.sql`
2. Exécuter le script

## 📂 Structure du projet

```
p3-dfsjs-starter/
├── frontend/                # Application React 19 (déjà complète)
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── services/       # Services API (axios)
│   │   ├── types/          # Types TypeScript
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── ressources/
│   ├── mockoon/           # Environnement Mockoon
│   │   └── chatop-api.json
│   └── sql/               # Schéma de base de données
│       └── schema.sql
│
└── README.md
```

## 🎯 Votre mission

### Exercice 1 : Modélisation (3 étapes)

1. **Installer l'environnement** :
   - Installer Mockoon
   - Lancer le front-end React
   - Tester l'application avec Mockoon

2. **Analyser l'API Mockoon** :
   - Identifier toutes les routes de l'API
   - Documenter : URL, méthode HTTP, paramètres, body, réponses
   - Identifier les entités métier (User, Rental, Message)

3. **Initialiser la base de données** :
   - Créer la base `chatop_db`
   - Exécuter le schéma SQL fourni
   - Configurer Prisma (à faire lors de l'implémentation)

### Exercice 2 : Implémentation (3 étapes)

Vous devrez créer un back-end NestJS de zéro avec :

1. **Routes d'authentification** :
   - `POST /api/auth/register` - Créer un compte
   - `POST /api/auth/login` - Se connecter (retour JWT)
   - `GET /api/auth/me` - Obtenir l'utilisateur connecté
   - Chiffrement des mots de passe (bcrypt)
   - Sécurisation JWT (toutes routes sauf register/login/swagger)

2. **Toutes les routes API** :
   - `GET /api/rentals` - Liste des locations
   - `GET /api/rentals/:id` - Détail d'une location
   - `POST /api/rentals` - Créer une location (avec upload image)
   - `PUT /api/rentals/:id` - Modifier une location
   - `GET /api/user/:id` - Obtenir un utilisateur
   - `POST /api/messages` - Envoyer un message
   - Architecture Controller/Service/Repository (Prisma)
   - Validation des DTOs (class-validator)

3. **Documentation et finalisation** :
   - Documenter avec Swagger (@nestjs/swagger)
   - Nettoyer le code
   - README complet du back-end

## 🔧 Technologies à utiliser

### Front-end (déjà fourni)
- **React 19** - UI framework
- **TypeScript 5.7+** - Typage statique
- **Vite 6** - Build tool
- **TailwindCSS 3.4** - Styling
- **TanStack Query** - Data fetching
- **React Router 7** - Routing
- **Axios** - HTTP client

### Back-end (à implémenter par vous)
- **NestJS 11** - Framework back-end
- **TypeScript 5.7+** (Strict Mode)
- **Prisma** - ORM pour MySQL
- **Passport + JWT** - Authentification
- **bcrypt** - Chiffrement mots de passe
- **class-validator** - Validation DTOs
- **@nestjs/swagger** - Documentation OpenAPI

## 📚 Ressources

### Documentation officielle
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Passport JWT Strategy](https://docs.nestjs.com/security/authentication#jwt-functionality)
- [Swagger/OpenAPI](https://docs.nestjs.com/openapi/introduction)

### Outils
- [Mockoon](https://mockoon.com/) - Mock API server
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - Database GUI
- [Prisma Studio](https://www.prisma.io/studio) - Database browser
- [Postman](https://www.postman.com/) - API testing

## 🔒 Points d'attention

### Sécurité
- ✅ JWT obligatoire pour toutes les routes (sauf register, login, swagger)
- ✅ Mots de passe chiffrés avec bcrypt (jamais en clair)
- ✅ Variables d'environnement pour credentials BDD (`.env`)
- ✅ Validation des entrées utilisateur (DTOs + class-validator)

### Architecture
- ✅ Architecture modulaire NestJS (Controller/Service/Repository)
- ✅ Utilisation de Prisma (pas de SQL brut)
- ✅ Séparation des responsabilités (SOLID)
- ✅ Gestion des erreurs avec Exception Filters

### Upload d'images
- Les images des locations doivent être uploadées sur le serveur
- L'URL de l'image est ensuite enregistrée en base de données
- Utiliser `@UseInterceptors(FileInterceptor())` de NestJS

## 📝 Commandes utiles

### Front-end
```bash
cd frontend
npm install          # Installer les dépendances
npm run dev          # Lancer en développement
npm run build        # Build production
npm run lint         # Vérifier le code
```

### Back-end (à créer)
```bash
# Créer le projet NestJS
nest new backend

cd backend
npm install @nestjs/passport passport passport-jwt
npm install @nestjs/jwt bcrypt
npm install @prisma/client
npm install -D prisma
npm install class-validator class-transformer
npm install @nestjs/swagger

# Initialiser Prisma
npx prisma init

# Générer le client Prisma (après configuration schema.prisma)
npx prisma generate

# Lancer le serveur
npm run start:dev
```

## ⚠️ Important

- **Ne PAS modifier le front-end** - Il est déjà complet et fonctionnel
- Le front-end communique avec l'API sur `http://localhost:3001`
- Tous les appels API passent par `/api/*`
- Le front-end attend les mêmes réponses que Mockoon

## 🎓 Bon courage !

Ce projet vous permettra de maîtriser :
- ✅ L'architecture modulaire avec NestJS
- ✅ L'authentification JWT
- ✅ La gestion d'une base de données relationnelle avec Prisma
- ✅ La documentation d'API avec Swagger
- ✅ Les bonnes pratiques TypeScript et SOLID

---

**Version** : 1.0.0
**Date** : Janvier 2026
