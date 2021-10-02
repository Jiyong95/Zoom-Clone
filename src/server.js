import http from "http";
import WebSocket from "ws";
import express from "express";

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

const handleListen = () => console.log("Listening on http://localhost:5000");

// http + websocket 서버 만들기
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Server에서 Browser로 연결, Browser 실행 시 호출
wss.on("connection", (socket) => {
  // event가 발생하길 기다리는 함수. + 연결된 브라우저 정보를 socket으로 콜백 함수에 전달
  // console.log(socket);
  console.log("Connected to Browser✅");
  socket.on("close", () => console.log("Disconnected from the Browser❌"));
  // Browser(app.js)에서 Server로 보낸 메세지를 받음
  socket.on("message", (message) => {
    console.log(message.toString("utf8"));
  });

  socket.send("hello!");
});

server.listen(5000, handleListen);
