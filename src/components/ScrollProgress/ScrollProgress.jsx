import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { motionTokens } from "../../styles/motion";
import styles from "./ScrollProgress.module.css";

// Indicador de progresso "wavy" do M3 Expressive: a parte já lida é uma
// onda animada, o restante é uma trilha reta.
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, motionTokens.spatialFast);
  const waveClip = useTransform(progress, (value) => `inset(0 ${100 - value * 100}% 0 0)`);
  const trackClip = useTransform(progress, (value) => `inset(0 0 0 calc(${value * 100}% + 6px))`);

  return (
    <div className={styles.container} aria-hidden="true">
      <motion.div className={styles.track} style={{ clipPath: trackClip }} />
      <motion.div className={styles.wave} style={{ clipPath: waveClip }} />
    </div>
  );
};
