# Architecture Decision Records (ADR) - A2Home

## ADR 001: Tech Stack Selection

### Context
We need a platform that supports Web (PWA) and Mobile (Native iOS/Android) for a "Uber for Services" model. Real-time geotracking, payments, and professional matching are key.

### Decision
1.  **Backend**: **Node.js with NestJS**.
    *   *Rationale*: Facilitates a TypeScript-first monorepo. NestJS provides a robust framework for Hexagonal Architecture and Microservices.
2.  **Mobile**: **React Native + Expo**.
    *   *Rationale*: Best-in-class code sharing with Web when using TypeScript. Expo simplifies development for maps and notifications.
3.  **Web**: **Next.js**.
    *   *Rationale*: Optimized for SEO (important for a service marketplace) and shares the same ecosystem as React Native.
4.  **Database**: **PostgreSQL + PostGIS**.
    *   *Rationale*: Industry standard for geospatial queries (finding nearby providers).
5.  **Event Bus**: **RabbitMQ / Redis PubSub**.
    *   *Rationale*: Required for asynchronous communication between services and real-time updates.

---

## ADR 002: Architecture Pattern

### Context
The project requires high testability and separation of concerns.

### Decision
**Microservices with Hexagonal Architecture (Clean Architecture)**.
*   *Implementation*: Organized within a **Turborepo** monorepo.
*   *Shared Logic*: A `packages/core` package containing domain entities, use cases, and validation logic in pure TypeScript (zero dependencies where possible).

---

## ADR 003: MCP Strategy (Model Context Protocol)

### Decision
We will utilize the following MCP servers to accelerate development:
1.  **Postgres MCP**: For schema management and data exploration.
2.  **Google Maps MCP**: For validating address logic and calculating distances.
3.  **Keycloak/Auth MCP**: For managing identity providers and JWT validation logic.

---

## ADR 004: LLM Strategy

### Decision
1.  **Design & Architecture**: Claude 3.5 Sonnet.
2.  **Frontend/UI Implementation**: Claude 3.5 Sonnet (for Tailwind/React components).
3.  **Backend Logic & Hexagonal Adapters**: Claude 3.5 Sonnet.
4.  **Unit/Integration Testing**: GPT-4o-mini.
