import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <p>{t('footer.title')}</p>
            <p>{t('footer.description')}</p>
        </footer>
    );
};