import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className={styles.loadingGrid}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className={styles.productCardSkeleton}>
            <div className={styles.imageSkeleton}></div>
            <div className={styles.contentSkeleton}>
              <div className={styles.titleSkeleton}></div>
              <div className={styles.descriptionSkeleton}></div>
              <div className={styles.priceSkeleton}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🪷</div>
        <h3>Aucun produit trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;