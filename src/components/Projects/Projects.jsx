import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Projects.module.css";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const { t } = useTranslation();
  const projects = t('projects', { returnObjects: true }) || [];

  const viewMore = () => {
    window.location.href = "https://github.com/mraphaelpy?tab=repositories";
  };

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>{t('project.title')}</h2>
      <div className={styles.projects}>
        {projects.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.viewMoreButton} onClick={viewMore}>{t('project.viewMore') + "  ››"}</button>
      </div>
    </section>
  );
};