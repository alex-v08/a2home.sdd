# A2Home - Uber for Home Services

## Project Overview
A2Home is an on-demand platform connecting customers with home service professionals (plumbing, electricity, cleaning, etc.) in real-time.

## Project Structure (Monorepo)
```text
.
├── apps/
│   ├── web/                # Next.js Application
│   ├── mobile/             # React Native (Expo) Application
│   └── api/                # NestJS Microservices (Gateway + Core Services)
├── packages/
│   ├── core/               # Shared Domain Logic (Entities, Use Cases)
│   ├── ui/                 # Shared UI Components (Cross-platform compatible)
│   └── config/             # Shared configuration (ESLint, TSConfig)
├── docs/                   # Documentation
├── SPEC.md                 # Product Specification (Source of Truth)
└── ARCHITECTURE_DECISION.md # Technical Decisions
```

## Tech Stack
- **Languages:** TypeScript
- **Frontend:** Next.js (Web), React Native/Expo (Mobile)
- **Backend:** NestJS (Microservices)
- **Database:** PostgreSQL + PostGIS
- **Auth:** Keycloak
- **Infra:** Docker, Turborepo

## Getting Started
(Instructions to be added as setup progresses)
