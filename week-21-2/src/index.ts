// import { Games } from "./store";
// import { startLogger } from "./logger";

// startLogger();

// setInterval(() => {
//   Games.addGame({
//     id: Math.random().toString(),
//     whitePlayer: "lxsh",
//     blackPlayer: "samay",
//     moves: [],
//   });
// }, 1000);

import { PubSubManager } from "./pubsubManager";

var count = 1;
setInterval(() => {
  PubSubManager.getInstance().userSubscribe(count.toString(), "APPL");
  console.log("new user created : ", count);
  count++;
}, 5000);
