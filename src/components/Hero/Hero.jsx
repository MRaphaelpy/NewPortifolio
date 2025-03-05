import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('hero.title')}</h1>
        <p className={styles.description}>
          {t('hero.description')}
        </p>
        <div className={styles.buttons}>
          <a href="https://drive.google.com/file/d/1acuU2e1nhxiGa1zjTt7bhQcmWim8S8oQ/view?usp=sharing" className={styles.resumeBtn} target="_blank" rel="noopener noreferrer">
            {t('hero.resumeBtn')}
          </a>
          <a href="mailto:mraphael.py@gmail.com" className={styles.contactBtn}>
            {t('hero.contactBtn')}
          </a>
        </div>
      </div>
      <div className={styles.overlay} />
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt=""
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};