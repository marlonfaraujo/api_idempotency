import express, { Application, RequestHandler } from "express";
import HttpServer from "./HttpServer";
import compression from "compression";

export default class ExpressAdapter implements HttpServer {

	private app: any;
	
	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(compression({
			level: 6, // (0-9)
			threshold: 1024, // > 1 KB
			filter: (req: any, res: any) => {
				if (req.headers['x-no-compression']) {
					// deactive
					return false;
				}
				return compression.filter(req, res);
			}
		}));
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