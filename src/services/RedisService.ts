import Redis, { RedisClientType, createClient } from 'redis';
import { appConfig } from '../config/Environment';

 type RedisClientConnection = ReturnType<typeof createClient>

export class RedisService {
  private static readonly redisHost: string = appConfig.redis.host;
  public defaultExpirationTime: number = 600;
  public redisClient: RedisClientConnection;

  public async connect(): Promise<string> {
    return new Promise((resolve, reject) => {
      // this.redisClient = createClient();
      this.redisClient = createClient({
        url: RedisService.redisHost
      });

      this.redisClient.on('error', (err) => {
        reject(`Redis Client Error 1a74d1f7-20be-49c7-b4b9-c1053b4921c9 ${err}`);
      });

      this.redisClient.connect()
      .then(() => {
        resolve('Redis is connected');
      })
      .catch((err) => {
        reject(`Redis Client Error 0a74d1f7-20be-49c7-b4b9-c1053b4921c7 ${err}`);
      });
    });
  }
  
  public async getOrSetCache<T>(key: string, cb: () => T) {
    try {
      const cache = await this.redisClient.get(key);
      if (cache) {
        return JSON.parse(cache)
      } else {
        const freshData = await cb();
        this.redisClient.setEx(key, this.defaultExpirationTime, JSON.stringify(freshData));
        return freshData;
      } 
    } catch (error) {
      console.log("🚀 ~ RedisService ~ getOrSetCache error 8ab466aa-cf49-4e27-a284-cde49884f807:", error.message)
    }
  }
}