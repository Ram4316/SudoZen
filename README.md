# SudoZen

A production-quality, mobile-first Sudoku Progressive Web App (PWA) built with React, Vite, and TailwindCSS.

## Features

- **Premium Mobile UI:** Carefully crafted dark mode, smooth animations, and tactile feedback.
- **Custom Sudoku Engine:** Generates guaranteed unique puzzles locally without an API.
- **Offline First:** Fully installable PWA that works without an internet connection.
- **Daily Challenge:** Seeded daily puzzles ensure everyone plays the same board.
- **Rich Gameplay:** Features include note-taking, mistake detection, and timer.
- **Persistence:** LocalStorage saves your game progress, settings, and statistics.

## Tech Stack

- React 19 + TypeScript
- Vite
- TailwindCSS 3
- Zustand (State Management)
- Framer Motion (Animations)
- Lucide React (Icons)
- Vite PWA Plugin

## Development

Install dependencies with npm install.
Start the server with npm run dev.

## GitHub Pages Deployment Instructions

This app is configured to be deployed as a static site.

1. Ensure your repository is pushed to GitHub.
2. In your repository settings, navigate to **Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. GitHub will automatically detect the Vite setup and deploy your application.
   - *Alternatively*, to deploy manually, build the project and push the contents of the `dist/` directory to a `gh-pages` branch.

**Note on PWA:** For the PWA to be installable, it must be served over HTTPS, which GitHub Pages provides by default.
