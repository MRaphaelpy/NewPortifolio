// Formas "cookie" da biblioteca de shapes do M3 Expressive, desenhadas
// como um círculo ondulado: r(θ) = R · (1 − depth · (1 − cos(lobes · θ)) / 2).
const POINTS = 180;

const buildCookiePath = (lobes, depth) => {
  const commands = [];
  for (let index = 0; index < POINTS; index++) {
    const angle = (index / POINTS) * Math.PI * 2;
    const radius = 50 * (1 - (depth * (1 - Math.cos(lobes * angle))) / 2);
    const x = (50 + radius * Math.cos(angle)).toFixed(2);
    const y = (50 + radius * Math.sin(angle)).toFixed(2);
    commands.push(`${index === 0 ? "M" : "L"}${x} ${y}`);
  }
  return `${commands.join(" ")} Z`;
};

const paths = {
  cookie9: buildCookiePath(9, 0.12),
  cookie6: buildCookiePath(6, 0.14),
  cookie4: buildCookiePath(4, 0.18),
};

export const ExpressiveShape = ({ variant = "cookie9", className }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <path d={paths[variant]} fill="currentColor" />
  </svg>
);
