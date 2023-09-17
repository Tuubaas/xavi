Bun.serve({
  fetch(req, server) {
    // upgrade the request to a websocket connection
    if (server.upgrade(req)) return;
    return new Response("Upgrade to websocket failed:(", { status: 500 });
  },
  websocket: {
    message(ws, msg) {
      ws.send(msg);
    },
  },
});
