import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TbFileText, TbMail } from "react-icons/tb";
import { site } from "../../config/site";
import { motionTokens, STAGGER_DELAY } from "../../styles/motion";
import { getImageUrl } from "../../utils";
import { Button } from "../ui/Button/Button";
import { ExpressiveShape } from "../ui/ExpressiveShape/ExpressiveShape";
import styles from "./Hero.module.css";

export const Hero = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // O hero aparece no carregamento, então anima com "animate" em vez de
  // esperar entrar na viewport como o <Reveal>.
  const enter = (step) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: {
      y: { ...motionTokens.spatialDefault, delay: step * STAGGER_DELAY },
      opacity: { ...motionTokens.effectsDefault, delay: step * STAGGER_DELAY },
    },
  });

  return (
    <header id="top" className={styles.container}>
      <div className={styles.content}>
        <motion.span className={styles.badge} {...enter(0)}>
          {t("hero.badge")}
        </motion.span>

        <motion.h1 className={styles.title} {...enter(1)}>
          {t("hero.greeting")} <span className={styles.name}>{site.firstName}</span> :)
        </motion.h1>

        <motion.p className={styles.description} {...enter(2)}>
          {t("hero.description")}
        </motion.p>

        <motion.div className={styles.buttons} {...enter(3)}>
          <Button href={site.resumeUrl} external icon={TbFileText}>
            {t("hero.resumeBtn")}
          </Button>
          <Button href={`mailto:${site.email}`} variant="outlined" icon={TbMail}>
            {t("hero.contactBtn")}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className={styles.visual}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          default: { ...motionTokens.spatialSlow, delay: 0.1 },
          opacity: motionTokens.effectsDefault,
        }}
      >
        <ExpressiveShape className={styles.shape} />
        <ExpressiveShape variant="cookie4" className={styles.shapeAccent} />
        <img
          src={getImageUrl("hero/heroImage.webp")}
          alt={t("hero.imageAlt")}
          className={styles.heroImg}
          width="960"
          height="960"
          fetchPriority="high"
        />
      </motion.div>
    </header>
  );
};
