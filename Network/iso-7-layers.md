# OSI(Open System Interconnection) 7 Layer

- 네트워크 : 사용자 혹은 데이터가 어떤 곳에서 다른 곳으로 이동 할 수 있게 만든 통로입니다. 현대의 네트워크는 TCP/IP를 이용하고 어떤한 곳이든 접근할 수 있게 해줍니다.

- OSI7 계층: 네트워크 분야에서 가장 중요하게 다루는 것으로 세계적으로 사용이 되고 네트워크 표준 모델입니다. 이 안에서 TCP/IP 네트워크 통신에 사용되는 전반적으로 프로토콜이 모두 포함되어 있습니다.

- 1계층 물리층 : 실제로 장치들을 연결하기 위한 물리적인 사항을 정의
- 2계층 데이터 전송층 : 두 지점 간의 신뢰성 있는 전송을 보장
- 3계층 네트워크층 : 여러 개의 지점을 거칠 때 경로를 찾아줌
- 4계층 전송층 : 양 끝단의 사용자들이 송수신에 있어서 신뢰성을 보장
- 5계층 양 끝단의 프로세스가 통신을 관리하기 위한 방법을 제공
- 6계층 표현층 : 인코딩 및 데이터의 형식 차이를 조절
- 7계층 응용층 : 응용 프로그램에서 서비스를 수행

> 출처: [OSI 7 계층 이란?](https://github.com/cheese10yun/TIL/blob/master/network/OSI-7%EA%B3%84%EC%B8%B5.md)

# ISO 7 Layer vs TCP/IP 4 Layer

![ISO 7 Layer vs TCP/IP 4 Layer](/Network/public/7-layer-vs-4-layer.png)

# TCP/IP

## IP(Internet Protocol, 인터넷 프로토콜)

- TCP/IP 4 layer: 인터넷 계층(L2) <-> OSI 7 layer: 네트워크 계층(L3)
- 지정한 IP 주소(IP Address)에 데이터 전달
- 패킷(Packet)이라는 통신 단위로 데이터 전달
- IP 프로토콜은 패킷의 순서 보장도 하지 않고, 최대한 빠르게 목적지에 전송
- MAC 주소에 의존하여 통신

## TCP(Transmission Control Protocol, 전송 제어 프로토콜)

- TCP/IP 4 Layer: 전송 계층(L3) <-> OSI 7 layer: 전송 계층(L4)
- 데이터의 전달을 보증하고 보낸 순서대로 받을 수 있음
- 상대방에게 제대로 보내기 위해 `3 way handshake` 통신 방법 이용
  - SYN, ACK라는 TCP 플래그를 이용하여 패킷 송수신을 확인함
