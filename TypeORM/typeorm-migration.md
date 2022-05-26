# TypeORM Migration

개발이 끝나고 배포가 된 이후에 데이터를 유지한 채 DB 스키마를 변경하기 위해 마이그레이션을 이용한다. 개발 환경에서는 `synchronize: true`로 설정하여 동기화할 수도 있지만, 배포 환경에서는 안전하지 않기 때문에 이 방법은 사용해지 않는 것을 권고하고 있다.

> Typically it is unsafe to use synchronize: true for schema synchronization on production once you get data in your database.
>
> 출처: [TypeORM > migrations](https://orkhan.gitbook.io/typeorm/docs/migrations)

---

## Configuration

구성 방법을 요약하자면 다음과 같다. 자세한 내용은 공식문서에 설명되어 있으니 참고해서 구성하자.

1. TypeORM CLI를 이용하여 boilerplate를 구성한다.
2. `package.json`에 migration 관련 스크립트를 작성한다.
3. 마이그레이션 스크립트 작성 후 `up` 함수에 실행문 작성하고, `down` 함수에 원상 복구할 실행문을 작성한다.

```bash
# 엔티티 기준으로 테이블 생성
$ typeorm migration:generate

# migration 파일 생성
$ typeorm migration:create

# migration 실행
$ typeorm migration:run

# migration 실행 복구
$ typeorm migration:revert
```

---

## Source

typeORM migration은 ormconfig.ts 파일이 필요하다. 모듈 내 typeorm config 옵션들을 설정할 수도 있겠지만, 그렇게 하면, ormconfig.ts를 생성하는 스크립트를 따로 추가하는 번거로움이 있다.
ormconfig.ts에 옵션들을 구성해두고, 이를 모듈에서 사용해보자.

```js
// ormconfig.ts
import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
dotenv.config();
const ormconfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "username",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "database",
  ssl: false,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  keepConnectionAlive: true,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  subscribers: ["src/subscriber/**/*.ts"],
  migrations: [__dirname + "/database/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  cli: {
    entitiesDir: __dirname + "/**/*.entity.{js,ts}",
    migrationsDir: __dirname + "/database/migrations/",
    subscribersDir: "src/subscriber",
  },
};
export default ormconfig;
```

```js
// src/database/database.module.ts
import ormconfig from "ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class DatabaseModule {}
```

```js
// src/app.module.ts
import { DatabaseModule } from "@src/database/database.module";
@Module({
  imports: [
    DatabaseModule,
    // ...
  ],
})
export class AppModule {}
```

```json
// package.json
"scripts": {
    // ...
    "migrate:create": "ts-node ./node_modules/typeorm/cli.js migration:create -n Test",
    "migrate:run": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run",
    "migrate:revert": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert"
}
```

---

## Dockerfile

배포하는 데 도커를 주로 사용하는데, 도커에서는 어떻게 마이그레이션을 사용할까? 도커 이미지에 `npm run migrate:run`을 포함시켜주면 된다. 마이그레이션 파일은 한번 실행되면 중복 실행되지 않기 때문에, 항상 최신 마이그레이션 파일을 실행할 수 있다.

```Dockerfile
# Dockerfile

# 기타 설정 이후에...
RUN npm install -g ts-node

CMD npm run migrate:run \
    && npm run start
```
