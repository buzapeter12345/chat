const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("client"));
const server = createServer(app);
const io = new Server(server);

io.on("connection", (s) => {
  s.on("msg", (msg, felhasznalo) => {
    var uzenet = felhasznalo + ": " + msg;
    io.emit("msg", uzenet);
  });
  s.on("cur", (msg) => {
    io.emit("cur", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
