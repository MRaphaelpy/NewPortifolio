import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current.classList.add(styles.visible);
        }
      },
      { threshold: 0.2 }
    );

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(styles.itemVisible);
            }, index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    itemsRef.current.forEach((item) => {
      if (item) {
        itemObserver.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
      itemsRef.current.forEach((item) => {
        if (item) itemObserver.unobserve(item);
      });
    };
  }, []);

  itemsRef.current = [];

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section className={styles.container} id="about" ref={sectionRef}>
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.headingWrapper} ref={addToRefs}>
        <h2 className={styles.title}>{t('about.title')}</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.imageContainer} ref={addToRefs}>
          <div className={styles.imageFrame}>
            <div className={styles.imageBorder}></div>
            <img
              src={getImageUrl("about/aboutImage.png")}
              alt="Me sitting with a laptop"
              className={styles.aboutImage}
            />
          </div>
          <div className={styles.imageGlow}></div>
        </div>

        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem} ref={addToRefs}>
            <div className={styles.iconContainer}>
              <img
                src={getImageUrl("about/cursorIcon.png")}
                alt="Cursor icon"
                className={styles.icon}
              />
              <div className={styles.iconGlow}></div>
            </div>
            <div className={styles.aboutItemText}>
              <h3>{t('about.frontendTitle')}</h3>
              <p>{t('about.frontendDescription')}</p>
            </div>
            <div className={styles.itemHighlight}></div>
          </li>

          <li className={styles.aboutItem} ref={addToRefs}>
            <div className={styles.iconContainer}>
              <img
                src={getImageUrl("about/serverIcon.png")}
                alt="Server icon"
                className={styles.icon}
              />
              <div className={styles.iconGlow}></div>
            </div>
            <div className={styles.aboutItemText}>
              <h3>{t('about.backendTitle')}</h3>
              <p>{t('about.backendDescription')}</p>
            </div>
            <div className={styles.itemHighlight}></div>
          </li>

          <li className={styles.aboutItem} ref={addToRefs}>
            <div className={styles.iconContainer}>
              <img
                src={getImageUrl("about/cursorIcon.png")}
                alt="UI icon"
                className={styles.icon}
              />
              <div className={styles.iconGlow}></div>
            </div>
            <div className={styles.aboutItemText}>
              <h3>{t('about.uiTitle')}</h3>
              <p>{t('about.uiDescription')}</p>
            </div>
            <div className={styles.itemHighlight}></div>
          </li>
        </ul>
      </div>
    </section>
  );
};