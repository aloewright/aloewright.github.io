# Aloe Wright's Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and shadcn/ui components. This portfolio automatically fetches and displays GitHub repositories as interactive project cards.

## ✨ Features

- **Responsive Design**: Optimized for all device sizes
- **GitHub Integration**: Automatically fetches profile data and repositories
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **TypeScript**: Full type safety and enhanced developer experience
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Static Export**: Optimized for GitHub Pages deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (static export)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aloewright/aloewright.github.io.git
   cd aloewright.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This creates an optimized static export in the `out` directory, ready for deployment to GitHub Pages.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main portfolio page
├── components/
│   └── ui/                  # shadcn/ui components
│       ├── avatar.tsx
│       ├── button.tsx
│       └── card.tsx
└── lib/
    └── utils.ts             # Utility functions
```

## 🎨 Customization

### Update GitHub Username

Change the `GITHUB_USERNAME` constant in `src/app/page.tsx`:

```typescript
const GITHUB_USERNAME = 'your-github-username'
```

### Modify Styling

The portfolio uses Tailwind CSS with custom CSS variables. You can modify the design tokens in `src/app/globals.css`.

### Add Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## 🌐 Deployment

This portfolio is configured for GitHub Pages deployment:

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy to `gh-pages` branch
3. Enable GitHub Pages in your repository settings

## 📱 Features Overview

- **Profile Header**: Displays GitHub avatar, name, bio, and stats
- **Project Grid**: Responsive grid of repository cards
- **Repository Cards**: Show description, language, stars, forks, and topics
- **Direct Links**: Quick access to repository code and live demos
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful error handling for API failures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework

---

Built with ❤️ by [Aloe Wright](https://github.com/aloewright)