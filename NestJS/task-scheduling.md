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

## 태스크 스케줄링 선언 방식

### 1. 크론 잡 선언 방식

크론 잡 선언 방식은 `@Cron` 데코레이터를 선언한 메서드를 반복 주기에 실행한다.<br>
`@Cron`의 첫번째 인자에서 주기를 설정한다.<br>
설정 방식으로는 [cron 패턴](http://crontab.org/)을 따를 수 있고, Nest에서 제공하는 [`CronExpression` 패턴](https://github.com/nestjs/schedule/blob/master/lib/enums/cron-expression.enum.ts)을 활용할 수 있다.

```js
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  // Cron 패턴
  @Cron('* * * * * *', { name: 'cronTask' })
  handleCron() {
    this.logger.log('Task Called');
  }
}
```

`@Cron`데코레이터의 두번째 인자로 `CronOptions` 객체를 받는다.
|프로퍼티|설명|
|----|----|
|name|태스크의 이름, 크론 잡에 액세스할 때 이용됨|
|timeZone|실행 시간대|
|utcOffset|UTC 기반 시간대의 오프셋, "+09:00"을 사용하거나 숫자 9를 사용함|
|unrefTimeout|노드 프로세스를 중지하고 싶을 때 사용함. Node.js의 timeout.unref() 와 관련이 있음|

### 2. 동적 태스크 스케줄링

앱이 구동되는 과정에서 등록되는 방식([크론 잡 선언 방식](#1-크론-잡-선언-방식)은 그러함)이 아닌 동적으로 태스크를 등록/해제할 수 있는 방식이다.<br>
동적 태스크 스케줄링은 `SchedulerRegistry`에서 제공하는 API를 사용합니다.

```js
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {
        this.addCronJob();
  }

  addCronJob() {
    const name = 'cronSample';

    const job = new CronJob(`* * * * * *`, () => {
      this.logger.warn(`run! ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job);

    this.logger.warn(`job ${name} added!`);
  }
}
```

위 과정은 `SchedulerRegistry`에 크론 잡을 추가만 해 두는 것이지 태스크 스케줄링을 등록하는 것이 아니다.<br>
그렇기 때문에 앱을 실행해봐도 스케줄링이 실행되지 않는다.<br>
크론잡을 등록하도록 컨트롤러를 생성해보자.

```js
import { Controller, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller('batches')
export class BatchController {
  constructor(private scheduler: SchedulerRegistry) { }

  @Post('/start-sample')
  start() {
    const job = this.scheduler.getCronJob('cronSample');

    job.start();
    console.log('start!! ', job.lastDate());
  }

  @Post('/stop-sample')
  stop() {
    const job = this.scheduler.getCronJob('cronSample');

    job.stop();
    console.log('stopped!! ', job.lastDate());
  }
}
```

BatchController를 모듈에 선언한다.

```js
import { BatchController } from './batch.controller';

@Module({
  controllers: [BatchController],
    ...
})
export class BatchModule { }
```

이제 API 요청으로 크론잡을 제어할 수 있게 되었다.

> 자료 출처
>
> - NestJS, Task Scheduling [here](https://docs.nestjs.com/techniques/task-scheduling)
> - NestJS로 배우는 백엔드 프로그래밍, 동적 태스크 스케줄링 [here](https://wikidocs.net/158663)
