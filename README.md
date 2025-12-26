# Technical Portfolio Website

A modern, responsive portfolio website showcasing technical expertise in AI Security Engineering, multi-agent systems, and security automation. Built with React, TypeScript, and modern web technologies.

## ✨ Features

- **Smooth Scrolling Navigation** - Seamless section transitions with active state tracking
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Dark Theme** - Professional cyberpunk-inspired design with neon accents
- **Interactive Components** - Built with Radix UI primitives for accessibility
- **Type-Safe** - Full TypeScript implementation
- **Tested** - Vitest and React Testing Library setup
- **Fast Development** - Vite for instant HMR and optimized builds

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Testing**: Vitest + React Testing Library
- **Form Handling**: React Hook Form

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Stealinglight/cm-labs.git
cd cm-labs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build in `build/` directory
- `npm run test` - Run test suite in watch mode

## 📂 Project Structure

```
cm-labs/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI primitives (Radix-based)
│   │   ├── AboutSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   └── ...             # Other page sections
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global CSS and Tailwind imports
├── vite.config.ts          # Vite configuration
├── package.json
└── README.md
```

## 🎨 Design System

The site uses a consistent design language:
- **Primary Colors**: Neon green (#00ff41), Cyan (#00d9ff)
- **Background**: Dark (#0a0a0a)
- **Typography**: Inter for body text, Fira Code for monospace
- **Spacing**: Tailwind's default spacing scale

## 🧪 Testing

Tests are written using Vitest and React Testing Library:

```bash
npm run test              # Run tests in watch mode
npm run test -- --run     # Run tests once
```

## 🚀 Deployment

The project includes AWS CDK infrastructure for automated deployment via AWS Amplify Hosting.

### Prerequisites

- AWS CLI configured with credentials
- AWS CDK CLI: `npm install -g aws-cdk`
- GitHub personal access token stored in AWS Secrets Manager as `portfolio-github-token`

### Quick Start

```bash
cd infrastructure
npm install
npm run deploy
```

For detailed deployment instructions, configuration options, and troubleshooting, see [infrastructure/README.md](infrastructure/README.md).

### Features

- ✅ Automatic deployments on push to main
- ✅ PR preview environments
- ✅ Custom domain support (optional)
- ✅ SSL certificates automatically provisioned
- ✅ Single-page application routing

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Live Site**: [Coming Soon]
- **GitHub**: [https://github.com/Stealinglight/cm-labs](https://github.com/Stealinglight/cm-labs)

---

Built with ❤️ using React, TypeScript, and Vite
