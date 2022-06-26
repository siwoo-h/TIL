# HTTP vs HTTPS

## TOC

> - [HTTP 란?](#http-란)
>   - [주요 특징](#주요-특징)
>   - [통신 과정](#통신-과정)

---

## HTTP 란?

> ### TLTR;
>
> 1. 클라이언트-서버 통신
> 2. Stateless
> 3. Connectionless

HTTP(Hyper Text Transfer Protocol)란 서버/클라이언트 모델을 따라 데이터를 주고 받기 위한 프로토콜이다.

즉, HTTP는 인터넷에서 HTML을 교환하기 위한 통신 규약으로, 80번 포트를 사용하고 있다. 따라서 HTTP 서버가 80번 포트에서 요청을 기다리고 있으며, 클라이언트는 80번 포트로 요청을 보내게 된다.

- 현재는 html 문서 형식 뿐 아니라 json, image 파일 등을 전송할 수 있다.

### 주요 특징

주요 특징으로는, **클라이언트-서버 통신**, **Stateless**, **Connectionless** 가 있다.

**클라이언트-서버 통신**, 클라이언트는 서버에 리소스를 요청하고, 서버는 요청에 따라 response를 전송한다. 클라이언트에서 서버로 단방향 통신이 이루어진다.

**Stateless**, 서버는 클라이언트의 이전 상태를 보존하지 않는다. 따라서, 서버는 여러 클라이언트에 대응할 수 있고, 클라이언트도 같은 서버가 유지될 필요가 없다.

**Connectionless**, 클라이언트는 서버에게 response를 받은 이후 TCP/IP 연결 상태를 끊어버린다. HTTP에서는 연결을 유지하지 않는 것을 기본으로 하고, 필요에 따라 keep alive 옵션을 통해 연결 상태를 일정 시간 유지할 수 있다.

### 통신 과정

> 브라우저 주소창에 URL을 입력하면 어떤 일이 일어날까?

1.  사용자가 주소창에 URL을 입력 후 엔터를 친다.
2.  [브라우저에 캐싱된 DNS 기록 조회](#브라우저에-캐싱된-dns-기록-조회)
3.  [요청한 URL이 캐시에 없는 경우, ISP의 DNS 서버에서 다른 DNS를 조회하여 IP 탐색](#요청한-url이-캐시에-없는-경우-isp의-dns-서버에서-다른-dns를-조회하여-ip-탐색)
4.  [브라우저가 해당 서버와 TCP 연결 시작](#브라우저가-해당-서버와-tcp-연결-시작)
5.  브라우저가 웹서버에 HTTP 요청 전송
6.  서버가 HTTP 응답 전송
7.  브라우저가 HTML 컨텐츠를 노출
8.  [연결 종료](#연결-종료)

#### 브라우저에 캐싱된 DNS 기록 조회

- 도메인 주소로 입력했을 때, IP를 가져올 수 있도록 DNS(Domain Name System) 서버를 이용한다.
- DNS는 Doman Name System의 약자로 URL의 이름과 IP주소를 저장하고 있는 데이터베이스이다.

#### 요청한 URL이 캐시에 없는 경우, ISP의 DNS 서버에서 다른 DNS를 조회하여 IP 탐색

- 캐시에 요청한 URL의 IP 정보가 없으면, ISP는 DNS 서버들을 검색해 해당 도메인의 IP 주소를 검색한다.
- ISP는 인터넷 서비스 공급자의 약자이다. ex) SK, LG, KT 등

#### 브라우저가 해당 서버와 TCP 연결 시작

- TCP 3-way handshake 과정을 통해 클라이언트와 서버가 연결된다.
- 정확한 전송을 보장하기 위해 세션을 수립하는 과정을 의미한다.

> TCP 3-way handshake 과정
>
> - 클라이언트 > 서버: 접속을 요청하는 SYN flag가 설정된 패킷 전송(클라이언트 상태: SYN_SENT)
> - 서버 > 클라이언트: 요청을 수락하는 ACK flag가 설정된 패킷과 SYN flag가 설정된 패킷 전송(서버 상태: SYN_RECIEVED)
> - 클라이언트 > 서버: 요청을 수락하는 ACK flag가 설정된 패킷 전송(서버 상태: EST_ABLISHED)
>
> 이로써 연결 완료되고, 이후부터는 데이터 송수신이 가능하다.

#### 연결 종료

- 세션을 종료하기 위해서는 TCP 4-way handshake 과정이 이루어진다.

> TCP 4-way handshake 과정
>
> - 클라이언트 > 서버: 연결 종료를 요청하는 FIN flag가 설정된 패킷 전송(클라이언트 상태: FIN_WAIT_1)
> - 서버 > 클라이언트: 요청을 수락하는 ACK flag가 설정된 패킷 전송 + 자신의 통신이 끝날때까지 대기(클라이언트 상태: FIN_WAIT_2, 서버 상태: CLOSE_WAIT)
> - 서버 > 클라이언트: 자신의 통신이 종료되면 FIN flag가 설정된 패킷 전송(클라이언트 상태: TIME_WAIT, 서버 상태: LAST_ACK)
> - 클라이언트 > 서버: 확인했다는 ACK flag가 설정된 패킷 전송
>
> 이로써 연결 종료된다.

---

## HTTPS 란?

HTTP는 암호화되지 않은 평문으로 데이터가 전송되기 때문에 보안상 문제가 있다. <br>
HTTPS는 HTTP에 데이터 암호화가 추가된 프로토콜이다. 443번 포트를 사용하고 있다.<br>
따라서 HTTPS 서버가 443번 포트에서 요청을 기다리고 있으며, 클라이언트는 443번 포트로 요청을 보내게 된다.

### 암호화 방법

HTTPS는 대칭키 암호화와 비대칭키 암호화 방식을 모두 사용하고 있다.

> - 대칭키 암호화 방식
>   - 클라이언트와 서버가 동일한 키를 사용하여 암호화/복호화를 진행함
>   - 키가 노출되면 복호화가 가능해지기 때문에 보안 상 문제가 됨
>   - 연산 속도가 빠름
> - 비대칭키 암호화 방식
>   - 1개 쌍으로 구성된 공개키와 개인키를 암호화/복호화하는데 사용함
>   - 키가 노출되어도 비교적 안전함
>   - 연산 속도가 느림

### 통신 과정

> TLTR; <br>
> TCP 3-way handshake 이후에 SSL handshake 프로토콜로 협상을 진행한다.

HTTP 통신 과정과 비교했을 때, TCP 연결 과정에서 차이를 확인할 수 있다. <br>
HTTPS 통신 과정은 HTTP 통신의 TCP 3-way handshake 이후에 SSL handshake 과정을 추가로 거친다. <br>
SSL handshake 혹은 TLS handshake 란, 송신자와 수신자가 암호화된 데이터를 주고 받기 위한 일련의 협상 과정을 의미한다.

#### SSL handshake 과정

1. 클라이언트 > 서버: 접속을 요청하는 **Client Hello 패킷** 전송

   > Client Hello 패킷 구조
   >
   > - Cipher Suite 목록: 자신이 사용 가능한 암호화 알고리즘 목록
   > - Session ID
   > - SSL Protocol Version
   > - Random byte
   > - 등등...

2. 서버 > 클라이언트: ClientHello 패킷의 Cipher Suite 목록 중 하나를 선택하여 자신의 SSL/TLS version 정보를 담은 **Server Hello 패킷** 전송

   > Server Hello 패킷 구조
   >
   > - Cipher Suite: 자신이 선택한 암호화 알고리즘
   > - Session ID
   > - SSL Protocol Version
   > - Random byte
   > - 자신의 SSL 인증서(공개키)를 포함
   > - 등등...

3. 클라이언트 > 서버: **Certificate 패킷** 전송

   - 클라이언트는 서버가 전송한 인증서가 CA(Certificate Authority, 인증기관)가 서명한 인증서가 맞는지 검증한다.

   - 클라이언트는 서버의 개인키로 암호화된 인증서를 클라이언트가 가지고 있는 개인키로 복호화함으로써 인증서를 검증한다.
   - 클라이언트가 가지는 CA 리스트에 존재하지 않는 인증기관인 경우, 외부 인터넷을 통해 인증 기관의 정보와 공개키 정보를 확보한다.

   > 서버에서 전송한 인증서가 CA가 서명한 인증서가 아닌 개인이 서명한 인증서인 경우는 어떻게 처리할까?<br>
   >
   > - self-signed certification에 대한 처리는 이전 TIL([Self-signed certificate 에러 발생 원인](/Node/self-signed-certificate-exception.md))을 확인하자.
   > - TODO: 클라이언트가 서버의 개인키를 가진다면 이전 TIL이 아닌 방식으로 해결할 수 있을지 검토 필요
   > - 클라이언트가 브라우저인 경우에는 CA의 개인키 목록을 가지고 있기 때문에 별도의 작업 없이 이 단계를 지나갈 수 있다.
   > - TODO: 클라이언트가 브라우저가 아닌 경우에도 CA 리스트를 가지고 있을지 검토 필요
   > - TODO: [[network] 폐쇄망 로컬 환경에서 CA-signed SSL 인증서 이용하기 (“trusted” self-signed certificate)](https://oboki.net/workspace/system/linux/how-to-use-trusted-self-signed-certificate-for-local-secure-env/)

4. 서버 > 클라이언트: **Server Key Exchange 패킷**과 **Server Hello Done 패킷** 전송

   - **Server Key Exchange 패킷**
     - 서버의 SSL 인증서에 공개키가 없는 경우 서버가 직접 전달한다.
     - 인증서 내부에 공개키가 포함된다면, Server Key Exchange 패킷은 생략된다.
     - 공개키가 있다면, CA의 공개키를 사용해서 복호화하여 서버의 공개키를 확보할 수 있다.
   - **Server Hello Done 패킷**
     - 서버에서는 협상을 마쳤다는 의미

5. 클라이언트 > 서버: **Client Key Exchange 패킷**, **Change Cipher Spec 패킷** 전송

   - **Client Key Exchange 패킷**
     - 클라이언트는 비밀키(대칭키)를 생성한 후 서버의 공개키로 암호화하여 서버에게 전달한다.
   - **Change Cipher Spec 패킷**
     - 클라이언트는 비밀키(대칭키)를 그대로 서버로 전달하지 않고, 서버의 공개키로 암호화하여 전달한다.
     - 통신할 준비가 완료되었다는 상태를 함께 담아 전달한다.

6. 클라이언트 > 서버, 서버 > 클라이언트: **FINISHED 패킷**을 전송하면서 handshake가 종료된다.

SSL handshake가 종료되면, 클라이언트와 서버는 데이터를 암호화/복호화에 사용할 동일한 비밀키(대칭키)를 가지게 된다.
