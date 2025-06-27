import Payment from "../../../domain/entities/Payment";
import PaymentRepository from "../../../domain/repositories/PaymentRepository";
import { PaymentResultDto } from "../../dtos/PaymentResultDto";

export default class ListPayment {
    
    constructor(readonly repository: PaymentRepository){

    }

    async execute(): Promise<PaymentResultDto[]>{
        const payments = await this.repository.get();
        const results : PaymentResultDto[] = payments.map((payment: Payment) => 
            ({ 
                paymentId: payment.paymentId, 
                orderId: payment.orderId, 
                amount: payment.amount, 
                paymentType: payment.paymentType, 
                status: payment.status
            }
        ));
        return results;
    }
}