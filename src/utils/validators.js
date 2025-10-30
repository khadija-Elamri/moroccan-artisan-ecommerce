import { VALIDATION_CONSTANTS } from './constants';

// Validateur de formulaire d'inscription
export const validateRegisterForm = (formData) => {
  const errors = {};

  // Prénom
  if (!formData.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  } else if (formData.firstName.length > VALIDATION_CONSTANTS.NAME_MAX_LENGTH) {
    errors.firstName = `Le prénom ne peut pas dépasser ${VALIDATION_CONSTANTS.NAME_MAX_LENGTH} caractères`;
  }

  // Nom
  if (!formData.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  } else if (formData.lastName.length > VALIDATION_CONSTANTS.NAME_MAX_LENGTH) {
    errors.lastName = `Le nom ne peut pas dépasser ${VALIDATION_CONSTANTS.NAME_MAX_LENGTH} caractères`;
  }

  // Email
  if (!formData.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!VALIDATION_CONSTANTS.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }

  // Téléphone
  if (!formData.phone?.trim()) {
    errors.phone = 'Le téléphone est requis';
  } else if (!VALIDATION_CONSTANTS.PHONE_REGEX.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Le numéro de téléphone n\'est pas valide';
  }

  // Mot de passe
  if (!formData.password) {
    errors.password = 'Le mot de passe est requis';
  } else if (formData.password.length < VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH) {
    errors.password = `Le mot de passe doit contenir au moins ${VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH} caractères`;
  }

  // Confirmation du mot de passe
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Veuillez confirmer votre mot de passe';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validateur de formulaire de connexion
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!VALIDATION_CONSTANTS.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }

  if (!formData.password) {
    errors.password = 'Le mot de passe est requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validateur de formulaire de profil
export const validateProfileForm = (formData) => {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  }

  if (!formData.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!VALIDATION_CONSTANTS.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Le téléphone est requis';
  } else if (!VALIDATION_CONSTANTS.PHONE_REGEX.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Le numéro de téléphone n\'est pas valide';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validateur de formulaire de produit
export const validateProductForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Le nom du produit est requis';
  } else if (formData.name.length > VALIDATION_CONSTANTS.NAME_MAX_LENGTH) {
    errors.name = `Le nom ne peut pas dépasser ${VALIDATION_CONSTANTS.NAME_MAX_LENGTH} caractères`;
  }

  if (!formData.description?.trim()) {
    errors.description = 'La description est requise';
  } else if (formData.description.length > VALIDATION_CONSTANTS.DESCRIPTION_MAX_LENGTH) {
    errors.description = `La description ne peut pas dépasser ${VALIDATION_CONSTANTS.DESCRIPTION_MAX_LENGTH} caractères`;
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = 'Le prix doit être supérieur à 0';
  }

  if (!formData.category) {
    errors.category = 'La catégorie est requise';
  }

  if (formData.stock === undefined || formData.stock < 0) {
    errors.stock = 'Le stock ne peut pas être négatif';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validateur de formulaire de commande
export const validateOrderForm = (formData) => {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  }

  if (!formData.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!VALIDATION_CONSTANTS.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Le téléphone est requis';
  } else if (!VALIDATION_CONSTANTS.PHONE_REGEX.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Le numéro de téléphone n\'est pas valide';
  }

  if (!formData.address?.trim()) {
    errors.address = 'L\'adresse est requise';
  }

  if (!formData.city?.trim()) {
    errors.city = 'La ville est requise';
  }

  if (!formData.postalCode?.trim()) {
    errors.postalCode = 'Le code postal est requis';
  }

  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Le moyen de paiement est requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validateur générique de champ
export const validateField = (fieldName, value, rules = {}) => {
  const errors = [];

  if (rules.required && !value?.trim()) {
    errors.push('Ce champ est requis');
  }

  if (rules.email && value && !VALIDATION_CONSTANTS.EMAIL_REGEX.test(value)) {
    errors.push('L\'email n\'est pas valide');
  }

  if (rules.phone && value && !VALIDATION_CONSTANTS.PHONE_REGEX.test(value.replace(/\s/g, ''))) {
    errors.push('Le numéro de téléphone n\'est pas valide');
  }

  if (rules.minLength && value && value.length < rules.minLength) {
    errors.push(`Doit contenir au moins ${rules.minLength} caractères`);
  }

  if (rules.maxLength && value && value.length > rules.maxLength) {
    errors.push(`Ne peut pas dépasser ${rules.maxLength} caractères`);
  }

  if (rules.min && value && Number(value) < rules.min) {
    errors.push(`Doit être supérieur ou égal à ${rules.min}`);
  }

  if (rules.max && value && Number(value) > rules.max) {
    errors.push(`Ne peut pas dépasser ${rules.max}`);
  }

  return errors;
};

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate file upload
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxWidth = 2000,
    maxHeight = 2000
  } = options;

  const errors = [];

  // Check file size
  if (file.size > maxSize) {
    errors.push(`Le fichier ne doit pas dépasser ${maxSize / 1024 / 1024}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push('Type de fichier non autorisé');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};