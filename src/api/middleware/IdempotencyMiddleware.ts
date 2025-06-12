import CacheConnectionAbstraction from "../../infra/database/CacheConnectionAbstraction";

export default class IdempotencyMiddleware {

    constructor(readonly cache: CacheConnectionAbstraction,
        readonly ttlSeconds: number
    ){
        this.handler = this.handler.bind(this);
    }

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
}