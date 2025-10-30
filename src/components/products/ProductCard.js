import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`} className={styles.productLink}>
        <div className={styles.imageContainer}>
          {imageError ? (
            <div className={styles.imagePlaceholder}>
              🪷<span>{t('imageNotAvailable')}</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
              onError={handleImageError}
            />
          )}
          {product.stock === 0 && (
            <div className={styles.outOfStock}>{t('outOfStock')}</div>
          )}
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productDescription}>{product.description}</p>
          
          <div className={styles.productMeta}>
            <span className={styles.category}>{product.category}</span>
            <div className={styles.rating}>
              {'⭐'.repeat(Math.floor(product.rating || 0))}
              <span>({product.reviewCount || 0})</span>
            </div>
          </div>

          <div className={styles.productFooter}>
            <span className={styles.price}>{product.price} MAD</span>
            <Button
              variant="primary"
              size="small"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? t('outOfStock') : '🛒'}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;