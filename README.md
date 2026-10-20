# Portfólio — Marcos Rafael

Portfólio pessoal em React + Vite, seguindo o Material 3 Expressive.

## Recursos

- Paleta de comandos com `Ctrl/⌘ + K` (navegar, tema, idioma, copiar e-mail, links)
- Seção "No GitHub" com dados ao vivo da API pública (cache de 1h na sessão)
- Indicador de leitura ondulado (wavy progress do M3 Expressive) e navbar com seção ativa
- Filtro de projetos por tecnologia
- Tema claro/escuro, PT/EN e um easter egg (tente o Konami code 😉)

## Rodando

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção em dist/
npm run lint         # ESLint
npm run format       # Prettier
```

O deploy para o GitHub Pages roda automaticamente a cada push na `main`
(`.github/workflows/deploy.yml`).

## Estrutura

```
src/
  config/site.js        nome, e-mail e links (fonte única)
  data/                 projetos, experiência, skills, contatos, navegação
  locales/              textos em pt e en (só texto; dados ficam em data/)
  styles/tokens.css     tokens M3: cores, tipografia, forma, movimento, layout
  styles/motion.js      springs do M3 Expressive para o framer-motion
  components/ui/        Section, Reveal, Button, ExpressiveShape
  components/<Seção>/   uma pasta por seção, com seu CSS Module
  hooks/                useKonamiCode, useScrolledPast
```

## Convenções

- **Adicionar um projeto:** um item em `src/data/projects.js` e a descrição em
  `projects.items.<id>` nos dois arquivos de `src/locales/`.
- **Cores, tamanhos, cantos e animações** vêm sempre dos tokens em
  `src/styles/tokens.css`. A paleta é gerada a partir da cor-semente `#00897B`.
- **Breakpoints:** `599px` (compact), `839px` (medium) e `1199px` (expanded).
- **Animação de entrada:** sempre com o componente `<Reveal>`.
- Componentes usam export nomeado.
