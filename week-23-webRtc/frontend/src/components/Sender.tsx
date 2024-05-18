import React, { useEffect, useState } from "react";

const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "sender",
        })
      );
    };
  }, []);

  async function startSendingVideo() {
    if (!socket) return;
    // create an offer.
    const pc = new RTCPeerConnection();
    pc.onnegotiationneeded = async () => {
      console.log("on negoitiation needed");
      const offer = await pc.createOffer(); //sdp
      await pc.setLocalDescription(offer);
      socket.send(
        JSON.stringify({ type: "createOffer", sdp: pc.localDescription })
      );
    };

    // send - video
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: event.candidate })
        );
      }
    };

    // trickle ice
    socket?.send(
      JSON.stringify({ type: "createOffer", sdp: pc.localDescription })
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "createAnswer") {
        pc.setRemoteDescription(data.sdp);
      } else if (data.type === "iceCandidate") {
        pc.addIceCandidate(data.candidate);
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    pc.addTrack(stream.getVideoTracks()[0]);
  }

  return (
    <div>
      <button onClick={() => startSendingVideo()}>Send Video</button>
    </div>
  );
};

export default Sender;
