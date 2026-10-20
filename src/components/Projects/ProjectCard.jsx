import { useTranslation } from "react-i18next";
import { TbBrandGithub, TbExternalLink } from "react-icons/tb";
import { getImageUrl } from "../../utils";
import { Button } from "../ui/Button/Button";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project: { id, title, image, skills, demoUrl, sourceUrl } }) => {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          src={getImageUrl(image)}
          alt={t("projects.imageAlt", { title })}
          width="640"
          height="360"
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{t(`projects.items.${id}`)}</p>
        <ul className={styles.skills}>
          {skills.map((skill) => (
            <li key={skill} className={styles.skill}>
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.actions}>
        {demoUrl && (
          <Button href={demoUrl} external icon={TbExternalLink}>
            {t("projects.demo")}
          </Button>
        )}
        {sourceUrl && (
          <Button href={sourceUrl} external variant="outlined" icon={TbBrandGithub}>
            {t("projects.source")}
          </Button>
        )}
      </div>
    </article>
  );
};
