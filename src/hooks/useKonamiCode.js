import { useEffect, useRef, useState } from "react";

export const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Maior sufixo das teclas digitadas que também é prefixo da sequência.
// Assim "↑ ↑ ↑ ↓ ..." continua valendo, em vez de zerar no terceiro ↑.
const matchProgress = (keys) => {
  for (let length = Math.min(keys.length, KONAMI_SEQUENCE.length); length > 0; length--) {
    const tail = keys.slice(-length);
    if (tail.every((key, index) => key === KONAMI_SEQUENCE[index])) return length;
  }
  return 0;
};

export const useKonamiCode = (onActivate) => {
  const [progress, setProgress] = useState(0);
  const onActivateRef = useRef(onActivate);

  useEffect(() => {
    onActivateRef.current = onActivate;
  });

  useEffect(() => {
    let keys = [];

    const handleKeyDown = (event) => {
      keys = [...keys, event.key].slice(-KONAMI_SEQUENCE.length);
      const nextProgress = matchProgress(keys);

      if (nextProgress === KONAMI_SEQUENCE.length) {
        keys = [];
        setProgress(0);
        onActivateRef.current();
        return;
      }
      setProgress(nextProgress);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return progress;
};
