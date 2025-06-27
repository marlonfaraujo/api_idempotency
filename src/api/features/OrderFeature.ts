import IdGeneratorAbstraction from "../../application/abstractions/IdGeneratorAbstraction";
import { PaymentRequestDto } from "../../application/dtos/PaymentRequestDto";
import GetOrderById from "../../application/usecases/order/GetOrderById";
import ProcessPayment from "../../application/usecases/payment/ProcessPayment";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import PaymentRepository from "../../domain/repositories/PaymentRepository";
import RedisCache from "../../infra/database/RedisCache";
import AsyncHandler from "../AsyncHandler";
import HttpError from "../exceptions/HttpError";
import HttpServer from "../HttpServer";
import ErrorMiddleware from "../middleware/ErrorMiddleware";
import IdempotencyMiddleware from "../middleware/IdempotencyMiddleware";

export default class OrderFeature {
    
    ttlSeconds: number = 300 as const; //5 minutes
    idempotencyMiddleware: IdempotencyMiddleware;
    errorMiddleware: ErrorMiddleware;
    asyncHandler: AsyncHandler;

    constructor(readonly httpServer: HttpServer, 
        readonly paymentRepository: PaymentRepository,
        readonly orderRepository: OrderRepository,
        readonly idGenerator: IdGeneratorAbstraction) {

            this.idempotencyMiddleware = new IdempotencyMiddleware(new RedisCache(), this.ttlSeconds);
            this.errorMiddleware = new ErrorMiddleware();
            this.asyncHandler = new AsyncHandler();
        }

    config(): void {
        this.httpServer.route("post", "/order/:orderId/payment", 
            this.idempotencyMiddleware.handler, 
            this.asyncHandler.wrapper(async (req: any, res: any) => {
                const request : PaymentRequestDto = req.body;
                request.orderId = req.params.orderId;
                const processPayment = new ProcessPayment(this.paymentRepository, this.orderRepository, this.idGenerator);
                const payment = await processPayment.execute(request);
                return res.status(201).json(payment);
            }),
            this.errorMiddleware.handler
        );

        
        this.httpServer.route("get", "/order/:orderId", 
            this.asyncHandler.wrapper(async (req: any, res: any) => {
                const getOrder = new GetOrderById(this.orderRepository);
                const order = await getOrder.execute(req.params.orderId);
                if(!order){
                    const error = new HttpError(`Not found order with id: ${req.params.orderId}`, 400);
                    throw error;
                }
                return res.json(order);
            }),
            this.errorMiddleware.handler
        );
        
    }
    
        
}