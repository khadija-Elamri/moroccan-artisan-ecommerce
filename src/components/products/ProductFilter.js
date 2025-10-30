
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ProductFilter.module.css';

const ProductFilter = ({ 
  categories = [], 
  onFilterChange,
  initialFilters = {}
}) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
    sortOrder: 'asc',
    ...initialFilters
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="category">{t('category')}</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">{t('allCategories')}</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {t(category)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="minPrice">{t('minPrice')}</label>
        <input
          id="minPrice"
          type="number"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="maxPrice">{t('maxPrice')}</label>
        <input
          id="maxPrice"
          type="number"
          placeholder="1000"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sortBy">{t('sortBy')}</label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="name">{t('name')}</option>
          <option value="price">{t('price')}</option>
          <option value="rating">{t('rating')}</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sortOrder">{t('sortOrder')}</label>
        <select
          id="sortOrder"
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
        >
          <option value="asc">{t('ascending')}</option>
          <option value="desc">{t('descending')}</option>
        </select>
      </div>

      <button 
        className={styles.clearButton}
        onClick={clearFilters}
      >
        {t('clearFilters')}
      </button>
    </div>
  );
};

export default ProductFilter;