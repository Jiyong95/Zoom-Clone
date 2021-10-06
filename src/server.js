import http from "http";
// import WebSocket from "ws";
import express from "express";
import SocketIO from "socket.io";

const app = express();
// express view engine 설정
app.set("view engine", "pug");

// views template 경로 설정
//__dirname : 현재 server.js 경로
app.set("views", __dirname + "/views");
// image, css, Js 같은 정적파일 제공
// /public url로 이동시 /pubilc내의 디렉토리를 볼 수 있음.
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  // console.log("sids : ", sids);
  // console.log("rooms : ", rooms);
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) publicRooms.push(key);
  });
  return publicRooms;
}

function countRoom(roomName) {
  // roomName이 있으면 size리턴
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}
wsServer.on("connection", (socket) => {
  socket["nickname"] = "guest";
  // middleware, 어느 event에서든지 실행된다.
  socket.onAny((event) => {
    console.log(wsServer.sockets.adapter);
    console.log(`Socket Event:${event}`);
  });
  socket.on("enter_room", (payload, showRoom) => {
    // room join
    socket.join(payload.roomName);
    // console.log(socket.rooms);
    // => {socketId, payload}
    showRoom();
    // 같은 roomName에 있는 사람들(socket)에게(나자신 제외) emit
    socket
      .to(payload.roomName)
      .emit("welcome", socket.nickname, countRoom(payload.roomName));
    wsServer.sockets.emit("room_change", publicRooms());
  });
  // disconnecting은 정해져있음. 누군가 나가기 전에(Browser연결 끊기기 전에) 실행
  socket.on("disconnecting", () => {
    socket.rooms.forEach((socketId) =>
      socket
        .to(socketId)
        .emit("bye", socket.nickname, countRoom(payload.roomName) - 1)
    );
    // wsServer.sockets.emit("room_change", publicRooms());
    // 방을 나가기 전에 실행되서 해당 방이 찍힘.
  });
  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
    // 방을 나가고 실행되서 해당 방이 안 찍힘.
  });
  // FE에서 받을 emit
  socket.on("new_message", (msg, roomName, done) => {
    // FE로 보낼 emit
    socket.to(roomName).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

const handleListen = () => console.log("Listening on http://localhost:5000");
httpServer.listen(5000, handleListen);
