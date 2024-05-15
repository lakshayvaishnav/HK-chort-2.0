import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocker: null | WebSocket = null;
let receiverSocker: null | WebSocket = null;

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", function message(data: any) {
    const message = JSON.parse(data);
    // identify as sender
    // identify as reciever
    // create offer
    // create answer
    // add ice candidate
    if (message.type === "sender") {
      senderSocker = ws;
    } else if (message.type === "receiver") {
      receiverSocker = ws;
    } else if (message.type === "createOffer") {
      if (ws !== senderSocker) {
        return;
      }
      receiverSocker?.send(
        JSON.stringify({ type: "createOffer", sdp: message.sdp })
      );
    } else if (message.type === "createAnswer") {
      if (ws !== receiverSocker) {
        return;
      }
      senderSocker?.send(
        JSON.stringify({ type: "createAnswer", sdp: message.sdp })
      );
    } else if (message.type === "iceCandidate") {
      if (ws === senderSocker) {
        receiverSocker?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      } else if (ws === receiverSocker) {
        senderSocker?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      }
    }
  });
});
