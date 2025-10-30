import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+212 6 XX XX XX XX',
    address: '123 Rue Principale, Casablanca, Maroc',
    birthDate: '1990-01-01'
  });

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 450,
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'processing',
      total: 1200,
      items: 1
    }
  ];

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    // Simulation de sauvegarde
    console.log('Saving profile:', profileData);
    setEditMode(false);
  };

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

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>{t('myProfile')}</h1>
          <p>{t('profileDescription')}</p>
        </div>

        <div className={styles.profileContent}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className={styles.userInfo}>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
                <span className={styles.userRole}>
                  {t(user?.role || 'client')}
                </span>
              </div>
            </div>

            <nav className={styles.sidebarNav}>
              <button
                className={`${styles.navItem} ${activeTab === 'personal' ? styles.active : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                👤 {t('personalInfo')}
              </button>
              <button
                className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                📦 {t('myOrders')}
              </button>
              <button
                className={`${styles.navItem} ${activeTab === 'addresses' ? styles.active : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                📍 {t('addresses')}
              </button>
              <button
                className={`${styles.navItem} ${activeTab === 'security' ? styles.active : ''}`}
                onClick={() => setActiveTab('security')}
              >
                🔒 {t('security')}
              </button>
            </nav>

            <div className={styles.sidebarActions}>
              <Button
                variant="outline"
                onClick={() => setShowLogoutModal(true)}
                className={styles.logoutButton}
              >
                🚪 {t('logout')}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className={styles.tabContent}>
                <div className={styles.tabHeader}>
                  <h2>{t('personalInformation')}</h2>
                  <Button
                    variant={editMode ? "outline" : "primary"}
                    onClick={() => editMode ? setEditMode(false) : setEditMode(true)}
                  >
                    {editMode ? t('cancel') : t('editProfile')}
                  </Button>
                </div>

                <div className={styles.formSection}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>{t('firstName')}</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{t('lastName')}</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>{t('email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>{t('phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>{t('birthDate')}</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={profileData.birthDate}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>

                  {editMode && (
                    <div className={styles.formActions}>
                      <Button
                        variant="primary"
                        onClick={handleSaveProfile}
                      >
                        {t('saveChanges')}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className={styles.tabContent}>
                <div className={styles.tabHeader}>
                  <h2>{t('orderHistory')}</h2>
                </div>

                {orders.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📦</div>
                    <h3>{t('noOrders')}</h3>
                    <p>{t('noOrdersDescription')}</p>
                    <Button variant="primary">
                      {t('startShopping')}
                    </Button>
                  </div>
                ) : (
                  <div className={styles.ordersList}>
                    {orders.map(order => (
                      <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                          <div className={styles.orderInfo}>
                            <h3>Commande {order.id}</h3>
                            <span className={styles.orderDate}>
                              {new Date(order.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div 
                            className={styles.orderStatus}
                            style={{ color: getStatusColor(order.status) }}
                          >
                            {getStatusLabel(order.status)}
                          </div>
                        </div>

                        <div className={styles.orderDetails}>
                          <div className={styles.orderMeta}>
                            <span>{order.items} {t('items')}</span>
                            <span className={styles.orderTotal}>
                              {order.total} MAD
                            </span>
                          </div>
                          <div className={styles.orderActions}>
                            <Button variant="outline" size="small">
                              {t('viewDetails')}
                            </Button>
                            <Button variant="outline" size="small">
                              {t('trackOrder')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className={styles.tabContent}>
                <div className={styles.tabHeader}>
                  <h2>{t('myAddresses')}</h2>
                  <Button variant="primary">
                    + {t('addNewAddress')}
                  </Button>
                </div>

                <div className={styles.addressesList}>
                  <div className={styles.addressCard}>
                    <div className={styles.addressHeader}>
                      <h3>{t('home')}</h3>
                      <span className={styles.defaultBadge}>
                        {t('default')}
                      </span>
                    </div>
                    <p className={styles.addressText}>
                      {profileData.address}
                    </p>
                    <div className={styles.addressActions}>
                      <button className={styles.actionButton}>
                        {t('edit')}
                      </button>
                      <button className={styles.actionButton}>
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className={styles.tabContent}>
                <div className={styles.tabHeader}>
                  <h2>{t('securitySettings')}</h2>
                </div>

                <div className={styles.securitySection}>
                  <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                      <h3>{t('changePassword')}</h3>
                      <p>{t('changePasswordDescription')}</p>
                    </div>
                    <Button variant="outline">
                      {t('change')}
                    </Button>
                  </div>

                  <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                      <h3>{t('twoFactorAuth')}</h3>
                      <p>{t('twoFactorAuthDescription')}</p>
                    </div>
                    <Button variant="outline">
                      {t('enable')}
                    </Button>
                  </div>

                  <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                      <h3>{t('loginActivity')}</h3>
                      <p>{t('loginActivityDescription')}</p>
                    </div>
                    <Button variant="outline">
                      {t('viewActivity')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title={t('confirmLogout')}
        size="small"
      >
        <div className={styles.logoutModal}>
          <p>{t('logoutConfirmation')}</p>
          <div className={styles.modalActions}>
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={logout}
            >
              {t('logout')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;