# API Design

## HTTP API

> HTTP API 디자인 가이드
>
> - [참고 문서](https://github.com/yoondo/http-api-design/tree/master/ko)

### Contents

- [🔗 올바른 상태 코드를 반환하라](#올바른-상태-코드를-반환하라)
- [🔗 가능하다면 전체 리소스를 모두 제공하라](#가능하다면-전체-리소스를-모두-제공하라)
- [🔗 요청의 본문에 직렬화된 JSON을 허용하라](#요청의-본문에-직렬화된-json을-허용하라)
- [🔗 리소스 (UU)ID를 제공하라](#리소스-uuid를-제공하라)
- 표준 타임스탬프를 제공하라
- ISO8601 포맷에 맞춘 UTC 시간을 사용하라
- 일관성 있는 경로 포맷을 사용하라
- 경로와 속성은 소문자로 만들어라
- 외래 키 관계를 중첩시켜라
- 편의성을 위해 ID가 아닌 역참조를 지원하라
- 구조화된 오류를 생성하라
- Etag 캐싱을 지원하라
- 요청 ID로 요청을 추적하라
- 범위를 지정해 페이지를 만들라
- 빈도 제한 상태를 보여줘라
- 승인 헤더로 버전을 매겨라
- 경로 중첩을 최소화하라
- 기계가 읽을 수 있는 JSON 스키마를 제공하라
- 사람이 읽을 수 있는 문서를 제공하라
- 실행할 수 있는 예제를 제공하라
- 안정성의 정도를 나타내라
- TLS을 요구하라
- 보기 좋게 출력되는 JSON을 기본으로 하라

### 올바른 상태 코드를 반환하라

상황에 맞는 올바른 상태 코드를 반환해야한다.<br>
성공적인 상태 코드도 상황에 따라 분기되어야 한다.

- 200: GET 호출과 DELETE 또는 PATCH 호출에 따른 요청이 성공했고, 동시에 완료됐다.
- 201: POST 호출에 따른 요청이 성공했고, 동시에 완료됐다.
- 202: POST나 DELETE나 PATCH 호출을 받았고, 비동기적으로 수행될 예정이다.
- 206: GET이 성공했지만 부분적인 응답만이 반환됐다.

자세한 스펙은 [HTTP Status](https://developer.mozilla.org/ko/docs/Web/HTTP/Status) 를 확인해보자.

```bash
$ curl -X DELETE \
  https://service.com/apps/1f9b/domains/0fd4

# 잘못된 응답 예시
HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
...
{
  "messge": "deleted"
}

# 올바른 응답 예시
HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
...
{
  "created_at": "2012-01-01T12:00:00Z",
  "hostname": "subdomain.example.com",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "updated_at": "2012-01-01T12:00:00Z"
}
```

### 가능하다면 전체 리소스를 모두 제공하라

리소스 조회(GET) 요청 뿐 아니라 DELETE, PUT, PATCH을 포함한 200, 201 응답에서 전체 리소스를 제공하자.<br>

```bash
$ curl -X DELETE \
  https://service.com/apps/1f9b/domains/0fd4

# 잘못된 응답 예시
HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
...
{
  "messge": "deleted"
}

# 올바른 응답 예시
HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
...
{
  "created_at": "2012-01-01T12:00:00Z",
  "hostname": "subdomain.example.com",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "updated_at": "2012-01-01T12:00:00Z"
}
```

### 요청의 본문에 직렬화된 JSON을 허용하라

양식에 따라 인코딩된 데이터를 대신하거나 그에 덧붙여, PUT/PATCH/POST 요청 본문에 직렬화된 JSON을 허용하자.<br>
이는 JSON으로 직렬화된 응답 본문과 잘 어울리는 대칭성을 부여해준다.
클라이언트에서 요청을 보낼 때, `Content-Type: application/json`를 설정해서 데이터 응답으로 리소스를 제공받자.

### 리소스 (UU)ID를 제공하라

각 리소스의 ID에 uuid를 사용하도록 권고한다.

> Q. uuid와 increment pk를 사용해야하는 시점은 언제일까? <br>
>
> A. 어플리케이션 내부용 키로는 increment pk를, 외부에 공개할 키로는 uuid를 사용하는 것을 권장한다. <br>
> 어플리케이션 내부에서 참조키로 increment pk를 이용할 때, uuid에 비해 테이블과 인덱스의 크기를 줄여 메모리와 디스크 사용량을 줄이는 이점을 준다.
> 외부에 식별값이 노출되는 경우에는 uuid를 사용하도록 하자. 자동 증분 값을 id로 설정하는 경우 의도하지 않은 정보를 노출하는 등의 보안 상 문제가 발생할 수 있다.

---

## HTTP API vs REST API

> HTTP API와 REST API는 거의 같은 의미로 사용하고 있다.
> 정확한 차이점으로 REST API는 HTTP 프로토콜을 따르면서 아래의 4가지 가이드 원칙을 지켜야 한다.
>
> 1. 자원의 식별
> 2. 메세지를 통한 리소스 조작
> 3. 자기서술적 메세지
> 4. 애플리케이션의 상태에 대한 엔진으로서 하이퍼미디어(HATEOAS)
>
> 우아한형제들 김영한 개발이사 인용
