# BJIT SWAP Staging Branch 🔀

BJIT Swap is a decentralized exchange similar to uniswap.

---

## Installation

To set up the project, follow these steps:

1. Run the following command to install dependencies:

```bash
npm install
```

## Usage

### Production mode

To run the project in production mode and build the codebase, use the following commands:

1. Build the project

```bash
npm run build
```

2. Run the project

```bash
npm run start
```

This will launch the project in production mode.

### Development mode

To run the project in development mode, use the following commands. This project uses `ts-node` so we don't need to build the project.

```bash
npm run start:dev
```

This command runs the project for development.

## Additional Commands

### Linting with ESLint

Ensure code quality by running the ESLint linter:

```bash
npm run lint
```

### Code Formatting

```bash
npm run format
```

## Technologies Used

- **Programming Language:** [TypeScript](https://www.typescriptlang.org/)

- **Framework:** [Express](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Process Management** [PM2](https://pm2.keymetrics.io/)
- **API Documentation** [Swagger](https://swagger.io/)
- **Version Control:** [Git](https://git-scm.com/)
- **Dependency Management:** [npm](https://www.npmjs.com/)

### Middlewares

- **Security** [Cors](https://www.npmjs.com/package/cors), [Helmet](https://www.npmjs.com/package/helmet)
- **Data Validation** [Joi](https://www.npmjs.com/package/joi)
- **Log Management** [Winston](https://www.npmjs.com/package/winston), [Morgan](https://www.npmjs.com/package/morgan)
- **Payload Compression** [compression](https://www.npmjs.com/package/compression)

### External Services/APIs

- **Authentication:** [Passport](https://www.passportjs.org/)
- **Payment Processing:** [Stripe](https://stripe.com/)

---
