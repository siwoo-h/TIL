# ENV file

docker-compose.yml 파일에서 참조할 환경변수 파일을 설정할 수 있다.

```
# 기본적으로 .env 파일 호출
$ docker compose config

# --env-file 옵션을 통해 파일을 인수로 전달하여 환경변수 파일 재정의
$ docker compose --env-file ./config/.env.dev config

# 서비스 컨테이너에 env_file 옵션으로 환경변수 파일 재정의
# docker-compose.yml
web:
  env_file:
    - .env.dev
```

- 기본 파일명: `.env`
- `--env-file` 옵션: Compose 실행
- `env_file` 옵션: docker-compose 내 서비스에서 설정
