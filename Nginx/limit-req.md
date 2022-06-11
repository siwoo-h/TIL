# Limit Requests

> - 단일 IP에서 오는 요청 처리 속도를 제한하는 데 `ngx_http_limit_req_module` 모듈을 사용한다.
> - Nginx를 이용해 Reverse Proxy를 구성하는 경우 사용된다.
> - Reverse Proxy를 거치는 WAS에서 IP 기준으로 트래픽 제어를 하려고 했을 때, IP는 항상 Nginx IP를 클라이언트 IP로 받기 때문에 의도대로 동작하지 않는다.

## Directives

```bash
Syntax:	limit_req zone=name [burst=number] [nodelay | delay=number];
Default: —
Context: http, server, location
```

## Example Configuration

```bash
http {
    # $binary_remote_addr : 클라이언트의 IP(nginx 기본 내장 변수)
    limit_req_zone $binary_remote_addr;
    # depend_rate_limit: zone 이름
    # 10M: zone에서 활용 가능한 memory size
    # rate: 10 request / second (r/s, r/m 가능)
    zone=depend_rate_limit:10m rate=10r/s;

    server {
        location / {
            # burst: 5개까지 queue에 보관하고, 초과 요청에 대해서는 에러 처리
            # nodelay: 과도한 요청을 지연시키지 않음(optional)
            limit_req zone=depend_rate_limit burst=5 nodelay;
        }
    }
```

## Error Status

- 과도한 요청 발생 시, 반환하는 에러 코드를 설정한다.
- 기본값은 503 코드이다. 사용자 정의에 따라 변경된다. ex) 429, too many requests

```bash
Syntax:	limit_req_status code;
Default: limit_req_status 503;
Context: http, server, location
```
