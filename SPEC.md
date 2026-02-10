# SPEC: A2Home - Plataforma On-Demand de Servicios (Uber for Services)

## 1. Visión del Producto
Crear una plataforma "Uber-like" para servicios del hogar (Plomería, Electricidad, Limpieza, etc.), conectando clientes con profesionales en tiempo real mediante geolocalización, pagos integrados y confianza garantizada.

### 1.1 Plataformas Objetivo
- **Web:** Portal administrativo y Cliente (PWA/Responsive).
- **Mobile:** App nativa (iOS/Android) para Clientes y Proveedores (foco en Geolocalización y Notificaciones).

## 2. Arquitectura de Alto Nivel
El sistema debe seguir principios de **Clean Architecture (Hexagonal)** tanto en Backend como en Frontend para maximizar la reutilización de código y la testabilidad.

### 2.1 Backend (Referencia: a2home.v2)
- **Patrón:** Microservicios Hexagonales.
- **Servicios Core:** User, Provider, Booking, Chat, Payment, Notification, Gateway.
- **Infraestructura:** Docker, Keycloak, Postgres/PostGIS, Kafka/RabbitMQ (Eventos).

### 2.2 Frontend (Mobile + Web)
- **Desafío:** Compartir lógica de negocio (Casos de uso, Validaciones, Modelos) entre Web y Mobile.
- **Propuesta Inicial:** Monorepo con paquete `core-logic` compartido.

## 3. Funcionalidades Detalladas

### Módulo A: Identidad & Perfiles (Identity Domain)
- [ ] Autenticación Centralizada (Keycloak/Auth0).
- [ ] Registro Diferenciado (Cliente vs Profesional).
- [ ] Verificación de Identidad (Subida de DNI, Matrícula).
- [ ] Perfiles con Reputación (Scoring 0-5 estrellas).

### Módulo B: Discovery & Matching (Match Domain)
- [ ] Geolocalización en Tiempo Real (Profesionales cercanos).
- [ ] Algoritmo de Matching (Cercanía + Rating + Disponibilidad).
- [ ] "Solicitud Inmediata" (Broadcast a proveedores cercanos).
- [ ] Cotización Dinámica (Estimación de costo base).

### Módulo C: Ejecución & Tracking (Booking Domain)
- [ ] Ciclo de Estado: Solicitado -> Aceptado -> En Camino -> En Progreso -> Finalizado.
- [ ] Live Tracking (Mapa en vivo del profesional llegando).
- [ ] Chat en Tiempo Real (WebSockets) con envío de fotos.
- [ ] Botón de Pánico / Seguridad.

### Módulo D: Finanzas (Finance Domain)
- [ ] Billetera Virtual (Saldo a favor).
- [ ] Pasarela de Pagos (MercadoPago / Stripe).
- [ ] Hold/Escrow (Retención del pago hasta finalizar).
- [ ] Split de Pagos (Comisión Plataforma vs Pago Profesional).

## 4. Roadmap de Desarrollo (SDD)

### Fase 0: Definición Tecnológica y Setup
- [x] **ANALYSIS**: Evaluar y Definir Stack Tecnológico definitivo para "Mobile + Web" maximizando código compartido. (¿React Native + Next.js? ¿Flutter? ¿Expo?). Generar `ARCHITECTURE_DECISION.md`.
- [x] **SETUP**: Inicializar Monorepo/Repositorio con la estructura base elegida.

### Fase 1: Core Domain (Lógica Pura)
- [x] Definir Entidades del Dominio (User, Service, Booking).
- [ ] Implementar Casos de Uso Core (Login, CreateRequest, MatchProvider).

### Fase 2: Adaptadores Backend (Microservicios)
- [ ] Migrar/Adaptar servicios existentes a la nueva especificación estricta.

### Fase 3: UI Implementation
- [ ] Implementar UI Web (Next.js).
- [ ] Implementar UI Mobile.

### Fase 4: Integración Real-Time
- [ ] Chat y Tracking.

---
**Instrucciones para Agentes:**
Este archivo es la fuente de la verdad. Si una tarea está marcada como `[ ]`, es prioritaria. Al terminar, marcar con `[x]`.
