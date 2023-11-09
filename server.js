const express = require("express");
const { createServer } = require("http"); // Corrected import
const { Server } = require("socket.io");
const http = require('http');

const app = express();
app.use(express.static("client"));
const server = createServer(app);
const io = new Server(server);

const chatMessages = [];

io.on("connection", (socket) => {
  socket.emit("chatHistory", chatMessages);

  socket.on("msg", (msg, felhasznalo) => {
    if (felhasznalo == "") {
      felhasznalo = "Vendég";
    }
    const uzenet = `${felhasznalo}: ${msg}`;
    const uzenetHTML = `<h1>${felhasznalo}: </h1> <h3>${msg}</h3>`;
    
    chatMessages.push(uzenetHTML);

    io.emit("msg", uzenetHTML);
  });

  socket.on("cur", (msg) => {
    io.emit("cur", msg);
  });
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
