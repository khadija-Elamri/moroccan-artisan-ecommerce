import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { productService } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import styles from './Products.module.css';

const Products = () => {
  const { t } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceMin: '',
    priceMax: '',
    sortBy: 'newest',
    search: ''
  });

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'jewelry', name: 'Bijoux' },
    { id: 'pottery', name: 'Poterie' },
    { id: 'textiles', name: 'Textiles' },
    { id: 'leather', name: 'Maroquinerie' },
    { id: 'cosmetics', name: 'Cosmétiques' },
    { id: 'decoration', name: 'Décoration' }
  ];

  useEffect(() => {
    loadProducts();
  }, [filters]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts(filters);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    if (key === 'category') {
      if (value && value !== 'all') {
        searchParams.set('category', value);
      } else {
        searchParams.delete('category');
      }
      setSearchParams(searchParams);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceMin: '',
      priceMax: '',
      sortBy: 'newest',
      search: ''
    });
    setSearchParams({});
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Nos Produits Artisanaux</h1>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Catégories</h3>
              <div className={styles.categoryList}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterChange('category', cat.id === 'all' ? '' : cat.id)}
                    className={`${styles.categoryBtn} ${
                      (cat.id === 'all' && !filters.category) || filters.category === cat.id
                        ? styles.active
                        : ''
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Prix</h3>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  className={styles.priceInput}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  className={styles.priceInput}
                />
              </div>
            </div>

            <button onClick={clearFilters} className={styles.clearBtn}>
              Réinitialiser les filtres
            </button>
          </aside>

          <main className={styles.mainContent}>
            <div className={styles.toolbar}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className={styles.sortSelect}
              >
                <option value="newest">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="popular">Populaires</option>
                <option value="rating">Mieux notés</option>
              </select>
            </div>

            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Chargement des produits...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className={styles.resultsCount}>
                  {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
                </div>
                <div className={styles.productGrid}>
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <h3>Aucun produit trouvé</h3>
                <p>Essayez de modifier vos filtres de recherche</p>
                <button onClick={clearFilters} className={styles.resetBtn}>
                  Voir tous les produits
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;