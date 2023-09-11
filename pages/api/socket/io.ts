import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketServer } from "socket.io";

export default function handler(req: NextApiRequest, res: any) {
  console.log("request received");

  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const httpServer: NetServer = res.socket.server;
    const io = new SocketServer(httpServer, {
      cors: {
        origin: ["http://localhost:3000"],
      },
    });

    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("questionId", (questionId) => {
        console.log("questionId", questionId);
        socket.broadcast.emit("questionId", questionId);
      });
      io.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
}
