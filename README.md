Repository with a brief example of how to work with idempotency, to ensure that a request even if repeated, is processed only once.

Here will still have redis for cache and devcontainer.

### Technologies and tools used:
* **Databases - Persistence**:
   1. [Redis](https://redis.io/) - Redis is a fast and versatile in-memory database ideal for caching;
   2. [PostgreSQL](https://www.postgresql.org/) - PostgreSQL was used for relational database;
   3. [Pg-promise](https://www.npmjs.com/package/pg-promise) - Node.js library for accessing PostgreSQL databases with promise support.
* **Languages**:
   1. [Typescript](https://www.typescriptlang.org/) - To improve maintainability and productivity in backend development.
* **Frameworks**:
   1. [Express](https://expressjs.com/) - Used to build APIs and web applications, simplifying the management of routes, requests, responses, middleware and errors;
   2. [Compression](https://www.npmjs.com/package/compression) - Applies Gzip or Brotli compression to HTTP responses.
* **Testing**:
   1. [Jest](https://www.npmjs.com/package/jest) - Automated testing framework;
   2. [Axios](https://www.npmjs.com/package/axios) - Promise-based HTTP library for Node.js and browsers. Used to make HTTP/HTTPS requests.
* **Container Technology**:
   1. [Docker](https://www.docker.com/) - Containerizing the application to facilitate testing.
* **Tools**:
   1. [Dev Container](https://containers.dev/) - Visual Studio Code feature that allows you to define isolated development environments using Docker containers
