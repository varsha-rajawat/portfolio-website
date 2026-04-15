# Varsha Rajawat — Portfolio Website

A bold, futuristic personal portfolio built with **React + Tailwind CSS + Framer Motion**.

Live demo → 

---

## Tech Stack

- **React 18** + **Vite** — fast dev server, instant HMR
- **Tailwind CSS v3** — utility-first styling
- **Framer Motion** — scroll animations, page transitions, interactive elements
- **Formspree** — contact form submissions (no backend needed)
- **Lucide React** — clean icon set

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node)

### Run locally

```bash
# 1. Clone or download this repo
git clone https://github.com/varsha-rajawat/portfolio-website.git
cd portfolio-website

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser. The page hot-reloads on every save.

### Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## Project Structure

```
portfolio-website/
├── index.html                  # Page title, meta tags, font imports
├── package.json
├── tailwind.config.js          # Custom colours (cyber-cyan, cyber-purple…)
├── vite.config.js
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root layout: cursor + sections + terminal
    ├── index.css               # Tailwind directives + global utilities
    └── components/
        ├── Navbar.jsx          # Fixed nav with scroll-progress bar
        ├── Hero.jsx            # Typing terminal + animated stats
        ├── About.jsx           # Short story + "three things to know"
        ├── Experience.jsx      # Click-to-expand timeline
        ├── Skills.jsx          # Four dimension cards
        ├── Projects.jsx        # GitHub-ready project cards
        ├── Education.jsx       # Degree cards
        ├── Contact.jsx         # Links + Formspree contact form
        ├── Footer.jsx
        └── FloatingTerminal.jsx  # Interactive Easter egg terminal
```

---


## Easter Egg

There's a **`>_ try the terminal`** button in the bottom-right corner of the site.
Try typing `sudo hire varsha` for the full experience.

---

## License

MIT — feel free to use this as a template and make it your own.
