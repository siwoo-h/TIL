# Root CA

## CA

CA(Certificate Authority, 인증 기관)란 SSL 인증서를 발급해주는 기관을 말한다.

## Certificate Chain

- SSL 인증서는 Root CA(Certificate Authority, 인증 기관)로부터 발급받는다.
- 일반적으로 인증서는 Root, Intermediate, Leaf 세 단계로 구성되어있고, 이를 인증서 체인이라고 한다. SSL 인증서는 Leaf 단계의 인증서이다.
- 인증서 체인은 하위 구조 인증서를 서명하고, 상위 구조 인증서를 참고한다.
- 서버의 인증서를 신뢰하려면 Root 인증서를 역추적할 수 있어야한다.
- 공인 인증된 CA의 Root CA 인증서는 브라우저, 운영체제에 이미 설치되어있기 때문에 따로 설치할 필요없다.

## 공인 CA와 사설 CA

공인 CA

- 디지털서명을 이용한 전자상거래 등에 있어서 누구나가 객관적으로 신뢰할 수 있는
  제3자(Trusted Third Party)를 의미함
- 전자서명 및 암호화를 위한 디지털 인증서를 발급,관리하는 서비스 제공 기관/서버

사설 CA<br>

- 개인이 서명한 인증서(Self-Signed Certificate)를 이용하려고 할 때 직접 사설 CA 인증서를 발급하여 이용할 수 있음
