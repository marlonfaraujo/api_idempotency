import Order from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import IdGeneratorAbstraction from "../../abstractions/IdGeneratorAbstraction";

export default class CreateOrder {

    constructor(readonly repository: OrderRepository,
        readonly idGenerator: IdGeneratorAbstraction
    ){

    }

    async execute(dto: OrderDto): Promise<Order>{
        const order = new Order(this.idGenerator.generate(), dto.amount);
        await this.repository.save(order);
        return order;
    }
}

type OrderDto = {
    amount: number    
}