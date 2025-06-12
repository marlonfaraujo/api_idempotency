import { PaymentStatus } from "../enums/PaymentStatus";

export default class Payment {

    readonly paymentId: string;
    orderId: string;
    amount: number;
    status: string;
    paymentType: string;
    createdAt: Date;
    updatedAt: Date | null;

    constructor(paymentId: string, orderId: string, amount: number, paymentType: string){
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.amount = amount;
        this.status = PaymentStatus.PENDING;
        this.paymentType = paymentType;
        this.createdAt = new Date();
        this.updatedAt = null;
    }

    static create(paymentId: string, orderId: string, amount: number, status: string, paymentType: string, createdAt: Date, updatedAt: Date): Payment{
        const payment = new Payment(paymentId, orderId, amount, paymentType);
        payment.status = status;
        payment.createdAt = createdAt;
        payment.updatedAt = updatedAt;
        return payment;
    }

    approved(): void{
        this.status = PaymentStatus.APPROVED;
        this.updatedAt = new Date();
    }

    cancel(): void{
        this.status = PaymentStatus.CANCELLED;
        this.updatedAt = new Date();
    }
}