import ws, { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const subscriptions: { [key: string]: { ws: WebSocket; rooms: string[] } } = {};

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
      
    }

    ws.send("data transferred : " + data);
  });

  ws.send("something");
});

function randomId() {
  return Math.random();
}
