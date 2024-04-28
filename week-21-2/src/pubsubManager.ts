import { createClient, RedisClientType } from "redis";

export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;

  // private constructor to prevent direct construction calls with new operator
  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  // the static method that controls the access to the singelton instance....
  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }

    return PubSubManager.instance;
  }

  public userSubscribe(userId: string, stock: string) {
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, []);
    }

    this.subscriptions.get(stock)?.push(userId);

    if (this.subscriptions.get(stock)?.length === 1) {
      this.redisClient.subscribe(stock, (message) => {
        this.handleMessage(stock, message);
      });
      console.log(`subscribed to redis channel : ${stock}`);
    }
  }

  public userUnSubscribe(userId: string, stock: string) {
    this.subscriptions.set(
      stock,
      this.subscriptions.get(stock)?.filter((sub) => sub !== userId) || []
    );

    if (this.subscriptions.get(stock)?.length === 0) {
      this.redisClient.unsubscribe(stock);
      console.log(`unsubscribed to redis channel : ${stock}`);
    }
  }

  private handleMessage(stock: string, message: string) {
    console.log(`Message recieved on channel ${stock}:${message}`);
    this.subscriptions.get(stock)?.forEach((sub) => {
      console.log(`sending message to user : ${sub}`);
    });
  }

  // clean up the instance destruction
  public async disconnect() {
    await this.redisClient.quit();
  }
}
      