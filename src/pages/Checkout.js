import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import styles from './Checkout.module.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [shippingData, setShippingData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Maroc'
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de traitement de commande
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newOrderNumber = `ORD-${Date.now()}`;
    setOrderNumber(newOrderNumber);
    setOrderSuccess(true);
    clearCart();
    setLoading(false);
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className={styles.checkout}>
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>{t('emptyCart')}</h2>
          <p>{t('emptyCartCheckout')}</p>
          <Button 
            variant="primary"
            onClick={() => navigate('/products')}
          >
            {t('continueShopping')}
          </Button>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className={styles.checkout}>
        <div className={styles.successPage}>
          <div className={styles.successContent}>
            <div className={styles.successIcon}>✅</div>
            <h1>{t('orderConfirmed')}</h1>
            <p className={styles.orderNumber}>
              {t('orderNumber')}: <strong>{orderNumber}</strong>
            </p>
            <p className={styles.successMessage}>
              {t('orderSuccessMessage')}
            </p>
            <div className={styles.successActions}>
              <Button
                variant="primary"
                onClick={() => navigate('/orders')}
              >
                {t('viewOrders')}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/products')}
              >
                {t('continueShopping')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <h1>{t('checkout')}</h1>

        <div className={styles.checkoutContent}>
          {/* Shipping and Payment Form */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmitOrder}>
              {/* Shipping Information */}
              <section className={styles.section}>
                <h2>📍 {t('shippingInformation')}</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>{t('firstName')} *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t('lastName')} *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t('email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t('phone')} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t('address')} *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t('city')} *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t('postalCode')} *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t('country')} *</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingData.country}
                      onChange={handleInputChange}
                      required
                      disabled
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className={styles.section}>
                <h2>💳 {t('paymentMethod')}</h2>
                <div className={styles.paymentMethods}>
                  <label className={styles.paymentMethod}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={paymentMethod === 'creditCard'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className={styles.paymentLabel}>
                      💳 {t('creditCard')}
                    </span>
                  </label>
                  <label className={styles.paymentMethod}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className={styles.paymentLabel}>
                      📘 {t('paypal')}
                    </span>
                  </label>
                  <label className={styles.paymentMethod}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      checked={paymentMethod === 'cashOnDelivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className={styles.paymentLabel}>
                      💰 {t('cashOnDelivery')}
                    </span>
                  </label>
                </div>

                {paymentMethod === 'creditCard' && (
                  <div className={styles.creditCardForm}>
                    <div className={styles.formGroup}>
                      <label>{t('cardNumber')} *</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className={styles.cardDetails}>
                      <div className={styles.formGroup}>
                        <label>{t('expiryDate')} *</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('cvv')} *</label>
                        <input
                          type="text"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>{t('cardholderName')} *</label>
                      <input
                        type="text"
                        placeholder={t('enterCardholderName')}
                        required
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* Order Button */}
              <div className={styles.orderActions}>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={loading}
                  disabled={loading}
                  className={styles.placeOrderButton}
                >
                  {t('placeOrder')} - {total} MAD
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className={styles.summarySection}>
            <div className={styles.orderSummary}>
              <h2>{t('orderSummary')}</h2>
              
              <div className={styles.orderItems}>
                {cartItems.map(item => (
                  <div key={item.cartId} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className={styles.imagePlaceholder}>🪷</div>
                      )}
                    </div>
                    <div className={styles.itemDetails}>
                      <h4>{item.name}</h4>
                      {item.variant && (
                        <p className={styles.itemVariant}>{item.variant}</p>
                      )}
                      <p className={styles.itemPrice}>
                        {item.price} MAD x {item.quantity}
                      </p>
                    </div>
                    <div className={styles.itemTotal}>
                      {item.price * item.quantity} MAD
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotals}>
                <div className={styles.summaryRow}>
                  <span>{t('subtotal')}</span>
                  <span>{subtotal} MAD</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>{t('shipping')}</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className={styles.freeShipping}>{t('free')}</span>
                    ) : (
                      `${shippingFee} MAD`
                    )}
                  </span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>{t('total')}</span>
                  <span>{total} MAD</span>
                </div>
              </div>

              {subtotal < 500 && (
                <div className={styles.shippingNote}>
                  {t('freeShippingNote', { amount: 500 - subtotal })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;