export default class AsyncHandler {

    constructor(){
    }

    wrapper(handler: any) {
        return (req: any, res: any, next: any) => {
            Promise.resolve(handler(req, res, next)).catch((error) => {
                console.log(error);
                next(error);
            });
        };
    }
}