import { WebSocketServer } from "ws";
import { wsAuth } from "./middleware.js";

export function setupWebSocket(server: any) {
  const wss = new WebSocketServer({ server });

  const clients = new Map<string, WebSocket>();

  const rooms = new Map<string, Set<string>>(); 


  wss.on("connection", (ws: any, req: any) => {
    


    
  });

 
}
