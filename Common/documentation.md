# Documentation

Node.js API 서버 개발 문서화 방법

1. Swagger
   Swagger는 REST API를 설계, 빌드, 문서화 및 사용하는 데 도움이되는 OpenAPI 사양을 중심으로 구축 된 오픈 소스 도구 세트이다.
   Swagger를 이용했을 때, API 문서를 항상 최신화할 수 있다.
   또한 API를 테스트할 수 있는 기능을 제공하기 때문에 Postman과 같은 별도의 도구를 이용하지 않아도 된다.

2. @compodoc/compodoc
   Node.js 프로젝트 문서화를 위한 라이브러리이다. 설계를 자동으로 문서화해주는 도구이다.
   전체 설계를 파악하는 데 아주 유용하다.

   compodoc 패키지를 설치한다.

   ```bash
   $ npm install @compodoc/compodoc
   ```

   package.json 파일에 실행 스크립트를 작성한다.

   ```bash
   # package.json
   "scripts": {
        "documentation:serve": "npx @compodoc/compodoc -p tsconfig.json --serve",
   }
   ```

   스크립트를 실행하면, `/documentation` 경로 하위에 html 문서들이 생성된다.
   생성된 문서는 `http://localhost:8080` 에서 확인할 수 있다.
