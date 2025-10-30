import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import styles from './Cart.module.css';

const CartSummary = () => {
  const { cartItems, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.cartSummary}>
      <h3>{t('orderSummary')}</h3>
      
      <div className={styles.summaryRow}>
        <span>{t('subtotal')}</span>
        <span>{subtotal} MAD</span>
      </div>

      <div className={styles.summaryRow}>
        <span>{t('shipping')}</span>
        <span>
          {shippingFee === 0 ? (
            <span className={styles.freeShipping}>{t('freeShipping')}</span>
          ) : (
            `${shippingFee} MAD`
          )}
        </span>
      </div>

      {subtotal < 500 && (
        <div className={styles.shippingNote}>
          {t('freeShippingNote', { amount: 500 - subtotal })}
        </div>
      )}

      <div className={`${styles.summaryRow} ${styles.total}`}>
        <span>{t('total')}</span>
        <span>{total} MAD</span>
      </div>

      <Button
        variant="primary"
        size="large"
        onClick={handleCheckout}
        className={styles.checkoutButton}
      >
        {t('proceedToCheckout')}
      </Button>

      <div className={styles.securityNote}>
        🔒 {t('secureCheckout')}
      </div>
    </div>
  );
};

export default CartSummary;