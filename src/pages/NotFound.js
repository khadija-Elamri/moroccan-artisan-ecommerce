import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page introuvable</h1>
        <p className={styles.message}>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>
            Retour à l'accueil
          </Link>
          <Link to="/products" className={styles.productsBtn}>
            Voir nos produits
          </Link>
        </div>
        <div className={styles.illustration}>
          <div className={styles.pattern}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;