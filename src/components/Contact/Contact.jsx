import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>{t("contact.title")}</h2>
        <p>{t("contact.description")}</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a href={`mailto:${t("contact.email")}`} target="_blank" rel="noopener noreferrer">
            {t("contact.email")}
          </a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
          <a href="https://www.linkedin.com/in/mraphaelpy" target="_blank" rel="noopener noreferrer">
            {t("contact.linkedin")}
          </a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/MRaphaelpy" target="_blank" rel="noopener noreferrer">
            {t("contact.github")}
          </a>
        </li>
      </ul>
    </footer>
  );
};
