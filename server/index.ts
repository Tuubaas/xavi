const server = Bun.serve({
  port: 3000,
  fetch(req, server) {
    // upgrade the request to a websocket connection
    if (server.upgrade(req)) return;
    return new Response("Upgrade to websocket failed:(", { status: 500 });
  },
  websocket: {
    message(ws, msg) {
      console.log(msg);
      ws.send(msg);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
