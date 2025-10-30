import React from 'react';
import styles from './Leader.module.css';

const Loader = ({ 
  size = 'medium', 
  text = 'Chargement...', 
  fullscreen = false 
}) => {
  const loaderClass = `${styles.loader} ${styles[size]} ${
    fullscreen ? styles.fullscreen : ''
  }`;

  return (
    <div className={loaderClass}>
      <div className={styles.spinner}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;