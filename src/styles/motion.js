// Springs do M3 Expressive (motion scheme "expressive") para o framer-motion.
// O M3 define springs por damping ratio; aqui convertemos para o damping
// absoluto que o framer espera: damping = 2 * ratio * sqrt(stiffness).
const spring = (stiffness, dampingRatio) => ({
  type: "spring",
  stiffness,
  damping: 2 * dampingRatio * Math.sqrt(stiffness),
});

export const motionTokens = {
  spatialFast: spring(800, 0.6),
  spatialDefault: spring(380, 0.8),
  spatialSlow: spring(200, 0.8),
  effectsDefault: { type: "tween", duration: 0.3, ease: [0.2, 0, 0, 1] },
};

export const STAGGER_DELAY = 0.08;
