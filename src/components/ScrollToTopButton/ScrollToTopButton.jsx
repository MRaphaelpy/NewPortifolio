import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TbArrowUp } from "react-icons/tb";
import { useScrolledPast } from "../../hooks/useScrolledPast";
import { motionTokens } from "../../styles/motion";
import styles from "./ScrollToTopButton.module.css";

export const ScrollToTopButton = () => {
  const { t } = useTranslation();
  const isVisible = useScrolledPast(300);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.fab}
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label={t("a11y.scrollToTop")}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={motionTokens.spatialFast}
        >
          <TbArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
