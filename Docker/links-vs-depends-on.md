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
