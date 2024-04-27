"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogger = void 0;
const store_1 = require("./store");
function startLogger() {
    setInterval(() => {
        store_1.Games.logState();
    }, 2000);
}
exports.startLogger = startLogger;
