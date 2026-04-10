import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbMail, TbBrandLinkedin, TbBrandGithub } from "react-icons/tb";
import styles from "./Contact.module.css";

export const Contact = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef(null);
  const linkRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    linkRefs.current = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const timer = setTimeout(() => {
      if (containerRef.current && !isVisible) {
        setIsVisible(true);
      }
    }, 2000);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      clearTimeout(timer);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      if (containerRef.current) containerRef.current.classList.add(styles.visible);
      if (textRef.current) {
        setTimeout(() => textRef.current.classList.add(styles.visible), 200);
      }
      if (linksRef.current) {
        setTimeout(() => linksRef.current.classList.add(styles.visible), 400);
      }
      linkRefs.current.forEach((link, index) => {
        setTimeout(() => {
          if (link) link.classList.add(styles.linkVisible);
        }, 500 + index * 100);
      });
    }
  }, [isVisible]);

  const addToLinkRefs = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  useEffect(() => {
    const forceVisible = () => {
      if (containerRef.current) containerRef.current.classList.add(styles.visible);
      if (textRef.current) textRef.current.classList.add(styles.visible);
      if (linksRef.current) linksRef.current.classList.add(styles.visible);
      linkRefs.current.forEach((link) => {
        if (link) link.classList.add(styles.linkVisible);
      });
    };
    const visibilityTimer = setTimeout(forceVisible, 1000);
    return () => clearTimeout(visibilityTimer);
  }, []);

  return (
    <footer id="contact" className={styles.container} ref={containerRef}>
      <div className={styles.contentWrapper}>
        <div className={`${styles.text} ${isVisible ? styles.visible : ""}`} ref={textRef}>
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.description")}</p>
        </div>

        <ul className={`${styles.links} ${isVisible ? styles.visible : ""}`} ref={linksRef}>
          <li
            className={`${styles.link} ${isVisible ? styles.linkVisible : ""}`}
            ref={addToLinkRefs}
            onClick={() => window.location.href = `mailto:${t("contact.email")}`}
          >
            <div className={styles.iconWrapper}>
              <TbMail size={24} strokeWidth={1.5} className={styles.iconSvg} />
            </div>
            <div className={styles.linkContent}>
              <span className={styles.linkLabel}>{t("Email")}</span>
              <span className={styles.linkText}>
                {t("contact.email")}
              </span>
            </div>
            <span className={styles.linkArrow}>→</span>
          </li>

          <li
            className={`${styles.link} ${isVisible ? styles.linkVisible : ""}`}
            ref={addToLinkRefs}
            onClick={() => window.open("https://www.linkedin.com/in/mraphaelpy", "_blank", "noopener,noreferrer")}
          >
            <div className={styles.iconWrapper}>
              <TbBrandLinkedin size={24} strokeWidth={1.5} className={styles.iconSvg} />
            </div>
            <div className={styles.linkContent}>
              <span className={styles.linkLabel}>{t("Linkedin")}</span>
              <span className={styles.linkText}>
                {t("contact.linkedin")}
              </span>
            </div>
            <span className={styles.linkArrow}>→</span>
          </li>

          <li
            className={`${styles.link} ${isVisible ? styles.linkVisible : ""}`}
            ref={addToLinkRefs}
            onClick={() => window.open("https://github.com/MRaphaelpy", "_blank", "noopener,noreferrer")}
          >
            <div className={styles.iconWrapper}>
              <TbBrandGithub size={24} strokeWidth={1.5} className={styles.iconSvg} />
            </div>
            <div className={styles.linkContent}>
              <span className={styles.linkLabel}>{t("Github")}</span>
              <span className={styles.linkText}>
                {t("contact.github")}
              </span>
            </div>
            <span className={styles.linkArrow}>→</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};