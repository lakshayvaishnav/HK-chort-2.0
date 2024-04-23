import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [value, setvalue] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("ws in connected....");
      setSocket(socket);
    };

    // recieving data
    socket.onmessage = (message) => {
      console.log("message recived : - ", message.data);
      setLatestMessage(message.data);
    };
  }, []);

  if (!socket) {
    return <div>loading</div>;
  }

  return (
    <>
      <input type="text" onChange={(e) => setvalue(e.target.value)} />
      <button
        // sending data
        onClick={() => {
          socket.send(value);
        }}
      >
        Send
      </button>
      {latestMessage}
    </>
  );
}

export default App;
