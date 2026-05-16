require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const registerChatSocket = require("./sockets/chatSocket");

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);
registerChatSocket(io);

server.listen(PORT, () => {
  console.log(`Makeup Live API running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api/docs`);
});
