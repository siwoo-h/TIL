# Rate Limiting

무차별 공격에 대응하기 위한 rate-limiting 기술이다. 공식문서에서 제안하는 방법은 `ThrottlerModule`을 이용하는 것이다.

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

---

## Notes

- rate-limiting은 요청 API 기준이 아닌 컨트롤러 기준으로 설정된다. 따라서 컨트롤러에 접근할 수 없다면, rate-limit 에 카운팅되지 않게 된다.
  - 예를 들어, 컨트롤러에 진입하기 전 미들웨어에서 에러처리를 발생시킨다면, 요청 횟수를 제한할 수 없게 된다.
