import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`${styles.container} ${isLoaded ? styles.loaded : ""}`}
      ref={containerRef}
    >
      <div className={styles.content}>
        <span className={styles.badge}>
          {t("hero.title")}
        </span>

        <h1 className={styles.title}>
          {t("hero.title")}
        </h1>

        <p className={styles.description}>
          {t("hero.description")}
        </p>

        <div className={styles.buttons}>
          <a
            href="https://drive.google.com/file/d/1acuU2e1nhxiGa1zjTt7bhQcmWim8S8oQ/view?usp=sharing"
            className={styles.resumeBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>{t("hero.resumeBtn")}</span>
          </a>

          <a
            href="mailto:mraphael.py@gmail.com"
            className={styles.contactBtn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>{t("hero.contactBtn")}</span>
          </a>
        </div>
      </div>

      <div className={styles.heroImgContainer}>
        <img
          src={getImageUrl("hero/heroImage.png")}
          alt={t("hero.imageAlt")}
          className={styles.heroImg}
          loading="eager"
        />
      </div>
    </section>
  );
};