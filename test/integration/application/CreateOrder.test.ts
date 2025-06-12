import CreateOrder from "../../../src/application/usecases/order/CreateOrder";
import PostgreDbServer from "../../../src/infra/database/PostgreDbServer";
import OrderDatabaseRepository from "../../../src/infra/repositories/OrderDatabaseRepository";
import { CryptoUuidGenerator } from "../../../src/infra/uuid/CryptoUuidGenerator"

test("Must create order and not return undefined", async() =>{
    const uuid = new CryptoUuidGenerator();
    const connection = new PostgreDbServer();
    const repository = new OrderDatabaseRepository(connection);
    const createOrder = new CreateOrder(repository, uuid);
    const order = await createOrder.execute({ amount: 55.70 });
    const orderData = await repository.getById(order.orderId);

    expect(order).toBeDefined();
    expect(orderData).toBeDefined();
})