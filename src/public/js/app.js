// browser와 server 연결
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function func1() {
  console.log("func1");
}
function func2(a) {
  console.log("func2", a);
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  //socket.send와 비슷
  // BE에서 호출할 함수는 마지막 인자로 보낼 수 있고, 마지막 인자가 아닌 함수는
  // BE에서 실행 시 오류.
  socket.emit("enter_room", { payload: input.value }, func1, func2);
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
