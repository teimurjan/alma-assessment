# Alma Assessment - Design and Architecture

## Overview

The Alma Assessment project is designed to provide a streamlined interface for managing leads through a public-facing form and a secured internal dashboard. The application is built with a clean architecture, leveraging modern technologies and best practices to ensure maintainability, scalability, and security.

## Architecture

The architecture of the Alma Assessment project follows a modular and layered approach, separating concerns and promoting reusability. The main components of the architecture are:

1. **Frontend (Next.js Application)**
2. **Backend (API Services)**
3. **Database (PostgreSQL)**
4. **Infrastructure (Docker)**

### Frontend

The frontend is built using [Next.js](https://nextjs.org/), a React framework that enables server-side rendering and static site generation. The frontend application is organized into the following directories:

- `app/`: Contains Next.js pages, layouts, and API routes.
- `components/`: Contains reusable React components, organized into subdirectories:
  - `context/`: React context providers.
  - `ui/`: Shared design system components.
  - `dumb/`: Data-free pure components.
  - `widgets/`: Components with data interactions.

### Backend

The backend is built using Node.js and TypeScript, following a service-oriented architecture. The backend application is organized into the following directories:

- `api/`: Contains the API services and related code, organized into subdirectories:
  - `config/`: Database configurations.
  - `dto/`: Data Transfer Objects for services.
  - `entities/`: ORM entities.
  - `repositories/`: Database interaction layer.
  - `services/`: Business logic implementations.
  - `routes/`: API endpoints (controllers).
  - `seed/`: Database seeding scripts.
  - `utils/`: API-specific utility functions.
  
---

### Database

The project uses [PostgreSQL](https://www.postgresql.org/) as the database management system. The database schema is managed using [TypeORM](https://typeorm.io/), an ORM for TypeScript and JavaScript.

---

## Design Principles

The design of the Alma Assessment project is guided by the following principles:

1. **Separation of Concerns**: Different layers and modules handle distinct responsibilities, promoting maintainability and scalability.
2. **Reusability**: Components and services are designed to be reusable across different parts of the application.
3. **Scalability**: The architecture supports scaling both horizontally and vertically to handle increased load.

---

## Data Flow

The data flow in the Alma Assessment project follows a clear and structured path:

1. **User Interaction**: Users interact with the frontend application through forms and dashboards.
2. **API Requests**: The frontend sends API requests to the backend services.
3. **Business Logic**: The backend services process the requests, applying business logic and interacting with the database.
4. **Database Operations**: The backend services perform CRUD operations on the PostgreSQL database using TypeORM.
5. **Response**: The backend services send responses back to the frontend, which updates the UI accordingly.

---

## Feature-Specific Flows

### Lead Form (`/`)

- Public form enabling lead submission.
- Core logic encapsulated in [`LeadForm`](./components/widgets/lead-form.tsx).
- Form generation driven by [JSON schema](./schema/lead-schema.json) using a custom wrapper [`CustomJsonForm`](./components/dumb/form/custom-json-form.tsx) around [JsonForms](https://jsonforms.io/).
- Validated form submissions trigger a POST request to [`POST lead route`](./api/routes/leads.ts).

### Internal Dashboard (`/internal`)

- Protected dashboard for authorized personnel to manage lead data.
- Uses [`InternalLeadsTable`](./components/widgets/internal-leads-table.tsx) for browsing and updating leads.
- Features include searching, pagination, and filtering through the dedicated [leads API](./api/routes/leads.ts).
- Access restricted exclusively to authenticated users.

### Sign In (`/sign-in`)

- Authentication page securing internal application features.
- Implements [`SignInForm`](./components/widgets/sign-in-form.tsx), leveraging JSONForms for consistent design.
- Authentication managed via the dedicated [`sign-in route`](./api/routes/sign-in.ts).
