import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import styles from './AuthPages.module.css';

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authHero}>
        <div className={styles.heroContent}>
          <h1>🪷 Bienvenue sur Artisanat Marocain</h1>
          <p>
            Découvrez l'authenticité et le savoir-faire des artisans marocains. 
            Connectez-vous pour accéder à des produits uniques et artisanaux.
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.feature}>
              <span>🚚</span>
              Livraison gratuite à partir de 500 MAD
            </div>
            <div className={styles.feature}>
              <span>🔒</span>
              Paiement sécurisé
            </div>
            <div className={styles.feature}>
              <span>⭐</span>
              Produits certifiés authentiques
            </div>
          </div>
        </div>
      </div>
      <div className={styles.authFormSection}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;