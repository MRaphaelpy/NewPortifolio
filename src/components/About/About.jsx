import { useTranslation } from "react-i18next";
import { aboutItems } from "../../data/about";
import { STAGGER_DELAY } from "../../styles/motion";
import { getImageUrl } from "../../utils";
import { ExpressiveShape } from "../ui/ExpressiveShape/ExpressiveShape";
import { Reveal } from "../ui/Reveal/Reveal";
import { Section } from "../ui/Section/Section";
import styles from "./About.module.css";

export const About = () => {
  const { t } = useTranslation();

  return (
    <Section id="about" title={t("about.title")}>
      <div className={styles.content}>
        <Reveal className={styles.imageContainer}>
          <img
            src={getImageUrl("about/aboutImage.webp")}
            alt={t("about.imageAlt")}
            className={styles.aboutImage}
            width="500"
            height="500"
            loading="lazy"
          />
        </Reveal>

        <ul className={styles.aboutItems}>
          {aboutItems.map(({ id, Icon }, index) => (
            <Reveal as="li" key={id} className={styles.aboutItem} delay={index * STAGGER_DELAY}>
              <div className={styles.iconContainer}>
                <ExpressiveShape variant="cookie6" className={styles.iconShape} />
                <Icon className={styles.icon} aria-hidden="true" />
              </div>
              <div className={styles.aboutItemText}>
                <h3>{t(`about.items.${id}.title`)}</h3>
                <p>{t(`about.items.${id}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
};
