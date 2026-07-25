<a name="readme-top"></a>

<img width="1440" alt="Typevibe - typing test with mechanical keyboard sounds" src=".github/images/img_main.png" />

<p align="center">
  <h3 align="center">Typevibe</h3>
  <p align="center">
    A free typing test with realistic mechanical keyboard sounds
    <br />
    <a href="https://Typevibe.mudassirasghar.dev/"><strong>Try it live Â»</strong></a>
    <br />
    <br />
    <a href="https://Typevibe.mudassirasghar.dev/">Website</a>
    &middot;
    <a href="https://github.com/Mudassirdbs/Typevibe/issues">Issues</a>
    &middot;
    <a href="https://github.com/Mudassirdbs/Typevibe/issues/new?labels=enhancement&template=FEATURE_REQUEST_TEMPLATE.md">Request Feature</a>
  </p>
</p>

<p align="center">
  <a href="https://mudassirasghar.dev">
    <img src="https://custom-icon-badges.demolab.com/badge/made%20by%20-Mudassir%20Asghar-556bf2?logo=github&logoColor=white&labelColor=101827" alt="Made by Mudassir Asghar">
  </a>
  <a href="https://github.com/Mudassirdbs/Typevibe/stargazers">
    <img src="https://img.shields.io/github/stars/Mudassirdbs/Typevibe?style=flat&logo=github" alt="GitHub Stars">
  </a>
  <a href="https://github.com/Mudassirdbs/Typevibe/forks">
    <img src="https://img.shields.io/github/forks/Mudassirdbs/Typevibe?style=flat" alt="GitHub Forks">
  </a>
  <a href="https://github.com/Mudassirdbs/Typevibe/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Mudassirdbs/Typevibe?color=dddddd&labelColor=000000" alt="License">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/github/languages/top/Mudassirdbs/Typevibe?&logoColor=%23007ACC&label=TypeScript" alt="Top Language">
  </a>
  <a href="https://github.com/Mudassirdbs/Typevibe/commits/main">
    <img src="https://img.shields.io/github/commit-activity/t/Mudassirdbs/Typevibe?style=flat&logo=github" alt="Commits">
  </a>
  <a href="https://github.com/Mudassirdbs/Typevibe/pulls">
    <img src="https://img.shields.io/github/issues-pr/Mudassirdbs/Typevibe?color=brightgreen&label=PRs" alt="Pull Requests">
  </a>
  <img src="https://img.shields.io/github/deployments/Mudassirdbs/Typevibe/Production?logo=vercel&label=Website" alt="Deployment Status">
</p>

<details>
<summary>Table of Contents</summary>

- [About](#about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [Follow Me](#-follow-me)
- [Deployment](#-deployment)
- [Give A Star](#-give-a-star)
- [Star History](#-star-history)


</details>

## About

**Typevibe** is a free online typing test with **realistic mechanical keyboard sounds** and real-time WPM tracking. Practice with timed tests, word counts, quotes, or zen mode - featuring an interactive on-screen keyboard, satisfying key sounds, and detailed accuracy stats.

## âœ¨ Features

| Area | What you get |
|------|----------------|
| **Test modes** | Time (15sâ€“120s), word count, quotes (length presets), zen |
| **Mechanical key sounds** | Realistic per-key audio feedback via Web Audio; multiple keyboard themes |
| **Virtual keyboard** | Interactive on-screen keyboard that highlights keys as you type (desktop) |
| **Results** | WPM, raw speed, accuracy, character breakdown, consistency, elapsed time, WPM-over-time chart |
| **Keyboard themes** | 6 color schemes - Classic, Mint, Royal, Dolch, Sand, Scarlet - each tints the entire UI |
| **Typing fonts** | 9 fonts - Geist Mono, JetBrains Mono, Fira Code, IBM Plex Mono, Source Code Pro, Inter Tight, Space Grotesk, Nunito, Atkinson Hyperlegible |
| **Settings** | Theme (light/dark/system), accent color, font picker, show keyboard, sound volume, live WPM, ghost mode |
| **Haptics** | Optional vibration on supported hardware |

Settings persist in `localStorage`.

## ðŸ›  Tech Stack

<details><summary><b>Typevibe</b> is built using the following technologies:</summary>

- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript.
- [Next.js](https://nextjs.org/) 16: React framework with App Router.
- [React](https://react.dev/) 19: UI library.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- [Base UI](https://base-ui.com/): Unstyled, accessible component primitives from MUI.
- [shadcn/ui](https://ui.shadcn.com/): Pre-styled component recipes.
- [Motion](https://motion.dev/): Animation library for React.
- [Recharts](https://recharts.org/): Composable charting library.
- [Drizzle ORM](https://orm.drizzle.team/) + LibSQL: Type-safe database layer.
- [Biome](https://biomejs.dev/): Fast linter and formatter.
- [Serwist](https://serwist.pages.dev/): PWA / service worker toolkit.
- [Vercel](https://vercel.com/): Deployment platform.

</details><br/>

[![Technologies Used](https://go-skill-icons.vercel.app/api/icons?i=nextjs,react,ts,tailwind,shadcn,framer,drizzle,sqlite,bun,biome,vercel&theme=dark&titles=true)](https://mudassirasghar.dev)

## ðŸ§° Getting Started

1. Make sure [Git](https://git-scm.com/downloads) and [Bun](https://bun.sh/) (or Node.js 20+) are installed.
2. Fork this repository and clone **your fork**:

   ```bash
   git clone https://github.com/Mudassirdbs/Typevibe.git
   cd Typevibe
   ```

3. Install dependencies and start the dev server:

   ```bash
   bun install
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ðŸ“œ Scripts

| Command | Description |
|--------|-------------|
| `bun dev` | Development server |
| `bun run build` | Optimized production build |
| `bun start` | Serve the production build |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Lint and auto-fix with Biome |
| `bun run format` | Format with Biome |
| `bun run typecheck` | Type-check with TypeScript |

## ðŸ”§ Contributing

[![contributors](https://contrib.rocks/image?repo=Mudassirdbs/Typevibe)](https://github.com/Mudassirdbs/Typevibe/graphs/contributors)

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the repo
2. Create a new branch (`git checkout -b improve-feature`)
3. Make the appropriate changes in the files
4. Commit your changes (`git commit -am 'Improve feature'`)
5. Push to the branch (`git push origin improve-feature`)
6. Create a Pull Request

## ðŸš€ Follow & Contact Me

[![Follow Me](https://img.shields.io/github/followers/Mudassirdbs?style=social&label=Github&maxAge=2592000)](https://github.com/Mudassirdbs "Follow Me")
[![Email](https://img.shields.io/badge/Email-contact%40mudassirasghar.dev-blue?style=flat&logo=gmail&logoColor=white)](mailto:contact@mudassirasghar.dev)
[![Website](https://img.shields.io/badge/Website-mudassirasghar.dev-007ACC?style=flat&logo=googlechrome&logoColor=white)](https://mudassirasghar.dev)

## ðŸ“ƒ Deployment

| Method                     | Description                              | Action                                                                                                                                                         |
| :------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ðŸ”§ Manual Build**        | Create an optimized production build.    | `bun run build`                                                                                                                                                |
| **â–² Vercel (Recommended)** | Deploy instantly on the Vercel platform. | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMudassirdbs%2FTypevibe)               |
| **ðŸŒ Netlify**             | Deploy easily on Netlify.                | [![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Mudassirdbs/Typevibe) |

For more details, check the [Next.js deployment docs](https://nextjs.org/docs/deployment).

## â­ Give A Star

If you found this project useful, give it a star to help more people discover it!

## ðŸŒŸ Star History

<a href="https://star-history.com/#Mudassirdbs/Typevibe&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Mudassirdbs/Typevibe&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Mudassirdbs/Typevibe&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Mudassirdbs/Typevibe&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>

