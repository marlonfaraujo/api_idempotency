import { PaymentDto } from "../../../api/dtos/PaymentDto";
import Payment from "../../../domain/entities/Payment";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import PaymentRepository from "../../../domain/repositories/PaymentRepository";
import IdGeneratorAbstraction from "../../abstractions/IdGeneratorAbstraction";

export default class ProcessPayment {

    constructor(readonly paymentRepository: PaymentRepository,
        readonly orderRepository: OrderRepository,
        readonly idGenerator: IdGeneratorAbstraction){

    }

    async execute(dto: PaymentDto): Promise<Payment>{
        const order = await this.orderRepository.getById(dto.orderId);
        if (!order){
            throw new Error(`Not found order with id: ${dto.orderId}`);
        }
        const payment = new Payment(this.idGenerator.generate(), order.orderId, order.amount, dto.paymentType);
        await this.paymentRepository.save(payment);

        return payment;
    }
}