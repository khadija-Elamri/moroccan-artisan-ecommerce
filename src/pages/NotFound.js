import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>{t('pageNotFound')}</h1>
          <p className={styles.description}>
            {t('pageNotFoundDescription')}
          </p>
          <div className={styles.actions}>
            <Link to="/">
              <Button variant="primary" size="large">
                ← {t('backToHome')}
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="large">
                🛍️ {t('browseProducts')}
              </Button>
            </Link>
          </div>
          <div className={styles.searchSuggestion}>
            <p>{t('trySearching')}</p>
            <div className={styles.popularLinks}>
              <Link to="/products?category=jewelry">{t('jewelry')}</Link>
              <Link to="/products?category=pottery">{t('pottery')}</Link>
              <Link to="/products?category=textiles">{t('textiles')}</Link>
              <Link to="/products?category=leather">{t('leather')}</Link>
            </div>
          </div>
        </div>
        <div className={styles.illustration}>
          <div className={styles.artisanIllustration}>🪷✨</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;