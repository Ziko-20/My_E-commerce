# My E-Commerce — Application Web Full Stack

Application e-commerce complète construite avec **React + Vite** (frontend) et **Laravel 13 + Sanctum** (backend API REST). Elle permet de gérer une boutique virtuelle avec un espace client complet et un tableau de bord administrateur.

---

## Table des matières

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancer l'application](#lancer-lapplication)
- [Comptes de test](#comptes-de-test)
- [Fonctionnalités](#fonctionnalités)
- [Structure des dossiers](#structure-des-dossiers)
- [Routes API](#routes-api)
- [Base de données](#base-de-données)
- [Triggers MySQL](#triggers-mysql)
- [Composants & Contextes](#composants--contextes)
- [Notes importantes](#notes-importantes)

---

## Aperçu

| Espace | Description |
|--------|-------------|
| **Client** | Parcourir les produits, gérer le panier, passer commande, payer (carte ou livraison), télécharger un reçu PDF, suivre les livraisons, wishlist, profil |
| **Admin** | Dashboard avec KPIs et graphique, CRUD produits/catégories, gestion clients et commandes |

---

## Stack technique

### Frontend

| Technologie | Version | Rôle |
|-------------|---------|------|
| React | 19 | Framework UI |
| Vite | 8 | Bundler / Dev server |
| Tailwind CSS | 4 | Styles utilitaires |
| React Router DOM | 7 | Routing SPA |
| Axios | 1.x | Appels HTTP |
| Chart.js + react-chartjs-2 | 4.x / 5.x | Graphique revenus (admin) |
| Recharts | 2.x | Bibliothèque de charts alternative (incluse) |
| Lucide React | 1.x | Icônes |
| Framer Motion | 12 | Animations de transition entre pages |
| i18next + react-i18next | 26.x / 17.x | Internationalisation (FR / EN) |
| jsPDF | 2.x | Génération de reçu PDF côté client |

### Backend

| Technologie | Version | Rôle |
|-------------|---------|------|
| PHP | 8.3+ | Langage serveur |
| Laravel | 13 | Framework API REST |
| Laravel Sanctum | 4 | Authentification par token Bearer |
| MySQL | 8.0 | Base de données (triggers natifs) |
| SQLite | — | Base de données alternative (dev, sans triggers) |
| Eloquent ORM | — | Modèles et relations |

---

## Architecture du projet

```
My_E-commerce/
├── backend/          # API Laravel 13
├── frontend/         # Application React 19
└── README.md         # Ce fichier
```

Séparation stricte frontend / backend. Le frontend consomme l'API via Axios avec des tokens Bearer (Sanctum). L'URL de l'API est `http://localhost:8000/api` (codée en dur dans `src/services/`).

---

## Prérequis

| Outil | Version minimale |
|-------|-----------------|
| PHP | 8.3 |
| Composer | 2.x |
| Node.js | 18 |
| npm | 9 |
| MySQL | 8.0 (requis pour les triggers de stock) |

> **Note :** SQLite ne supporte pas les triggers MySQL. Utiliser MySQL pour bénéficier de la gestion automatique du stock en base de données.

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Ziko-20/EcommLaravel-React.git
cd EcommLaravel-React
```

### 2. Backend

```bash
cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate
```

### 3. Frontend

```bash
cd frontend
npm install
```

---

## Configuration

### Base de données MySQL

Éditer `backend/.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_votre_base
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

> Sans cette configuration, Laravel utilise SQLite par défaut (`database/database.sqlite`). Les triggers de stock ne fonctionneront pas avec SQLite.

### CORS

Le frontend tourne sur `http://localhost:5173` (ou `5174`). Laravel autorise les origines locales par défaut via la configuration Sanctum.

---

## Lancer l'application

### Étape 1 — Migrations et données de test

```bash
cd backend

# Créer les tables + triggers MySQL
php artisan migrate

# Peupler avec des données de test
php artisan db:seed
```

Le seeder crée dans cet ordre :
1. **8 catégories** : Électronique, Vêtements, Alimentation, Maison, Sport, Beauté, Livres, Jouets
2. **1 admin fixe** + **30 clients** générés aléatoirement
3. **60 produits** avec prix et stock aléatoires
4. **50 commandes** avec 2 à 4 lignes chacune
5. Des **wishlists** pour chaque client

### Étape 2 — Démarrer le backend

```bash
cd backend
php artisan serve
# API disponible sur http://localhost:8000
```

### Étape 3 — Démarrer le frontend

```bash
cd frontend
npm run dev
# Interface disponible sur http://localhost:5173
```

> Les deux serveurs doivent tourner simultanément.

---

## Comptes de test

### Administrateur

| Champ | Valeur |
|-------|--------|
| Email | `admin@boutique.ma` |
| Mot de passe | `admin123` |
| Accès | Tableau de bord admin complet |

### Client (généré par le seeder)

| Champ | Valeur |
|-------|--------|
| Email | N'importe quel email dans la table `users` (role = client) |
| Mot de passe | `password` |

Ou créer un compte directement via `/register`.

---

## Fonctionnalités

### Espace Client

#### Authentification
- Inscription avec nom, email, téléphone, adresse, mot de passe (confirmé)
- Connexion avec redirection automatique selon le rôle (client → `/produits`, admin → `/admin/dashboard`)
- Déconnexion avec révocation du token Sanctum
- Garde de routes — les pages protégées redirigent vers `/` si non connecté

#### Catalogue produits (`/produits`)
- Grille responsive (1 à 4 colonnes selon la taille d'écran)
- **Recherche** en temps réel par nom de produit
- **Filtres** dépliables :
  - Catégorie
  - Prix maximum
  - **Disponibilité** : tous les produits / en stock uniquement (`stock_produit > 0`)
- Tags de filtres actifs avec suppression individuelle et compteur
- Badge de stock coloré (vert > 50 / orange > 10 / rouge ≤ 10)
- Pagination (12 produits par page) avec numéros de pages
- Ajout au panier depuis la liste

#### Détail produit (`/produits/:id`)
- Image, nom, description, stock, prix
- **Sélecteur de quantité** avec boutons `+` / `−` (limité au stock disponible)
- Prix total dynamique sur le bouton d'ajout
- Ajout à la wishlist

#### Panier (`/panier`)
- Liste des articles avec image, nom, prix unitaire
- Modification de quantité en ligne (`+` / `−`)
- Suppression d'un article
- Résumé avec sous-total, livraison gratuite, total
- **Validation métier** : impossible de passer au paiement si le panier est vide — vérification côté frontend ET via `POST /commandes/{id}/valider` côté API
- Bouton "Passer au paiement" → valide la commande puis redirige vers `/paiement` en passant `{total, lignes}` via le state React Router

#### Paiement simulé (`/paiement`)
- Page dédiée avec deux modes de paiement au choix :
  - **Carte bancaire** (Visa / Mastercard / Amex / CMI) : formulaire avec numéro de carte (formaté auto en groupes de 4), nom du titulaire, expiration (MM/AA), CVV — validation inline sur chaque champ
  - **Paiement à la livraison** (cash on delivery) : aucune information bancaire requise
- Récapitulatif des articles et du total à droite
- Flux en 3 étapes : formulaire → processing (spinner 2,2 s, carte uniquement) → succès (checkmark + barre de progression) → redirection `/commandes`
- **Génération de reçu PDF** (jsPDF) : en-tête coloré, référence de commande, date/heure, méthode de paiement, tableau des articles, total, pied de page — téléchargeable depuis l'écran de succès

#### Commandes (`/commandes`)
- Liste de toutes les commandes passées avec statut coloré
- Le panier en cours (`en_attente`) est exclu de cette liste

#### Détail commande (`/commandes/:id`)
- Barre de progression visuelle en 3 étapes : Commande passée → En cours de livraison → Livrée
- Liste des articles commandés avec quantités et sous-totaux
- Récapitulatif du total

#### Wishlist (`/wishlist`)
- Grille des produits sauvegardés
- Ajout direct au panier depuis la wishlist
- Suppression d'un produit

#### Profil (`/profil`)
- Modification du nom, téléphone, adresse
- Changement de mot de passe (optionnel)
- Email affiché en lecture seule

#### Notifications Toast
- Toasts non-bloquants pour toutes les actions (succès, erreur, info)
- 3 types : `success` (vert), `error` (rouge), `info` (bleu)
- Fermeture automatique après 3 secondes ou manuelle

---

### Espace Administrateur

Accessible uniquement aux comptes avec `role = admin`. Toutes les routes `/admin/*` sont protégées côté frontend (`AdminRoute`) et backend (middleware `isAdmin`).

#### Dashboard (`/admin/dashboard`)
- **4 KPI cards** : chiffre d'affaires total (DH), nombre de commandes, clients, produits
- **Graphique revenus** (Chart.js `Line`) : courbe de surface sur les 12 derniers mois, tooltip personnalisé, dégradé vert, axe Y en `k`
- **Top 5 produits** les plus vendus (unités vendues)

#### Gestion des produits (`/admin/produits`)
- Tableau avec image, catégorie, prix, badge stock
- Recherche par nom, pagination (7 par page)
- Ajout, modification (→ formulaire), suppression avec confirmation

#### Formulaire produit (`/admin/produits/add` et `/admin/produits/edit/:id`)
- Champs : nom, description, prix, stock, URL image, catégorie
- Aperçu de l'image en temps réel
- Même composant pour la création et l'édition

#### Gestion des catégories (`/admin/categories`)
- Ajout inline
- Modification inline avec confirmation / annulation
- Suppression avec confirmation

#### Gestion des clients (`/admin/clients`)
- Tableau avec nom, email, téléphone, adresse
- Recherche par nom ou email
- **Modifier** → modal d'édition (nom, email, téléphone, adresse)
- **Supprimer** → modal de confirmation avec avertissement "action irréversible"

#### Gestion des commandes (`/admin/commandes`)
- Tableau de toutes les commandes avec client, date, total, statut
- Filtre par statut
- Changement de statut via menu déroulant inline (`en_attente` → `expediee` → `livree`)

---

## Structure des dossiers

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AdminControllers/
│   │   │   │   ├── AdminCategorieController.php
│   │   │   │   ├── AdminClientController.php
│   │   │   │   ├── AdminCommandeController.php
│   │   │   │   ├── AdminProduitController.php
│   │   │   │   └── AdminStatsController.php
│   │   │   ├── AuthController.php
│   │   │   ├── CategorieController.php
│   │   │   ├── CommandeController.php
│   │   │   ├── LigneCommandeController.php
│   │   │   ├── ProduitController.php
│   │   │   ├── ProfileController.php
│   │   │   └── WishlistController.php
│   │   └── Middleware/
│   │       └── IsAdmin.php
│   └── Models/
│       ├── Categorie.php
│       ├── Commande.php
│       ├── LigneCommande.php
│       ├── Produit.php
│       ├── User.php
│       └── Wishlist.php
├── database/
│   ├── factories/
│   │   ├── CommandeFactory.php
│   │   ├── LigneCommandeFactory.php
│   │   ├── ProduitFactory.php
│   │   ├── UserFactory.php
│   │   └── WishlistFactory.php
│   ├── migrations/
│   │   └── ..._add_stock_triggers.php   # Triggers MySQL
│   └── seeders/
│       ├── CategorieSeeder.php
│       ├── CommandeSeeder.php
│       ├── LigneCommandeSeeder.php
│       ├── ProduitSeeder.php
│       ├── UserSeeder.php
│       └── WishlistSeeder.php
└── routes/
    └── api.php

frontend/
└── src/
    ├── components/
    │   ├── Footer.jsx
    │   ├── Navbar.jsx
    │   ├── NotFound.jsx
    │   ├── Pagination.jsx
    │   ├── ProtectedRoute.jsx
    │   └── TransitionRegister.jsx
    ├── context/
    │   ├── AuthContext.jsx        # État utilisateur global
    │   ├── CartContext.jsx        # ID du panier actif (commande en_attente)
    │   └── ToastContext.jsx       # Notifications globales
    ├── locales/
    │   ├── en/translation.json
    │   └── fr/translation.json
    ├── pages/
    │   ├── auth/
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   └── client/
    │       ├── CommandeDetail.jsx
    │       ├── Commandes.jsx
    │       ├── Paiement.jsx
    │       ├── Panier.jsx
    │       ├── ProductDetail.jsx
    │       ├── Products.jsx
    │       ├── Profil.jsx
    │       └── Wishlist.jsx
    ├── Pages/
    │   └── admin/
    │       ├── AdminCategories.jsx
    │       ├── AdminClients.jsx
    │       ├── AdminCommandes.jsx
    │       ├── AdminLayout.jsx
    │       ├── AdminProduitForm.jsx
    │       ├── AdminProduits.jsx
    │       └── Dashboard.jsx
    ├── services/
    │   ├── authService.js
    │   └── productService.js
    ├── App.jsx
    ├── i18n.js
    └── main.jsx
```

---

## Routes API

### Publiques

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/register` | Créer un compte |
| `POST` | `/api/login` | Se connecter, retourne un token Sanctum |
| `GET` | `/api/produits` | Lister les produits (filtrables, paginés) |
| `GET` | `/api/produits/{id}` | Détail d'un produit |
| `GET` | `/api/categories` | Lister toutes les catégories |

**Paramètres de filtrage pour `GET /api/produits` :**

| Paramètre | Type | Description |
|-----------|------|-------------|
| `nom_produit` | string | Recherche partielle sur le nom |
| `prix` | number | Prix maximum |
| `categorie` | integer | ID de la catégorie |
| `disponibilite` | string | `en_stock` pour filtrer les produits avec stock > 0 |
| `page` | integer | Numéro de page (12 produits par page) |

### Authentifiées — `Authorization: Bearer {token}`

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/logout` | Révoquer le token courant |
| `GET` | `/api/me` | Profil de l'utilisateur connecté |
| `PUT` | `/api/profile` | Modifier son profil (nom, téléphone, adresse, mot de passe) |
| `GET` | `/api/commandes` | Mes commandes (avec lignes et produits) |
| `POST` | `/api/commandes` | Créer une commande (panier vide) |
| `GET` | `/api/commandes/{id}` | Détail d'une commande |
| `POST` | `/api/commandes/{id}/valider` | Valider la commande — 422 si vide ou déjà validée |
| `POST` | `/api/commandes/{id}/lignes` | Ajouter un article au panier |
| `PUT` | `/api/commandes/{id}/lignes/{ligne}` | Modifier la quantité d'un article |
| `DELETE` | `/api/commandes/{id}/lignes/{ligne}` | Supprimer un article du panier |
| `GET` | `/api/wishlist` | Ma wishlist |
| `POST` | `/api/wishlist` | Ajouter un produit à la wishlist |
| `DELETE` | `/api/wishlist/{id}` | Retirer un produit de la wishlist |

### Admin — `role = admin` requis

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/admin/produits` | Lister tous les produits |
| `POST` | `/api/admin/produits` | Créer un produit |
| `PUT` | `/api/admin/produits/{id}` | Modifier un produit |
| `DELETE` | `/api/admin/produits/{id}` | Supprimer un produit |
| `GET` | `/api/admin/categories` | Lister les catégories |
| `POST` | `/api/admin/categories` | Créer une catégorie |
| `PUT` | `/api/admin/categories/{id}` | Modifier une catégorie |
| `DELETE` | `/api/admin/categories/{id}` | Supprimer une catégorie |
| `GET` | `/api/admin/clients` | Lister les clients (role = client) |
| `GET` | `/api/admin/clients/{id}` | Détail d'un client |
| `PUT` | `/api/admin/clients/{id}` | Modifier nom, email, téléphone, adresse |
| `DELETE` | `/api/admin/clients/{id}` | Supprimer un client |
| `GET` | `/api/admin/commandes` | Toutes les commandes (avec user, lignes, produits) |
| `PUT` | `/api/admin/commandes/{id}` | Changer le statut d'une commande |
| `GET` | `/api/admin/stats` | Statistiques globales |

**Réponse de `/api/admin/stats` :**

```json
{
  "chiffre_affaires": 12500.00,
  "total_commandes": 50,
  "total_clients": 30,
  "total_produits": 60,
  "top_produits": [...],
  "stocks": [...],
  "revenues_mensuels": [
    { "mois": "Jun 2025", "total": 1200.00 },
    ...
  ]
}
```

---

## Base de données

### Schéma des tables

```
users
├── id, name, email (unique), telephone (unique)
├── adresse, password, role (admin|client, défaut: client)
├── email_verified_at (nullable), remember_token
└── timestamps

categories
├── id, categorie
└── timestamps

produits
├── id, nom_prduit, description_prduit
├── prix (decimal 8,2), stock_produit (int)
├── image (nullable), categorie_id (FK → categories, cascade)
└── timestamps

commandes
├── id, user_id (FK → users, cascade)
├── date_commande (date), total (decimal 10,2, défaut: 0)
├── statut (en_attente|expediee|livree, défaut: en_attente)
└── timestamps

ligne_commandes
├── id, commandes_id (FK → commandes, cascade)
├── produit_id (FK → produits, cascade)
├── quantite (int), sous_total (decimal 10,2)
└── timestamps

wishlists
├── id, user_id (FK → users, cascade)
├── produit_id (FK → produits, cascade)
├── UNIQUE(user_id, produit_id)
└── timestamps

personal_access_tokens   # Table Sanctum
```

### Relations Eloquent

| Modèle | Relations |
|--------|-----------|
| `User` | `hasMany` Commande, `hasMany` Wishlist |
| `Commande` | `belongsTo` User, `hasMany` LigneCommande (via `ligne_commande`) |
| `LigneCommande` | `belongsTo` Commande, `belongsTo` Produit |
| `Produit` | `belongsTo` Categorie, `hasMany` LigneCommande, `hasMany` Wishlist |
| `Categorie` | `hasMany` Produit |
| `Wishlist` | `belongsTo` User, `belongsTo` Produit |

---

## Triggers MySQL

La gestion du stock est assurée **en base de données** via 5 triggers MySQL créés par la migration `add_stock_triggers`. Cela garantit l'intégrité des données même en cas d'accès direct à la base.

| Trigger | Événement | Action |
|---------|-----------|--------|
| `trg_check_stock_before_insert` | `BEFORE INSERT` sur `ligne_commandes` | Bloque l'insertion si `stock_produit < quantite` (SIGNAL SQLSTATE 45000) |
| `trg_decrement_stock_after_insert` | `AFTER INSERT` sur `ligne_commandes` | Décrémente `stock_produit` du produit concerné |
| `trg_increment_stock_after_delete` | `AFTER DELETE` sur `ligne_commandes` | Réincrémente `stock_produit` lors de la suppression d'une ligne |
| `trg_check_stock_before_update` | `BEFORE UPDATE` sur `ligne_commandes` | Vérifie que `stock_actuel + ancienne_quantite >= nouvelle_quantite` |
| `trg_adjust_stock_after_update` | `AFTER UPDATE` sur `ligne_commandes` | Ajuste le stock : `stock + old.quantite - new.quantite` |

Le `LigneCommandeController` conserve une vérification applicative en double sécurité avant chaque opération, mais ne fait pas de `increment/decrement` manuels — c'est la base de données qui gère.

---

## Composants & Contextes

### Contextes React

| Contexte | Rôle |
|----------|------|
| `AuthContext` | Stocke l'utilisateur connecté, expose `login(userData, token)`, `logout()`. Rehydrate la session depuis `localStorage` au chargement. |
| `CartContext` | Stocke l'ID de la commande active (`en_attente`), expose `getPanierID()` qui trouve ou crée un panier. |
| `ToastContext` | Expose `toast(message, type)` pour afficher des notifications non-bloquantes. |

### Gardes de routes

| Composant | Comportement |
|-----------|-------------|
| `ProtectedRoute` | Redirige vers `/` si non connecté |
| `AdminRoute` | Redirige vers `/` si non connecté, vers `/produits` si connecté mais pas admin |

### Services

**`authService.js`**
```js
login(data)           // POST /api/login
register(data)        // POST /api/register
logout()              // POST /api/logout (avec token)
getMe()               // GET  /api/me
updateProfile(data)   // PUT  /api/profile
```

**`productService.js`**
```js
// Produits publics
getProduits()
getProduitById(id)
getCategories()
getProduitsFilter(nom, prix, categorie, page, disponibilite)

// Panier / Commandes
creerCommande()
getCommandes()
getCommandeById(id)
validerCommande(id)                              // POST /commandes/{id}/valider
ajouterLigne(commandeId, produitId, quantite)
modifierLigne(commandeId, ligneId, quantite)
supprimerLigne(commandeId, ligneId)

// Wishlist
getWishlist()
ajouterWishlist(produitId)
supprimerWishlist(id)

// Admin — Produits
adminGetProduits()
adminCreateProduit(data)
adminUpdateProduit(id, data)
adminDeleteProduit(id)

// Admin — Catégories
adminGetCategories()
adminCreateCategorie(data)
adminUpdateCategorie(id, data)
adminDeleteCategorie(id)

// Admin — Clients
adminGetClients()
adminUpdateClient(id, data)
adminDeleteClient(id)

// Admin — Commandes
adminGetCommandes()
adminUpdateStatutCommande(id, statut)

// Admin — Stats
adminGetStats()
```

---

## Notes importantes

- Le **token** est stocké dans `localStorage` sous la clé `token`
- Le **panier** est une `Commande` avec `statut = en_attente` — une seule par utilisateur à la fois
- La **gestion du stock** est double : vérification applicative dans `LigneCommandeController` + triggers MySQL en base de données
- Une **commande vide** ne peut pas être validée — l'API retourne 422 avec un message explicite
- Les **images produits** sont des URLs externes (pas d'upload de fichier côté serveur)
- Le **paiement** est entièrement simulé côté frontend — aucune donnée bancaire n'est transmise ni stockée
- Le **reçu PDF** est généré côté client avec jsPDF (référence de commande, articles, total, méthode de paiement)
- L'application supporte **FR / EN** via i18next avec un sélecteur de langue dans la Navbar
- Les **triggers MySQL** nécessitent MySQL 8.0+ — SQLite (défaut `.env.example`) n'est pas compatible
- L'URL de l'API (`http://localhost:8000/api`) est codée en dur dans `src/services/` — à adapter si le backend tourne sur un autre port
