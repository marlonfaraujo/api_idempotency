import Payment from "../entities/Payment";

export default interface PaymentRepository {
    save(payment: Payment): Promise<void>;
    getById(id: string): Promise<Payment>;
    update (id: string, payment: Payment): Promise<void>;
    get(): Promise<Payment[]>;
}