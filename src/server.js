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

// 연결된 Browser list
const sockets = [];

// Server에서 Browser로 연결, Browser 실행 시 호출
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("close", () => console.log("Disconnected from the Browser❌"));
  //Browser에서 받은 message를 다시 보내줌
  socket.on("message", (message) => {
    console.log("Browser : ", message.toString("utf8"));
    // 연결된 모든 Browser에 message 보내기
    sockets.forEach((aSoket) => aSoket.send(message.toString("utf8")));
    // socket.send(message.toString("utf8"));
  });
});

server.listen(5000, handleListen);
