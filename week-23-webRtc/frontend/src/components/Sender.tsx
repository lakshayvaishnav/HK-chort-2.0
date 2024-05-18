import { useEffect, useState } from "react";

export const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "sender" }));
    };
  }, []);

  const initiateConn = async () => {
    if (!socket) {
      alert("Socket not found");
      return;
    }

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "creteAnswer") {
        await pc?.setRemoteDescription(message.sdp);
      } else if (message.type === "iceCandidate") {
        pc?.addIceCandidate(message.candidate);
      }
    };
  };

  const PC = new RTCPeerConnection();
  setPc(PC);
  // might prone to errors !!
  if (pc) {
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send(
          JSON.stringify({
            type: "iceCandidate",
            candidate: event.candidate,
          })
        );
      }
    };

    const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: any) => {
          const video = document.createElement("video");
          video.srcObject = stream;
          video.play();
          // this can also be wrong.
          document.body.appendChild(video);
          stream.getTracks().forEach((track: any) => {
            pc?.addTrack(track);
          });
        });
    };
    pc.onnegotiationneeded = async () => {
      const offer = await pc?.createOffer();
      await pc.setLocalDescription(offer);
      socket?.send(
        JSON.stringify({
          type: "createOffer",
          sdp: pc.localDescription,
        })
      );
    };
    // function to get camera;
    getCameraStreamAndSend(pc);
  }

  return (
    <div>
      sender
      <button onClick={initiateConn}>Send Video</button>
    </div>
  );
};
