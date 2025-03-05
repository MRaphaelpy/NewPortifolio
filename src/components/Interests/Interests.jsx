import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Interests.module.css";
import { getImageUrl } from "../../utils";

export const Interests = () => {
  const { t } = useTranslation();
  const interests = t('interests.items', { returnObjects: true }) || [];

  return (
    <section className={styles.container} id="interests">
      <h2 className={styles.title}>{t('interests.title')}</h2>
      <div className={styles.interests}>
        {interests.map((interest, id) => (
          <div key={id} className={styles.interest}>
            <img src={getImageUrl(interest.imageSrc)} alt={interest.title} className={styles.interestImage} />
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};