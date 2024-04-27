"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const logger_1 = require("./logger");
(0, logger_1.startLogger)();
setInterval(() => {
    store_1.Games.addGame({
        id: Math.random().toString(),
        whitePlayer: "lxsh",
        blackPlayer: "samay",
        moves: [],
    });
}, 1000);
