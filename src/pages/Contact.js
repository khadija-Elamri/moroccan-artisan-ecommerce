import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import styles from './Contact.module.css';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: t('address'),
      content: t('fullAddress')
    },
    {
      icon: '📞',
      title: t('phone'),
      content: '+212 5 XX XX XX XX'
    },
    {
      icon: '✉️',
      title: t('email'),
      content: 'contact@artisanat.ma'
    },
    {
      icon: '🕒',
      title: t('workingHours'),
      content: t('workingHoursDetail')
    }
  ];

  if (submitted) {
    return (
      <div className={styles.contact}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✅</div>
          <h2>{t('thankYou')}</h2>
          <p>{t('messageSent')}</p>
          <Button 
            variant="primary" 
            onClick={() => setSubmitted(false)}
          >
            {t('sendAnotherMessage')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contact}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>{t('contactUs')}</h1>
          <p className={styles.heroSubtitle}>
            {t('contactDescription')}
          </p>
        </div>
      </section>

      <div className={styles.contactContent}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.contactFormSection}>
              <h2>{t('sendMessage')}</h2>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">{t('fullName')} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('enterYourName')}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">{t('email')} *</label>
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
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">{t('subject')} *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('selectSubject')}</option>
                    <option value="general">{t('generalInquiry')}</option>
                    <option value="product">{t('productQuestion')}</option>
                    <option value="order">{t('orderSupport')}</option>
                    <option value="artisan">{t('becomeArtisan')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">{t('message')} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder={t('enterYourMessage')}
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={loading}
                  disabled={loading}
                  className={styles.submitButton}
                >
                  {t('sendMessage')}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className={styles.contactInfoSection}>
              <h2>{t('getInTouch')}</h2>
              <p className={styles.contactIntro}>
                {t('contactIntro')}
              </p>

              <div className={styles.contactInfoList}>
                {contactInfo.map((info, index) => (
                  <div key={index} className={styles.contactInfoItem}>
                    <div className={styles.contactIcon}>{info.icon}</div>
                    <div className={styles.contactDetails}>
                      <h3>{info.title}</h3>
                      <p>{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className={styles.socialSection}>
                <h3>{t('followUs')}</h3>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>📘 Facebook</a>
                  <a href="#" className={styles.socialLink}>📷 Instagram</a>
                  <a href="#" className={styles.socialLink}>🐦 Twitter</a>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className={styles.faqSection}>
                <h3>{t('quickHelp')}</h3>
                <div className={styles.faqLinks}>
                  <a href="#" className={styles.faqLink}>
                    ❓ {t('shippingInfo')}
                  </a>
                  <a href="#" className={styles.faqLink}>
                    💰 {t('returnPolicy')}
                  </a>
                  <a href="#" className={styles.faqLink}>
                    🛡️ {t('warranty')}
                  </a>
                  <a href="#" className={styles.faqLink}>
                    🤝 {t('becomeArtisan')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <h2>{t('findUs')}</h2>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapContent}>
              🗺️ {t('mapPlaceholder')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;