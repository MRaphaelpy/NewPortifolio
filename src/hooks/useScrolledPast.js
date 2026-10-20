import { useEffect, useState } from "react";

export const useScrolledPast = (offset) => {
  const [scrolledPast, setScrolledPast] = useState(() => window.scrollY > offset);

  useEffect(() => {
    const handleScroll = () => setScrolledPast(window.scrollY > offset);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return scrolledPast;
};
