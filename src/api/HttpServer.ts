export default interface HttpServer {
	route(method: string, url: string, ...handlers: any[]): void
	use (...handlers: any[]): void;
	listen (port: number): void;
	getInstance(): any;
}
