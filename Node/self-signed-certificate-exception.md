# Self-signed certificate 에러 발생 원인

폐쇄망에서 https를 적용하기 위해서는 CA에서 발급하는 공인인증서를 적용할 수 없기 때문에 self-signed certificate 를 적용하게 되었다.

https 요청을 받는 host 서버가 자체 서명 인증서 사용하고 있는 경우, 아래와 같은 에러가 발생한다.

> UnhandledPromiseRejectionWarning: Error: unable to verify the first certificate

다음 두 가지 방법으로 해결할 수 있다.

첫번째 방법은 axios instance 생성 시 httpsAgent 세팅을 통해서 해결 하는 방법이다.

```js
const axios = require("axios");
const https = require("https");

const url = "https://10.10.10.10";
const options = new https.Agent({
  // NOTE: 허가되지 않은 인증을 거부하지 않겠다.
  rejectUnauthorized: false,
});

axios(url, options);
```

두번째 방법은 `NODE_TLS_REJECT_UNAUTHORIZED` 환경 변수를 이용하는 것이다.

```js
// NOTE: 허가되지 않은 인증 TLS 통신을 거부하지 않겠다.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
```
