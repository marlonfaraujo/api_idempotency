import Payment from "../../domain/entities/Payment";
import PaymentRepository from "../../domain/repositories/PaymentRepository";
import DatabaseConnection from "../database/DatabaseConnectionAbstraction";

export default class PaymentDatabaseRepository implements PaymentRepository {

    constructor(readonly connection: DatabaseConnection) {
        
    }

    async getById(id: string): Promise<Payment> {
        const [paymentData] = await this.connection.query("select * from sale.payment where payment_id = $1", [id]);
        return Payment.create(paymentData.payment_id, paymentData.order_id, paymentData.amount, paymentData.status, paymentData.payment_type, paymentData.created_at, paymentData.updatedAt);
    }

    async update(id: string, payment: Payment): Promise<void> {
        await this.connection.query("update sale.payment set status = $1, updatedAt = $2 where payment_id = $3", [payment.status, payment.updatedAt, payment.paymentId]);
    }

    async get(): Promise<Payment[]> {
        const paymentsData = await this.connection.query("select * from sale.payment", {});
        return paymentsData.map((x: any) => Payment.create(x.payment_id, x.order_id, x.amount, x.status, x.payment_type, x.created_at, x.updatedAt))
    }

    async save(payment: Payment): Promise<void> {
        await this.connection.query("insert into sale.payment (payment_id, order_id, amount, status, payment_type, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, $7)", 
            [payment.paymentId, payment.orderId, payment.amount, payment.status, payment.paymentType, payment.createdAt, payment.updatedAt]);   
    }

}