"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const subscriptions = {};
setInterval(() => {
    console.log(subscriptions);
}, 5000);
wss.on("connection", function connection(ws) {
    const id = randomId();
    subscriptions[id] = {
        ws: ws,
        rooms: [],
    };
    ws.on("message", function message(data) {
        // @ts-ignore
        const parsedMessage = JSON.parse(data);
        if (parsedMessage.type === "SUBSCRIBE") {
            subscriptions[id].rooms.push(parsedMessage.room);
        }
        if (parsedMessage.type === "sendMessage") {
            const message = parsedMessage.message;
            const roomId = parsedMessage.roomId;
            Object.values(subscriptions).forEach(({ ws, rooms }) => {
                if (rooms.includes(roomId)) {
                    ws.send(message);
                }
            });
        }
    });
    ws.send("something");
});
function randomId() {
    return Math.random();
}
