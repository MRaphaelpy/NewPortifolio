import { useEffect, useState } from "react";

// Seção cujo topo cruzou a linha central da tela.
export const useActiveSection = (ids) => {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join(",");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    key.split(",").forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [key]);

  return activeId;
};
