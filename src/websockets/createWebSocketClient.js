import { Client } from "@stomp/stompjs";
import { getSecureData } from "../utils/SecureStorageService";
import SockJS from "sockjs-client";

export async function createWebSocketClient({ brokerURL, topic, onMessage }) {
  const token = await getSecureData("token");

  return new Promise((resolve, reject) => {
    const socket = new SockJS(brokerURL);

    const client = new Client({
      webSocketFactory: () => socket,
      brokerURL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log("STOMP Debug:", str),
      onConnect: () => {
        console.log("WebSocket connected");

        client.subscribe(topic, (message) => {
          if (onMessage) {
            const parsedMessage = JSON.parse(message.body);
            console.log("RECEIVED MESSAGE");
            onMessage(parsedMessage);
          }
        });

        resolve(client);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers.message);
        reject(new Error("STOMP error: " + frame.headers.message));
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error occurred:", error);
        reject(new Error("WebSocket error: " + error.message));
      },
    });

    client.activate();
  });
}
