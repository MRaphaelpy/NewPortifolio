import { useEffect, useState } from "react";

const API_URL = "https://api.github.com";
const CACHE_TTL = 60 * 60 * 1000;
const RECENT_REPOS = 6;
const TOP_LANGUAGES = 4;
const SUMMARY_MAX_LENGTH = 160;
const SUMMARY_MIN_LENGTH = 40;

const cacheKey = (username) => `github-profile:v2:${username}`;

const readCache = (username) => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey(username)));
    if (cached && Date.now() - cached.savedAt < CACHE_TTL) return cached.data;
  } catch {
    // Cache indisponível ou corrompido: busca de novo.
  }
  return null;
};

const writeCache = (username, data) => {
  try {
    sessionStorage.setItem(cacheKey(username), JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Sem armazenamento: só não guarda o cache.
  }
};

const fetchJson = async (url, signal) => {
  const response = await fetch(url, { signal, headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  return response.json();
};

// Blocos de Markdown que não são texto corrido: títulos, citações, tabelas,
// código, listas, HTML, imagens/badges e linhas horizontais.
const NON_PROSE_BLOCK = /^(#|>|\||```|~~~|[-*+] |\d+\. |<|!\[|\[!\[|---|\*\*\*|___)/;

const stripMarkdown = (text) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (text) => {
  if (text.length <= SUMMARY_MAX_LENGTH) return text;
  const cut = text.slice(0, SUMMARY_MAX_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

// Primeiro parágrafo de texto do README, para repositórios sem descrição.
export const summarizeReadme = (markdown) => {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block && !NON_PROSE_BLOCK.test(block))
    .map(stripMarkdown)
    .find((text) => text.length >= SUMMARY_MIN_LENGTH);
  return paragraph ? truncate(paragraph) : null;
};

const fetchReadmeSummary = async (username, repoName, signal) => {
  const response = await fetch(`${API_URL}/repos/${username}/${repoName}/readme`, {
    signal,
    headers: { Accept: "application/vnd.github.raw" },
  });
  if (!response.ok) return null;
  return summarizeReadme(await response.text());
};

// Repositórios sem descrição ("About") usam o README como reserva.
const fillMissingDescriptions = (data, username, signal) =>
  Promise.all(
    data.recentRepos.map(async (repo) => {
      if (repo.description) return repo;
      const summary = await fetchReadmeSummary(username, repo.name, signal).catch(() => null);
      return { ...repo, description: summary };
    }),
  ).then((recentRepos) => ({ ...data, recentRepos }));

// Ignora forks e o repositório especial do perfil (mesmo nome do usuário).
const summarize = (user, repos, username) => {
  const ownRepos = repos.filter(
    (repo) => !repo.fork && repo.name.toLowerCase() !== username.toLowerCase(),
  );

  const languageCounts = ownRepos.reduce((counts, { language }) => {
    if (language) counts[language] = (counts[language] ?? 0) + 1;
    return counts;
  }, {});
  const totalWithLanguage = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);
  const languages = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, TOP_LANGUAGES)
    .map(([name, count]) => ({ name, share: count / totalWithLanguage }));

  return {
    profileUrl: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    createdAt: user.created_at,
    languages,
    recentRepos: ownRepos.slice(0, RECENT_REPOS).map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    })),
  };
};

export const useGitHubProfile = (username) => {
  const [state, setState] = useState(() => {
    const cached = readCache(username);
    return cached ? { status: "success", data: cached } : { status: "loading", data: null };
  });

  useEffect(() => {
    if (readCache(username)) return;
    const controller = new AbortController();

    Promise.all([
      fetchJson(`${API_URL}/users/${username}`, controller.signal),
      fetchJson(`${API_URL}/users/${username}/repos?sort=pushed&per_page=100`, controller.signal),
    ])
      .then(([user, repos]) =>
        fillMissingDescriptions(summarize(user, repos, username), username, controller.signal),
      )
      .then((data) => {
        writeCache(username, data);
        setState({ status: "success", data });
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, [username]);

  return state;
};
