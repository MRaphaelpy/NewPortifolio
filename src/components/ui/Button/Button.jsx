import { useTranslation } from "react-i18next";
import { cx } from "../../../utils";
import styles from "./Button.module.css";

// Botão M3: renderiza <a> quando recebe href e <button> caso contrário.
export const Button = ({
  variant = "filled",
  href,
  external = false,
  icon: Icon,
  className,
  children,
  ...props
}) => {
  const { t } = useTranslation();
  const classes = cx(styles.button, styles[variant], className);
  const content = (
    <>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      <span>{children}</span>
      {external && <span className={styles.srOnly}> ({t("a11y.newTab")})</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
};
