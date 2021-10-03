const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

// 서버와 연결
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server✅");
});

// Server에서 보낸 message를 받음.
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  console.log(message.data);
  li.innerText = message.data;
  messageList.append(li);
});

// socket.send(data) 보낼 때, data는 string으로 보내지게되서 stringify이용하여 객체 변환
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

socket.addEventListener("close", () => {
  console.log("Disconnected from Server❌");
});
