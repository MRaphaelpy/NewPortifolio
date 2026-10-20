import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbArrowRight, TbCheck } from "react-icons/tb";
import { site } from "../../config/site";
import { projects } from "../../data/projects";
import { motionTokens } from "../../styles/motion";
import { cx } from "../../utils";
import { Button } from "../ui/Button/Button";
import { Reveal } from "../ui/Reveal/Reveal";
import { Section } from "../ui/Section/Section";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

// Tecnologias na ordem em que aparecem, sem repetir.
const allSkills = [...new Set(projects.flatMap((project) => project.skills))];

export const Projects = () => {
  const { t } = useTranslation();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const visibleProjects = selectedSkill
    ? projects.filter((project) => project.skills.includes(selectedSkill))
    : projects;

  const filters = [{ value: null, label: t("projects.filterAll") }].concat(
    allSkills.map((skill) => ({ value: skill, label: skill })),
  );

  return (
    <Section id="projects" title={t("projects.title")}>
      <Reveal>
        <div className={styles.filters} role="group" aria-label={t("projects.filterLabel")}>
          {filters.map(({ value, label }) => {
            const selected = selectedSkill === value;
            return (
              <button
                key={label}
                type="button"
                className={cx(styles.chip, selected && styles.chipSelected)}
                aria-pressed={selected}
                onClick={() => setSelectedSkill(value)}
              >
                {selected && <TbCheck className={styles.chipIcon} aria-hidden="true" />}
                {label}
              </button>
            );
          })}
        </div>

        <motion.ul className={styles.projects} layout transition={motionTokens.spatialDefault}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={motionTokens.spatialDefault}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Reveal>

      <Reveal className={styles.buttonContainer}>
        <Button href={site.githubReposUrl} external variant="tonal" icon={TbArrowRight}>
          {t("projects.viewMore")}
        </Button>
      </Reveal>
    </Section>
  );
};
