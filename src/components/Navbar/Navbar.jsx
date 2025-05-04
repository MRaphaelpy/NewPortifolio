import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TranslateIcon from "@mui/icons-material/Translate";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLanguageFlash, setShowLanguageFlash] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);


  useEffect(() => {
    if (!menuOpen) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.menu}`) && !e.target.closest(`.${styles.menuBtn}`)) {
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleLanguageChange = () => {
    setTimeout(toggleLanguage, 260);
    setShowLanguageFlash(true);
    setTimeout(() => {
      setShowLanguageFlash(false);
    }, 800);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      {showLanguageFlash && <div className={styles.languageOverlay}></div>}
      <a className={styles.title} href="/">
        Marcos Raphael
      </a>
      
      <div className={styles.navigationContainer}>
        <button 
          className={styles.menuBtn} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
        </button> 
       
        <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
          <ul className={styles.menuItems}>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>{t("navbar.about")}</a>
            </li>
            <li>
              <a href="#experience" onClick={() => setMenuOpen(false)}>{t("navbar.experience")}</a>
            </li>
            <li>
              <a href="#projects" onClick={() => setMenuOpen(false)}>{t("navbar.projects")}</a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t("navbar.contact")}</a>
            </li>
            <li>
              <a href="#" onClick={(e) => {e.preventDefault(); handleClick(); setMenuOpen(false);}}>
                {t("Blog")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <button 
        className={`${styles.langBtn} ${styles.active}`} 
        onClick={handleLanguageChange}
        aria-label={`Change language to ${i18n.language === "pt" ? "English" : "Portuguese"}`}
      >
        <TranslateIcon fontSize="small" className={styles.langIcon} />
        <span>{i18n.language === "pt" ? "PT" : "EN"}</span>
      </button>
      
      <Snackbar
        open={open}
        autoHideDuration={1200}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div className={styles.snackbarContent}>
          <Alert onClose={handleClose} severity="info">
            {t("alerts.criacao")}
          </Alert>
          <LinearProgress className={styles.progressBar} />
        </div>
      </Snackbar>
    </nav>
  );
};