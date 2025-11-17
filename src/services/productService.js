import api from './api';

// Données mockées pour le développement
const mockProducts = [
  // Catégorie BIJOUX
  {
    id: 1,
    name: 'Collier Berbère Argent',
    description: 'Collier traditionnel berbère en argent massif avec pierres semi-précieuses.',
    price: 280,
    category: 'bijoux',
    image: '/image/collier-berbere.jpg',
    stock: 8,
    rating: 4.9,
    reviewCount: 18,
    artisan: {
      id: 1,
      name: 'Artisan Fatima',
      location: 'Marrakech'
    }
  },
  {
    id: 2,
    name: 'Boucles d\'Oreilles Filigrane',
    description: 'Boucles d\'oreilles en argent avec travail de filigrane délicat, typique du Sud marocain.',
    price: 150,
    category: 'bijoux',
    image: '/image/boucles-filigrane.jpg',
    stock: 15,
    rating: 4.7,
    reviewCount: 22,
    artisan: {
      id: 1,
      name: 'Artisan Fatima',
      location: 'Marrakech'
    }
  },
  {
    id: 3,
    name: 'Bracelet Main de Fatma',
    description: 'Bracelet en argent avec le symbole protecteur de la main de Fatma et turquoises.',
    price: 220,
    category: 'bijoux',
    image: '/image/bracelet-main-fatma.jpg',
    stock: 10,
    rating: 4.8,
    reviewCount: 27,
    artisan: {
      id: 2,
      name: 'Bijoutier Rachid',
      location: 'Essaouira'
    }
  },
  {
    id: 4,
    name: 'Bague en Or et Émail',
    description: 'Bague artisanale en or 18 carats avec travail d\'émail coloré traditionnel.',
    price: 890,
    category: 'bijoux',
    image: '/image/bague-or-email.jpg',
    stock: 5,
    rating: 5.0,
    reviewCount: 14,
    artisan: {
      id: 3,
      name: 'Maître Bijoutier',
      location: 'Casablanca'
    }
  },
  {
    id: 5,
    name: 'Pendentif Amulette',
    description: 'Pendentif en argent avec amulette protectrice traditionnelle, chaîne incluse.',
    price: 175,
    category: 'bijoux',
    image: '/image/pendentif-amulette.jpg',
    stock: 12,
    rating: 4.6,
    reviewCount: 19,
    artisan: {
      id: 1,
      name: 'Artisan Fatima',
      location: 'Marrakech'
    }
  },
  {
    id: 6,
    name: 'Boucles d\'Oreilles Corail',
    description: 'Boucles d\'oreilles en argent serties de corail naturel de la Méditerranée.',
    price: 195,
    category: 'bijoux',
    image: '/image/boucles-corail.jpg',
    stock: 8,
    rating: 4.8,
    reviewCount: 16,
    artisan: {
      id: 2,
      name: 'Bijoutier Rachid',
      location: 'Essaouira'
    }
  },

  // Catégorie MAROQUINERIE
  {
    id: 7,
    name: 'Sac en Cuir Maroquinerie',
    description: 'Sac à main en cuir de qualité supérieure, fabriqué selon les traditions marocaines.',
    price: 650,
    category: 'maroquinerie',
    image: '/image/sac-cuir.jpg',
    stock: 10,
    rating: 4.7,
    reviewCount: 31,
    artisan: {
      id: 4,
      name: 'Maître Tanneur',
      location: 'Tanger'
    }
  },
  {
    id: 8,
    name: 'Portefeuille Cuir Marocain',
    description: 'Portefeuille en cuir de chèvre, finition main, compartiments multiples.',
    price: 95,
    category: 'maroquinerie',
    image: '/image/portefeuille-cuir.jpg',
    stock: 22,
    rating: 4.6,
    reviewCount: 38,
    artisan: {
      id: 5,
      name: 'Maroquinière Samira',
      location: 'Marrakech'
    }
  },
  {
    id: 9,
    name: 'Ceinture en Cuir Gravée',
    description: 'Ceinture en cuir de veau gravée de motifs traditionnels, boucle en laiton.',
    price: 180,
    category: 'maroquinerie',
    image: '/image/ceinture-cuir.jpg',
    stock: 18,
    rating: 4.4,
    reviewCount: 23,
    artisan: {
      id: 4,
      name: 'Maître Tanneur',
      location: 'Tanger'
    }
  },
  {
    id: 10,
    name: 'Sacoche en Cuir Vintage',
    description: 'Sacoche messenger en cuir vieilli, parfaite pour le quotidien.',
    price: 420,
    category: 'maroquinerie',
    image: '/image/sacoche-cuir.jpg',
    stock: 7,
    rating: 4.5,
    reviewCount: 15,
    artisan: {
      id: 5,
      name: 'Maroquinière Samira',
      location: 'Marrakech'
    }
  },
  {
    id: 11,
    name: 'Trousse de Toilette Cuir',
    description: 'Trousse de toilette en cuir souple, compartimentée, idéale pour les voyages.',
    price: 120,
    category: 'maroquinerie',
    image: '/image/trousse-cuir.jpg',
    stock: 25,
    rating: 4.3,
    reviewCount: 28,
    artisan: {
      id: 6,
      name: 'Artisan Mohamed',
      location: 'Fès'
    }
  },
  {
    id: 12,
    name: 'Carnet en Cuir Artisanal',
    description: 'Carnet de notes avec couverture en cuir travaillé, pages lignées.',
    price: 65,
    category: 'maroquinerie',
    image: '/image/carnet-cuir.jpg',
    stock: 30,
    rating: 4.7,
    reviewCount: 42,
    artisan: {
      id: 6,
      name: 'Artisan Mohamed',
      location: 'Fès'
    }
  },

  // Catégorie POTERIE
  {
    id: 13,
    name: 'Plateau en Bois d\'Olivier',
    description: 'Magnifique plateau artisanal en bois d\'olivier marocain, sculpté à la main.',
    price: 450,
    category: 'poterie',
    image: '/image/plateaux-bois.jpg',
    stock: 15,
    rating: 4.8,
    reviewCount: 24,
    artisan: {
      id: 7,
      name: 'Artisan Ahmed',
      location: 'Fès'
    }
  },
  {
    id: 14,
    name: 'Vase Zellige Traditionnel',
    description: 'Vase en céramique décoré de motifs zellige authentiques, fait main à Fès.',
    price: 320,
    category: 'poterie',
    image: '/image/vase-zellige.jpg',
    stock: 12,
    rating: 4.6,
    reviewCount: 18,
    artisan: {
      id: 7,
      name: 'Artisan Ahmed',
      location: 'Fès'
    }
  },
  {
    id: 15,
    name: 'Théière en Terre Cuite',
    description: 'Théière traditionnelle marocaine en terre cuite, parfaite pour le thé à la menthe.',
    price: 180,
    category: 'poterie',
    image: '/image/theiere-terre-cuite.jpg',
    stock: 20,
    rating: 4.9,
    reviewCount: 32,
    artisan: {
      id: 8,
      name: 'Potier Hassan',
      location: 'Safi'
    }
  },
  {
    id: 16,
    name: 'Assiette Décorative Brodée',
    description: 'Assiette en céramique peinte à la main avec des motifs berbères traditionnels.',
    price: 95,
    category: 'poterie',
    image: '/image/assiette-decorative.jpg',
    stock: 25,
    rating: 4.5,
    reviewCount: 15,
    artisan: {
      id: 9,
      name: 'Artisan khadija',
      location: 'Meknès'
    }
  },
  {
    id: 17,
    name: 'Service à Thé Complet',
    description: 'Service à thé traditionnel comprenant théière et 6 verres, décor émaillé.',
    price: 280,
    category: 'poterie',
    image: '/image/service-the.jpg',
    stock: 8,
    rating: 4.8,
    reviewCount: 21,
    artisan: {
      id: 8,
      name: 'Potier Hassan',
      location: 'Safi'
    }
  },
  {
    id: 18,
    name: 'Plat Tajine Céramique',
    description: 'Plat tajine en céramique émaillée, idéal pour la cuisson traditionnelle.',
    price: 210,
    category: 'poterie',
    image: '/image/plat-tajine.jpg',
    stock: 14,
    rating: 4.7,
    reviewCount: 29,
    artisan: {
      id: 9,
      name: 'Artisan khadija',
      location: 'Meknès'
    }
  },

  // Catégorie TEXTILES
  {
    id: 19,
    name: 'Tapis Beni Ouarain',
    description: 'Tapis laine naturelle Beni Ouarain, tissé à la main dans les montagnes de l\'Atlas.',
    price: 1200,
    category: 'textiles',
    image: '/image/tapis-ouarain.jpg',
    stock: 3,
    rating: 5.0,
    reviewCount: 12,
    artisan: {
      id: 10,
      name: 'Coopérative Atlas',
      location: 'Ifrane'
    }
  },
  {
    id: 20,
    name: 'Coussin Brodé Main',
    description: 'Coussin en tissu de qualité, brodé à la main de motifs géométriques traditionnels.',
    price: 85,
    category: 'textiles',
    image: '/image/coussin-brode.jpg',
    stock: 30,
    rating: 4.6,
    reviewCount: 19,
    artisan: {
      id: 11,
      name: 'Artisanes Tisseuses',
      location: 'Tétouan'
    }
  },
  {
    id: 21,
    name: 'Couverture en Laine Bélier',
    description: 'Couverture chaude en laine de bélier, tissée selon les méthodes ancestrales.',
    price: 420,
    category: 'textiles',
    image: '/image/couverture-laine.jpg',
    stock: 7,
    rating: 4.9,
    reviewCount: 11,
    artisan: {
      id: 10,
      name: 'Coopérative Atlas',
      location: 'Ifrane'
    }
  },
  {
    id: 22,
    name: 'Robe Caftan de Luxe',
    description: 'Caftan traditionnel marocain en soie, brodé de fils d\'or et de perles fines.',
    price: 2500,
    category: 'textiles',
    image: '/image/caftan-luxe.jpg',
    stock: 2,
    rating: 5.0,
    reviewCount: 8,
    artisan: {
      id: 12,
      name: 'Couturière Khadija',
      location: 'Rabat'
    }
  },
  {
    id: 23,
    name: 'Écharpe en Soie Brodée',
    description: 'Écharpe légère en soie naturelle, brodée de motifs traditionnels délicats.',
    price: 145,
    category: 'textiles',
    image: '/image/echarpe-soie.jpg',
    stock: 18,
    rating: 4.8,
    reviewCount: 25,
    artisan: {
      id: 11,
      name: 'Artisanes Tisseuses',
      location: 'Tétouan'
    }
  },
  {
    id: 24,
    name: 'Nappe Brodée Maison',
    description: 'Nappe en coton de qualité avec broderies traditionnelles sur les bords.',
    price: 190,
    category: 'textiles',
    image: '/image/nappe-brodee.jpg',
    stock: 12,
    rating: 4.5,
    reviewCount: 17,
    artisan: {
      id: 12,
      name: 'Couturière Khadija',
      location: 'Rabat'
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