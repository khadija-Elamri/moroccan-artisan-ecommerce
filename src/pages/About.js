import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import styles from './About.module.css';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: '🎨',
      title: t('authenticCraftsmanship'),
      description: t('authenticCraftsmanshipDesc')
    },
    {
      icon: '🤝',
      title: t('fairTrade'),
      description: t('fairTradeDesc')
    },
    {
      icon: '🌱',
      title: t('sustainable'),
      description: t('sustainableDesc')
    },
    {
      icon: '👨‍🎨',
      title: t('supportArtisans'),
      description: t('supportArtisansDesc')
    }
  ];

  const stats = [
    { number: '500+', label: t('artisansSupported') },
    { number: '10,000+', label: t('productsSold') },
    { number: '50+', label: t('citiesServed') },
    { number: '98%', label: t('satisfiedCustomers') }
  ];

  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>{t('aboutUs')}</h1>
          <p className={styles.heroSubtitle}>
            {t('aboutHeroDescription')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.container}>
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <h2>{t('ourMission')}</h2>
              <p>{t('missionDescription')}</p>
              <p>{t('missionDescription2')}</p>
              <div className={styles.missionActions}>
                <Button variant="primary" size="large">
                  {t('meetOurArtisans')}
                </Button>
                <Button variant="outline" size="large">
                  {t('learnOurStory')}
                </Button>
              </div>
            </div>
            <div className={styles.missionImage}>
              <div className={styles.placeholderImage}>🪷✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2>{t('ourValues')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('valuesDescription')}
          </p>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyContent}>
            <div className={styles.storyImage}>
              <div className={styles.placeholderImage}>🏺🎨</div>
            </div>
            <div className={styles.storyText}>
              <h2>{t('ourStory')}</h2>
              <p>{t('storyDescription')}</p>
              <p>{t('storyDescription2')}</p>
              <ul className={styles.storyList}>
                <li>✅ {t('storyPoint1')}</li>
                <li>✅ {t('storyPoint2')}</li>
                <li>✅ {t('storyPoint3')}</li>
                <li>✅ {t('storyPoint4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <div className={styles.container}>
          <h2>{t('meetTheTeam')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('teamDescription')}
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>Z</div>
              <h3>Zainab Oussaraf</h3>
              <p className={styles.memberRole}>{t('coFounder')}</p>
              <p>{t('zainabDescription')}</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>K</div>
              <h3>Khadija El Amri</h3>
              <p className={styles.memberRole}>{t('coFounder')}</p>
              <p>{t('khadijaDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>{t('joinOurJourney')}</h2>
            <p>{t('ctaDescription')}</p>
            <div className={styles.ctaActions}>
              <Button variant="primary" size="large">
                {t('shopNow')}
              </Button>
              <Button variant="outline" size="large">
                {t('contactUs')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;