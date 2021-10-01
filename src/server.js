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

function handleConnection(socket) {
  console.log(socket);
}
// event가 발생하길 기다리는 함수. + 연결된 서버 정보를 soket으로 콜백 함수에 전달
wss.on("connection", handleConnection);

server.listen(5000, handleListen);
