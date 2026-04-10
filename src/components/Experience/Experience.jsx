import React from "react";
import { useTranslation } from "react-i18next";
import { TbBrandReact, TbBrandNodejs, TbBrandFlutter, TbBrandPython, TbBrandKotlin, TbBrandPhp, TbBrandMongodb } from "react-icons/tb";
import { LiaJava } from "react-icons/lia";
import styles from "./Experience.module.css";
import { getImageUrl } from "../../utils";

const iconMap = {
  "React": <TbBrandReact size={30} strokeWidth={1.5} />,
  "Node": <TbBrandNodejs size={30} strokeWidth={1.5} />,
  "Flutter/Dart": <TbBrandFlutter size={30} strokeWidth={1.5} />,
  "Java": <LiaJava size={30} />,
  "Python": <TbBrandPython size={30} strokeWidth={1.5} />,
  "Kotlin": <TbBrandKotlin size={30} strokeWidth={1.5} />,
  "PHP": <TbBrandPhp size={30} strokeWidth={1.5} />,
  "MongoDB": <TbBrandMongodb size={30} strokeWidth={1.5} />
};

export const Experience = () => {
  const { t } = useTranslation();

  const skills = t("experience.skills", { returnObjects: true }) || [];
  const history = t("experience.history", { returnObjects: true }) || [];

  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>{t("experience.title")}</h2>
      <div className={styles.content}>
        
        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <div key={id} className={styles.skill}>
              <div className={styles.skillImageContainer}>
                {iconMap[skill.title] || <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />}
              </div>
              <p>{skill.title}</p>
            </div>
          ))}
        </div>

        <ul className={styles.history}>
          {history.map((historyItem, id) => (
            <li key={id} className={styles.historyItem}>
              <div className={styles.historyItemHeader}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} Logo`}
                />
                <div className={styles.historyItemTitle}>
                  <h3>{historyItem.role}</h3>
                  <h4>{historyItem.organisation}</h4>
                  <p className={styles.dates}>{historyItem.startDate} - {historyItem.endDate}</p>
                </div>
              </div>
              <div className={styles.historyItemDivider} />
              <ul className={styles.historyItemBullets}>
                {historyItem.experiences.map((experience, id) => (
                  <li key={id}>
                    <span className={styles.bulletIcon}></span>
                    {experience}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

