import { createClient } from "redis";
import CacheConnectionAbstraction from "./CacheConnectionAbstraction";

export default class RedisCache implements CacheConnectionAbstraction {

    private client: any;

    constructor(){
        this.client = createClient({
            url: "redis://:r3d1s@idempotency_api_redis:6379"
        });
    }

    async connect(): Promise<void>{
        await this.client.connect();
    }

    async set(key: string, data: string, options?: any): Promise<void>{
        this.connect();
        let opt = {};
        if (options){
            if(options.expiration){
                opt = { EX: options.expiration };
            }
        }
        await this.client.set(key, data, opt);
        this.close();
    }
    
    async get(key: string): Promise<any>{
        this.connect();
        const result = await this.client.get(key);
        this.close();
        return result;
    }

    async close(): Promise<void>{
        this.client.destroy();
    }
}