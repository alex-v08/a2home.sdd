# ARCHITECTURE DECISION: A2Home Platform

## 1. Resumen del Negocio
A2Home es una plataforma on-demand ("Uber para servicios") que conecta clientes con profesionales del hogar. Requiere alta confiabilidad en geolocalización, chat en tiempo real, gestión de pagos y una experiencia de usuario fluida tanto en Web como en Mobile.

## 2. Patrón Arquitectónico: Monolito Modular (Modulith)
**Decisión:** Se opta por un **Monolito Modular** en lugar de Microservicios para la fase inicial.
**Justificación:**
- **Equipo/Fase:** Al ser un desarrollo inicial/MVP, un monolito modular reduce drásticamente la complejidad de despliegue y la sobrecarga de red (latencia).
- **Consistencia:** Facilita la gestión de transacciones y la integridad de datos entre módulos (Booking, Payment, User).
- **Escalabilidad Futura:** Los módulos estarán claramente desacoplados siguiendo Clean Architecture, permitiendo extraer microservicios específicos (ej. Tracking o Chat) si la carga lo requiere.

## 3. Stack Tecnológico

### Backend: Node.js (TypeScript) + NestJS
- **Razón:** Agilidad de desarrollo, excelente soporte para WebSockets (Socket.io) para chat y tracking, y facilidad para compartir tipos con el frontend mediante TypeScript.
- **Base de Datos:** PostgreSQL con extensión **PostGIS** para consultas geoespaciales avanzadas (necesario para el matching de proveedores cercanos).

### Frontend & Mobile: Expo (React Native) + Solito (Next.js)
- **Razón:** Se utilizará un **Monorepo** para compartir el 100% de la lógica de negocio, hooks y componentes de UI entre la Web y las Apps Mobile.
- **Navegación:** Solito para unificar la navegación entre Next.js y React Native.

### Infraestructura:
- **Autenticación:** Keycloak (Integración mediante OpenID Connect).
- **Cache/Real-time:** Redis para manejo de sesiones y pub/sub de coordenadas en tiempo real.

## 4. Ecosistema MCP
Se integrarán los siguientes servidores para potenciar al agente de desarrollo:
1. **Google Maps MCP:** Para validar implementaciones de tracking y cálculo de rutas.
2. **PostgreSQL MCP:** Para generación automática de migraciones y esquemas Prisma/TypeORM.
3. **GitHub MCP:** Para gestionar el progreso de las tareas y documentación técnica.

## 5. Estrategia de IA (LLMOps)
- **Agente Arquitecto:** `claude-3-5-sonnet` o `deepseek-r1` (Razonamiento de alto nivel).
- **Agente Desarrollador:** `deepseek-coder-v2` o `gpt-4o` (Generación de código eficiente).
- **Ejecución Local (opcional):** `ollama pull qwen2.5-coder:7b` para tareas de refactorización rápidas.

## 6. Estructura de Carpetas (Monorepo)
```text
/a2home-sdd/
├── apps/
│   ├── web/                # Next.js Application
│   └── mobile/             # Expo/React Native Application
├── packages/
│   ├── api/                # NestJS Backend
│   ├── core/               # Domain Models, Use Cases (Shared)
│   ├── ui/                 # Shared UI Components
│   └── config/             # Shared ESLint, TSConfig, Tailwind
├── .opencode/              # SDD Skills
└── SPEC.md                 # Project Roadmap
```
