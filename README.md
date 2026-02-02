# Expo Base Template

<div align="center">

**A production-ready React Native mobile application template built with modern best practices**

Built with Expo SDK 55, TypeScript, and React Native's New Architecture

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Tech Stack](#tech-stack)

</div>

---

## 📱 About

This is a comprehensive Expo React Native base template designed to kickstart your mobile app development with industry best practices and modern architecture. It comes pre-configured with essential features, robust tooling, and a scalable project structure.

### Features

- **� Authentication Module** - Complete auth flow with login, registration, and password reset
- **� Home Module** - Dashboard and main navigation structure
- **👤 Profile Module** - User profile management and settings
- **🎨 UI Component Library** - Pre-built components with HeroUI Native
- **🌍 Internationalization** - Multi-language support with i18next (English & Indonesian)
- **� Type-Safe Navigation** - File-based routing with Expo Router and typed routes
- **� State Management** - Zustand for global state, React Query for server state
- **🎭 Storybook Integration** - Component development and visual testing
- **✅ Testing Setup** - Jest and React Native Testing Library configured
- **🔄 CI/CD Ready** - EAS Build and Submit configurations included

## 🚀 Quick Start

Get up and running in minutes:

```bash
# Clone the repository
git clone <repository-url>
cd expo-base

# Install dependencies
bun install

# Start development server
bun dev

# Run on your platform
bun ios       # iOS Simulator
bun android   # Android Emulator
bun web       # Web Browser
```

**New to the project?** Check out the [Getting Started Guide](./docs/GETTING_STARTED.md) for detailed setup instructions.

## 📚 Documentation

Complete documentation is available in the `/docs` directory:

### Core Documentation

| Document | Description |
|----------|-------------|
| [**Getting Started**](./docs/GETTING_STARTED.md) | Prerequisites, installation, and running the app |
| [**Project Structure**](./docs/PROJECT_STRUCTURE.md) | Directory organization and architecture |
| [**Development Guide**](./docs/DEVELOPMENT.md) | Development workflow, scripts, and best practices |
| [**Configuration**](./docs/CONFIGURATION.md) | Environment variables and app configuration |
| [**Building**](./docs/BUILDING.md) | Building for different platforms and environments |
| [**Testing**](./docs/TESTING.md) | Testing setup, guidelines, and best practices |
| [**Storybook**](./docs/STORYBOOK.md) | Component development and visual testing |
| [**Versioning**](./docs/VERSIONING.md) | Version management and release process |
| [**Contributing**](./docs/CONTRIBUTING.md) | Contribution guidelines and workflow |

### Quick Links

- 🏃 **First time here?** → Start with [Getting Started](./docs/GETTING_STARTED.md)
- 🏗️ **Understanding the code?** → Read [Project Structure](./docs/PROJECT_STRUCTURE.md)
- 💻 **Ready to code?** → Follow [Development Guide](./docs/DEVELOPMENT.md)
- 🚀 **Deploying?** → Check [Building](./docs/BUILDING.md)
- 🤝 **Want to contribute?** → See [Contributing](./docs/CONTRIBUTING.md)

## 🛠 Tech Stack

### Core Technologies

- **Framework**: React Native 0.83 with Expo SDK 55 (Preview)
- **Language**: TypeScript 5.9
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand 5.0
- **Storage**: MMKV 4.1
- **Styling**: Uniwind 1.2 (Tailwind CSS for React Native) + TailwindCSS 4.1
- **Package Manager**: Bun
- **React**: React 19.2

### Key Features

- **New Architecture**: React Native's latest architecture (Fabric & Bridgeless)
- **React Compiler**: Experimental React Compiler enabled
- **Typed Routes**: Type-safe navigation with Expo Router
- **Nitro Modules**: React Native Nitro Modules for native performance

### Libraries & Tools

- **UI Components**: HeroUI Native 1.0 (Beta)
- **Data Fetching**: TanStack React Query 5.90 with Axios 1.13
- **Form Handling**: React Hook Form 7.71 with Zod 4.3 validation
- **Animations**: React Native Reanimated 4.2, Lottie 7.3
- **Gestures**: React Native Gesture Handler 2.30
- **Keyboard**: React Native Keyboard Controller 1.20
- **Internationalization**: i18next 25.8 with react-i18next 16.5
- **Testing**: Jest 30.2 with React Native Testing Library 13.3
- **Error Tracking**: Sentry 7.10
- **Performance**: React Native Performance monitoring
- **Development**: Storybook 10.1 for component development

## 📱 App Variants

The app supports three build variants configured via environment variables:

| Variant | Purpose | Bundle ID Pattern | Status |
|---------|---------|-------------------|--------|
| **Development** | Internal testing | `{APP_BUNDLE_ID}.dev` | 🔧 Debug enabled |
| **Preview** | Staging/QA | `{APP_BUNDLE_ID}.preview` | 🧪 Testing |
| **Production** | App Store release | `{APP_BUNDLE_ID}` | ✅ Production |

Each variant has unique icons, configurations, and environment settings. Configure via `.env.local` file.

## 🎯 Project Highlights

### Modular Architecture

The project follows a **feature-based modular structure**:

```
src/
├── modules/
│   ├── auth/          # Authentication module
│   ├── home/          # Home/Dashboard module
│   └── profile/       # User profile module
├── components/        # Shared UI components
├── hooks/            # Custom React hooks
├── lib/              # Core libraries & utilities
├── store/            # Global state management
└── theme/            # Design system & theming
```

### File-based Routing

Using **Expo Router** for intuitive, file-based routing:

```
src/app/
├── (stack)/
│   ├── (guarded)/    # Protected routes (requires auth)
│   └── (unguarded)/  # Public routes
└── (tab)/            # Bottom tab navigation
```

### Type Safety

Full TypeScript coverage with:
- Strict mode enabled
- Custom type definitions in `src/@types/`
- Type-safe navigation with typed routes
- Zod schemas for runtime validation

## 📊 Project Status

- **Version**: 0.1.0
- **Expo SDK**: 55.0 (Preview)
- **React Native**: 0.83.1
- **License**: See [LICENSE](./LICENSE)

## 🤝 Contributing

This is a base template project. When using this template for your own project:

- Follow the established project structure
- Maintain TypeScript strict mode
- Use Conventional Commits for commit messages
- Write tests for new features
- Update documentation as needed

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and test
bun test

# Lint your code
bun lint

# Commit with conventional commits
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

See [Contributing Guide](./docs/CONTRIBUTING.md) for detailed guidelines.

## 🆘 Support & Resources

### Documentation

- 📖 [Complete Documentation](./docs/)
- � [Getting Started Guide](./docs/GETTING_STARTED.md)
- 🏗️ [Project Structure](./docs/PROJECT_STRUCTURE.md)
- � [Development Guide](./docs/DEVELOPMENT.md)

### External Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [HeroUI Native Documentation](https://heroui.com/)

## 📄 License

See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using Expo and React Native**

[Documentation](./docs/) • [Getting Started](./docs/GETTING_STARTED.md)

</div>
