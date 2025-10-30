// Formateurs
export const formatPrice = (price, currency = 'MAD') => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: currency
  }).format(price);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(date).toLocaleDateString('fr-FR', { ...defaultOptions, ...options });
};

export const formatPhoneNumber = (phone) => {
  // Format +212 6XX-XXXXXX
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{6})$/);
  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Validateurs
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+212|0)([5-7]\d{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Générateurs
export const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp.slice(-6)}-${random}`;
};

export const generateSKU = (category, id) => {
  const prefix = category.slice(0, 3).toUpperCase();
  return `${prefix}-${id.toString().padStart(6, '0')}`;
};

// Calculateurs
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculateShippingFee = (subtotal, threshold = 500, fee = 50) => {
  return subtotal >= threshold ? 0 : fee;
};

export const calculateTax = (amount, rate = 0.2) => {
  return amount * rate;
};

// Manipulateurs de tableaux
export const sortProducts = (products, sortBy, sortOrder = 'asc') => {
  return [...products].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'name') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Filtre par catégorie
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Filtre par prix minimum
    if (filters.minPrice && product.price < parseInt(filters.minPrice)) {
      return false;
    }

    // Filtre par prix maximum
    if (filters.maxPrice && product.price > parseInt(filters.maxPrice)) {
      return false;
    }

    return true;
  });
};

// Gestion du localStorage
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Débounce pour les recherches
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Sleep function for testing
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};