import pgp from "pg-promise";
import DatabaseConnection from "./DatabaseConnectionAbstraction";

export default class PostgreDbServer implements DatabaseConnection {

    connection: any;

    constructor(){
        this.connection = pgp()("postgres://postgres:postgres@idempotency_api_postgres:5432/developer");
    }

    async query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<void> {
        await this.connection.$pool.end();
    }

}