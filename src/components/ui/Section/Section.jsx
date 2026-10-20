import { cx } from "../../../utils";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Section.module.css";

export const Section = ({ id, title, description, className, children }) => (
  <section id={id} className={cx(styles.section, className)} aria-labelledby={`${id}-title`}>
    <Reveal className={styles.header}>
      <h2 id={`${id}-title`} className={styles.title}>
        {title}
      </h2>
      <span className={styles.accent} aria-hidden="true" />
      {description && <p className={styles.description}>{description}</p>}
    </Reveal>
    {children}
  </section>
);
