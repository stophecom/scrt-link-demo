# SCRT Link Demo

A minimalistic web project demonstrating the usage of the `@scrt-link/client` package.


## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

## How to use `@scrt-link/client`

The `@scrt-link/client` package allows you to create secrets using the scrt.link API.

### Basic Usage

To use the client, you need an API key. See main.ts for a reference implementation. 

```typescript
import { scrtLink, SecretType } from '@scrt-link/client';

// Instantiate client with your API key
const client = scrtLink('your-api-key-here');

// Create a secret
const createResponse = await client.createSecret('Your secret content', {
  secretType: SecretType.TEXT, // optional, defaults to TEXT
});

if (createResponse.secretLink) {
  console.log('Secret Link:', createResponse.secretLink);
}
```

### Options

The `createSecret` function accepts an optional `Options` object:

```typescript
await client.createSecret(content, {
  secretType: SecretType.TEXT, // or SecretType.NEOGRAM, SecretType.REDIRECT
  password: 'optional-password',
  expiresIn: 86400000, // expiration in milliseconds
  publicNote: 'Note visible to anyone',
  host: 'scrt.link' // or your custom host
});
```

## Build
To build the project for production:
```bash
npm run build
```
The output will be in the `dist/` directory.
