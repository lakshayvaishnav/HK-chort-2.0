"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let receiverSocker = null;
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        const message = JSON.parse(data);
        if (message.type === "sender") {
            senderSocket = ws;
        }
        else if (message.type === "receiver") {
            receiverSocker = ws;
        }
        else if (message.type === "createOffer") {
            if (ws !== senderSocket) {
                return;
            }
            receiverSocker === null || receiverSocker === void 0 ? void 0 : receiverSocker.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }));
        }
        else if (message.type === "createAnswer") {
            if (ws !== receiverSocker) {
                return;
            }
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createAnswer", sdp: message.sdp }));
        }
        else if (message.type === "iceCandidate") {
            if (ws === senderSocket) {
                receiverSocker === null || receiverSocker === void 0 ? void 0 : receiverSocker.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
            else if (ws === receiverSocker) {
                JSON.stringify({ type: "iceCandidate", candidate: message.candidate });
            }
        }
    });
});
