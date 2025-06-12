import Payment from "../../../domain/entities/Payment";
import PaymentRepository from "../../../domain/repositories/PaymentRepository";

export default class GetPaymentById {

    constructor(readonly repository: PaymentRepository){

    }

    async execute(id: string): Promise<Payment>{
        return await this.repository.getById(id);
    }
}