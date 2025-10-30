import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import styles from './Orders.module.css';

const Orders = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 450,
      items: [
        {
          name: 'Plateau en Bois d\'Olivier',
          price: 450,
          quantity: 1,
          image: '/images/plateau-bois.jpg'
        }
      ],
      shippingAddress: '123 Rue Principale, Casablanca, Maroc',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'processing',
      total: 1200,
      items: [
        {
          name: 'Tapis Beni Ouarain',
          price: 1200,
          quantity: 1,
          image: '/images/tapis-ouarain.jpg'
        }
      ],
      shippingAddress: '123 Rue Principale, Casablanca, Maroc',
      trackingNumber: null
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'shipped',
      total: 730,
      items: [
        {
          name: 'Collier Berbère Argent',
          price: 280,
          quantity: 1,
          image: '/images/collier-berbere.jpg'
        },
        {
          name: 'Sac en Cuir Maroquinerie',
          price: 450,
          quantity: 1,
          image: '/images/sac-cuir.jpg'
        }
      ],
      shippingAddress: '123 Rue Principale, Casablanca, Maroc',
      trackingNumber: 'TRK987654321'
    }
  ];

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusLabel = (status) => {
    const statusMap = {
      'pending': t('pending'),
      'processing': t('processing'),
      'shipped': t('shipped'),
      'delivered': t('delivered'),
      'cancelled': t('cancelled')
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': '#f59e0b',
      'processing': '#3b82f6',
      'shipped': '#8b5cf6',
      'delivered': '#10b981',
      'cancelled': '#ef4444'
    };
    return colorMap[status] || '#666';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      'pending': '⏳',
      'processing': '🔄',
      'shipped': '🚚',
      'delivered': '✅',
      'cancelled': '❌'
    };
    return iconMap[status] || '📦';
  };

  return (
    <div className={styles.orders}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>{t('myOrders')}</h1>
          <p>{t('ordersDescription')}</p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('allOrders')}
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'processing' ? styles.active : ''}`}
            onClick={() => setFilter('processing')}
          >
            {t('processing')}
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'shipped' ? styles.active : ''}`}
            onClick={() => setFilter('shipped')}
          >
            {t('shipped')}
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'delivered' ? styles.active : ''}`}
            onClick={() => setFilter('delivered')}
          >
            {t('delivered')}
          </button>
        </div>

        {/* Orders List */}
        <div className={styles.ordersList}>
          {filteredOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📦</div>
              <h3>{t('noOrdersFound')}</h3>
              <p>{t('noOrdersFilterDescription')}</p>
              <Button 
                variant="primary"
                onClick={() => setFilter('all')}
              >
                {t('viewAllOrders')}
              </Button>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className={styles.orderCard}>
                {/* Order Header */}
                <div className={styles.orderHeader}>
                  <div className={styles.orderInfo}>
                    <h3>{t('order')} {order.id}</h3>
                    <span className={styles.orderDate}>
                      {new Date(order.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className={styles.orderStatus}>
                    <span 
                      className={styles.statusBadge}
                      style={{ 
                        backgroundColor: getStatusColor(order.status) + '20',
                        color: getStatusColor(order.status)
                      }}
                    >
                      {getStatusIcon(order.status)} {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className={styles.imagePlaceholder}>🪷</div>
                        )}
                      </div>
                      <div className={styles.itemDetails}>
                        <h4>{item.name}</h4>
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

                {/* Order Footer */}
                <div className={styles.orderFooter}>
                  <div className={styles.orderTotal}>
                    <strong>{t('total')}:</strong>
                    <span>{order.total} MAD</span>
                  </div>
                  
                  <div className={styles.orderActions}>
                    <Button variant="outline" size="small">
                      {t('viewDetails')}
                    </Button>
                    {order.trackingNumber && (
                      <Button variant="outline" size="small">
                        {t('trackOrder')}
                      </Button>
                    )}
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="small">
                        {t('leaveReview')}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className={styles.shippingInfo}>
                  <div className={styles.shippingDetail}>
                    <strong>📍 {t('shippingAddress')}:</strong>
                    <span>{order.shippingAddress}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className={styles.shippingDetail}>
                      <strong>📦 {t('trackingNumber')}:</strong>
                      <span>{order.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;