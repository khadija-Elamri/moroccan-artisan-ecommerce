import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import styles from './AuthPages.module.css';

const Register = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authHero}>
        <div className={styles.heroContent}>
          <h1> Rejoignez notre communauté</h1>
          <p>
            Inscrivez-vous pour découvrir des produits artisanaux uniques 
            ou pour vendre vos propres créations si vous êtes artisan.
          </p>
          <div className={styles.heroBenefits}>
            <h3>Pourquoi nous rejoindre ?</h3>
            <div className={styles.benefit}>
              <span>🛍️</span>
              Accès à des produits artisanaux authentiques
            </div>
            <div className={styles.benefit}>
              <span>👨‍🎨</span>
              Support direct aux artisans marocains
            </div>
            <div className={styles.benefit}>
              <span>🚚</span>
              Livraison dans tout le Maroc
            </div>
            <div className={styles.benefit}>
              <span>💎</span>
              Produits de qualité, faits main
            </div>
          </div>
        </div>
      </div>
      <div className={styles.authFormSection}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;