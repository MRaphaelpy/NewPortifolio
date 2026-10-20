import { useTranslation } from "react-i18next";
import { site } from "../../config/site";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <p>{t("footer.copyright", { name: site.name, year: new Date().getFullYear() })}</p>
      <p>{t("footer.builtWith")}</p>
    </footer>
  );
};
