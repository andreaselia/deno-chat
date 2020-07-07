import { listenAndServe } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  acceptable,
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";

const users = new Map<number, WebSocket>();
let userId = 0;

function broadcast(message: string): void {
  for (const user of users.values()) {
    user.send(message);
  }
}

async function handleWs(ws: WebSocket): Promise<void> {
  const id = ++userId;

  users.set(id, ws);

  broadcast(`[${id}] has connected`);

  for await (const msg of ws) {
    if (typeof msg === "string" && !(!msg)) {
      broadcast(`[${id}]: ${msg}`);
    } else if (isWebSocketCloseEvent(msg)) {
      users.delete(id);
      broadcast(`[${id}] has disconnected`);
      break;
    }
  }
}

listenAndServe({ port: 3080 }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("./index.html"),
    });
  }

  if (req.method === "GET" && req.url === "/ws") {
    if (acceptable(req)) {
      acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      }).then(handleWs);
    }
  }
});

console.log("Chat server running: http://localhost:3080");
