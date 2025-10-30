import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { language, changeLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🪷 {t('appName')}
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link to="/" className={styles.navLink}>{t('home')}</Link>
          <Link to="/products" className={styles.navLink}>{t('products')}</Link>
          <Link to="/about" className={styles.navLink}>{t('about')}</Link>
          <Link to="/contact" className={styles.navLink}>{t('contact')}</Link>
        </nav>

        <div className={styles.actions}>
          {/* Sélecteur de langue */}
          <select 
            value={language} 
            onChange={(e) => changeLanguage(e.target.value)}
            className={styles.languageSelector}
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>

          {/* Panier */}
          <Link to="/cart" className={styles.cartLink}>
            🛒 ({getCartItemsCount()})
          </Link>

          {/* Authentification */}
          {user ? (
            <div className={styles.userMenu}>
              <span>{user.name}</span>
              <div className={styles.dropdown}>
                <Link to="/profile">{t('profile')}</Link>
                <Link to="/orders">{t('orders')}</Link>
                <button onClick={handleLogout}>{t('logout')}</button>
              </div>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.loginLink}>{t('login')}</Link>
              <Link to="/register" className={styles.registerLink}>{t('register')}</Link>
            </div>
          )}

          {/* Menu mobile */}
          <button 
            className={styles.menuToggle}
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;