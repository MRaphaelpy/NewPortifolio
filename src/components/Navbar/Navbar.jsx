import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { TbLanguage, TbMenu2, TbMoon, TbSearch, TbSun, TbX } from "react-icons/tb";
import { site } from "../../config/site";
import { useTheme } from "../../context/ThemeContext";
import { navigationItems } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolledPast } from "../../hooks/useScrolledPast";
import { motionTokens } from "../../styles/motion";
import { cx } from "../../utils";
import { ScrollProgress } from "../ScrollProgress/ScrollProgress";
import styles from "./Navbar.module.css";

const sectionIds = navigationItems.map(({ id }) => id);
const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);

export const Navbar = ({ onOpenCommandPalette }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLanguageFlash, setShowLanguageFlash] = useState(false);
  const scrolled = useScrolledPast(20);
  const activeSection = useActiveSection(sectionIds);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const isPortuguese = i18n.resolvedLanguage === "pt";
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event) => {
      const clickedInside =
        menuRef.current?.contains(event.target) || menuButtonRef.current?.contains(event.target);
      if (!clickedInside) setMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleLanguageChange = () => {
    setShowLanguageFlash(true);
    i18n.changeLanguage(isPortuguese ? "en" : "pt");
  };

  const handleBlogClick = (event) => {
    event.preventDefault();
    toast(`🚧 ${t("alerts.underConstruction")}`, { duration: 1500 });
    closeMenu();
  };

  return (
    <nav className={cx(styles.navbar, scrolled && styles.scrolled)}>
      {showLanguageFlash && (
        <div
          className={styles.languageOverlay}
          onAnimationEnd={() => setShowLanguageFlash(false)}
        />
      )}

      <a className={styles.title} href="#top">
        {site.name}
      </a>

      <div className={styles.navigationContainer}>
        <button
          ref={menuButtonRef}
          className={styles.iconButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t("a11y.closeMenu") : t("a11y.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
        >
          {menuOpen ? <TbX aria-hidden="true" /> : <TbMenu2 aria-hidden="true" />}
        </button>

        <div ref={menuRef} id="main-menu" className={cx(styles.menu, menuOpen && styles.menuOpen)}>
          <ul className={styles.menuItems}>
            {navigationItems.map(({ id, labelKey }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  className={cx(activeSection === id && styles.activeLink)}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {activeSection === id && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className={styles.activeIndicator}
                      transition={motionTokens.spatialDefault}
                    />
                  )}
                  {t(labelKey)}
                </a>
              </li>
            ))}
            <li>
              <a href="#" onClick={handleBlogClick}>
                {t("navbar.blog")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.searchBtn}
          onClick={onOpenCommandPalette}
          aria-label={t("a11y.openCommandPalette")}
          aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        >
          <TbSearch aria-hidden="true" />
          <kbd className={styles.shortcut}>{isMac ? "⌘K" : "Ctrl K"}</kbd>
        </button>

        <button
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label={theme === "dark" ? t("a11y.switchToLight") : t("a11y.switchToDark")}
        >
          {theme === "dark" ? <TbSun aria-hidden="true" /> : <TbMoon aria-hidden="true" />}
        </button>

        <button
          className={styles.langBtn}
          onClick={handleLanguageChange}
          aria-label={t("a11y.switchLanguage")}
        >
          <TbLanguage aria-hidden="true" />
          <span>{isPortuguese ? "PT" : "EN"}</span>
        </button>
      </div>

      {scrolled && <ScrollProgress />}
    </nav>
  );
};
