## Nginx with Docker

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
