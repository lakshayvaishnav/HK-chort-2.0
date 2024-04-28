"use strict";
// import { Games } from "./store";
// import { startLogger } from "./logger";
Object.defineProperty(exports, "__esModule", { value: true });
// startLogger();
// setInterval(() => {
//   Games.addGame({
//     id: Math.random().toString(),
//     whitePlayer: "lxsh",
//     blackPlayer: "samay",
//     moves: [],
//   });
// }, 1000);
const pubsubManager_1 = require("./pubsubManager");
var count = 1;
setInterval(() => {
    pubsubManager_1.PubSubManager.getInstance().userSubscribe(count.toString(), "APPL");
    console.log("new user created : ", count);
    count++;
}, 5000);
