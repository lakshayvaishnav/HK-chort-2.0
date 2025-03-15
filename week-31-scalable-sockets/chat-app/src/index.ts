import ws, { WebSocket, WebSocketServer } from "ws";
import { createClient } from "redis";

async function main() {
  // single client can either publish or subscribe
  const publishClient = createClient();
  await publishClient.connect();

  const subscribeClient = createClient();
  await subscribeClient.connect();

  const wss = new WebSocketServer({ port: 8080 });

  const subscriptions: { [key: string]: { ws: WebSocket; rooms: string[] } } =
    {};

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

        if (oneUserSubscribeTo(parsedMessage.room)) {
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
        subscriptions[id].rooms = subscriptions[id].rooms.filter(
          (x) => x !== parsedMessage.room
        );
      }

      if (parsedMessage.type === "sendMessage") {
        const message = parsedMessage.message;
        const roomId = parsedMessage.roomId;

        // you can only send strings
        publishClient.publish(
          roomId,
          JSON.stringify({
            type: "sendMessage",
            roomId: roomId,
            message,
          })
        );
      }
    });

    ws.send("something");
  });

  function randomId() {
    return Math.random();
  }
}

main();
