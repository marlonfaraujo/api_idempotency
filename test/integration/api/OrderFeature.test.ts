import axios from "axios";
import { CryptoUuidGenerator } from "../../../src/infra/uuid/CryptoUuidGenerator";
import PostgreDbServer from "../../../src/infra/database/PostgreDbServer";
import OrderDatabaseRepository from "../../../src/infra/repositories/OrderDatabaseRepository";
import CreateOrder from "../../../src/application/usecases/order/CreateOrder";

test("Must make a request and return status 400 because you did not inform the idempotency parameter in the header", async () => {
    const uuid = new CryptoUuidGenerator();
    const connection = new PostgreDbServer();
    const repository = new OrderDatabaseRepository(connection);
    const createOrder = new CreateOrder(repository, uuid);
    const order = await createOrder.execute({ amount: 55.70 });
    connection.close();
    const input = {
        orderId: order.orderId,
        paymentType: "credit"
    };

    await expect(
        axios.post(`http://idempotency-api:3030/order/${input.orderId}/payment`, input)
    ).rejects.toMatchObject({
        response: expect.objectContaining({
            status: 400
        })
    });
});

test("Must make several requests to the payment API, with the same data and the expected result is not to duplicate", async () => {
    const uuid = new CryptoUuidGenerator();
    const connection = new PostgreDbServer();
    const repository = new OrderDatabaseRepository(connection);
    const createOrder = new CreateOrder(repository, uuid);
    const order = await createOrder.execute({ amount: 55.70 });
    connection.close();
    const input = {
        orderId: order.orderId,
        paymentType: "credit"
    };
    const key = uuid.generate();
    const header = {
      'Content-Type': 'application/json',
      'Idempotency-Key': key
    };
    const response = await axios.post(`http://idempotency-api:3030/order/${input.orderId}/payment`, input, { headers: header });
    const response2 = await axios.post(`http://idempotency-api:3030/order/${input.orderId}/payment`, input, { headers: header });
    
    const output = response.data;
    const output2 = response2.data;
    expect(response.status).toBe(201);
    expect(response2.status).toBe(201);
    expect(output).toBeDefined();
    expect(output2).toBeDefined();
    expect(output.paymentId).toBe(output2.paymentId);
});