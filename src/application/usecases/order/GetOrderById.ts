import Order from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export default class GetOrderById {

    constructor(readonly repository: OrderRepository){
    }

    async execute(id: string): Promise<Order | undefined>{
        const order = await this.repository.getById(id);
        return order;
    }
}