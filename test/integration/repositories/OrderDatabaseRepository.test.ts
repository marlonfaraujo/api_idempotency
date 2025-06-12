import Order from "../../../src/domain/entities/Order";
import PostgreDbServer from "../../../src/infra/database/PostgreDbServer";
import OrderDatabaseRepository from "../../../src/infra/repositories/OrderDatabaseRepository";
import { CryptoUuidGenerator } from "../../../src/infra/uuid/CryptoUuidGenerator";

test("Must create an order and after recording, perform a query in the bank and return the result.", async() => {
    const connection = new PostgreDbServer();
    const repository = new OrderDatabaseRepository(connection);

    const uuid = new CryptoUuidGenerator().generate();
    const newOrder = new Order(uuid, 105.00);
    await repository.save(newOrder);

    const orderCurrent = await repository.getById(uuid);

    expect(orderCurrent).toBeDefined();
    expect(orderCurrent?.orderId).toBe(uuid);

});