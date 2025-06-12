import express, { Application, RequestHandler } from "express";
import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {

	private app: any;
	
	constructor () {
		this.app = express();
		this.app.use(express.json());
	}

	route(method: string, url: string, ...handlers: RequestHandler[]): void {
		this.app[method](url, ...handlers);
	}

	use(...handlers: RequestHandler[]): void {
		this.app.use(...handlers);
	}

	listen(port: number): void {
		this.app.listen(port);
	}

	getInstance(): Application {
		return this.app;
	}
}