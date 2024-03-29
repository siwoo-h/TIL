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
- [🔗 표준 타임스탬프를 제공하라](#표준-타임스탬프를-제공하라)
- [🔗 ISO8601 포맷에 맞춘 UTC 시간을 사용하라](#iso8601-포맷에-맞춘-utc-시간을-사용하라)
- [🔗 일관성 있는 경로 포맷을 사용하라](#일관성-있는-경로-포맷을-사용하라)
- 경로와 속성은 소문자로 만들어라
- [🔗 외래 키 관계를 중첩시켜라](#외래-키-관계를-중첩시켜라)
- 편의성을 위해 ID가 아닌 역참조를 지원하라
- [🔗 구조화된 오류를 생성하라](#구조화된-오류를-생성하라)
- [🔗 Etag 캐싱을 지원하라](#etag-캐싱을-지원하라)
- [🔗 요청 ID로 요청을 추적하라](#요청-id로-요청을-추적하라)
- [🔗 범위를 지정해 페이지를 만들라](#범위를-지정해-페이지를-만들라)
- 빈도 제한 상태를 보여줘라
- 승인 헤더로 버전을 매겨라
- [🔗 경로 중첩을 최소화하라](#경로-중첩을-최소화하라)
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

### 표준 타임스탬프를 제공하라

리소스에 created_at과 updated_at 타임스탬프를 기본으로 제공하자.

> Q. 타임스탬프가 가지는 의의는 무엇일까?
>
> A. 전자문서가 어느 특정 시각에 존재하고 있었다는 것을 증명하는 것과 동시에, 그 시각 이후에 데이터가 변경되지 않았음을 증명하는 전자적 기술이다.
>
> - 첨부 자료: 타임스탬프 솔루션, [타임스탬프의 필요성](http://www.timestamping.co.kr/?mid=menu2_need)

### ISO8601 포맷에 맞춘 UTC 시간을 사용하라

ISO8601 포맷은 날짜와 시간과 관련된 데이터 교환을 다루는 국제 표준이다.<br>
데이터 관리의 시간대의 기준은 UTC로 통일하자.

### 일관성 있는 경로 포맷을 사용하라

경로의 구조를 리소스 이름과 액션으로 구성하자.
리소스 이름은 복수형을 사용하여 특정 리소스를 참조하는 방식을 일관되게 유지할 수 있도록 한다.
액션이 필요한 경우에는 표준화된 `action` 접두사 아래에 위치시킨다.

```
# 포맷
/resources/:resource/actions/:action

# 예시
/runs/{run_id}/actions/stop
```

### 외래 키 관계를 중첩시켜라

외래 키 참조는 중첩된 객체로 직렬화하라.

```js
// 좋은 예
{
  "name": "service-production",
  "owner": {
    "id": "5d8201b0..."
  },
  ...
}

// 안좋은 예
{
  "name": "service-production",
  "owner_id": "5d8201b0...",
  ...
}
```

### 구조화된 오류를 생성하라

요류가 발생하면 일관성 있고 구조화된 응답 본문을 생성하자.

```js
// 예제 응답 구조
// id: 기계가 읽을 수 있는 오류
// message: 사람이 읽을 수 있는 오류
// url: 오류에 관한 정보와 해결 방안
{
  "id":      "rate_limit",
  "message": "Account reached its API rate limit.",
  "url":     "https://docs.service.com/rate-limits"
}

// 실제 활용 예시
// TODO: 예제 응답 구조를 활용하는 방법 고민하기
// statusCode: HTTP code
// error: 예외처리 분류
// message: 에러 메시지
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Permission denied",
}
```

### Etag 캐싱을 지원하라

> Etag 캐싱이란?
>
> ETag HTTP 응답 헤더는 특정 버전의 리소스를 식별하는 식별자입니다. <br>
> 웹 서버가 내용을 확인하고 변하지 않았으면, 웹 서버로 full 요청을 보내지 않기 때문에, 캐쉬가 더 효율적이게 되고, 대역폭도 아낄 수 있습니다.<br>
> 허나, 만약 내용이 변경되었다면, "mid-air collisions" 이라는 리소스 간의 동시 다발적 수정 및 덮어쓰기 현상을 막는데 유용하게 사용됩니다.<br
>
> - 출처: https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/ETag

### 요청 ID로 요청을 추적하라

> 각 API 응답에 UUID 값을 담아서 만들어진 Request-Id 헤더를 포함시키자.<br>
> 서버와 클라이언트 모두가 이 값을 로그로 남긴다면 요청을 추적하고 디버깅하는 데 유용하다.<br>
>
> 출처: https://github.com/yoondo/http-api-design/tree/master/ko#%EC%9A%94%EC%B2%AD-id%EB%A1%9C-%EC%9A%94%EC%B2%AD%EC%9D%84-%EC%B6%94%EC%A0%81%ED%95%98%EB%9D%BC

### 범위를 지정해 페이지를 만들라

많은 양의 데이터가 만들어지는 응답은 여러 페이지로 나누도록 하자.<br>
`Content-Range` 헤더를 사용해 페이지를 나누는 요청을 전달하자.<br>
요청과 응답의 헤더, 상태 코드, 제한, 순서, 페이지 이동 등의 세부 사항은 범위에 관한 히로쿠 플랫폼 API의 예제를 살펴보자.<br>

> `Content-Range` HTTP 응답 헤더는 전체 바디 메시지에 속한 부분 메시지의 위치를 알려줍니다.
>
> **Syntax:**
> Content-Range: <unit> <range-start>-<range-end>/<size>
> Content-Range: <unit> <range-start>-<range-end>/_
> Content-Range: <unit> _/<size>

예시를 살펴보자.<br>
**요청**

```
GET /file.zip HTTP/1.1
Range: bytes=100-200
```

**응답**

```
HTTP/1.1 206 Partial Content
Content-Range: bytes 100-200/500
```

`Content-Range` 헤더에 대해 검색했을 때 찾을 수 있는 예시이다.<br>
`bytes` 단위의 페이지네이션이 아닌 `pages` 단위로 페이지네이션을 구현할 수 있을까?<br>
[다음 문서](https://blog.npcode.com/2013/02/10/http1-1%EC%9D%98-range-%EC%9A%94%EC%B2%AD%EA%B3%BC-%EC%9D%B4%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-pagination/)에서 잘 정리되어 있다.<br>

> 웹 애플리케이션의 pagination을 구현하기 위해 직접 정의한 “pages”라는 단위와 HTTP/1.1의 Accept-Ranges, Range, Content-Range 헤더를 이용한다.
> 각 헤더의 사용 방법은 다음과 같다.

**요청**

```
Accept-Ranges: pages
Range: pages=1
```

**응답**

```
HTTP/1.1 206 Partial Content
Content-Range: pages 1/2
```

일반적으로 페이지네이션을 구현하기 위해서는 query string을 이용한다.<br>
range 요청을 이용한다면, 표준화된 인터페이스와 동작을 지원할 수 있다.<br>

### 경로 중첩을 최소화하라

경로 설계를 부모/자식 리소스 관계를 표현하기 위해 다음과 같이 깊은 중첩으로 나타내었다.
하지만 이는 잘못된 방식이다.

**잘못된 예시**

```
/orgs/{org_id}/apps/{app_id}/dynos/{dyno_id}
```

루트 경로에 리소스가 위치하는 편을 선택해 중첩되는 깊이를 제한해야한다.

**올바른 예시**

```
/orgs/{org_id}
/orgs/{org_id}/apps
/apps/{app_id}
/apps/{app_id}/dynos
/dynos/{dyno_id}
```

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

```

```
