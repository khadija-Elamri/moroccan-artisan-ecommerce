import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';
import Loader from '../common/Loader';
import styles from './Auth.module.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || t('loginFailed'));
      }
    } catch (err) {
      setError(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>{t('login')}</h2>
        <p className={styles.authSubtitle}>{t('loginSubtitle')}</p>

        {error && (
          <div className={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={t('enterPassword')}
            />
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              {t('rememberMe')}
            </label>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              {t('forgotPassword')}
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading}
            className={styles.submitButton}
          >
            {t('login')}
          </Button>
        </form>

        <div className={styles.authFooter}>
          <p>
            {t('noAccount')} 
            <Link to="/register" className={styles.authLink}>
              {t('registerHere')}
            </Link>
          </p>
        </div>

        <div className={styles.socialLogin}>
          <p>{t('orLoginWith')}</p>
          <div className={styles.socialButtons}>
            <button type="button" className={styles.socialButton}>
              📘 Facebook
            </button>
            <button type="button" className={styles.socialButton}>
              📷 Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;