"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocker = null;
let receiverSocker = null;
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        const message = JSON.parse(data);
        // identify as sender
        // identify as reciever
        // create offer
        // create answer
        // add ice candidate
        if (message.type === "sender") {
            senderSocker = ws;
            console.log("sender set: ");
        }
        else if (message.type === "receiver") {
            receiverSocker = ws;
            console.log("reciever set");
        }
        else if (message.type === "createOffer") {
            if (ws !== senderSocker) {
                return;
            }
            console.log("offer recieved");
            receiverSocker === null || receiverSocker === void 0 ? void 0 : receiverSocker.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }));
        }
        else if (message.type === "createAnswer") {
            if (ws !== receiverSocker) {
                return;
            }
            console.log("answer recieved...");
            senderSocker === null || senderSocker === void 0 ? void 0 : senderSocker.send(JSON.stringify({ type: "createAnswer", sdp: message.sdp }));
        }
        else if (message.type === "iceCandidate") {
            if (ws === senderSocker) {
                receiverSocker === null || receiverSocker === void 0 ? void 0 : receiverSocker.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
            else if (ws === receiverSocker) {
                senderSocker === null || senderSocker === void 0 ? void 0 : senderSocker.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
        }
    });
});
