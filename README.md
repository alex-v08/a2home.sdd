# A2Home - Uber for Home Services

## Project Overview
A2Home is an on-demand platform connecting customers with home service professionals (plumbing, electricity, cleaning, etc.) in real-time.

**Built with Spec-Driven Development (SDD)** - Automated construction using AI agents and clean architecture principles.

## Monorepo Structure
```text
.
├── apps/
│   ├── web/                # Next.js Web Application
│   ├── mobile/             # React Native (Expo) Application
├── packages/
│   ├── core/               # Shared Domain Logic (Entities, Use Cases)
│   ├── ui/                 # Shared UI Components (Cross-platform)
│   ├── api/                # NestJS Backend (API + WebSockets)
├── tests/
│   ├── e2e/                # Playwright End-to-End Tests
├── docs/                   # Documentation
├── SPEC.md                 # Product Specification (Source of Truth)
├── ARCHITECTURE_DECISION.md # Technical Decisions (ADRs)
└── README.md               # This file
```

## Tech Stack
- **Languages:** TypeScript
- **Frontend:** Next.js (Web), React Native/Expo (Mobile)
- **Backend:** NestJS (Hexagonal Architecture)
- **Database:** PostgreSQL + Prisma ORM + PostGIS
- **Auth:** JWT (Passport)
- **Real-time:** Socket.IO (WebSockets)
- **Testing:** Jest (Unit), Playwright (E2E)
- **Docs:** Swagger/OpenAPI

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation
```bash
# Install dependencies for all packages
npm install --workspace=packages/core
npm install --workspace=packages/api
npm install --workspace=packages/ui
npm install --workspace=apps/web
```

### Running the Backend API
```bash
cd packages/api
npm install
npm start
# API: http://localhost:3000
# Swagger: http://localhost:3000/api/docs
```

### Running the Web App
```bash
cd apps/web
npm install
npm run dev
# Web: http://localhost:3001
```

### Running the Mobile App
```bash
cd apps/mobile
npm install
npm start
# Follow Expo instructions in terminal
```

## Testing

### Unit Tests (Core Domain)
```bash
cd packages/core
npm test
```

### E2E Tests (Full Flow)
```bash
npm run test:e2e
npm run test:e2e:report  # View HTML report
```

## Key Features Implemented
✅ **Hexagonal Architecture**: Clean separation between domain, application, and infrastructure
✅ **Cross-Platform UI**: Shared components between Web and Mobile
✅ **JWT Authentication**: Secure token-based auth with Guards
✅ **Real-Time Updates**: WebSocket notifications for instant booking confirmations
✅ **Database Persistence**: PostgreSQL with Prisma ORM
✅ **API Documentation**: Interactive Swagger UI
✅ **Comprehensive Testing**: Unit tests + E2E automation

## Development Workflow

### Creating a New Feature
1. Define domain entities/value objects in `packages/core/src/domain/model/`
2. Create use cases in `packages/core/src/application/use-cases/`
3. Define port interfaces in `packages/core/src/domain/ports/`
4. Implement adapters in `packages/api/src/infrastructure/`
5. Create HTTP controllers in `packages/api/src/`
6. Build UI components in `packages/ui/src/components/`
7. Integrate in `apps/web` and `apps/mobile`
8. Write unit tests for core logic
9. Write E2E tests for critical flows

## Documentation
- [SPEC.md](./SPEC.md) - Product specification
- [ARCHITECTURE_DECISION.md](./ARCHITECTURE_DECISION.md) - Technical decisions
- [API README](./packages/api/README.md) - Backend architecture
- [E2E Tests](./tests/e2e/README.md) - Testing documentation

## License
MIT
