import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.css';
import styl from './Header.module.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <Link to="/" className={styl.logo}>
          {}        <img src="./image/logo.jpg" alt="DarArtisana" className={styl.logoImage} />
          {}
          { <span className={styl.logoText}>DarArtisana</span> }
        </Link>
        <br></br>
            <p>{t('footerDescription')}</p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>{t('quickLinks')}</h4>
            <ul>
              <li><Link to="/">{t('home')}</Link></li>
              <li><Link to="/products">{t('products')}</Link></li>
              <li><Link to="/about">{t('about')}</Link></li>
              <li><Link to="/contact">{t('contact')}</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t('categories')}</h4>
            <ul>
              <li><Link to="/products?category=jewelry">{t('jewelry')}</Link></li>
              <li><Link to="/products?category=pottery">{t('pottery')}</Link></li>
              <li><Link to="/products?category=textiles">{t('textiles')}</Link></li>
              <li><Link to="/products?category=leather">{t('leather')}</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t('contactInfo')}</h4>
            <ul>
              <li>📍 {t('address')}</li>
              <li>📞 +212 5 XX XX XX XX</li>
              <li>✉️ contact@artisanat.ma</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 {t('appName')}. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;