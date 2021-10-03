// browser와 server 연결
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  //socket.send와 비슷
  // BE에서 호출할 함수는 마지막 인자로 보낼 수 있고, 마지막 인자가 아닌 함수는
  // BE에서 실행 시 오류.
  socket.emit("enter_room", { payload: input.value }, showRoom);
  roomName = input.value;
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
