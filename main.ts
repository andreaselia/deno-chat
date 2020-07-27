import { listenAndServe } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  acceptable,
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const users = new Map();
const channels = new Map();

function broadcast(data: any) {
  const channel = channels.get(data.channel) || [];

  for (const user of channel) {
    if (user.ws.isClosed) {
      break;
    }

    user.ws.send(JSON.stringify(data));
  }
}

async function handleWs(ws: WebSocket): Promise<void> {
  const userId = v4.generate();
  const userObj = {
    userId,
    name: "User",
    channel: "general",
    ws,
  };

  users.set(userId, userObj);

  const channelUsers = channels.get("general") || [];
  channelUsers.push(userObj);
  channels.set("general", channelUsers);

  broadcast({
    event: "message",
    channel: "general",
    message: "User has connected",
  });

  for await (const data of ws) {
    const event = typeof data === "string" ? JSON.parse(data) : data;

    if (isWebSocketCloseEvent(data)) {
      users.delete(userId);

      broadcast({
        event: "message",
        channel: userObj.channel,
        message: "User has disconnected",
      });

      break;
    }

    if (event.event === "message") {
      if (event.message) {
        broadcast({
          event: "message",
          channel: userObj.channel,
          message: `User: ${event.message}`,
        });
      }
    } else if (event.event === "changeChannel") {
      broadcast({
        event: "message",
        channel: event.channel,
        message: "User has connected",
      });

      let channelUsers = channels.get(userObj.channel) || [];
      channelUsers = channelUsers.filter((user: any) => user.userId !== userId);
      channels.set(userObj.channel, channelUsers);

      const newChannelUsers = channels.get(event.channel) || [];
      newChannelUsers.push(userObj);
      channels.set(event.channel, newChannelUsers);

      users.delete(userId);

      broadcast({
        event: "message",
        channel: userObj.channel,
        message: "User has disconnected",
      });

      userObj.channel = event.channel;

      users.set(userId, userObj);

      broadcast({
        event: "channelChange",
        channel: event.channel,
      });
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
