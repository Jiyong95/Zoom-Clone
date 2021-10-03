// browser와 server 연결
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  //socket.send와 비슷
  socket.emit("enter_room", { payload: input.value }, () => {
    //1, 2, 3번째 인자를 socket.on(1,(2,3))으로 보냄
    console.log("server is done!");
  });
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
