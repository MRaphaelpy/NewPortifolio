import { useTranslation } from "react-i18next";
import { TbArrowUpRight, TbCopy } from "react-icons/tb";
import { contacts } from "../../data/contacts";
import { useCopyEmail } from "../../hooks/useCopyEmail";
import { STAGGER_DELAY } from "../../styles/motion";
import { LocalTime } from "../LocalTime/LocalTime";
import { ExpressiveShape } from "../ui/ExpressiveShape/ExpressiveShape";
import { Reveal } from "../ui/Reveal/Reveal";
import styles from "./Contact.module.css";

export const Contact = () => {
  const { t } = useTranslation();
  const copyEmail = useCopyEmail();

  return (
    <section id="contact" className={styles.container} aria-labelledby="contact-title">
      <div className={styles.contentWrapper}>
        <Reveal className={styles.text}>
          <h2 id="contact-title">{t("contact.title")}</h2>
          <p>{t("contact.description")}</p>
          <LocalTime />
        </Reveal>

        <ul className={styles.links}>
          {contacts.map(({ id, Icon, href, text, external }, index) => (
            <Reveal as="li" key={id} className={styles.linkRow} delay={index * STAGGER_DELAY}>
              <a
                href={href}
                className={styles.link}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className={styles.iconWrapper}>
                  <ExpressiveShape variant="cookie4" className={styles.iconShape} />
                  <Icon className={styles.icon} aria-hidden="true" />
                </span>
                <span className={styles.linkContent}>
                  <span className={styles.linkLabel}>{t(`contact.links.${id}`)}</span>
                  <span className={styles.linkText}>{text}</span>
                </span>
                <TbArrowUpRight className={styles.linkArrow} aria-hidden="true" />
              </a>
              {id === "email" && (
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={copyEmail}
                  aria-label={t("a11y.copyEmail")}
                  title={t("a11y.copyEmail")}
                >
                  <TbCopy aria-hidden="true" />
                </button>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
