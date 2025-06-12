export default class HttpError extends Error {

    constructor(message: string, readonly statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
  
}