import React, { useState, useEffect, useCallback } from 'react'; // 1. Ajout de useCallback
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services/productService';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilter from '../components/products/ProductFilter';
import Loader from '../components/common/Leader'; // 2. Correction de "Leader" en "Loader"
import styles from './Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();

  const initialFilters = {
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'name',
    sortOrder: searchParams.get('sortOrder') || 'asc'
  };

  const [filters, setFilters] = useState(initialFilters);

  // 3. Chargement des catégories uniquement au montage (mount)
  useEffect(() => {
    loadCategories();
  }, []);

  // 4. Utilisation de useCallback pour stabiliser la fonction et éviter les boucles infinies
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await productService.getProducts(filters);
      setProducts(result.products);
      
      // Mettre à jour les paramètres d'URL
      const newSearchParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        }
      });
      setSearchParams(newSearchParams);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, setSearchParams]); // Dépendances de la fonction

  // 5. Chargement des produits quand les filtres changent (inclus le montage initial)
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const loadCategories = async () => {
    try {
      const categoriesList = await productService.getCategories();
      setCategories(categoriesList);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(clearedFilters);
    // setSearchParams({}) est géré par l'effet loadProducts, 
    // mais on peut le faire ici pour une réponse UI instantanée si besoin.
  };

  const activeFiltersCount = Object.values(filters).filter(
    value => value && value !== 'name' && value !== 'asc'
  ).length;

  return (
    <div className={styles.productsPage}>
      <div className={styles.pageHeader}>
        <h1>{t('ourProducts')}</h1>
        <p>{t('productsDescription')}</p>
      </div>

      <div className={styles.productsContent}>
        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <h3>{t('filters')}</h3>
            {activeFiltersCount > 0 && (
              <button 
                className={styles.clearAllButton}
                onClick={clearAllFilters}
              >
                {t('clearAll')} ({activeFiltersCount})
              </button>
            )}
          </div>
          
          <ProductFilter
            categories={categories}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.resultsHeader}>
            <div className={styles.resultsInfo}>
              {loading ? (
                <span>{t('loading')}...</span>
              ) : (
                <span>
                  {products.length} {t('productsFound')}
                </span>
              )}
            </div>
            
            <div className={styles.viewOptions}>
              <button className={styles.viewOption} title="Grid View">
                ◼️
              </button>
              <button className={styles.viewOption} title="List View">
                ☰
              </button>
            </div>
          </div>

          {loading ? (
            <Loader text={t('loadingProducts')} />
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;