const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

// 서버와 연결
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server✅");
});

// Server에서 보낸 message를 받음.
socket.addEventListener("message", (message) => {
  console.log("Server : ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
// setTimeout(() => {
//   socket.send("hello from the brower!");
// }, 10000);
