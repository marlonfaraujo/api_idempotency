Repository with a brief example of how to work with idempotency, to ensure that a request even if repeated, is processed only once.

Here will still have redis for cache and devcontainer.

### More about:
In the IdempotencyMiddleware.ts class, the middleware first checks if the "Idempotency-Key" header is present and contains a value. This key is used to prevent duplicate processing of the same request.

Next, it verifies whether a corresponding response is already stored in the Redis cache. If found, it indicates the request has been processed before, and the cached result should be returned to ensure idempotency and avoid re-executing the operation.
Note: It is essential to set an expiration time for the cache.
```ts
//class src/api/middleware/IdempotencyMiddleware.ts
async handler(req: any, res: any, next: any){
   const key = req.header('Idempotency-Key');
   if (!key) {
      return res.status(400).json({ error: 'Missing Idempotency-Key header' });
   }
   const cached = await this.cache.get(key);
   if (cached) {
      const parsed = JSON.parse(cached);
      return res.status(201).json(parsed);
   }
   const jsonHandler = res.json.bind(res);
   res.json = (body: any) => {
      if (res.statusCode < 400) {
          this.cache.set(key, JSON.stringify(body), {
              expiration: this.ttlSeconds
          });
      }
      return jsonHandler(body);
   };
   next();
}
```
In the request route declaration, inform the middleware method.
```ts
//class src/api/features/OrderFeature.ts
this.httpServer.route("post", "/order/:orderId/payment", 
   this.idempotencyMiddleware.handler, 
   this.asyncHandler.wrapper(async (req: any, res: any) => {
       const dto : PaymentDto = req.body;
       dto.orderId = req.params.orderId;
       const processPayment = new ProcessPayment(this.paymentRepository, this.orderRepository, this.idGenerator);
       const payment = await processPayment.execute(dto);
       
       return res.status(201).json(payment);
   }),
   this.errorMiddleware.handler
);
```
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
