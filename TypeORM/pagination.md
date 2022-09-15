# Pagination

페이지네이션을 위해 limit-offset, take-skip 을 이용할 수 있다.
공식문서에서는 페이지네이션을 처리할 때, `limit` 보다는 `take` 를, `offset` 보다는 `skip`을 권고하고 있다.

> If you are using pagination, it's recommended to use `take` instead.
> If you are using pagination, it's recommended to use `skip` instead.
> [TypeORM Docs:adding-limit-expression](https://typeorm.biunav.com/en/select-query-builder.html#adding-limit-expression)

take, skip를 적용해봤을 때 원하는 결과를 볼 수 없었다.
그 이유는 사용 방식의 차이에 있었다.
typeorm querybuilder에서 getRawMany()로 raw data를 반환하도록 구현해뒀는데, 이 때는 `skip`과 `take`가 제대로 작동하지 않는다.
raw data를 반환할 때는 `limit`, `offset`을 사용해야 한다.

# OrderBy

orderBy로 정렬한 이후에 limit, offset으로 페이지네이션을 처리할 때, 예상과 다른 결과가 조회되는 경우가 있다.
원인은 중복된 값으로 정렬이 되는 경우, limit, offset은 기준 없이 페이지네이션이 되는 것이었다.
해결 방법은 대비할 수 있는 정렬을 추가해두는 것이다.

```js
createQueryBuilder("user").orderBy("user.name").addOrderBy("user.id");
```
