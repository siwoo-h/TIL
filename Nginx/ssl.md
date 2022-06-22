# SSL

SSL(Secure Sockets Layer)은 보안 프로토콜로서, 개인정보 보호, 인증, 무결성을 인터넷 통신에 제공합니다. SSL은 TLS(Transport Layer Security)로 발전했습니다.

## SSL/TLS의 동작 방식

- SSL은 높은 수준의 개인정보 보호를 제공하기 위해, 웹에서 전송되는 데이터를 암호화합니다. 따라서, 데이터를 가로채려는 자는 거의 해독할 수 없는 복잡한 문자만 보게 됩니다.
- SSL은 두 통신 장치 사이에 핸드셰이크라는 인증 프로세스를 시작하여 두 장치의 ID를 확인합니다.
- SSL은 또한 데이터 무결성을 제공하기 위해 데이터에 디지털 서명하여 데이터가 의도된 수신자에 도착하기 전에 조작되지 않았다는 것을 확인합니다.

> 이외 SSL/TLS의 자세한 설명은 다음 문서에 아주 잘 정리되어 있다.
>
> - [cloudflare - SSL 정의](https://www.cloudflare.com/ko-kr/learning/ssl/what-is-ssl/)

## Nginx 설정

```yml
server {
    # default_server 인자, 가상의 호스트가 다른 가상의 호스트들의 listen statement와 매치되지 않는 모든 요청에 응답한다.
    listen 80 default_server;
    # IPv6 형식의 요청을 처리한다.
    listen [::]:80 default_server;

    # 80번 포트로 수신되면 443번 포트로 리다이렉션 시켜준다.
    # HttpCode 301, 영구 이동(Permanently moved)
    return 301 https://$host$request_uri;
}

server	{
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # Name-Based Virtual Hosting(이름 기반 가상 호스팅)
    server_name localhost;

    # deprecated from Nginx v1.15
    # ssl on;
    # 병합한 파일
    ssl_certificate /etc/ssl/certs/localhost.crt;
    # 비공개 키
    ssl_certificate_key /etc/ssl/private/localhost.key;

    root /var/www/html;

    index index.html index.htm index.php index.nginx-debian.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
