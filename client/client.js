const socket = io();

const remc = document.getElementById("e");
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const username = document.getElementById("username");

// Add an event listener for "chatHistory"
socket.on("chatHistory", (chatHistory) => {
  // Display the chat history
  chatHistory.forEach((msg) => {
    const item = document.createElement("li");
    if (msg.includes("http://") || msg.includes("https://")) {
      const link = document.createElement("a");
      link.setAttribute("href", msg);
      link.setAttribute("target", "_blank");
      link.textContent = "LINK";
      item.appendChild(link);
    } else {
      item.innerHTML = msg;
    }
    messages.appendChild(item);
  });

  window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("msg", input.value, username.value);
    input.value = "";
    if (username.value) {
      username.style.display = "none";
      document.getElementById("form").style.gridTemplateColumns = "80% 20%";
    }
  }
});

function f(e) {
  socket.emit("cur", { x: e.x, y: e.y });
  return false;
}

socket.on("msg", (msg) => {
  const item = document.createElement("li");
  if (msg.includes("http://") || msg.includes("https://")) {
    const link = document.createElement("a");
    link.setAttribute("href", msg);
    link.setAttribute("target", "_blank");
    link.textContent = "LINK";
    item.appendChild(link);
  } else {
    item.innerHTML = msg;
  }
  messages.appendChild(item);

  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("cur", (msg) => {
  remc.style.left = `${msg.x - 6}px`;
  remc.style.top = `${msg.y - 6}px`;
});
