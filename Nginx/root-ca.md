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

- 개인이 서명한 인증서(Self-signed Certificate)를 이용하려고 할 때 직접 사설 CA 인증서를 발급하여 이용할 수 있음

## 자체 서명 인증서 vs 자체 서명 CA

> - 공인 CA로부터 SSL 인증서를 발급받을 수 없는 경우, 자체 서명 CA를 이용하여 SSL 인증서를 발급받자

자체 서명 인증서(Self-signed certificate)

- 자체적으로 서명되며 유효성을 검증해주는 CA가 없는 인증서
- 대부분의 모바일 플랫폼에서 자체 서명된 인증서의 사용을 지원하지 않으므로 이를 사용하지 않도록 권장함

자체 서명 CA(Self-signed CA, Root CA)

- 자체 서명된 CA는 인증서인 동시에 CA이다
- 트리의 최상위 인증서이므로 이를 루트 CA라고도 함
- 사설 CA가 서명한 인증서는 보안상 외부 Internet-facing 서버의 프로덕션 용도로는 권장되지 않음
- 비용이 저렴하여 개발 및 테스트 환경에서 이용됨
- 또한 배치가 쉽고 빠르므로 내부(인트라넷) 서버용으로 적합함
- 추가로, 클라이언트 OS에 Root CA 인증서를 설치하면, 인증서 유효성 검사에 통과할 수 있다.
  - 브라우저 주소창의 "주의 요함" 경고문을 없앨 수 있다.
  - [여기](https://oboki.net/workspace/system/linux/how-to-use-trusted-self-signed-certificate-for-local-secure-env/)에서 자세히 설명하고 있다.

## 참고 자료

- [HTTPS 통신 과정 쉽게 이해하기](https://aws-hyoh.tistory.com/entry/HTTPS-%ED%86%B5%EC%8B%A0%EA%B3%BC%EC%A0%95-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-3SSL-Handshake)
- [SSL의 통신과정](https://canstoo.tistory.com/3)
- [[network] 폐쇄망 로컬 환경에서 CA-signed SSL 인증서 이용하기 (“trusted” self-signed certificate)](https://oboki.net/workspace/system/linux/how-to-use-trusted-self-signed-certificate-for-local-secure-env/)
- [신뢰되지 않는 인증서를 사용하여 SSL 구성](https://www.ibm.com/docs/ko/mpf/7.1.0?topic=server-configuring-ssl-by-using-untrusted-certificates)
