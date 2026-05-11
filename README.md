# KupiPodariDay — Wishlist Service Backend

NestJS backend for a wishlist service — users can create wishlists, add gift ideas, and share them with others.

## Tech Stack

![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/-TypeORM-F73B19?style=flat)
![Passport](https://img.shields.io/badge/-Passport-34E27A?style=flat&logo=passport&logoColor=black)

## Features

- Modular NestJS architecture (users, wishes, wishlists, offers)
- TypeORM with PostgreSQL and entity relationships
- JWT authentication via Passport (Local + JWT strategies)
- Password hashing with bcrypt
- DTO validation using class-validator and class-transformer
- Auto-generated API documentation with Swagger
- Git hooks via Husky + lint-staged + commitizen

## Getting Started

```bash
pnpm install
pnpm start:dev
```

The API will run on `http://localhost:3000`.
API documentation (Swagger) will be available at `http://localhost:3000/api`.

## Build

```bash
pnpm build
pnpm start:prod
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:cov
```

## About

This is a learning project from the **Web Development Master's program at NUST MISIS in partnership with Yandex Practicum**, focused on building a modular, well-structured backend with NestJS best practices: DTO validation, ORM-driven schema, authentication strategies, and auto-generated API docs.
