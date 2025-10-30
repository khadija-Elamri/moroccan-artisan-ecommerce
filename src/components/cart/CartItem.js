import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Cart.module.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.cartId, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.cartId);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className={styles.imagePlaceholder}>🪷</div>
        )}
      </div>

      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.name}</h3>
        {item.variant && (
          <p className={styles.itemVariant}>{t('variant')}: {item.variant}</p>
        )}
        <p className={styles.itemPrice}>{item.price} MAD</p>
      </div>

      <div className={styles.quantityControls}>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>

      <div className={styles.itemSubtotal}>
        {subtotal} MAD
      </div>

      <button
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label={t('removeFromCart')}
      >
        🗑️
      </button>
    </div>
  );
};

export default CartItem;