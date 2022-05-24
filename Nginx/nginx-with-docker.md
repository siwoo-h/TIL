# Nginx - Reverse Proxy (w/ Docker)

> Nginx를 이용해서 Reverse Proxy를 구현할 수 있다. 외부에서 내부 서버로 접근하는 경우, 웹서버를 먼저 거쳐서 내부 서버로 프록시해준다.
> Reverse Proxy를 사용하여 얻을 수 있는 장점은 크게 "보안"과 "로드밸런싱" 두가지로 볼 수 있다.
>
> - 보안: 외부 사용자는 내부 서버에 직접 접근하지 않고, Reverse Proxy 서버가 요청을 받고, 서버에 요청을 넘겨주는 역할을 한다. 따라서 외부로부터 내부 서버를 숨기며 보안을 유지할 수 있다.
> - 로드밸런싱: 서버에 여러대인 경우 중계기 역할을 하는 Nginx가 로드밸런서 역할을 하여 부하를 줄여준다.

```bash
# nginx.conf
# nginx 동작 방식을 설정해 둔 파일

http {
    # 파일 확장자와 MIME 목록
    include       mime.types;
    # 프록시 관련 환경 설정
    include       proxy.conf;

    # docker-compose.yml, app-frontend 컨테이너의 container_name: frontend 로 설정되어 있어야 한다.
    upstream frontend {
        server app-frontend:3000;
    }
    upstream backend {
        server  app-backend:8080;
        # 접속 시 커넥션 유지 시간(초)
        keepalive 100;
    }
    default_type  application/octet-stream;
    sendfile        on;
    # 접속 시 커넥션 유지 시간(초)(default: 10)
    keepalive_timeout  65;
    server {
        # Nginx는 80포트에서 모든 요청을 수신한다.
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        location / {
            # / 로 전달받은 URL은 upstream frontend로 프록시한다
			proxy_pass http://frontend;
            proxy_set_header  Host $host;
            proxy_http_version  1.1;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /api {
            # api 키워드를 제거 후 요청
            rewrite     ^/api/(.*)$     /$1     break;
            # /api 로 전달받은 URL은 upstream backend로 프록시한다
            proxy_pass  http://backend;
            proxy_set_header Host $host;
			proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection "upgrade";
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        # error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

```yml
# docker-compose.yml
version: "3.8"

services:
  app-frontend:
    image: app-frontend:v1.0
    container_name: frontend
    restart: always
    ports:
      - 3000:3000
    networks:
      - app_network

  app-backend:
    image: app-backend:v1.0
    container_name: backend
    restart: always
    ports:
      - 8080:8080
    networks:
      - app_network

  nginx-proxy:
    image: nginx:latest
    container_name: nginx-proxy
    restart: always
    ports:
      - 80:80
    volumes:
      - ./proxy/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./proxy/proxy.conf:/etc/nginx/proxy.conf:ro
      - ./proxy/mime.types:/etc/nginx/mime.types:ro
      - ./proxy/logs:/etc/nginx/logs
    depends_on:
      - app-backend
      - app-frontend
    networks:
      - app_network

networks:
  app_network:
    driver: bridge
```

---

Retrospective: [PR #2](https://github.com/siwoo-h/TIL/pull/2)
