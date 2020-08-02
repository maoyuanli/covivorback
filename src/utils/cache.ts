import mongoose from 'mongoose';
import {provideConfig} from "../config/keys";
import redis from 'redis';
import util from 'util';

const redisUrl = provideConfig().redisUrl;
const redisConfigured = redisUrl !== null && redisUrl.length !== 0;

// @ts-ignore
mongoose.Query.prototype.cache = function () {
    // @ts-ignore
    this.useCache = true;
    return this;
}

export let clearCache = function () {
};

if (redisConfigured) {
    const originalExec = mongoose.Query.prototype.exec;
    const redisClient = redis.createClient(redisUrl);

    mongoose.Query.prototype.exec = async function () {
        // @ts-ignore
        if (!this.useCache) {
            // @ts-ignore
            return originalExec.apply(this, arguments);
        }

        const key = JSON.stringify(
            Object.assign({},
                this.getFilter(),
                // @ts-ignore
                {collection: this.mongooseCollection.name})
        )


        // @ts-ignore
        redisClient.get = util.promisify(redisClient.get);
        const cachedValue = await redisClient.get(key);
        if (cachedValue) {
            console.log('----- retrieved from REDIS -----')
            // @ts-ignore
            return JSON.parse(cachedValue);
        }

        // @ts-ignore
        const result = await originalExec.apply(this, arguments);
        redisClient.set(key, JSON.stringify(result), 'EX', 60, redis.print)
        console.log('----- retrieved from MONGO -----')
        return result
    };

    clearCache = function () {
        redisClient.flushall();
    };
}
