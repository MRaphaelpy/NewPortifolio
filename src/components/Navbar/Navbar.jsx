import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={props.ref} variant="filled" {...props} />;
});

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLanguageFlash, setShowLanguageFlash] = useState(false);

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
    <nav className={styles.navbar}>
      {showLanguageFlash && <div className={styles.languageOverlay}></div>}
      <a className={styles.title} href="/">
        Marcos Raphael
      </a>
      <div className={styles.menu}>
        {/* <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button> */}
        <ul className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`} onClick={() => setMenuOpen(false)}>
          <li>
            <a href="#about">{t("navbar.about")}</a>
          </li>
          <li>
            <a href="#experience">{t("navbar.experience")}</a>
          </li>
          <li>
            <a href="#projects">{t("navbar.projects")}</a>
          </li>
          <li>
            <a href="#contact">{t("navbar.contact")}</a>
          </li>
          <li>
            <a href="#" onClick={handleClick}>
              {t("Blog")}
            </a>
          </li>
          <li>
            <button className={`${styles.langBtn} ${styles.active}`} onClick={handleLanguageChange}>
              {i18n.language === "pt" ? "PT" : "EN"}
            </button>
          </li>
        </ul>
      </div>
      <Snackbar open={open} autoHideDuration={1200} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <div style={{ width: "100%" }}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            {t("alerts.criacao")}
          </Alert>
          <LinearProgress />
        </div>
      </Snackbar>
    </nav>
  );
};