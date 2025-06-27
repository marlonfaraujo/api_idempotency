import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { OrderResultDto } from "../../dtos/OrderResultDto";

export default class GetOrderById {

    constructor(readonly repository: OrderRepository){
    }

    async execute(id: string): Promise<OrderResultDto | undefined>{
        const order = await this.repository.getById(id);
        const result: OrderResultDto = { 
            orderId: order?.orderId!,
            amount: order?.amount!,
            status: order?.status!,
            createdAt: order?.createdAt! 
        };
        return result;
    }
}