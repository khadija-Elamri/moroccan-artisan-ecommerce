import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', text = 'Chargement...' }) => {
  return (
    <div className={`${styles.loader} ${styles[size]}`}>
      <div className={styles.spinner}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;