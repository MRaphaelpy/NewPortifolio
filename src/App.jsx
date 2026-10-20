import { lazy, Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { About } from "./components/About/About";
import { CommandPalette } from "./components/CommandPalette/CommandPalette";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Footer } from "./components/Footer/Footer";
import { GitHubActivity } from "./components/GitHubActivity/GitHubActivity";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import { ScrollToTopButton } from "./components/ScrollToTopButton/ScrollToTopButton";
import { useHotkey } from "./hooks/useHotkey";
import { useKonamiCode } from "./hooks/useKonamiCode";

// O easter egg só é baixado quando o Konami code é digitado.
const EasterEggAlert = lazy(() =>
  import("./components/EasterEggAlert/EasterEggAlert").then((module) => ({
    default: module.EasterEggAlert,
  })),
);

// Estilo de snackbar do M3 para os toasts.
const toastOptions = {
  style: {
    background: "var(--md-sys-color-inverse-surface)",
    color: "var(--md-sys-color-inverse-on-surface)",
    borderRadius: "var(--md-sys-shape-corner-medium)",
    fontFamily: "inherit",
  },
};

export const App = () => {
  const { t } = useTranslation();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useKonamiCode(() => setShowEasterEgg(true));
  useHotkey("k", () => setCommandPaletteOpen((open) => !open));

  return (
    <>
      <a className="skip-link" href="#main">
        {t("a11y.skipToContent")}
      </a>
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <Toaster position="bottom-center" toastOptions={toastOptions} />
      {showEasterEgg && (
        <Suspense fallback={null}>
          <EasterEggAlert onClose={() => setShowEasterEgg(false)} />
        </Suspense>
      )}
    </>
  );
};
