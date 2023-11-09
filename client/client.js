const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("client"));
const server = createServer(app);
const io = new Server(server);

// Create an array to store chat messages
const chatMessages = [];

io.on("connection", (socket) => {
  // Send previous chat messages to the connected client
  socket.emit("chatHistory", chatMessages);

  socket.on("msg", (msg, felhasznalo) => {
    if (felhasznalo == "") {
      felhasznalo = "Vendég";
    }
    const uzenet = `${felhasznalo}: ${msg}`;
    const uzenetHTML = `<h1>${felhasznalo}: </h1> <h3>${msg}</h3>`;
    
    // Store the message in the chatMessages array
    chatMessages.push(uzenetHTML);

    // Broadcast the message to all connected clients
    io.emit("msg", uzenetHTML);
  });

  socket.on("cur", (msg) => {
    io.emit("cur", msg);
  });
});

server.listen(80, () => {
  console.log("Server is running at http://localhost:80");
});
