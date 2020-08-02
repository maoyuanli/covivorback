import {clearCache} from "./cache";

const clearCacheMiddleware = async (req, res, next) => {
    await next();
    clearCache();
}

export default clearCacheMiddleware;
