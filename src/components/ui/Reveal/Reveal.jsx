import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "../../../styles/motion";

// Único jeito de animar a entrada de elementos na tela no site inteiro.
export const Reveal = ({ as = "div", delay = 0, offset = 24, className, children }) => {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        y: { ...motionTokens.spatialDefault, delay },
        opacity: { ...motionTokens.effectsDefault, delay },
      }}
    >
      {children}
    </Component>
  );
};
