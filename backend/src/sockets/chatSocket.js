function registerChatSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("live:join", ({ liveSessionId, userName }) => {
      socket.join(`live:${liveSessionId}`);
      io.to(`live:${liveSessionId}`).emit("notification:new", {
        title: "User joined",
        body: `${userName || "A user"} joined the live session`
      });
    });

    socket.on("chat:typing", ({ liveSessionId, userName }) => {
      socket.to(`live:${liveSessionId}`).emit("chat:typing", {
        userName: userName || "Someone"
      });
    });

    socket.on("reaction:send", ({ liveSessionId, emoji, userName }) => {
      io.to(`live:${liveSessionId}`).emit("reaction:new", {
        emoji,
        userName: userName || "Guest",
        createdAt: new Date().toISOString()
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}

module.exports = registerChatSocket;
