# Rate Limiting

무차별 공격에 대응하기 위한 rate-limiting 기술이다. 단일 엔드포인트에 rate limit 설정한 경우 [메모리 누수 이슈](https://nodejs.org/dist./v7.7.3/docs/api/all.html#events_eventemitter_defaultmaxlisteners)도 해결할 수 있다.

공식문서에서 제안하는 방법은 `ThrottlerModule`을 이용하는 것이다.

## Throttler

> 전역으로 설정한 경우 동일한 IP에서 단일 엔드포인트에 대해 ttl 동안 limit 번의 요청을 수행할 수 있다.
>
> More
>
> - weekly download: over 53,000
> - [throttlermodule](https://www.npmjs.com/package/@nestjs/throttler#throttlermodule)

```bash
$ npm i --save @nestjs/throttler
```

패키지 설치가 완료되면, AppModule에 다음과 같이 imports에 추가한다.

```js
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}
```

다음 두 옵션이 추가된다.

- `ttl`: time to live, 유효 시간
- `limit`: ttl 내 최대 요청 수
  제한 설정하려는 모듈의 providers에 다음과 같이 가드를 설정할 수 있다.

```js
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard
}

```

## nestjs-rate-limiter

> 또 다른 방법으로는 `nestjs-rate-limiter`를 이용할 수 있다.
>
> 전역으로 설정한 경우 `controller` 기준으로 rate-limit 설정된다. (throttlerModule과 차이점)
>
> More
>
> - weekly download: over 5,000
> - [nestjs-rate-limiter](https://www.npmjs.com/package/nestjs-rate-limiter)

```bash
$ npm install --save nestjs-rate-limiter
```

패키지가 설치되면, AppModule에 다음과 같이 imports에 추가한다.

```js
@Module({
  imports: [
    RateLimiterModule.register({
      duration: 10,
      points: 3,
      customResponseSchema: () => {
        return { statusCode: "429", message: "Request has been blocked" };
      },
    }),
  ],
})
export class AppModule {}
```

다음 두 옵션이 추가된다.

- duration: 유효 시간
- points: duration 내 최대 요청 수

제한 설정하려는 모듈의 providers에 다음과 같이 가드를 설정할 수 있다.
다음 내용을 app.module의 providers에 추가하여 전역적으로 설정할 수 있다.

```js
{
  provide: APP_GUARD,
  useClass: RateLimiterGuard,
}
```

## express-rate-limit

> 동일 IP로부터 무차별 공격에 대응하기 위한 방법이다.
>
> 이 라이브러리를 전역에 설정한 경우, `@nestjs/throttler` 라이브러리와 다르게 엔드포인트에 구분없이 전체 요청 횟수를 제한한다.
> 단일 엔드포인트에 미들웨어로 추가하면, 지역적으로 설정할 수 있다.
>
> More
>
> - weekly download: 397,920
> - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

```bash
$ npm install --save express-rate-limit
```

패키지가 설치되면, main.ts에 다음 내용을 추가한다.

```js
import rateLimit from "express-rate-limit";

app.use(
  rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 30, // limit each IP to 30 requests per windowMs
    handler(req, res) {
      res.status(429).json({
        statusCode: 429,
        message: "Request has been blocked",
      });
    },
  })
);
```

---

## Notes

- rate-limiting은 요청 API 기준이 아닌 컨트롤러 기준으로 설정된다. 따라서 컨트롤러에 접근할 수 없다면, rate-limit 에 카운팅되지 않게 된다.
  - 예를 들어, 컨트롤러에 진입하기 전 미들웨어에서 에러처리를 발생시킨다면, 요청 횟수를 제한할 수 없게 된다.
- 무차별 공격에 대응하기 위해서는 전역적으로 `express-rate-limit`를 채택했다.
  - 엔드포인트에 관계없이 동일 IP의 요청을 제한할 수 있어서, 서버 부하를 줄일 수 있다.
- 단일 엔드포인트의 메모리 누수를 막기 위해서는 지역적으로 `@nestjs/throttler`를 채택했다.
  - NestJS 공식문서에서 제안하는 방법이고, 사용하기 편하다.
- Guard의 canActivate 핸들러 결과가 false 인 경우, 403 에러 코드로 응답한다.
  - 다른 에러 코드를 반환하고 싶다면, `throw new UnauthorizedException();` 와 같이 예외 처리하면 된다.

### Guard 검사에서 통과되지 않는 경우, 트래픽 제한(rate-limit)이 의도대로 동작하지 않는다?

- rate-limit는 트래픽 부하를 줄이기 위해 서버에서는 요청을 처리하지 않고, 바로 429 에러를 리턴하는 것이다.
- 따라서, 서버에 부하를 주지 않는 경우에는 트래픽 제한이 필요없다.
- `@nestjs/throttler`의 흐름은 다음과 같다.
  1. API 요청
  2. Guard 검사
  3. return true? rate-limit 횟수 카운트한다. -> 요청은 계속 들어가고, 429 에러를 반환한다.
  4. return false? rate-limit 횟수 카운트하지 않은 채, Guard에서 예외 처리한다. -> 요청은 계속 들어가고, Guard에서 예외처리한다.(default: 403 Forbidden)

### Nginx를 통해 Reverse Proxy를 거쳐 요청을 받는 경우는 요청 클라이언트 IP를 알 수 없다?

- 하나의 서버에 여러 IP에서 요청을 보내는 경우, 클라이언트 IP는 nginx IP로 처리된다.
- 트래픽을 제한하는 경우는 서버 부하를 막는 것만이 유의미하다.
- 그렇다면, 동일한 IP에서 과도한 요청이 들어오는 경우 어떻게 처리해야 하는걸까?
  - nginx에서 지원하는 [limit_req](http://nginx.org/en/docs/http/ngx_http_limit_req_module.html) 모듈을 사용하면, 동일한 IP 에서 과도한 요청이 유입될 때, 이를 제한할 수 있다.
  - Reverse Proxy가 이용되는 경우에는 WAS에서의 트래픽 제한은 서버 부하를 막기 위해 사용하는 것으로 하고, 클라이언트 IP 당 서버 부하를 막기 위해서는 Nginx의 limit_req 모듈을 이용하자.
