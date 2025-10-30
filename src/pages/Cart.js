import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { t } = useLanguage();

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.cartHeader}>
          <h1>{t('shoppingCart')}</h1>
        </div>
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h2>{t('emptyCart')}</h2>
          <p>{t('emptyCartMessage')}</p>
          <Link to="/products">
            <Button variant="primary" size="large">
              {t('continueShopping')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <h1>{t('shoppingCart')} ({cartItems.length})</h1>
        <button 
          className={styles.clearCartButton}
          onClick={clearCart}
        >
          {t('clearCart')}
        </button>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <CartItem key={item.cartId} item={item} />
          ))}
        </div>

        <div className={styles.cartSidebar}>
          <CartSummary />
        </div>
      </div>

      <div className={styles.continueShopping}>
        <Link to="/products">
          <Button variant="outline">
            ← {t('continueShopping')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;