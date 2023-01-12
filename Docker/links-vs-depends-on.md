# links vs depends_on

## links

도커 네트워크 구조 중 `links` 옵션이 있다.
`links`는 같은 네트워크 내 컨테이너 서비스 간 통신을 할 때 사용한다.

### 사용하기

```yml
version: "3.8"

services:
  service-a:
    image: a-image:latest
    expose:
      - 3000
    volumes:
      - ./a:/app
    environment:
      SERVICE_B_URL: service-b
    links:
      - service-b
    networks:
      - app_network

  service-b:
    image: b-image:latest
    expose:
      - 5000
    volumes:
      - ./b:/app
    environment:
      SERVICE_A_URL: service-a
    links:
      - service-a
    networks:
      - app_network

networks:
  app_network:
    driver: bridge
```

## depends_on

서비스 실행/중지 순서를 결정한다.

```yml
services:
  db:
    image: postgres:latest
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - 5432:5432

  web-app:
    image: web-app:latest
    ports:
      - 8080:8080
    depends_on:
      - db
```
