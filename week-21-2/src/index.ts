import { Games } from "./store";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
  Games.addGame({
    id: Math.random().toString(),
    whitePlayer: "lxsh",
    blackPlayer: "samay",
    moves: [],
  });
}, 1000);
