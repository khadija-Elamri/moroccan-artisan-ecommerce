// Constantes de l'application
export const APP_CONFIG = {
  NAME: 'Artisanat Marocain',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  SUPPORT_EMAIL: 'contact@artisanat.ma',
  SUPPORT_PHONE: '+212 5 XX XX XX XX'
};

// Constantes des produits
export const PRODUCT_CONSTANTS = {
  CATEGORIES: {
    JEWELRY: 'jewelry',
    POTTERY: 'pottery',
    TEXTILES: 'textiles',
    LEATHER: 'leather'
  },
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock'
  },
  SORT_OPTIONS: {
    NAME_ASC: { value: 'name_asc', label: 'Nom (A-Z)' },
    NAME_DESC: { value: 'name_desc', label: 'Nom (Z-A)' },
    PRICE_ASC: { value: 'price_asc', label: 'Prix (Croissant)' },
    PRICE_DESC: { value: 'price_desc', label: 'Prix (Décroissant)' },
    RATING_DESC: { value: 'rating_desc', label: 'Meilleures notes' },
    NEWEST: { value: 'newest', label: 'Plus récents' }
  }
};

// Constantes des commandes
export const ORDER_CONSTANTS = {
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
  },
  PAYMENT_METHODS: {
    CREDIT_CARD: 'credit_card',
    PAYPAL: 'paypal',
    CASH_ON_DELIVERY: 'cash_on_delivery'
  },
  SHIPPING_METHODS: {
    STANDARD: 'standard',
    EXPRESS: 'express'
  }
};

// Constantes d'authentification
export const AUTH_CONSTANTS = {
  ROLES: {
    CLIENT: 'client',
    ARTISAN: 'artisan',
    ADMIN: 'admin'
  },
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'user_data'
};

// Constantes de validation
export const VALIDATION_CONSTANTS = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+212|0)([5-7]\d{8})$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000
};

// Constantes de prix
export const PRICE_CONSTANTS = {
  FREE_SHIPPING_THRESHOLD: 500,
  STANDARD_SHIPPING_FEE: 50,
  TAX_RATE: 0.2 // 20%
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
  UNAUTHORIZED: 'Session expirée. Veuillez vous reconnecter.',
  FORBIDDEN: 'Accès refusé.',
  NOT_FOUND: 'Ressource non trouvée.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  VALIDATION_ERROR: 'Veuillez vérifier les informations saisies.'
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profil mis à jour avec succès.',
  ORDER_PLACED: 'Commande passée avec succès.',
  PRODUCT_ADDED: 'Produit ajouté au panier.',
  REVIEW_ADDED: 'Avis ajouté avec succès.'
};