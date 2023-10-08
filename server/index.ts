import { ServerWebSocket } from "bun";

type Room = {
  roomCode: string;
  // players: Player[];
};

const rooms: { [roomCode: string]: ServerWebSocket<Room>[] } = {};

const server = Bun.serve<Room>({
  port: 3000,
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname.split("/")[1] === "api") {
      if (url.pathname.split("/")[2] === "create") {
        const roomCode = Math.random().toString(36).substring(2, 10);
        rooms[roomCode] = [];

        return Response.json(
          { success: true, roomCode },
          {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            },
          }
        );
      }
      if (url.pathname.split("/")[2] === "join") {
        console.log("JOIN");
        console.log(url.pathname.split("/")[3]);
        console.log(rooms);

        const roomCode = url.pathname.split("/")[3];
        if (!roomCode) {
          throw new Error(
            JSON.stringify({ success: false, error: "No room code provided" })
          );
        } else if (!rooms[roomCode]) {
          throw new Error(
            JSON.stringify({ success: false, error: "Room does not exist" })
          );
        }
        return Response.json(
          { success: true, roomCode },
          {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            },
          }
        );
      }
    }
    // upgrade the request to a websocket connection
    if (server.upgrade(req, { data: { roomCode: req.url.split("/")[1] } }))
      return;
    return new Response("Upgrade to websocket failed:(", { status: 500 });
  },
  error(error) {
    console.log(error);

    return new Response(error.message, { status: 500 });
  },
  websocket: {
    open(ws) {
      console.log("open");

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
