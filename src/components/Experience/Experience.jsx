import { useTranslation } from "react-i18next";
import { experience } from "../../data/experience";
import { skills } from "../../data/skills";
import { STAGGER_DELAY } from "../../styles/motion";
import { getImageUrl } from "../../utils";
import { Reveal } from "../ui/Reveal/Reveal";
import { Section } from "../ui/Section/Section";
import styles from "./Experience.module.css";

const formatMonth = (yearMonth, language) =>
  new Intl.DateTimeFormat(language, { month: "short", year: "numeric" }).format(
    new Date(`${yearMonth}-01T00:00:00`),
  );

export const Experience = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === "pt" ? "pt-BR" : "en";

  return (
    <Section id="experience" title={t("experience.title")}>
      <ul className={styles.skills}>
        {skills.map(({ name, Icon }, index) => (
          <Reveal as="li" key={name} className={styles.skill} delay={index * (STAGGER_DELAY / 2)}>
            <Icon className={styles.skillIcon} aria-hidden="true" />
            <span>{name}</span>
          </Reveal>
        ))}
      </ul>

      <ul className={styles.history}>
        {experience.map(({ id, organisation, logo, start, end }, index) => (
          <Reveal as="li" key={id} className={styles.historyItem} delay={index * STAGGER_DELAY}>
            <div className={styles.historyItemHeader}>
              <img src={getImageUrl(logo)} alt="" width="56" height="56" loading="lazy" />
              <div className={styles.historyItemTitle}>
                <h3>{t(`experience.items.${id}.role`)}</h3>
                <p className={styles.organisation}>{organisation}</p>
                <p className={styles.dates}>
                  {formatMonth(start, language)} –{" "}
                  {end ? formatMonth(end, language) : t("experience.present")}
                </p>
              </div>
            </div>
            <ul className={styles.highlights}>
              {t(`experience.items.${id}.highlights`, { returnObjects: true }).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
};
