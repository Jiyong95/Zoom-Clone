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

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, cb) => {
    console.log(msg);
    // cb는 Server에서 호출하지만 Browser에서 실행된다!!!
    //=>Browser console에 cb()가 찍힌다.
    setTimeout(() => {
      cb();
    }, 10000);
  });
});

const handleListen = () => console.log("Listening on http://localhost:5000");
httpServer.listen(5000, handleListen);
