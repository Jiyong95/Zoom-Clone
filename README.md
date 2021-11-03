# Noom

Zoom Clone using NodeJs, WebRTC and Websockets.

![](https://images.velog.io/images/dlfehd54/post/a39b4210-d874-410b-86d1-7a59a16118b8/webSocket.png)

### `http` : protocol

- stateless : backend는 response 후user를 기억하지 못함.
- request - response - request - response ....

### `WebSocket` : protocol

- WebSoket request + WebSoket accept : 연결 성립
- 서버는 유저를 기억함
- 그 다음 양쪽에서 순서와 상관없이 정보를 보낼 수 있다.
