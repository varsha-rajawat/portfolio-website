# Varsha Rajawat — Portfolio Website

A bold, futuristic personal portfolio built with **React + Tailwind CSS + Framer Motion**.

Live demo → _add your Vercel URL here once deployed_

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

## Customisation

### Add / update projects

Open `src/components/Projects.jsx` and edit the `PROJECTS` array:

```js
{
  title:  'Your Project Name',
  desc:   'What it does and why it matters.',
  tags:   ['Java', 'React', 'PostgreSQL'],
  github: 'https://github.com/your-username/your-repo',
  live:   'https://your-demo.vercel.app',   // or null to hide the link
},
```

### Activate the contact form

1. Sign up at [formspree.io](https://formspree.io) (free)
2. Create a new form — copy the 8-character form ID
3. Open `src/components/Contact.jsx` and replace `YOUR_FORMSPREE_ID`:

```js
const FORMSPREE_ID = 'xpwzgkrb'   // ← your real ID here
```

Submissions go straight to your Gmail inbox.


### Colour theme

Edit `tailwind.config.js`:

```js
colors: {
  'cyber-cyan':   '#00d4ff',   // primary accent
  'cyber-purple': '#8b5cf6',   // secondary accent
  'cyber-green':  '#10b981',   // success / available
  'cyber-pink':   '#ec4899',   // frontend card
  'cyber-amber':  '#f59e0b',   // warnings / certs
},
```

Replace any hex value to instantly change the entire palette.


## Deployment (free on Vercel)

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Then:

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Click **Add New Project** → select your repo
3. Vercel auto-detects Vite → click **Deploy**
4. Done — live in ~60 seconds

Every future `git push` triggers an automatic redeploy.

---

## Easter Egg

There's a **`>_ try the terminal`** button in the bottom-right corner of the site.
Try typing `sudo hire varsha` for the full experience.

---

## License

MIT — feel free to use this as a template and make it your own.
