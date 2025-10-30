import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services/productService';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productData = await productService.getProductById(id);
      setProduct(productData);
    } catch (err) {
      setError(t('productNotFound'));
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity, selectedVariant);
    setShowSuccessModal(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (product && newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };

  const images = product?.images || [
    product?.image || '/images/placeholder-product.jpg'
  ];

  if (loading) {
    return (
      <div className={styles.productDetail}>
        <Loader text={t('loadingProduct')} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>{t('productNotFound')}</h2>
          <p>{t('productNotFoundDescription')}</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/products')}
          >
            {t('backToProducts')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.breadcrumb}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← {t('back')}
        </button>
        <span>/</span>
        <button onClick={() => navigate('/products')}>{t('products')}</button>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.productContent}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              onError={(e) => {
                e.target.src = '/images/placeholder-product.jpg';
              }}
            />
          </div>
          {images.length > 1 && (
            <div className={styles.thumbnailList}>
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.active : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    onError={(e) => {
                      e.target.src = '/images/placeholder-product.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <div className={styles.productHeader}>
            <h1>{product.name}</h1>
            <div className={styles.rating}>
              <span className={styles.stars}>
                {'⭐'.repeat(Math.floor(product.rating || 0))}
              </span>
              <span className={styles.ratingText}>
                ({product.rating || 0}/5) • {product.reviewCount || 0} {t('reviews')}
              </span>
            </div>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>{product.price} MAD</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={styles.originalPrice}>
                {product.originalPrice} MAD
              </span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Artisan Info */}
          <div className={styles.artisanInfo}>
            <h3>{t('craftedBy')}</h3>
            <div className={styles.artisanDetails}>
              <div className={styles.artisanAvatar}>👨‍🎨</div>
              <div>
                <strong>{product.artisan?.name || t('unknownArtisan')}</strong>
                <p>{product.artisan?.location || t('morocco')}</p>
              </div>
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className={styles.variants}>
              <label>{t('selectVariant')}:</label>
              <div className={styles.variantOptions}>
                {product.variants.map(variant => (
                  <button
                    key={variant}
                    className={`${styles.variantOption} ${
                      selectedVariant === variant ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <label>{t('quantity')}:</label>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className={styles.stockInfo}>
                {product.stock} {t('available')}
              </span>
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="outline"
                size="large"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={styles.cartButton}
              >
                🛒 {t('addToCart')}
              </Button>
              <Button
                variant="primary"
                size="large"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={styles.buyButton}
              >
                {t('buyNow')}
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <strong>📦 {t('shipping')}:</strong>
              <span>{t('freeShippingOver500')}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>↩️ {t('returns')}:</strong>
              <span>{t('returnPolicy')}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>🏷️ {t('category')}:</strong>
              <span>{t(product.category)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t('addedToCart')}
        size="small"
      >
        <div className={styles.successModal}>
          <div className={styles.successIcon}>✅</div>
          <p>{t('productAddedToCart')}</p>
          <div className={styles.modalActions}>
            <Button
              variant="outline"
              onClick={() => setShowSuccessModal(false)}
            >
              {t('continueShopping')}
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/cart')}
            >
              {t('viewCart')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;