# LinkedIn Profile API

A REST API that retrieves and normalizes publicly available LinkedIn profile information through a pluggable profile provider.

## Features

- LinkedIn profile URL validation
- Provider abstraction
- Scrappa provider integration
- Profile data normalization
- In-memory caching
- Configurable cache TTL
- Structured error handling
- Swagger/OpenAPI documentation
- Unit and integration tests
- TypeScript + Fastify

## Tech Stack

- Node.js
- TypeScript
- Fastify
- Zod
- Vitest
- Swagger / OpenAPI
- Scrappa

## Architecture

The application separates API handling, business logic, provider integration, mapping, and caching.

```text
HTTP Request
     |
     v
Profile Route
     |
     v
Profile Service
     |
     +------> Cache
     |
     v
Profile Extractor
     |
     v
Provider Client
     |
     v
Scrappa
     |
     v
Scrappa Mapper
     |
     v
Normalized Profile