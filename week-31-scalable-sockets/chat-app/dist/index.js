"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const redis_1 = require("redis");
// single client can either publish or subscribe
const publishClient = (0, redis_1.createClient)();
publishClient.connect();
const subscribeClient = (0, redis_1.createClient)();
subscribeClient.connect();
const wss = new ws_1.WebSocketServer({ port: 8081 });
const subscriptions = {};
// setInterval(() => {
//   console.log(subscriptions);
// }, 5000);
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
            if (oneUserSubscribeTo(parsedMessage.room)) {
                console.log("subscibing on the pubsub roomid : ", parsedMessage.room);
                subscribeClient.subscribe(parsedMessage.room, (message) => {
                    const parsedMessage = JSON.parse(message);
                    Object.values(subscriptions).forEach(({ ws, rooms }) => {
                        if (rooms.includes(parsedMessage.roomId)) {
                            ws.send(message);
                        }
                    });
                });
            }
        }
        if (parsedMessage.type === "UNSUBSCRIBE") {
            subscriptions[id].rooms = subscriptions[id].rooms.filter((x) => x !== parsedMessage.room);
            if (lastPersonLeftRoom(parsedMessage.room)) {
                console.log("unsubscribing from pubsub on room : ", parsedMessage.room);
                subscribeClient.unsubscribe(parsedMessage.room);
            }
        }
        if (parsedMessage.type === "sendMessage") {
            const message = parsedMessage.message;
            const roomId = parsedMessage.roomId;
            // you can only send strings
            publishClient.publish(roomId, JSON.stringify({
                type: "sendMessage",
                roomId: roomId,
                message,
            }));
        }
    });
    ws.send("something");
});
function randomId() {
    return Math.random();
}
function oneUserSubscribeTo(roomId) {
    let totalInterestedPeople = 0;
    Object.values(subscriptions).forEach(({ ws, rooms }) => {
        if (rooms.includes(roomId)) {
            totalInterestedPeople++;
        }
    });
    if (totalInterestedPeople == 1) {
        return true;
    }
    return false;
}
function lastPersonLeftRoom(roomId) {
    let totalInterestedPeople = 0;
    Object.values(subscriptions).forEach(({ ws, rooms }) => {
        if (rooms.includes(roomId)) {
            totalInterestedPeople++;
        }
    });
    return totalInterestedPeople === 0;
}
