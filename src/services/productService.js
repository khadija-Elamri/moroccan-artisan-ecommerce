import api from './api';

// Données mockées pour le développement
const mockProducts = [
  {
    id: 1,
    name: 'Plateau en Bois d\'Olivier',
    description: 'Magnifique plateau artisanal en bois d\'olivier marocain, sculpté à la main.',
    price: 450,
    category: 'pottery',
    image: '/image/plateau-bois.jpg',
    stock: 15,
    rating: 4.8,
    reviewCount: 24,
    artisan: {
      id: 1,
      name: 'Artisan Ahmed',
      location: 'Fès'
    }
  },
  {
    id: 2,
    name: 'Collier Berbère Argent',
    description: 'Collier traditionnel berbère en argent massif avec pierres semi-précieuses.',
    price: 280,
    category: 'jewelry',
    image: '/image/collier-berbere.jpg',
    stock: 8,
    rating: 4.9,
    reviewCount: 18,
    artisan: {
      id: 2,
      name: 'Artisan Fatima',
      location: 'Marrakech'
    }
  },
  {
    id: 3,
    name: 'Tapis Beni Ouarain',
    description: 'Tapis laine naturelle Beni Ouarain, tissé à la main dans les montagnes de l\'Atlas.',
    price: 1200,
    category: 'textiles',
    image: '/image/tapis-ouarain.jpg',
    stock: 3,
    rating: 5.0,
    reviewCount: 12,
    artisan: {
      id: 3,
      name: 'Coopérative Atlas',
      location: 'Ifrane'
    }
  },
  {
    id: 4,
    name: 'Sac en Cuir Maroquinerie',
    description: 'Sac à main en cuir de qualité supérieure, fabriqué selon les traditions marocaines.',
    price: 650,
    category: 'leather',
    image: '/image/sac-cuir.jpg',
    stock: 10,
    rating: 4.7,
    reviewCount: 31,
    artisan: {
      id: 4,
      name: 'Maître Tanneur',
      location: 'Tanger'
    }
  }
];

export const productService = {
  // Récupérer tous les produits
  async getProducts(filters = {}) {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredProducts = [...mockProducts];

    // Filtrage par catégorie
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        product => product.category === filters.category
      );
    }

    // Filtrage par prix
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= parseInt(filters.maxPrice)
      );
    }

    // Tri
    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        let aValue = a[filters.sortBy];
        let bValue = b[filters.sortBy];

        if (filters.sortBy === 'name') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return {
      products: filteredProducts,
      total: filteredProducts.length
    };
  },

  // Récupérer un produit par ID
  async getProductById(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Produit non trouvé');
    }
    return product;
  },

  // Récupérer les catégories
  async getCategories() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const categories = [...new Set(mockProducts.map(product => product.category))];
    return categories;
  },

  // Recherche de produits
  async searchProducts(query) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const searchTerm = query.toLowerCase();
    const results = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    return {
      products: results,
      total: results.length
    };
  }
};