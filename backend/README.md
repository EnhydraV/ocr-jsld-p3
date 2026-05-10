# ChaTop — Backend

API REST NestJS pour l'application de location immobilière ChaTop.

## Stack technique

| Domaine | Technologie                         |
|---|-------------------------------------|
| Framework | NestJS 11                           |
| Langage | TypeScript 5                        |
| Base de données | MySQL via Prisma 7                      |
| Authentification | JWT + Passport.js                   |
| Validation | class-validator / class-transformer |
| Documentation API | Swagger (OpenAPI)                   |
| Upload fichiers | Multer (memory storage)             |

## Prérequis

- Node.js >= 20
- Une instance MariaDB ou MySQL accessible

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` en `.env` et renseigner les variables :

```env
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USER=chatop
DB_PASSWORD=
DB_NAME=chatop_db

# JWT
JWT_SECRET=               # Chaîne aléatoire, 32+ caractères recommandés
JWT_IGNORE_EXPIRE=false   # Passer à true uniquement en développement
```

## Base de données

Appliquer le schéma Prisma sur la base :

```bash
npx prisma generate
```

## Démarrage

```bash
# Développement (hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

Le serveur écoute sur `http://localhost:3000` par défaut (configurable via la variable `PORT`).

La documentation Swagger est disponible sur `http://localhost:3000/api`.

## Endpoints

Tous les endpoints sont préfixés par `/api`. Les routes protégées requièrent un header `Authorization: Bearer <token>`.

### Authentification

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | — | Créer un compte |
| `POST` | `/auth/login` | — | Se connecter |
| `GET` | `/auth/me` | ✓ | Profil de l'utilisateur connecté |

### Utilisateurs

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/user/:id` | ✓ | Informations d'un utilisateur |

### Locations

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/rentals` | ✓ | Lister toutes les locations |
| `GET` | `/rentals/:id` | ✓ | Détails d'une location |
| `POST` | `/rentals` | ✓ | Créer une location (`multipart/form-data`) |
| `PUT` | `/rentals/:id` | ✓ | Modifier une location (`multipart/form-data`) |

Champs acceptés pour `POST`/`PUT` : `name`, `description`, `price`, `surface`, `picture` (PNG/JPEG, max 3 Mo).

### Messages

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/messages` | ✓ | Envoyer un message |


## Sécurité

### Mots de passe

Les mots de passe sont hachés avec **bcrypt** (coût 10) avant toute persistance — le mot de passe en clair n'est jamais stocké ni loggé. La comparaison lors du login se fait exclusivement via `bcrypt.compare`.

Le format attendu à l'inscription est validé par `class-validator` : 8 caractères minimum, au moins une majuscule, un chiffre et un caractère spécial.

### Authentification

Toutes les routes sont protégées par JWT (Bearer token) à l'exception de `/auth/register`, `/auth/login` et la documentation Swagger. Le décorateur `@JwtAuth()` applique le guard, le schéma Swagger et la réponse 401 en une seule ligne.

### Upload de fichiers

Les fichiers uploadés sont validés par magic bytes (lecture des octets de signature du fichier via la librairie `file-type`) — indépendamment du `Content-Type` déclaré par le client. Seuls les formats PNG et JPEG sont acceptés, avec une taille maximale de 3 Mo.

## Architecture & principes SOLID

L'architecture s'appuie sur les principes SOLID :

- **S** : chaque classe a un rôle précis — le controller gère le routing, le service gère la logique métier, les DTOs la validation, etc.
- **O** : les modules NestJS peuvent être étendus sans toucher au code existant
- **L** : `JwtAuthGuard` et `PrismaService` héritent de leurs classes parentes sans en modifier le comportement
- **I** : les DTOs sont spécifiques à leur usage, `SafeUser` n'expose que ce dont on a besoin (pas de mot de passe)
- **D** : les dépendances sont injectées via le système DI de NestJS, pas instanciées directement

## Structure du projet

```
src/
├── auth/           # Authentification (JWT + Local strategy)
├── users/          # Gestion des utilisateurs
├── rentals/        # Gestion des locations
├── messages/       # Messagerie
├── models/         # DTOs et types de réponse
├── decorators/     # Décorateurs custom (@CurrentUser)
├── pipes/          # Pipes custom (validation upload image)
├── types/          # Types TypeScript partagés
├── prisma.service.ts
├── prisma.module.ts
└── main.ts
```
