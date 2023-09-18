import { ServerWebSocket } from "bun";

type Room = {
  roomCode: string;
  // players: Player[];
};

const rooms: { [roomCode: string]: ServerWebSocket<Room>[] } = {};

const server = Bun.serve<Room>({
  port: 3000,
  fetch(req, server) {
    // upgrade the request to a websocket connection
    if (server.upgrade(req, { data: { roomCode: req.url.split("/")[1] } }))
      return;
    return new Response("Upgrade to websocket failed:(", { status: 500 });
  },
  websocket: {
    open(ws) {
      // when a client connects, add them to the room
      const roomCode = ws.data.roomCode;
      if (!rooms[roomCode]) {
        rooms[roomCode] = [];
      }
      rooms[roomCode].push(ws);
    },
    message(ws, msg) {
      console.log(msg);
      ws.send(msg);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
