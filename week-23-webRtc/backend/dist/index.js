"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocker = null;
let receiverSocker = null;
wss.on("connection", function connection(ws) {
    setInterval(() => {
        ws.send("heloo from sockets");
    }, 1000);
    ws.on("message", function message(data) {
        const message = JSON.parse(data);
        // identify as sender
        // identify as reciever
        // create offer
        // create answer
        // add ice candidate
        console.log(message);
    });
});
