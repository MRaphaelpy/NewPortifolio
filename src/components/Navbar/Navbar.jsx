import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TranslateIcon from "@mui/icons-material/Translate";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../context/ThemeContext";
import toast, { Toaster } from "react-hot-toast";

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLanguageFlash, setShowLanguageFlash] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (
        !e.target.closest(`.${styles.menu}`) &&
        !e.target.closest(`.${styles.menuBtn}`)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLanguage);
  };

  const handleLanguageChange = () => {
    setTimeout(toggleLanguage, 260);

    setShowLanguageFlash(true);

    setTimeout(() => {
      setShowLanguageFlash(false);
    }, 800);
  };

  const handleBlogClick = () => {
    toast("🚧 " + t("alerts.criacao"), {
      duration: 1500,
      icon: "ℹ️",
    });

    setMenuOpen(false);
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        {showLanguageFlash && (
          <div className={styles.languageOverlay}></div>
        )}

        <a className={styles.title} href="/">
          Marcos Raphael
        </a>

        <div className={styles.navigationContainer}>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <CloseIcon fontSize="medium" />
            ) : (
              <MenuIcon fontSize="medium" />
            )}
          </button>

          <div
            className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""
              }`}
          >
            <ul className={styles.menuItems}>
              <li>
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("navbar.about")}
                </a>
              </li>

              <li>
                <a
                  href="#experience"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("navbar.experience")}
                </a>
              </li>

              <li>
                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("navbar.projects")}
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("navbar.contact")}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBlogClick();
                  }}
                >
                  {t("Blog")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"
              } mode`}
          >
            {theme === "dark" ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </button>

          <button
            className={`${styles.langBtn} ${styles.active}`}
            onClick={handleLanguageChange}
            aria-label={`Change language to ${i18n.language === "pt" ? "English" : "Portuguese"
              }`}
          >
            <TranslateIcon
              fontSize="small"
              className={styles.langIcon}
            />
            <span>{i18n.language === "pt" ? "PT" : "EN"}</span>
          </button>
        </div>
      </nav>
    </>
  );
};