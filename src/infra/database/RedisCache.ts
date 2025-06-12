import { createClient } from "redis";
import CacheConnectionAbstraction from "./CacheConnectionAbstraction";

export default class RedisCache implements CacheConnectionAbstraction {

    private client: any;

    constructor(){
        this.client = createClient({
            url: "redis://:r3d1s@redis:6379"
        });
        this.connect();
    }

    async connect(): Promise<void>{
        await this.client.connect();
    }

    async set(key: string, data: string, options?: any): Promise<void>{
        let opt = {};
        if (options){
            if(options.expiration){
                opt = { EX: options.expiration };
            }
        }
        await this.client.set(key, data, opt);
    }
    
    async get(key: string): Promise<any>{
        return await this.client.get(key);
    }

    async close(): Promise<void>{
        this.client.destroy();
    }
}