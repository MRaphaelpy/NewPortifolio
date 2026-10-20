import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TbArrowRight,
  TbBrandGithub,
  TbBrandLinkedin,
  TbCopy,
  TbFileText,
  TbLanguage,
  TbSearch,
  TbSunMoon,
} from "react-icons/tb";
import { site } from "../../config/site";
import { useTheme } from "../../context/ThemeContext";
import { navigationItems } from "../../data/navigation";
import { useCopyEmail } from "../../hooks/useCopyEmail";
import { motionTokens } from "../../styles/motion";
import { cx } from "../../utils";
import styles from "./CommandPalette.module.css";

const normalize = (text) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");

const useCommands = () => {
  const { t, i18n } = useTranslation();
  const { toggleTheme } = useTheme();
  const copyEmail = useCopyEmail();

  return [
    ...navigationItems.map(({ id, labelKey }) => ({
      id: `go-${id}`,
      group: "navigate",
      label: t("commandPalette.goTo", { section: t(labelKey) }),
      Icon: TbArrowRight,
      run: () => document.getElementById(id)?.scrollIntoView(),
    })),
    {
      id: "theme",
      group: "actions",
      label: t("commandPalette.toggleTheme"),
      Icon: TbSunMoon,
      run: toggleTheme,
    },
    {
      id: "language",
      group: "actions",
      label: t("commandPalette.switchLanguage"),
      Icon: TbLanguage,
      run: () => i18n.changeLanguage(i18n.resolvedLanguage === "pt" ? "en" : "pt"),
    },
    {
      id: "copy-email",
      group: "actions",
      label: t("commandPalette.copyEmail"),
      hint: site.email,
      Icon: TbCopy,
      run: copyEmail,
    },
    {
      id: "github",
      group: "links",
      label: t("commandPalette.openGithub"),
      Icon: TbBrandGithub,
      run: () => openExternal(site.githubUrl),
    },
    {
      id: "linkedin",
      group: "links",
      label: t("commandPalette.openLinkedin"),
      Icon: TbBrandLinkedin,
      run: () => openExternal(site.linkedinUrl),
    },
    {
      id: "resume",
      group: "links",
      label: t("commandPalette.openResume"),
      Icon: TbFileText,
      run: () => openExternal(site.resumeUrl),
    },
  ];
};

const GROUPS = ["navigate", "actions", "links"];

const Palette = ({ onClose }) => {
  const { t } = useTranslation();
  const commands = useCommands();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();
  const listRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const results = useMemo(() => {
    const search = normalize(query.trim());
    const matches = commands.filter(
      (command) => !search || normalize(`${command.label} ${command.hint ?? ""}`).includes(search),
    );
    // Ordena pelos grupos para que a navegação por setas siga a ordem visual.
    return GROUPS.flatMap((group) => matches.filter((command) => command.group === group));
  }, [commands, query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const runCommand = (command) => {
    onClose();
    // Espera o diálogo fechar (e o foco voltar) antes de executar.
    requestAnimationFrame(command.run);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      runCommand(results[activeIndex]);
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={motionTokens.effectsDefault}
    >
      <motion.div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={t("a11y.openCommandPalette")}
        onClick={(event) => event.stopPropagation()}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={motionTokens.spatialFast}
      >
        <div className={styles.searchRow}>
          <TbSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            className={styles.input}
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t("commandPalette.placeholder")}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
            aria-autocomplete="list"
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        <ul ref={listRef} id={listId} className={styles.list} role="listbox">
          {results.length === 0 && (
            <li className={styles.empty}>{t("commandPalette.empty", { query })}</li>
          )}
          {results.map((command, index) => {
            const startsGroup = index === 0 || results[index - 1].group !== command.group;
            return (
              <li key={command.id} role="presentation">
                {startsGroup && (
                  <p className={styles.groupLabel} aria-hidden="true">
                    {t(`commandPalette.groups.${command.group}`)}
                  </p>
                )}
                <div
                  id={`${listId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={cx(styles.option, index === activeIndex && styles.active)}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => runCommand(command)}
                >
                  <span className={styles.optionIcon}>
                    <command.Icon aria-hidden="true" />
                  </span>
                  <span className={styles.optionLabel}>{command.label}</span>
                  {command.hint && <span className={styles.optionHint}>{command.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>

        <footer className={styles.footer} aria-hidden="true">
          <span>
            <kbd className={styles.kbd}>↑</kbd>
            <kbd className={styles.kbd}>↓</kbd> {t("commandPalette.hintNavigate")}
          </span>
          <span>
            <kbd className={styles.kbd}>↵</kbd> {t("commandPalette.hintSelect")}
          </span>
          <span>
            <kbd className={styles.kbd}>Esc</kbd> {t("commandPalette.hintClose")}
          </span>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export const CommandPalette = ({ open, onClose }) => (
  <AnimatePresence>{open && <Palette onClose={onClose} />}</AnimatePresence>
);
