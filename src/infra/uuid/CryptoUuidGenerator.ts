import crypto from "crypto";
import IdGeneratorAbstraction from "../../application/abstractions/IdGeneratorAbstraction";

export class CryptoUuidGenerator implements IdGeneratorAbstraction{
    
    generate(): string {
        return crypto.randomUUID();
    }

}