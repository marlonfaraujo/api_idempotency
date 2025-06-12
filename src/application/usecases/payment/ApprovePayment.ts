import PaymentRepository from "../../../domain/repositories/PaymentRepository";

export default class ApprovePayment {

    constructor(readonly repository: PaymentRepository){

    }

    async execute(id: string): Promise<void>{
        const currentPayment = await this.repository.getById(id);
        if(!currentPayment){
            throw new Error(`Not found payment with id: ${id}`);
        }
        currentPayment.approve();
        await this.repository.update(id, currentPayment);
    }
}