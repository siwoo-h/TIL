# HTTP Exception

비즈니스 로직 내 예외 처리를 해줘야 하는 다양한 경우가 있는데, 예기치 못한 예외가 발생하는 경우에는 어떻게 처리할까?<br>
Nest.js에서는 Exception Filter를 내장하고 있다.<br>
표준 HttpException 예외로 처리되지 않은 예외가 발생하는 경우, `InternalServerException`으로 처리하도록 설정할 수 있다.

```js
// http-exception.filter.ts
// 공식 문서 참고: https://docs.nestjs.com/exception-filters#custom-exceptions
// HttpException 인스턴스인 경우에는 응답으로 리턴하고,
// 그렇지 않은 경우에는 InternalServerException으로 응답을 내보낸다.
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
        response
          .status(exception.getStatus())
          .json(exception.getResponse());
    } else {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            request: `${request.method} ${request.url}`,
          });
    }
  }
}

```

구현한 `HttpExceptionFilter`를 모든 경로에 설정한다.

```js
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "@src/filter/http-exception.filter.ts";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

Exception Filter를 이용하여 일관적인 예외로 응답 처리할 수 있다.
