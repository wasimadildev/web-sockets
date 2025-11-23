import { WebSocketServer } from "ws";
import { wsAuth } from "./middleware.js";

export function setupWebSocket(server: any) {
  const wss = new WebSocketServer({ server });

  const clients = new Map<string, WebSocket>();

  wss.on("connection", (ws: any, req: any) => {

    const user = wsAuth(req);

    if (!user || typeof user === "string") {
    ws.close(1008, "Unauthorized");
    console.log("❌ Unauthorized WebSocket connection blocked");
    return;
    }

    const id = user.userId;
    console.log("✅ WebSocket connection authenticated:", id);
    
    clients.set(id, ws);

    console.log(`🔌 Authenticated client connected: ${id}`);

    ws.send(JSON.stringify({ type: "welcome", id, user }));

    ws.on("message", (message: any) => {

   

     

      


      clients.forEach((client) => client.send(message.toString()));
    });

    ws.on("close", () => {
      console.log(`❌ Client disconnected: ${id}`);
      clients.delete(id);
    });
  });

  console.log("WebSocket server running with JWT auth");
}
