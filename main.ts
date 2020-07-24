import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable, WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const users = new Map();
const channels = new Map();

function broadcast(data: any) {
  console.log('data', data)

  const channel = channels.get(data.channel);

  for (const user of channel) {
    user.ws.send(JSON.stringify(data));
  }
}

async function handleWs(ws: WebSocket): Promise<void> {
  const userId = v4.generate();
  const userObj = {
    userId,
    name: 'User',
    channel: 'general',
    ws
  };

  users.set(userId, userObj);

  const channelUsers = channels.get('general') || [];
  channelUsers.push(userObj);
  channels.set('general', channelUsers)

  broadcast({
    event: 'message',
    channel: 'general',
    message: 'User has connected'
  });

  for await (const data of ws) {
    const event = typeof data === "string" ? JSON.parse(data) : data;

    if (isWebSocketCloseEvent(data)) {
      users.delete(userId);

      broadcast({
        event: 'message',
        channel: 'general',
        message: 'User has disconnected'
      });

      break;
    }

    switch (event.event) {
      case "message":
        if (event.message) {
          broadcast({
            event: 'message',
            channel: 'general',
            message: `User: ${event.message}`
          });
        }
        break;
      case "changeChannel":
        if (!userObj) {
          return;
        }

        let users = channels.get(userObj.channel);

        users = users.filter((user) => user.userId !== userId);
        channels.set(userObj.channel, users);

        users.delete(userId);

        broadcast({
          event: 'channelChange',
          channel: event.channel
        });
        break;
    }
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
