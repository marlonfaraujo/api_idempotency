import Payment from "../../../domain/entities/Payment";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import PaymentRepository from "../../../domain/repositories/PaymentRepository";
import IdGeneratorAbstraction from "../../abstractions/IdGeneratorAbstraction";
import { PaymentRequestDto } from "../../dtos/PaymentRequestDto";
import { PaymentResultDto } from "../../dtos/PaymentResultDto";

export default class ProcessPayment {

    constructor(readonly paymentRepository: PaymentRepository,
        readonly orderRepository: OrderRepository,
        readonly idGenerator: IdGeneratorAbstraction){

    }

    async execute(dto: PaymentRequestDto): Promise<PaymentResultDto>{
        const order = await this.orderRepository.getById(dto.orderId);
        if (!order){
            throw new Error(`Not found order with id: ${dto.orderId}`);
        }
        const payment = new Payment(this.idGenerator.generate(), order.orderId, order.amount, dto.paymentType);
        await this.paymentRepository.save(payment);
        const result: PaymentResultDto = { paymentId: payment.paymentId, orderId: payment.orderId, amount: payment.amount, paymentType: payment.paymentType, status: payment.status }; 
        return result;
    }
}