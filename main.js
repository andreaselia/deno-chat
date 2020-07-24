import { listenAndServe } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  acceptable,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";

const users = new Map();
let userId = 0;

function broadcast(message) {
  for (const user of users.values()) {
    user.send(message);
  }
}

async function handleWs(ws) {
  const id = ++userId;
  users.set(id, ws);
  broadcast(`[${id}] has connected`);

  try {
    for await (const msg of ws) {
      if (typeof msg === "string" && !(!msg)) {
        broadcast(`[${id}]: ${msg}`);
      } else if (isWebSocketCloseEvent(msg)) {
        users.delete(id);
        broadcast(`[${id}] has disconnected`);
        break;
      }
    }
  } catch (err) {
    throw err;
  }
}

listenAndServe({ port: 8000 }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("index.html"),
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

console.log("Chat server running: http://localhost:8000");
