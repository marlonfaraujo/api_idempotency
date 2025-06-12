import Order from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import DatabaseConnection from "../database/DatabaseConnectionAbstraction";

export default class OrderDatabaseRepository implements OrderRepository {

    constructor(readonly connection: DatabaseConnection){

    }

    async save(order: Order): Promise<void> {
        await this.connection.query("insert into sale.order (order_id, amount, status, created_at) values ($1, $2, $3, $4)", 
            [order.orderId, order.amount, order.status, order.createdAt]);  
    }

    async getById(id: string): Promise<Order | undefined> {
        const [orderData] = await this.connection.query("select * from sale.order where order_id = $1", [id]);
        if(!orderData){
            return undefined;
        }
        return Order.create(orderData.order_id, orderData.amount, orderData.status, orderData.created_at);
    }

}