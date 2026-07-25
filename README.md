<a name="readme-top"></a>

<div align="center">
  <h1>⌨️ Typevibe</h1>
  <p><strong>A modern, glassmorphic typing speed test with realistic mechanical keyboard sounds</strong></p>

  <p>
    <a href="https://typevibe.mudassirasghar.dev"><strong>Live Demo »</strong></a>
    ·
    <a href="https://github.com/Mudassirdbs/TypeVibe/issues">Report Bug</a>
    ·
    <a href="https://github.com/Mudassirdbs/TypeVibe/issues/new?labels=enhancement&template=FEATURE_REQUEST_TEMPLATE.md">Request Feature</a>
  </p>

  <p>
    <a href="https://mudassirasghar.dev">
      <img src="https://custom-icon-badges.demolab.com/badge/made%20by%20-Mudassir%20Asghar-556bf2?logo=github&logoColor=white&labelColor=101827" alt="Made by Mudassir Asghar">
    </a>
    <a href="https://github.com/Mudassirdbs/TypeVibe/stargazers">
      <img src="https://img.shields.io/github/stars/Mudassirdbs/TypeVibe?style=flat&logo=github" alt="GitHub Stars">
    </a>
    <a href="https://github.com/Mudassirdbs/TypeVibe/forks">
      <img src="https://img.shields.io/github/forks/Mudassirdbs/TypeVibe?style=flat" alt="GitHub Forks">
    </a>
    <a href="https://github.com/Mudassirdbs/TypeVibe/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/Mudassirdbs/TypeVibe?color=dddddd&labelColor=000000" alt="License">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/github/languages/top/Mudassirdbs/TypeVibe?logoColor=%23007ACC&label=TypeScript" alt="Top Language">
    </a>
    <a href="https://upstash.com/">
      <img src="https://img.shields.io/badge/Database-Upstash%20Redis-00E599?logo=redis&logoColor=white" alt="Upstash Redis">
    </a>
  </p>
</div>

<br/>

## 📖 About The Project

**Typevibe** is a open-source typing speed test crafted with a visual-first aesthetic. It pairs **realistic mechanical keyboard audio feedback** with real-time WPM tracking, interactive virtual keyboard visuals, and customizable themes and typefaces.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎵 **Mechanical Key Sounds** | Web Audio API per-key sound feedback with volume control and sound wave visualizer. |
| 🗄️ **Serverless Analytics** | Powered by **Upstash Redis** for lightning-fast global visit counter tracking. |
| ⏱️ **Multiple Test Modes** | Practice with **Time** (15s–120s), **Words** count, **Quotes**, or **Zen** free-flow typing. |
| ⌨️ **Virtual 3D Keyboard** | Interactive on-screen keyboard highlighting physical keypresses in real time. |
| 📊 **Speed & Accuracy Stats** | Live WPM, Raw Speed, Accuracy %, Consistency, and interactive WPM progression graph. |
| 📋 **Score Sharing** | One-click copy formatted result summary cards ready to share on Twitter/Discord. |
| 🎨 **Theme & Font Selector** | 6 color schemes (Classic, Mint, Royal, Dolch, Sand, Scarlet) & 9 monospace/display typefaces. |
| ⚙️ **Centred Settings Modal** | Image 2 style centered glass dialog with keyboard shortcuts (`⌘K` toggle / `Esc` close). |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Glassmorphism
- **Animations:** [Motion](https://motion.dev/) (Framer Motion)
- **Database:** [Upstash Redis](https://upstash.com/) (`@upstash/redis` REST SDK)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/) & [Tabler Icons](https://tabler-icons.io/)
- **Charts:** [Recharts](https://recharts.org/)
- **Tooling:** [TypeScript](https://www.typescriptlang.org/), [Biome](https://biomejs.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 20+** or **Bun** installed on your system.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Mudassirdbs/TypeVibe.git
   cd TypeVibe
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   UPSTASH_REDIS_REST_URL="https://your-upstash-id.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your_upstash_token_here"
   ```
   *(Get your free database credentials at [Upstash Console](https://console.upstash.com))*

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Serves the production build |
| `npm run typecheck` | Runs TypeScript type check (`tsc --noEmit`) |
| `npm run lint` | Lints code using Biome |

---

## 🌐 Deployment

Deploying **Typevibe** to Vercel takes less than a minute:

1. Push your code to GitHub.
2. Import your repository into [Vercel](https://vercel.com/new).
3. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in **Environment Variables**.
4. Click **Deploy**!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMudassirdbs%2FTypeVibe)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Mudassirdbs/TypeVibe/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Contact & Owner

**Mudassir Asghar**
- **Website:** [mudassirasghar.dev](https://mudassirasghar.dev)
- **Email:** [contact@mudassirasghar.dev](mailto:contact@mudassirasghar.dev)
- **GitHub:** [@Mudassirdbs](https://github.com/Mudassirdbs)

---

## 📝 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
