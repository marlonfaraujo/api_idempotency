import HttpServer from "../HttpServer";

export default class HealthCheck {
    
    constructor(readonly httpServer: HttpServer){
    }

    config(): void{
        this.httpServer.route("get", "/test", (req: any, res: any) => {
            const content = 'x'.repeat(2000);
            res.send(content);
        });
    }
}