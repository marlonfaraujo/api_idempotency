export default interface CacheConnectionAbstraction {
    connect(): Promise<void>;
    set(key: string, data: string, options?: any): Promise<void>;
    get(key: string): Promise<any>;
    close(): Promise<void>;
} 