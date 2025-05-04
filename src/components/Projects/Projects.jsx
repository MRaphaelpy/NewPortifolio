import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const { t } = useTranslation();
  const projects = t('projects', { returnObjects: true }) || [];

  const viewMore = () => {
    window.open("https://github.com/mraphaelpy?tab=repositories", "_blank", "noopener,noreferrer");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  return (
    <section className={styles.container} id="projects">
      <div className={styles.background}>
        <div className={styles.glow}></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={styles.headerContainer}
      >
        <h2 className={styles.title}>{t('project.title')}</h2>
        <div className={styles.titleBar}></div>
       
      </motion.div>
      
      <motion.div 
        className={styles.projects}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, id) => (
          <motion.div key={id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className={styles.buttonContainer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <button 
          className={styles.viewMoreButton} 
          onClick={viewMore}
          aria-label={t('project.viewMoreAriaLabel')}
        >
          <span>{t('project.viewMore')}</span>
          <div className={styles.buttonIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </motion.div>
    </section>
  );
};