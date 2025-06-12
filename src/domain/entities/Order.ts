import { OrderStatus } from "../enums/OrderStatus";

export default class Order {

    readonly orderId: string;
    amount: number;
    status: string;
    createdAt: Date;

    constructor(orderId: string, amount: number) {
        this.orderId = orderId;
        this.amount = amount;
        this.status = OrderStatus.CREATED;
        this.createdAt = new Date();
    }

    static create(orderId: string, amount: number, status: string, createdAt: Date): Order {
        const order = new Order(orderId, amount);
        order.status = status;
        order.createdAt = createdAt;
        return order;
    }

    cancel(): void{
        this.status = OrderStatus.CANCELLED;
    }
}