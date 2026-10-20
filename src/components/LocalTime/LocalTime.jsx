import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbMapPin } from "react-icons/tb";
import { site } from "../../config/site";
import styles from "./LocalTime.module.css";

export const LocalTime = () => {
  const { t, i18n } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  const time = new Intl.DateTimeFormat(i18n.resolvedLanguage === "pt" ? "pt-BR" : "en", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: site.timeZone,
  }).format(now);

  return (
    <p className={styles.localTime}>
      <TbMapPin aria-hidden="true" />
      <span>{site.location}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={now.toISOString()}>{t("contact.localTime", { time })}</time>
    </p>
  );
};
