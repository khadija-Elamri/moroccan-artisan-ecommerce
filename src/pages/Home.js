import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { productService } from "../services/productService";
import ProductGrid from "../components/products/ProductGrid";
import Button from "../components/common/Button";
import Loader from "../components/common/Leader";
import styles from "./Home.module.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const result = await productService.getProducts();
        setFeaturedProducts(result.products.slice(0, 4));
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  const categories = [
    {
      id: "jewelry",
      name: t("jewelry"),
      description: t("jewelryDescription"),
      image: "/images/category-jewelry.jpg",
      icon: "💎",
    },
    {
      id: "pottery",
      name: t("pottery"),
      description: t("potteryDescription"),
      image: "/images/category-pottery.jpg",
      icon: "🏺",
    },
    {
      id: "textiles",
      name: t("textiles"),
      description: t("textilesDescription"),
      image: "/images/category-textiles.jpg",
      icon: "🧵",
    },
    {
      id: "leather",
      name: t("leather"),
      description: t("leatherDescription"),
      image: "/images/category-leather.jpg",
      icon: "👜",
    },
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {t("welcomeTo")}{" "}
            <span className={styles.highlight}>{t("appName")}</span>
          </h1>
          <p className={styles.heroSubtitle}>{t("heroDescription")}</p>
          <div className={styles.heroActions}>
            <Link to="/products">
              <Button variant="primary" size="large">
                {t("discoverProducts")}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="large">
                {t("learnMore")}
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.heroImage}>
          <img
            src="/image/home page.jpg"
            alt="Artisanat traditionnel marocain"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t("categories")}</h2>
          <p className={styles.sectionSubtitle}>
            {t("categoriesDescription")}
          </p>

          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryImageWrapper}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.categoryImage}
                  />
                  <div className={styles.categoryOverlay}>
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className={styles.exploreLink}>
                      {t("explore")} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t("featuredProducts")}</h2>
          <p className={styles.sectionSubtitle}>{t("featuredDescription")}</p>

          {loading ? (
            <Loader text={t("loadingProducts")} />
          ) : (
            <ProductGrid products={featuredProducts} />
          )}

          <div className={styles.seeAll}>
            <Link to="/products">
              <Button variant="outline">{t("seeAllProducts")}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t("ourValues")}</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎨</div>
              <h3>{t("authenticity")}</h3>
              <p>{t("authenticityDescription")}</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>{t("fairTrade")}</h3>
              <p>{t("fairTradeDescription")}</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌱</div>
              <h3>{t("sustainability")}</h3>
              <p>{t("sustainabilityDescription")}</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🚚</div>
              <h3>{t("fastDelivery")}</h3>
              <p>{t("fastDeliveryDescription")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
