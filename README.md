# Alma Assessment

## Overview

This project provides a streamlined interface for managing leads through a public-facing form and a secured internal dashboard. Built with robust tools and clean architecture, it facilitates efficient data management and user authorization.

---

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or later)
- [npm](https://www.npmjs.com/) (v10.x or later)
- [Docker](https://www.docker.com/)

### Installation

1. **Clone the Repository**:

```sh
git clone https://github.com/teimurjan/alma-assessment.git
cd alma-assessment
```

2. **Install Dependencies**:

```sh
npm install
```

3. **Configure Environment Variables**:

Copy the example environment files and customize them as necessary:

```sh
cp .env.example .env
cp .env.docker.example .env.docker
```

4. **Start the Database**:

Make sure Docker is running, then execute:

```sh
make up
```

5. **Seed the Database**:

Since there is no registration flow, seed a user with the provided script:

```sh
env DATABASE_URL=postgresql://test:test1234@localhost:5432/alma ADMIN_PASSWORD=Admin1234 npm run seed
```

Replace `DATABASE_URL` with the URL from your `.env` file and set `ADMIN_PASSWORD` according to validation rules.

6. **Run the Application**:

Start the development server:

```sh
npm run dev
```

The app will be accessible at [http://localhost:3000](http://localhost:3000).

---


## Next Steps

- **Check [DESIGN.md](./DESIGN.md)**