import RedisCache from "../../../src/infra/database/RedisCache";

test("Must write to redis and return value before expiration", async () => {
    const cache = new RedisCache();
    await cache.set("key", "value", { expiration: 300 });

    const result = await cache.get("key");

    expect(result).toBe("value");
});