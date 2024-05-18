import React, { useEffect } from "react";

const Reciever = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "reciever",
        })
      );
    };

    socket.onmessage = async (event) => {
      let pc: RTCPeerConnection | null = null;
      const message = JSON.parse(event.data);
      if (message.type === "createOffer") {
        pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);
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
        pc.ontrack = (track) => {
          console.log(track);
        };
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: "createAnswer", sdp: answer }));
      } else if (message.type === "iceCandidate") {
        if (pc !== null) {
          // @ts-ignore
          pc.addIceCandidate(message.candidate);
        }
      }
    };
  }, []);
  return <div>Reciever</div>;
};

export default Reciever;
