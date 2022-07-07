# Socket 통신

## Socket 통신 vs HTTP 통신

| Socket 통신                                                   | HTTP 통신                                                                          |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 클라이언트의 요청이 있을 때 서버가 응답하는 방식, 단방향 통신 | 클라이언트와 서버가 서로에게 요청을 보낼 수 있는 방식, 양방향 통신                 |
| 연결을 유지해줘야 하기 때문에 많은 리소스가 소모된다.         | 서버는 데이터를 응답한 이후에 연결을 즉시 종료할 수 있어서 서버의 부하를 줄여준다. |
| 실시간 채팅이나 실시간 스트리밍에 이용된다.                   | 빈번하게 데이터를 주고받는 환경이 아닌 경우 이용된다.                              |

## WebSocket

RFC 6455 명세서에 정의된 프로토콜인 웹소켓(WebSocket)을 사용하면 서버와 브라우저 간 연결을 유지한 상태로 데이터를 교환할 수 있다.<br>
이때 데이터는 ‘패킷(packet)’ 형태로 전달되며, 전송은 커넥션 중단과 추가 HTTP 요청 없이 양방향으로 이루어진다.<br>
데이터 교환이 지속적으로 이뤄져야 하는 서비스에 적합하다.

- 출처: 모던 자바스크립트 튜토리얼, WebSocket [link](https://ko.javascript.info/websocket)

### WebSocket Protocol

웹 소켓 프로토콜로는 `ws`와 `wss`가 있다. 이 두 프로토콜의 관계는 `http`와 `https`의 관계와 유사하다.<br>
항상 `wss://` 프로토콜을 사용하자. 보안과 신뢰성 측면에서도 `ws`보다 안전한 프로토콜이다.<br>
HTTP를 이용해서 연결을 수립하며 연결 된 이후에도 연결을 할 때 사용했던 포트인 80과 443포트를 이용한다.

### Rate Limiting

`socket.bufferedAmount` 프로퍼티에서는 얼마나 많은 바이트가 버퍼에 보관되어 있는지 저장하고 있다.

```js
// every 100ms examine the socket and send more data
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```
