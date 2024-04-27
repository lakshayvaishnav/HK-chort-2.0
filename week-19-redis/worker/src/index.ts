import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();
  while (1) {
    const response = await client.brPop("submissions", 0);
    console.log(response);
    // here will run the users code..
    await new Promise((e) => setTimeout(e, 1000));
    // send it to the pubsub...
    console.log("processed users submission ");
  }
}

main();
