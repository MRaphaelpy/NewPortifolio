import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

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
        setTimeout(() => textRef.current.classList.add(styles.visible), 300);
      }

      if (linksRef.current) {
        setTimeout(() => linksRef.current.classList.add(styles.visible), 600);
      }

      linkRefs.current.forEach((link, index) => {
        setTimeout(() => {
          if (link) link.classList.add(styles.linkVisible);
        }, 800 + index * 200);
      });
    }
  }, [isVisible]);

  const addToLinkRefs = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  const handleLinkHover = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const targetElement = e.currentTarget;

    if (targetElement) {
      targetElement.style.setProperty('--x', `${x}px`);
      targetElement.style.setProperty('--y', `${y}px`);
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

    return () => {
      clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <footer id="contact" className={styles.container} ref={containerRef}>
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.particles}></div>
        <div className={styles.gridOverlay}></div>
      </div>

      <div className={`${styles.text} ${isVisible ? styles.visible : ''}`} ref={textRef}>
        <h2>
          <span className={styles.highlightBefore}></span>
          {t("contact.title")}
          <span className={styles.highlightAfter}></span>
        </h2>
        <p>{t("contact.description")}</p>
        <div className={styles.textAccent}></div>
      </div>

      <ul className={`${styles.links} ${isVisible ? styles.visible : ''}`} ref={linksRef}>
        <li
          className={`${styles.link} ${isVisible ? styles.linkVisible : ''}`}
          ref={addToLinkRefs}
          onMouseMove={handleLinkHover}
        >
          <div className={styles.iconWrapper}>
            <img
              src={getImageUrl("contact/emailIcon.png")}
              alt="Email icon"
              className={styles.icon}
            />
            <div className={styles.iconGlow}></div>
          </div>
          <div className={styles.linkContent}>
            <span className={styles.linkLabel}>{t("Email")}</span>
            <a
              href={`mailto:${t("contact.email")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkText}
            >
              {t("contact.email")}
            </a>
          </div>
          <span className={styles.linkArrow}>→</span>
          <div className={styles.linkHoverEffect}></div>
        </li>

        <li
          className={`${styles.link} ${isVisible ? styles.linkVisible : ''}`}
          ref={addToLinkRefs}
          onMouseMove={handleLinkHover}
        >
          <div className={styles.iconWrapper}>
            <img
              src={getImageUrl("contact/linkedinIcon.png")}
              alt="LinkedIn icon"
              className={styles.icon}
            />
            <div className={styles.iconGlow}></div>
          </div>
          <div className={styles.linkContent}>
            <span className={styles.linkLabel}>{t("Linkedin")}</span>
            <a
              href="https://www.linkedin.com/in/mraphaelpy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkText}
            >
              {t("contact.linkedin")}
            </a>
          </div>
          <span className={styles.linkArrow}>→</span>
          <div className={styles.linkHoverEffect}></div>
        </li>

        <li
          className={`${styles.link} ${isVisible ? styles.linkVisible : ''}`}
          ref={addToLinkRefs}
          onMouseMove={handleLinkHover}
        >
          <div className={styles.iconWrapper}>
            <img
              src={getImageUrl("contact/githubIcon.png")}
              alt="Github icon"
              className={styles.icon}
            />
            <div className={styles.iconGlow}></div>
          </div>
          <div className={styles.linkContent}>
            <span className={styles.linkLabel}>{t("Github")}</span>
            <a
              href="https://github.com/MRaphaelpy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkText}
            >
              {t("contact.github")}
            </a>
          </div>
          <span className={styles.linkArrow}>→</span>
          <div className={styles.linkHoverEffect}></div>
        </li>
      </ul>

      <div className={styles.footerAccent}></div>
    </footer>
  );
};