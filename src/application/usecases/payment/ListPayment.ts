import Payment from "../../../domain/entities/Payment";
import PaymentRepository from "../../../domain/repositories/PaymentRepository";

export default class ListPayment {
    
    constructor(readonly repository: PaymentRepository){

    }

    async execute(): Promise<Payment[]>{
        return await this.repository.get();
    }
}