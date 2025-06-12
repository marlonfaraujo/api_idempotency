export default class ErrorMiddleware {

    constructor(){
        this.handler = this.handler.bind(this);
    }

    handler(err: any, req: any, res: any, next: any) {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            message: err.message || "Internal Server Error"
        });
    }
}