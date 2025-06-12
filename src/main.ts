import ExpressAdapter from "./api/ExpressAdapter";
import Router from "./api/Router";

const httpServer = new ExpressAdapter();
const router = new Router(httpServer);
router.config();
httpServer.listen(3000);