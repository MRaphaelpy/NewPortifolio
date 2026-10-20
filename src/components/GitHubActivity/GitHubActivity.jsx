import { useTranslation } from "react-i18next";
import { TbBrandGithub, TbStar } from "react-icons/tb";
import { site } from "../../config/site";
import { useGitHubProfile } from "../../hooks/useGitHubProfile";
import { STAGGER_DELAY } from "../../styles/motion";
import { Button } from "../ui/Button/Button";
import { Reveal } from "../ui/Reveal/Reveal";
import { Section } from "../ui/Section/Section";
import styles from "./GitHubActivity.module.css";

// Cores das linguagens vêm dos tokens, na ordem do ranking.
const LANGUAGE_COLORS = [
  "var(--md-sys-color-primary)",
  "var(--md-sys-color-tertiary)",
  "var(--md-sys-color-secondary)",
  "var(--md-sys-color-outline)",
];

const RELATIVE_UNITS = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["week", 7 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
];

const formatRelative = (date, language) => {
  const seconds = (new Date(date).getTime() - Date.now()) / 1000;
  const formatter = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  for (const [unit, unitSeconds] of RELATIVE_UNITS) {
    if (Math.abs(seconds) >= unitSeconds) {
      return formatter.format(Math.round(seconds / unitSeconds), unit);
    }
  }
  return formatter.format(0, "minute");
};

const yearsSince = (date) =>
  Math.floor((Date.now() - new Date(date).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

const Skeleton = () => (
  <div className={styles.layout} aria-busy="true">
    <div className={styles.stats}>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className={`${styles.stat} ${styles.skeleton}`} />
      ))}
    </div>
    <div className={`${styles.languagesCard} ${styles.skeleton}`} />
    <div className={styles.repos}>
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className={`${styles.repo} ${styles.skeleton}`} />
      ))}
    </div>
  </div>
);

export const GitHubActivity = () => {
  const { t, i18n } = useTranslation();
  const { status, data } = useGitHubProfile(site.githubUsername);
  const language = i18n.resolvedLanguage === "pt" ? "pt-BR" : "en";
  const formatNumber = new Intl.NumberFormat(language).format;

  if (status === "error") {
    return (
      <Section id="github" title={t("github.title")}>
        <div className={styles.error}>
          <p>{t("github.error")}</p>
          <Button href={site.githubUrl} external variant="tonal" icon={TbBrandGithub}>
            {t("github.viewProfile")}
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="github" title={t("github.title")} description={t("github.description")}>
      {status === "loading" ? (
        <Skeleton />
      ) : (
        <div className={styles.layout}>
          <ul className={styles.stats}>
            {[
              { id: "repos", value: formatNumber(data.publicRepos) },
              { id: "followers", value: formatNumber(data.followers) },
              { id: "years", value: formatNumber(yearsSince(data.createdAt)) },
              { id: "topLanguage", value: data.languages[0]?.name ?? "—" },
            ].map(({ id, value }, index) => (
              <Reveal as="li" key={id} className={styles.stat} delay={index * STAGGER_DELAY}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{t(`github.stats.${id}`)}</span>
              </Reveal>
            ))}
          </ul>

          {data.languages.length > 0 && (
            <Reveal className={styles.languagesCard}>
              <h3 className={styles.cardTitle}>{t("github.languages")}</h3>
              <div className={styles.languageBar} aria-hidden="true">
                {data.languages.map(({ name, share }, index) => (
                  <span
                    key={name}
                    style={{ flexGrow: share, backgroundColor: LANGUAGE_COLORS[index] }}
                  />
                ))}
              </div>
              <ul className={styles.languageLegend}>
                {data.languages.map(({ name, share }, index) => (
                  <li key={name}>
                    <span
                      className={styles.languageDot}
                      style={{ backgroundColor: LANGUAGE_COLORS[index] }}
                    />
                    {name}
                    <span className={styles.languageShare}>{Math.round(share * 100)}%</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <div>
            <h3 className={styles.cardTitle}>{t("github.recent")}</h3>
            <ul className={styles.repos}>
              {data.recentRepos.map((repo, index) => (
                <Reveal as="li" key={repo.id} delay={index * (STAGGER_DELAY / 2)}>
                  <a
                    href={repo.url}
                    className={styles.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.repoName}>
                      <TbBrandGithub aria-hidden="true" />
                      {repo.name}
                    </span>
                    <span className={styles.repoDescription}>
                      {repo.description ?? t("github.noDescription")}
                    </span>
                    <span className={styles.repoMeta}>
                      {repo.language && <span>{repo.language}</span>}
                      {repo.stars > 0 && (
                        <span aria-label={t("github.stars", { count: repo.stars })}>
                          <TbStar aria-hidden="true" /> {repo.stars}
                        </span>
                      )}
                      <span>
                        {t("github.updated", { time: formatRelative(repo.pushedAt, language) })}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className={styles.footer}>
            <Button href={data.profileUrl} external variant="tonal" icon={TbBrandGithub}>
              {t("github.viewProfile")}
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
};
