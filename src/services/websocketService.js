import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 }); // WebSocket server on port 8080
const clients = new Map(); // Map to track clients and their subscriptions

// Handle WebSocket connections
wss.on("connection", (ws, req) => {
  console.log("New client connected");

  // Track the client's subscribed poll ID
  ws.on("message", (message) => {
    const { action, pollId } = JSON.parse(message);
    if (action === "subscribe" && pollId) {
      clients.set(ws, pollId);
      console.log(`Client subscribed to poll ID: ${pollId}`);
    }
  });

  // Remove client from tracking on disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

// Broadcast updates to relevant clients
export const broadcastUpdate = (pollId, results) => {
  clients.forEach((subscribedPollId, client) => {
    if (subscribedPollId === pollId && client.readyState === client.OPEN) {
      client.send(JSON.stringify({ pollId, results }));
    }
  });
};

export const broadcastLeaderboard = (leaderboard) => {
  clients.forEach((_, client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ type: "leaderboard", leaderboard }));
    }
  });
};

console.log("WebSocket server running on ws://localhost:8080");
