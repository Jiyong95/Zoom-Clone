// 서버와 연결
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server✅");
});

// Server에서 보낸 message를 받음.
socket.addEventListener("message", (message) => {
  console.log("New message : ", message.data, "from the server");
});

socket.addEventListener("close", () => {
  console.log("Connected to Server❌");
});

setTimeout(() => {
  socket.send("hello from the brower!");
}, 10000);
