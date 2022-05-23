## Nginx - Reverse Proxy

```
# nginx.conf

http {
    include       mime.types;
    include       proxy.conf;

    <!-- docker-compose.yml, app-frontend 컨테이너의 container_name: frontend 로 설정되어 있어야 한다. -->
    upstream frontend {
        server app-frontend:3000;
    }
    upstream backend {
        server  app-backend:8080;
        keepalive 100;
    }
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        <!-- Nginx는 80포트에서 모든 요청을 수신한다. -->
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        location / {
            <!-- / 로 전달받은 URL은 upstream frontend로 프록시한다 -->
			proxy_pass http://frontend;
            proxy_set_header  Host $host;
            proxy_http_version  1.1;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /api {
            <!-- api 키워드를 제거 후 요청 -->
            rewrite     ^/api/(.*)$     /$1     break;
            <!-- /api 로 전달받은 URL은 upstream backend로 프록시한다 -->
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
