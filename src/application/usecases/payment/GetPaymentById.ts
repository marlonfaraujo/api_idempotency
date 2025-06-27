import PaymentRepository from "../../../domain/repositories/PaymentRepository";
import { PaymentResultDto } from "../../dtos/PaymentResultDto";

export default class GetPaymentById {

    constructor(readonly repository: PaymentRepository){

    }

    async execute(id: string): Promise<PaymentResultDto>{
        const payment = await this.repository.getById(id);
        const result: PaymentResultDto = { paymentId: payment.paymentId, orderId: payment.orderId, amount: payment.amount, paymentType: payment.paymentType, status: payment.status };
        return result;
    }
}