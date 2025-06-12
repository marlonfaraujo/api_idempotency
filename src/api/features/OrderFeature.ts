import IdGeneratorAbstraction from "../../application/abstractions/IdGeneratorAbstraction";
import GetOrderById from "../../application/usecases/order/GetOrderById";
import ProcessPayment from "../../application/usecases/payment/ProcessPayment";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import PaymentRepository from "../../domain/repositories/PaymentRepository";
import RedisCache from "../../infra/database/RedisCache";
import { PaymentDto } from "../dtos/PaymentDto";
import HttpError from "../exceptions/HttpError";
import HttpServer from "../HttpServer";
import IdempotencyMiddleware from "../middleware/IdempotencyMiddleware";

export default class OrderFeature {
    
    ttlSeconds: number = 300 as const; //5 minutes
    idempotencyMiddleware: IdempotencyMiddleware;

    constructor(readonly httpServer: HttpServer, 
        readonly paymentRepository: PaymentRepository,
        readonly orderRepository: OrderRepository,
        readonly idGenerator: IdGeneratorAbstraction) {

            this.idempotencyMiddleware = new IdempotencyMiddleware(new RedisCache(), this.ttlSeconds);
        }

    config(): void {
        this.httpServer.route("post", "/order/:orderId/payment", 
            this.idempotencyMiddleware.handler, 
            async (req: any, res: any) => {
                const dto : PaymentDto = req.body;
                dto.orderId = req.params.orderId;
                const processPayment = new ProcessPayment(this.paymentRepository, this.orderRepository, this.idGenerator);
                const payment = await processPayment.execute(dto);
                
                return res.status(201).json(payment);
		    }
        );

        
        this.httpServer.route("get", "/order/:orderId", 
            async (req: any, res: any) => {
                const getOrder = new GetOrderById(this.orderRepository);
                const order = await getOrder.execute(req.params.orderId);
                if(!order){
                    const error = new HttpError(`Not found order with id: ${req.params.orderId}`, 400);
                    throw error;
                }
                return res.json(order);
		    }
        );
        
    }
    
        
}