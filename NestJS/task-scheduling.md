# Task Scheduling

스케줄링은 고정된 날짜, 시간 혹은 반복 간격마다 실행하도록 예약하는 기능이다.
이런 주기적 반복 작업을 태스크(task) 또는 배치(batch, 일괄처리)라고 부른다.<br>
Linux에서는 태스크 스케줄링을 담당하는 cron과 같은 패키지를 사용하고 있다.<br>
Nest에서는 Node.js의 node-cron 패키지를 통합하고 있는 `@nestjs/schedule` 패키지를 제공하고 있다.

## 설치

```bash
$ npm install --save @nestjs/schedule @types/cron
```

## BatchModule 작성

```js
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskService } from "./task.service";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService],
})
export class BatchModule {}
```
