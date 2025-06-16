import IdGeneratorAbstraction from "../application/abstractions/IdGeneratorAbstraction";
import DatabaseConnectionAbstraction from "../infra/database/DatabaseConnectionAbstraction";
import PostgreDbServer from "../infra/database/PostgreDbServer";
import OrderDatabaseRepository from "../infra/repositories/OrderDatabaseRepository";
import PaymentDatabaseRepository from "../infra/repositories/PaymentDabaseRepository";
import { CryptoUuidGenerator } from "../infra/uuid/CryptoUuidGenerator";
import HealthCheck from "./features/HealthCheck";
import OrderFeature from "./features/OrderFeature";
import HttpServer from "./HttpServer";

export default class Router {

    private readonly uuid: IdGeneratorAbstraction;
    private readonly connection: DatabaseConnectionAbstraction;

    constructor(readonly httpServer: HttpServer){
        this.uuid = new CryptoUuidGenerator();
        this.connection = new PostgreDbServer();
    }

    config(): void{
        const orderRepository = new OrderDatabaseRepository(this.connection);
        const paymentRepository = new PaymentDatabaseRepository(this.connection);
        const orderFeature = new OrderFeature(this.httpServer, paymentRepository, orderRepository, this.uuid);
        orderFeature.config();
        const healthCheck = new HealthCheck(this.httpServer);
        healthCheck.config();
    }
}