# Portfolio Setup & Deployment Guide

A complete step-by-step guide to run your portfolio locally and deploy it free to the world via Vercel.

---

## Step 1 — Install Node.js (one-time setup)

If you don't have Node.js installed:

1. Go to **https://nodejs.org**
2. Download the **LTS** version (the green button)
3. Run the installer — click Next through everything
4. To verify it worked, open a terminal and run:

```bash
node --version   # should print v18 or higher
npm --version    # should print a number
```

---

## Step 2 — Run the portfolio locally

1. Open a terminal (Mac: Terminal app / Windows: Command Prompt or PowerShell)
2. Navigate to this folder:

```bash
# Replace the path with wherever you saved this folder
cd "Portfolio Project Ideas/portfolio-website"
```

3. Install dependencies (downloads React, Tailwind, Framer Motion — takes ~30 seconds):

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open your browser and go to → **http://localhost:5173**

You should see your portfolio running! Every time you save a file, the browser refreshes automatically.

---

## Step 3 — Personalise before deploying

Open the files below and update these things:

### Contact.jsx
Search for `YOUR_HANDLE` and `YOUR_USERNAME` and replace with your real LinkedIn and GitHub URLs.

### Projects.jsx
The GitHub placeholder link at the bottom — replace `YOUR_GITHUB_USERNAME` with your actual username.

### index.html
The `<meta>` description and Open Graph tags already have your name/info — review and tweak if needed.

---

## Step 4 — Deploy to Vercel (FREE, takes 5 minutes)

Vercel is the best free host for React/Vite projects. Your site gets a URL like `https://varsha-portfolio.vercel.app`.

### 4a — Push your code to GitHub

1. Go to **https://github.com** and create a free account if you don't have one
2. Click **New repository** → name it `portfolio` → click **Create**
3. In your terminal (inside the portfolio-website folder):

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
git push -u origin main
```

### 4b — Deploy on Vercel

1. Go to **https://vercel.com** and sign in with GitHub
2. Click **Add New Project**
3. Select your `portfolio` repository
4. Vercel auto-detects Vite — click **Deploy**
5. Done! In ~60 seconds you get a live URL

### 4c — Custom domain (optional, also free from Vercel)

In Vercel dashboard → your project → **Settings → Domains** → add your own domain (e.g. `varsharajawat.dev`). Domain costs ~$10–15/year from Namecheap or Porkbun.

---

## Step 5 — Update your portfolio any time

Any time you make a change:

```bash
git add .
git commit -m "Update projects section"
git push
```

Vercel automatically redeploys in ~30 seconds. That's it!

---

## File structure cheat-sheet

```
portfolio-website/
├── index.html              ← Page title, meta tags, font imports
├── package.json            ← Dependencies list
├── tailwind.config.js      ← Custom colours (cyber-cyan, cyber-purple...)
├── vite.config.js          ← Build tool config
└── src/
    ├── main.jsx            ← React entry point
    ├── App.jsx             ← Root: custom cursor + all sections assembled
    ├── index.css           ← Global styles + Tailwind directives
    └── components/
        ├── Navbar.jsx      ← Fixed nav + scroll progress bar
        ├── Hero.jsx        ← Terminal animation + stats counters
        ├── About.jsx       ← Bio + "currently" card
        ├── Experience.jsx  ← Timeline (3 roles)
        ├── Skills.jsx      ← 6 skill category cards
        ├── Projects.jsx    ← Featured work cards
        ├── Education.jsx   ← Degree cards + certs
        ├── Contact.jsx     ← Links + availability badge
        └── Footer.jsx      ← Simple footer
```

---

## Common customisations

**Change the colour theme**
Edit `tailwind.config.js` → `colors` section. Replace `#00d4ff` (cyan) or `#8b5cf6` (purple) with any hex colour you want.

**Add a personal project**
In `Projects.jsx`, add a new entry to the `PROJECTS` array. Copy the structure of an existing one. Change `type: 'personal'` and add `github: 'https://github.com/...'` and `live: 'https://...'`.

**Add a certification**
In `Education.jsx`, add to the `CERTS` array: `{ label: 'AWS SAA-C03', status: 'Earned Apr 2026', color: '#f59e0b' }`.

**Remove the custom cursor**
In `App.jsx`, delete the `<CustomCursor />` line and the `CustomCursor` function above it.
