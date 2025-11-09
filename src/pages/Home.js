import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services/productService';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/common/Button';
import Loader from '../components/common/Leader';
import styles from './Home.module.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await productService.getProducts();
        // اختيار 4 منتجات عشوائية لجذب الانتباه
        const shuffled = [...result.products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setError('فشل في تحميل المنتجات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const categories = useMemo(() => [
    {
      id: 'jewelry',
      name: t('jewelry'),
      description: t('jewelryDescription'),
      image: '/images/category-jewelry.jpg',
      icon: '💎',
      color: '#C9A96E'
    },
    {
      id: 'pottery',
      name: t('pottery'),
      description: t('potteryDescription'),
      image: '/images/category-pottery.jpg',
      icon: '🏺',
      color: '#8B4513'
    },
    {
      id: 'textiles',
      name: t('textiles'),
      description: t('textilesDescription'),
      image: '/images/category-textiles.jpg',
      icon: '🧵',
      color: '#D4AF37'
    },
    {
      id: 'leather',
      name: t('leather'),
      description: t('leatherDescription'),
      image: '/images/category-leather.jpg',
      icon: '👜',
      color: '#5D4037'
    }
  ], [t]);

  const values = useMemo(() => [
    {
      icon: '🎨',
      title: t('authenticity'),
      description: t('authenticityDescription'),
    },
    {
      icon: '🤝',
      title: t('fairTrade'),
      description: t('fairTradeDescription'),
    },
    {
      icon: '🌱',
      title: t('sustainability'),
      description: t('sustainabilityDescription'),
    },
    {
      icon: '🚚',
      title: t('fastDelivery'),
      description: t('fastDeliveryDescription'),
    }
  ], [t]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className={styles.home}>
      {/* Hero Section - محسّن */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                {t('welcomeTo')} <span className={styles.highlight}>{t('appName')}</span>
              </h1>
              <p className={styles.heroSubtitle}>
                {t('heroDescription')}
              </p>
              <div className={styles.heroActions}>
                <Link to="/products">
                  <Button variant="primary" size="large" className={styles.heroButton}>
                    {t('discoverProducts')}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="large" className={styles.heroButton}>
                    {t('learnMore')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img 
                src="/image/home page.jpg" 
                alt="الحرف اليدوية المغربية التقليدية"
                className={styles.heroImg}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className={styles.heroPlaceholder}>
                <div className={styles.placeholderIcon}>🪔</div>
                <p>تراث مغربي أصيل</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - محسّن */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('categories')}</h2>
            <p className={styles.sectionSubtitle}>{t('categoriesDescription')}</p>
          </div>
          
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className={styles.categoryCard}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div 
                  className={styles.categoryIcon}
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span style={{ color: category.color }}>{category.icon}</span>
                </div>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
                <span className={styles.exploreLink}>
                  {t('explore')} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - محسّن */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('featuredProducts')}</h2>
            <p className={styles.sectionSubtitle}>{t('featuredDescription')}</p>
          </div>
          
          {loading ? (
            <div className={styles.loadingContainer}>
              <Loader text={t('loadingProducts')} />
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorIcon}>⚠️</div>
              <h3>خطأ في التحميل</h3>
              <p>{error}</p>
              <Button variant="primary" onClick={handleRetry}>
                إعادة المحاولة
              </Button>
            </div>
          ) : (
            <>
              <ProductGrid 
                products={featuredProducts} 
                className={styles.featuredGrid}
              />
              <div className={styles.seeAll}>
                <Link to="/products">
                  <Button variant="outline" size="large">
                    {t('seeAllProducts')}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Values Section - محسّن */}
      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('ourValues')}</h2>
            <p className={styles.sectionSubtitle}>قيم نعتز بها في كل منتج نقدمه</p>
          </div>
          
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={styles.valueCard}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className={styles.valueIconContainer}>
                  <span className={styles.valueIcon}>{value.icon}</span>
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;