// browser와 server 연결
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

function addMessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  // BE에 전달할 emit 비동기 함수.
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}
function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  const value = input.value;
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  roomName = input.value;
  //socket.send와 비슷
  // BE에서 호출할 함수는 마지막 인자로 보낼 수 있고, 마지막 인자가 아닌 함수는
  // BE에서 실행 시 오류.
  socket.emit("enter_room", { roomName }, showRoom);
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} left`);
});

// BE에서 emit하면 받을 event
socket.on("new_message", addMessage);
// socket.on("new_message", (msg)=>addMessage(msg)); 와 동일
