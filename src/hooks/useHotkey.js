import { useEffect, useRef } from "react";

// Atalho com Ctrl (ou ⌘ no macOS) + tecla.
export const useHotkey = (key, onTrigger) => {
  const onTriggerRef = useRef(onTrigger);

  useEffect(() => {
    onTriggerRef.current = onTrigger;
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === key) {
        event.preventDefault();
        onTriggerRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key]);
};
